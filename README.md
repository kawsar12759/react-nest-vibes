# NestVibes

**A residential real-estate marketplace: browse apartments, student housing and vacation rentals, save homes, book tours, and list your own place with drag-and-drop photo uploads.**

[Live site](https://nest-vibes-b0e09.web.app/) · [Repository](https://github.com/kawsar12759/react-nest-vibes)

Built with React 18, React Router 6 data routers, Tailwind CSS, Firebase Auth + Cloud Firestore, and Cloudinary.

---

## Features

**For renters and buyers**
- **Search and filter**: keyword, type, buy/rent, bedrooms, price range and sorting. Filters live in the URL, so a search can be shared or bookmarked.
- **Property pages**: photo gallery with a keyboard-navigable lightbox, key facts, amenities, an embedded map, resident reviews and similar homes.
- **Cost calculators**: an amortized mortgage calculator for homes for sale, and a stay estimator for nightly rentals.
- **Saved homes**: a heart on every card, stored per user in Firestore and synced in real time across devices.
- **Tour booking**: pick a date and time; the request goes to the listing owner.

**For owners**
- **List a home**: multi-photo upload straight to Cloudinary, with drag-and-drop, per-file progress, retry, reordering and cover selection.
- **Dashboard**: overview stats, manage (edit/delete) listings, confirm or decline incoming tour requests, and track your own requests.
- **Profile**: upload a profile photo (Cloudinary), change display name, send a password reset.

**Across the app**
- **Editorial pages**: an article index with detail pages, a resident reviews wall, and an about page.
- Email/password and Google sign-in (Firebase Auth), with protected routes that return you to where you were.
- Per-page titles and social meta tags (`react-helmet-async`).
- Light and dark themes (follows the system, remembers your choice, no flash on load).
- Responsive from 320 px up, visible keyboard focus, a skip link, and support for reduced motion.
- Route-level code splitting and vendor chunking; images served through Cloudinary with `f_auto,q_auto`, responsive `srcset` and smart cropping.

## Architecture

```
Browser ──► Cloudinary (unsigned, image-only upload preset)
   │            └─ returns secure_url + public_id + delete_token
   │
   ├──► Firebase Auth (email/password, Google)
   └──► Cloud Firestore
          listings/{id}                   public read, owner-only writes, schema-validated
          users/{uid}/favorites/{id}      private to the user
          tourRequests/{id}               visible to requester + listing owner;
                                          owner may only change `status`
```

- **No secrets in the bundle.** Only the cloud name and an *unsigned* preset name are exposed (`VITE_` vars). The preset allows image formats only, caps size, stores under `nest-vibes/`, and returns a short-lived delete token so a photo removed before saving is also deleted from Cloudinary. The API secret stays in `.env.local` and is used only by the local setup scripts.
- **Security rules** ([firestore.rules](firestore.rules)) enforce ownership and validate listing fields server-side (types, ranges, 1–10 images).
- **Seed catalogue**: the 16 curated listings and 7 articles ship as JSON in `src/data/`, with images migrated to Cloudinary. Community listings from Firestore are merged in and sorted newest first. If Firestore is unreachable, the catalogue still renders.

```
src/
├── components/     PropertyCard, ImageUploader, AvatarUploader, SearchBar, …
├── data/           16 seed listings, 7 articles, 11 reviews, site imagery (Cloudinary URLs)
├── firebase/       App, Auth and Firestore initialization
├── hooks/          useAsync
├── layout/Root/    Shell: route progress bar, main outlet, toaster, scroll restoration
├── lib/            cloudinary.js, listings.js, tours.js, format.js
├── pages/          Home, Properties, PropertyDetails, ListingForm, Blogs, Reviews,
│                   About, SignIn, SignUp, ErrorPage, Dashboard/*
├── providers/      Auth, Theme, Favorites contexts
├── routes/         Router (lazy routes) and PrivateRoute
└── shared/         Navbar, Footer
scripts/
├── setup-cloudinary.mjs      creates/updates the unsigned upload preset
└── migrate-seed-images.mjs   moves seed images to Cloudinary, normalizes seed data
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, categories, how it works, testimonials, owner CTA |
| `/properties` | Catalogue with URL-driven search, filters and sorting |
| `/property/:id` | Listing detail: gallery, amenities, map, reviews, tour form, calculator |
| `/about`, `/reviews` | About page, resident reviews wall |
| `/blogs`, `/blogs/:id` | Article index and detail |
| `/signin`, `/signup` | Email/password and Google auth |
| `/listings/new`, `/listings/:id/edit` | 🔒 Create or edit a listing |
| `/dashboard` | 🔒 Overview, plus `listings`, `saved`, `tours`, `profile` |

🔒 = behind `PrivateRoute`; every page below the root is lazily loaded.

## Getting started

**Prerequisites:** Node.js 18+ (20.6+ for the setup scripts), a Firebase project with Email/Password and Google sign-in enabled and a Firestore database, and a Cloudinary account.

```bash
git clone https://github.com/kawsar12759/react-nest-vibes.git
cd react-nest-vibes
npm install
cp .env.example .env.local        # fill in Firebase + Cloudinary values
npm run setup:cloudinary          # one-time: creates the unsigned upload preset
firebase deploy --only firestore:rules
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run setup:cloudinary` | Create or update the unsigned, image-only upload preset |
| `npm run migrate:images` | Re-upload seed images to Cloudinary and regenerate `src/data/` |
| `npm run deploy` | Build and deploy hosting + Firestore rules |

## Tech stack

React 18 · React Router 6 · Tailwind CSS 3 · Firebase Auth · Cloud Firestore · Cloudinary · React Helmet Async · Sonner · React Icons (Phosphor) · Vite 5 · Firebase Hosting

Type is set in Fraunces (display) and Manrope (text).

## Author

**MD. Kawsar Hossain**
[kawsar.hossain12759@gmail.com](mailto:kawsar.hossain12759@gmail.com) · [LinkedIn](https://www.linkedin.com/in/kawsar-hossain-antor/) · [GitHub](https://github.com/kawsar12759)
