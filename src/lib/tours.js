import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

const toursCol = collection(db, 'tourRequests');

const fromDoc = (d) => ({
  ...d.data(),
  id: d.id,
  createdAt: d.data().createdAt?.toDate?.().toISOString() ?? new Date().toISOString(),
});

const newestFirst = (a, b) => b.createdAt.localeCompare(a.createdAt);

export async function requestTour(listing, user, form) {
  await addDoc(toursCol, {
    listingId: listing.id,
    listingTitle: listing.title,
    listingImage: listing.images?.[0]?.url ?? null,
    listingLocation: listing.location,
    ownerId: listing.ownerId,
    requesterId: user.uid,
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    date: form.date,
    time: form.time,
    message: form.message.trim(),
    status: 'pending',
    createdAt: serverTimestamp(),
  });
}

export async function fetchMyTourRequests(uid) {
  const snap = await getDocs(query(toursCol, where('requesterId', '==', uid)));
  return snap.docs.map(fromDoc).sort(newestFirst);
}

export async function fetchIncomingTourRequests(uid) {
  const snap = await getDocs(query(toursCol, where('ownerId', '==', uid)));
  return snap.docs.map(fromDoc).sort(newestFirst);
}

export const setTourStatus = (id, status) => updateDoc(doc(db, 'tourRequests', id), { status });

export const cancelTourRequest = (id) => deleteDoc(doc(db, 'tourRequests', id));
