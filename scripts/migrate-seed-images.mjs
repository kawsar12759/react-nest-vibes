// One-off migration: moves every seed image (remote imgbb links + large local photos) onto
// Cloudinary and writes normalized seed data to src/data/. Safe to re-run: public_ids are stable
// and uploads overwrite.
//   node --env-file=.env.local scripts/migrate-seed-images.mjs
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
if (!cloud || !key || !secret) throw new Error('Missing Cloudinary credentials in .env.local');

const root = path.resolve(import.meta.dirname, '..');
const readJson = async (p) => JSON.parse(await readFile(path.join(root, p), 'utf8'));

async function upload(file, publicId, attempt = 1) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { overwrite: 'true', public_id: publicId, timestamp: String(timestamp) };
  const toSign = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('&');
  const form = new FormData();
  for (const [k, v] of Object.entries(params)) form.append(k, v);
  form.append('api_key', key);
  form.append('signature', createHash('sha1').update(toSign + secret).digest('hex'));
  form.append('file', file);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: 'POST',
    body: form,
    signal: AbortSignal.timeout(90_000),
  });
  const body = await res.json();
  if (res.ok) return { url: body.secure_url, publicId: body.public_id, width: body.width, height: body.height };
  if (attempt < 3) {
    await new Promise((r) => setTimeout(r, 1500 * attempt));
    return upload(file, publicId, attempt + 1);
  }
  throw new Error(`${publicId}: ${body.error?.message}`);
}

async function uploadLocal(relPath, publicId) {
  const buf = await readFile(path.join(root, relPath));
  return upload(new Blob([buf]), publicId);
}

// Remote imgbb links are flaky. Download them here (with a timeout) from either hostname,
// then upload the bytes, falling back to a local copy when one exists.
async function download(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return new Blob([await res.arrayBuffer()]);
}

async function uploadRemote(url, publicId, localFallback, fallbackUrl) {
  const candidates = [url, url.replace('i.ibb.co.com', 'i.ibb.co')];
  if (fallbackUrl) candidates.push(fallbackUrl);
  for (const candidate of candidates) {
    try {
      return await upload(await download(candidate), publicId);
    } catch (err) {
      console.warn(`  retrying ${publicId} (${err.message})`);
    }
  }
  if (localFallback) return uploadLocal(localFallback, publicId);
  // A previous run may already have migrated it.
  const existing = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/resources/image/upload/${publicId}`, {
    headers: { Authorization: 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64') },
  });
  if (existing.ok) {
    const body = await existing.json();
    console.warn(`  source unreachable; reusing existing ${publicId}`);
    return { url: body.secure_url, publicId: body.public_id, width: body.width, height: body.height };
  }
  throw new Error(`Could not migrate ${url}`);
}

function parsePrice(raw) {
  const amount = Number(raw.replace(/[^0-9.]/g, ''));
  const unit = raw.includes('/month') ? 'month' : raw.includes('/night') ? 'night' : 'total';
  return { price: amount, priceUnit: unit };
}

const localFallbacks = { 8: 'src/assets/property1.png' };
// These imgbb originals are gone; replacements are Unsplash photos (free to use) matching each listing.
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&fm=jpg`;
const fallbackUrls = {
  4: unsplash('1555854877-bab0e564b8d5'), // student room with bunks
  11: unsplash('1449158743715-0a90ebb6d2d8'), // log cabin in pine forest
  12: unsplash('1522708323590-d24dbb6b0267'), // open-plan loft
  15: unsplash('1502672260266-1c1ef2d93688'), // plant-filled urban living room
};
const results = { failed: [] };

// --- Properties ---
const properties = await readJson('public/properties.json');
const normalized = [];
for (const [i, p] of properties.entries()) {
  process.stdout.write(`property ${p.id}… `);
  let image;
  try {
    image = await uploadRemote(p.image, `nest-vibes/seed/property-${p.id}`, localFallbacks[p.id], fallbackUrls[p.id]);
    console.log('ok');
  } catch (err) {
    console.log('FAILED');
    results.failed.push(err.message);
    continue;
  }
  const { price, priceUnit } = parsePrice(p.price);
  normalized.push({
    id: p.id,
    title: p.estate_title,
    description: p.description,
    category: p.category,
    status: p.status,
    price,
    priceUnit,
    area: Number(p.area.replace(/[^0-9]/g, '')),
    location: p.location,
    facilities: p.facilities,
    bedrooms: p.bedrooms,
    washrooms: p.washrooms,
    images: [image],
    reviews: p.reviews,
    ownerId: 'nestvibes',
    ownerName: 'NestVibes Team',
    // Stagger seed dates so "Newest" sorting is meaningful.
    createdAt: new Date(Date.UTC(2024, 8, 1 + i * 3)).toISOString(),
  });
}

// --- Blogs ---
const blogs = await readJson('public/blogs.json');
const blogOut = [];
for (const b of blogs) {
  process.stdout.write(`blog ${b.id}… `);
  try {
    const image = await uploadRemote(b.imageUrl, `nest-vibes/seed/blog-${b.id}`);
    console.log('ok');
    const { imageUrl, ...rest } = b;
    blogOut.push({ ...rest, image });
  } catch (err) {
    console.log('FAILED');
    results.failed.push(err.message);
  }
}

// --- Local site photography ---
const siteImages = {
  heroStreet: 'src/assets/carouselImg1.jpg',
  heroTower: 'src/assets/carouselImg2.jpg',
  heroModern: 'src/assets/carouselImg3.jpg',
  heroVilla: 'src/assets/carouselImg4.png',
  family: 'src/assets/chooseSection.png',
  story: 'src/assets/2558.jpg',
  aboutHero: 'src/assets/360_F_624450057_1yJSSgoCaRyoC1EbNoWkjdDukpnaSrqo.png',
  team1: 'src/assets/teamMember1.jpg',
  team2: 'src/assets/teamMember2.jpg',
  team3: 'src/assets/teamMember3.jpg',
  team4: 'src/assets/teamMember4.jpg',
  team5: 'src/assets/teamMember5.jpg',
  team6: 'src/assets/teamMember6.jpg',
};
const site = {};
for (const [name, file] of Object.entries(siteImages)) {
  process.stdout.write(`site ${name}… `);
  site[name] = (await uploadLocal(file, `nest-vibes/site/${name}`)).url;
  console.log('ok');
}

await mkdir(path.join(root, 'src/data'), { recursive: true });
await writeFile(path.join(root, 'src/data/properties.json'), JSON.stringify(normalized, null, 2) + '\n');
await writeFile(path.join(root, 'src/data/blogs.json'), JSON.stringify(blogOut, null, 2) + '\n');
await writeFile(path.join(root, 'src/data/siteImages.json'), JSON.stringify(site, null, 2) + '\n');

console.log(`\nMigrated ${normalized.length}/${properties.length} properties, ${blogOut.length}/${blogs.length} blogs, ${Object.keys(site).length} site images.`);
if (results.failed.length) console.log('Failed:\n' + results.failed.join('\n'));
