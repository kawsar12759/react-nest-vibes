// One-time setup: creates (or updates) the unsigned upload preset the browser uses.
// Runs locally with the Cloudinary API secret, which never ships to the client bundle.
//   node --env-file=.env.local scripts/setup-cloudinary.mjs
const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
const preset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'nest_vibes_unsigned';

if (!cloud || !key || !secret) {
  console.error('Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env.local');
  process.exit(1);
}

const base = `https://api.cloudinary.com/v1_1/${cloud}/upload_presets`;
const auth = 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');
const settings = new URLSearchParams({
  unsigned: 'true',
  folder: 'nest-vibes',
  allowed_formats: 'jpg,jpeg,png,webp,avif,heic',
  resource_type: 'image',
  unique_filename: 'true',
  // Lets the browser undo an upload within 10 minutes (e.g. a photo removed before the listing is saved).
  return_delete_token: 'true',
  overwrite: 'false',
  // Cap stored originals so a phone photo doesn't land as a 40MP file.
  transformation: 'c_limit,w_2400,h_2400',
});

const existing = await fetch(`${base}/${preset}`, { headers: { Authorization: auth } });
const res = existing.ok
  ? await fetch(`${base}/${preset}`, { method: 'PUT', headers: { Authorization: auth }, body: settings })
  : await fetch(base, { method: 'POST', headers: { Authorization: auth }, body: new URLSearchParams({ name: preset, ...Object.fromEntries(settings) }) });

const body = await res.json();
if (!res.ok) {
  console.error('Cloudinary error:', body);
  process.exit(1);
}
console.log(`${existing.ok ? 'Updated' : 'Created'} unsigned preset "${preset}" on cloud "${cloud}".`);
