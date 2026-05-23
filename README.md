# eKart — Full-Stack E-Commerce Application

A modern e-commerce storefront built with Next.js 16, Sanity CMS, Zustand, and NextAuth. Features a live product catalog, cart and wishlist management, blog, hot deals, Google OAuth login, and an embedded Sanity Studio.

---

[Live link]: https://ecomerce-main-one.vercel.app/

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript 5
- Styling: Tailwind CSS v4
- UI Primitives: shadcn/ui + Radix UI
- CMS / Backend: Sanity v4
- State Management: Zustand v5 (with persist middleware)
- Auth: NextAuth.js (Google OAuth)
- Animations: Motion (Framer Motion successor)
- Forms: React Hook Form + Zod
- Notifications: Sonner
- Icons: Lucide React

---

## Project Structure

eKart/
├── app/
│   ├── api/auth/[...nextauth]/   # NextAuth catch-all API handler
│   ├── blog/                     # Blog listing page
│   ├── cart/                     # Shopping cart page
│   ├── category/[slug]/          # Dynamic category page
│   ├── contact/                  # Contact page
│   ├── deal/                     # Hot deals page
│   ├── login/                    # Login page (Google OAuth)
│   ├── product/[slug]/           # Dynamic product detail page
│   ├── search/                   # Search results page
│   ├── shop/                     # All products page
│   ├── wishlist/                 # Wishlist page
│   ├── studio/[[...tool]]/       # Embedded Sanity Studio
│   ├── globals.css
│   ├── layout.tsx                # Root layout (Header, Footer, SessionProvider, Toaster)
│   ├── page.tsx                  # Homepage
│   └── not-found.tsx             # Custom 404 page
│
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   └── *.tsx                     # Feature components
│
├── sanity/
│   ├── lib/
│   │   ├── client.ts             # Sanity client instance
│   │   ├── image.ts              # Image URL builder
│   │   └── live.ts               # sanityFetch wrapper
│   ├── quaries/
│   │   ├── index.ts              # Exported async data-fetching functions
│   │   └── query.ts              # GROQ query strings
│   └── schemaTypes/              # product, category, brand, blog schemas
│
├── store/
│   ├── cartStore.ts              # Cart state (Zustand)
│   └── wishlistStore.ts          # Wishlist state (Zustand)
│
├── hooks/
│   ├── use-mobile.ts             # Detects mobile viewport
│   └── useOutSideClick.ts        # Detects clicks outside a ref
│
├── constants/
│   └── data.ts                   # Nav links, footer links, category list
│
├── types/
│   └── index.ts                  # Shared TypeScript interfaces
│
├── lib/
│   └── utils.ts                  # cn() helper (clsx + tailwind-merge)
│
├── sanity.config.ts              # Sanity Studio config
├── sanity.types.ts               # Auto-generated Sanity types (do not edit)
└── next.config.ts                # Allowed image domains

---

## Pages & Routes

- /                    Homepage (banner, categories, featured products, brands, blog)
- /shop                All products
- /product/[slug]      Product detail; fetches via getProductBySlug(slug)
- /category/[slug]     Products filtered by category; fetches via getProductsByCategory(slug)
- /cart                Cart page; reads from useCartStore (localStorage: "cart-storage")
- /wishlist            Wishlist page; reads from useWishlistStore (localStorage: "shopkart-wishlist")
- /deal                Hot deals; fetches products where status == "hot"
- /blog                Blog listing; fetches all posts from Sanity
- /search              Search results filtered by query param
- /contact             Static contact form
- /login               Triggers Google OAuth via NextAuth
- /studio              Embedded Sanity Studio CMS admin panel

---

## Sanity Schemas

product    — name, slug, images[], price, stock, variant (newarrival/bestseller/featured), categories[] (references), status (sale/new/hot)
category   — name, slug, image
brand      — title, slug, logo
blog/post  — title, slug, mainImage, description, publishedAt, author (reference), body (Portable Text)
author     — name, image, bio

---

## Data Fetching

Two approaches are used:

1. sanityFetch wrapper — used in most server components:
   const { data } = await sanityFetch({ query: MY_QUERY, params: { slug } });

2. Direct client.fetch() — used in query.ts utility functions:
   return await client.fetch(`*[_type == "category"]{ ... }`);

Exported fetch functions from sanity/quaries/index.ts:
- getCategories(quantity?)     all categories with product count
- getLatestBlogs()             all blog posts
- getDealProducts()            products with status == "hot"
- getProductBySlug(slug)       single product by slug
- getAllBrands()                all brands

GROQ query constants in sanity/quaries/query.ts:
- LATEST_BLOG_QUERY, DEAL_PRODUCTS, PRODUCT_BY_SLUG_QUERY, ALL_BRANDS_QUERY
- getCategories(), getProductsByCategory(slug) — direct client fetches

---

## State Management (Zustand)

Cart Store (store/cartStore.ts) — persisted as "cart-storage"
- cartItems: CartItem[]  { _id, name, price, image, slug, qty }
- addToCart(item)        adds item or increments qty if already in cart
- removeFromCart(id)     removes by _id
- clearCart()            empties cart

Wishlist Store (store/wishlistStore.ts) — persisted as "shopkart-wishlist"
- wishlistItems: WishlistItem[]  { _id, name, price, image, slug }
- addToWishlist(item)            adds item (no-op if already present)
- removeFromWishlist(id)         removes by _id
- isInWishlist(id)               returns boolean (used to toggle heart icon)

---

## Authentication (NextAuth)

- Provider: Google OAuth (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
- API route: app/api/auth/[...nextauth]/route.ts
- Custom sign-in page: /login
- components/SessionProvider.tsx wraps the app so any client component can call useSession()
- components/SignIn.tsx calls signIn("google") to trigger the OAuth flow

---

## Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

---

## Getting Started

npm install
npm run dev

App:           http://localhost:3000
Sanity Studio: http://localhost:3000/studio

---

## Scripts

npm run dev       development server
npm run build     production build
npm run start     run production build
npm run lint      run ESLint
npm run typegen   regenerate sanity.types.ts after schema changes