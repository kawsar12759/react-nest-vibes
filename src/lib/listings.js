import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import seed from '../data/properties.json';

export const CATEGORIES = ['Apartment', 'Student Housing', 'Vacation Rental'];
export const STATUSES = ['Sale', 'Rent'];
export const CATEGORY_PLURAL = { Apartment: 'Apartments', 'Student Housing': 'Student housing', 'Vacation Rental': 'Vacation rentals' };
export const FACILITY_OPTIONS = [
  'Living Room', 'Kitchen', 'Garden', 'Garage', 'Balcony', 'Gym', 'Pool', 'Parking',
  'Wi-Fi', 'Laundry', 'Air Conditioning', 'Fireplace', 'Pet Friendly', 'Furnished', 'Study Room', 'Security',
];

const listingsCol = collection(db, 'listings');

const seedListings = seed.map((p) => ({ ...p, source: 'nestvibes' }));

function fromDoc(snapshot) {
  const data = snapshot.data();
  return {
    ...data,
    id: snapshot.id,
    source: 'community',
    reviews: data.reviews || [],
    createdAt: data.createdAt?.toDate?.().toISOString() ?? new Date().toISOString(),
  };
}

// Community listings are cached for the session and invalidated on every write,
// so browsing between pages doesn't refetch.
let communityCache = null;
const invalidate = () => {
  communityCache = null;
};

export async function fetchCommunityListings() {
  if (!communityCache) {
    communityCache = getDocs(query(listingsCol, orderBy('createdAt', 'desc'), limit(100)))
      .then((snap) => snap.docs.map(fromDoc))
      .catch((err) => {
        communityCache = null;
        throw err;
      });
  }
  return communityCache;
}

/** Every listing (community posts and the curated NestVibes catalogue), newest first. */
export async function fetchAllListings() {
  let community = [];
  try {
    community = await fetchCommunityListings();
  } catch (err) {
    // The curated catalogue still works if Firestore is unreachable.
    console.warn('Could not load community listings', err);
  }
  return [...community, ...seedListings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function fetchListing(id) {
  const fromSeed = seedListings.find((p) => p.id === id);
  if (fromSeed) return fromSeed;
  const snap = await getDoc(doc(db, 'listings', id));
  return snap.exists() ? fromDoc(snap) : null;
}

export async function fetchListingsByOwner(uid) {
  const snap = await getDocs(query(listingsCol, where('ownerId', '==', uid)));
  return snap.docs.map(fromDoc).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Strips client-only fields (upload progress, delete tokens) before saving. */
function toRecord(values) {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    category: values.category,
    status: values.status,
    price: Number(values.price),
    priceUnit: values.status === 'Sale' ? 'total' : values.priceUnit,
    area: Number(values.area),
    bedrooms: Math.trunc(Number(values.bedrooms)),
    washrooms: Math.trunc(Number(values.washrooms)),
    location: values.location.trim(),
    facilities: values.facilities,
    images: values.images.map(({ url, publicId, width, height }) => ({ url, publicId, width: width ?? null, height: height ?? null })),
  };
}

export async function createListing(values, user) {
  const ref = await addDoc(listingsCol, {
    ...toRecord(values),
    ownerId: user.uid,
    ownerName: user.displayName || 'NestVibes member',
    ownerPhoto: user.photoURL || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  invalidate();
  return ref.id;
}

export async function updateListing(id, values) {
  await updateDoc(doc(db, 'listings', id), { ...toRecord(values), updatedAt: serverTimestamp() });
  invalidate();
}

export async function deleteListing(id) {
  await deleteDoc(doc(db, 'listings', id));
  invalidate();
}

/** Shared filter + sort logic for the browse page. */
export function filterListings(listings, f) {
  const q = f.q?.trim().toLowerCase();
  const out = listings.filter((p) => {
    if (q && !`${p.title} ${p.location} ${p.description}`.toLowerCase().includes(q)) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.status && p.status !== f.status) return false;
    if (f.beds && p.bedrooms < Number(f.beds)) return false;
    if (f.minPrice && p.price < Number(f.minPrice)) return false;
    if (f.maxPrice && p.price > Number(f.maxPrice)) return false;
    return true;
  });
  const sorters = {
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'area-desc': (a, b) => b.area - a.area,
  };
  return out.sort(sorters[f.sort] || sorters.newest);
}
