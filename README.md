<div align="center">
  <h1>AETHER — Luxury Clothing</h1>
  
  <p><strong>Premium E-commerce Platform Built with Modern Next.js</strong></p>

  <a href="https://byo-lyart.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Now-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>

  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
</div>

<br>

## About The Project

**AETHER** is a modern, high-end luxury clothing e-commerce application. It was built following industry-standard best practices with a strong focus on **Server Components**, performance, SEO, and elegant user experience.

This project showcases clean architecture, proper data fetching strategies, and reusable component patterns using the latest Next.js ecosystem.

**Live Demo:** [https://byo-lyart.vercel.app](https://byo-lyart.vercel.app/)

---

## ✨ Features

- **Server-First Architecture** — Heavy use of Server Components, SSR, and Streaming
- **Dark & Light Mode** with system preference support
- **Fully Responsive** design with mobile-first approach
- **Search Functionality** — API route with proper indexing support
- **Advanced Filtering & Pagination** — State managed in URL (no `useState`)
- **Suspense + Skeleton Loading** — Smooth loading states
- **Newsletter Subscription** — Server Action with `useActionState` + Zod validation
- **Single Product Page** (`/products/:slug`) — Rich design & details
- **Reusable Components** using shadcn/ui + Radix UI
- **Optimized Images** using Next.js `Image` component
- **Type-safe** development with TypeScript

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui + Radix UI
- **Package Manager:** pnpm
- **Database:** MongoDB
- **Image Hosting:** Cloudflare R2 (Planned / Optional)
- **Form Handling:** React Server Actions + `useActionState`
- **Deployment:** Vercel

---

📁 Project Structure
```
BYO/
├── public/                     # Static assets (images, icons, etc.)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── products/
│   │   │       └── search/     # Search API route (only one)
│   │   ├── cart/               # Cart page
│   │   ├── create-product/     # Admin - Create Product Page
│   │   ├── products/           # Product listing + dynamic [slug]
│   │   ├── shop/               # Shop page with filters
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx          # Root layout
│   │   ├── loading.tsx         # Global loading
│   │   ├── not-found.tsx
│   │   └── page.tsx            # Homepage
│   │
│   ├── components/             # All reusable components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── product-card.tsx
│   │   ├── product-gallery.tsx
│   │   ├── shop-filters.tsx
│   │   ├── shop-pagination.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── newsletter-form.tsx
│   │   ├── command-search.tsx
│   │   ├── hero-carousel.tsx
│   │   └── ... (many more)
│   │
│   ├── hooks/                  # Custom React hooks
│   │
│   └── lib/
│       ├── actions/            # Server Actions
│       ├── models/             # Mongoose Models (Product, Category, Newsletter)
│       ├── db.ts
│       ├── mongodb.ts
│       ├── utils.ts
│       ├── cart-context.tsx
│       ├── seed.ts
│       └── mock-data.ts
│
├── styles/                     # Additional styles (if needed)
├── .gitignore
├── components.json             # shadcn/ui config
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```


## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Nafiz-Himel/BYO.git
cd BYO

# Install dependencies
pnpm install

# Run development server
pnpm dev
