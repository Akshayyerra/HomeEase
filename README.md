# HomeEase — Next.js Website

A full home services platform website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Sections Included

- ✅ Sticky Navbar with mobile hamburger menu
- ✅ Hero with search bar & quick-filter chips
- ✅ 4 Service categories (Cleaning, Plumbing, Beauty, AC Repair)
- ✅ How it works (4-step flow)
- ✅ Stats bar (50k+ customers, 2k+ pros, 4.8★, 25+ cities)
- ✅ Top-rated professionals cards
- ✅ Customer reviews (6 reviews)
- ✅ CTA section with ₹200 offer + app store links
- ✅ Footer with all links

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
homeease/
├── app/
│   ├── globals.css       # Global styles + Tailwind
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page (assembles all sections)
├── components/
│   ├── Navbar.tsx        # Sticky nav with mobile menu
│   ├── Hero.tsx          # Hero + search + chips
│   ├── Services.tsx      # 4 service category cards
│   ├── HowItWorks.tsx    # 4-step process
│   ├── Stats.tsx         # Stats bar
│   ├── TopPros.tsx       # Professional cards
│   ├── Reviews.tsx       # Customer reviews
│   ├── CTA.tsx           # Call-to-action + offer
│   └── Footer.tsx        # Full footer
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Next Pages to Build

- `/book` — Booking flow (service → date/time → address → payment)
- `/pros/[id]` — Professional profile page
- `/dashboard` — User dashboard (bookings, history)
- `/admin` — Admin dashboard
- `/become-a-pro` — Pro onboarding flow

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Inter** font (Google Fonts)

## Color Palette

| Name | Hex |
|------|-----|
| Brand Green | `#1D9E75` |
| Brand Dark | `#0F6E56` |
| Brand Light | `#E1F5EE` |
