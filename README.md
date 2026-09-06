# 1Fi - Marketplace & LAMF EMI Shopping Feature

> **SDE Intern Assignment Submission for 1Fi (OneFinancial / Fiquity Technology Private Limited)**  
> Built by Nitin Singh.

An authentic, pixel-perfect replication of the **1Fi mobile web app** extending the existing **Shop** experience with a dedicated **1Fi Marketplace**, featuring dynamic product variant pricing, Loan-Against-Mutual-Funds (LAMF) EMI calculations, and an interactive loan approval checkout flow.

---

## 🚀 Live Demo & Quick Start

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Run Locally
```bash
# Clone the repository
git clone https://github.com/gitsofnitin/1fi-marketplace.git
cd 1fi-marketplace

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. Production Build
```bash
# Type-check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 Feature Overview & Architecture

### 1. Brand Alignment with 1Fi
- **Brand Colors:** Exact 1Fi signature purple (`#712CDC`), hover state (`#5b24b5`), accent gradient (`from-[#712CDC] to-[#a203d5]`), and pill container tints (`#f5f0ff`).
- **Typography:** `Inter` font weights with crisp numbers and tabular alignments for INR pricing.
- **Floating Island Navigation:** 5 navigation tabs matching 1Fi production (`Home`, `Shop` [Active], `EMI Dues`, `Limit`, `Profile`).
- **Hero Banner:** Exact reproduction of the 1Fi Shop hero banner: *"Shop today, Pay later using mutual funds."*

### 2. The 3 Shop Tabs
As specified in the assignment document:
1. **Top Brands:** Blank / Coming Soon state for partner websites (`Online brand stores coming soon`).
2. **Nearby Stores:** Blank / Empty state with location pill (`No nearby stores found`).
3. **1Fi Marketplace (Core Feature):** Complete interactive e-commerce and affordability financing flow.

### 3. Marketplace Shopping Experience
- **Category Filter:** Pill chips (`All`, `Phones`, `Laptops`, `Audio`, `Watches`) with instant filtering.
- **Real-time Search:** Search by model, brand, tagline, or keyword with quick clear button.
- **Product Details:**
  - High-resolution image gallery with clickable thumbnail switcher.
  - **Dynamic Variant Selection:** Switch between storage (128GB, 256GB, 512GB, 1TB) and colors (Natural Titanium, Desert, Obsidian, etc.) with real-time price recalculation.
- **Mutual-Fund Backed EMI Plans:**
  - **3 & 6 Months:** 0% Interest (No-Cost EMI)
  - **9, 12, 18, 24 Months:** Standard low-interest (8% p.a. LAMF rate)
  - Live calculation of monthly EMI, total interest, total payable, and **Mutual Fund Collateral to Pledge** (50% LTV).
- **Functional Proceed CTA:**
  - "Proceed with EMI" button triggers a bottom drawer loan review summary.
  - Choose Depository / RTA: **CAMS**, **KFintech**, or **MFCentral**.
  - "Confirm & Apply Loan" transitions to an animated celebratory order confirmation with a unique Order ID (`1FI-XXXXXX`).

### 4. Technical & Engineering Quality
- **Separation of Concerns:** Zero hardcoding in UI components. All products, variants, and EMI plans are fetched dynamically via an asynchronous service layer (`src/services/api.ts`).
- **Loading & Skeleton States:** 1Fi-styled pulsing card skeletons (`SkeletonLoader.tsx`).
- **Error Handling & Retry:** Integrated error state banner with a functional **"Retry Request"** button. Evaluators can click the **"Test Error"** pill button in the top header to simulate network errors and verify recovery.
- **Mobile-First Responsive Design:** Centered mobile container (`max-w-[480px]`) with a top toggle to switch between **Mobile Phone Frame** and **Full Responsive View**.

---

## 📂 Project Structure

```
1Fi/
├── src/
│   ├── types/
│   │   ├── product.ts            # Product, Variant, and Category type definitions
│   │   └── emi.ts                # EMIPlan, Tenure, and LoanApplicationSummary types
│   ├── data/
│   │   └── mockProducts.ts       # Curated catalog (iPhones, Galaxy S24, Pixels, MacBooks)
│   ├── services/
│   │   └── api.ts                # Async API service layer with error simulation toggle
│   ├── hooks/
│   │   ├── useProducts.ts        # Custom hook for search, category filter & catalog state
│   │   └── useProductDetails.ts  # Custom hook for active variant & dynamic EMI updates
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx     # 1Fi branding, back button, error test toggle
│   │   │   ├── ShopHeroBanner.tsx# 1Fi LAMF promotional banner
│   │   │   ├── ShopTabs.tsx      # 3 Shop tabs (Top Brands, Nearby Stores, 1Fi Marketplace)
│   │   │   └── BottomNav.tsx     # 1Fi floating bottom navigation bar
│   │   ├── common/
│   │   │   ├── SearchBar.tsx     # Search bar with clear button
│   │   │   ├── SkeletonLoader.tsx# 1Fi pulse loading skeletons
│   │   │   ├── EmptyState.tsx    # 1Fi empty state with icon and subtitle
│   │   │   └── ErrorCard.tsx     # Error banner with working retry button
│   │   ├── marketplace/
│   │   │   ├── CategoryFilter.tsx# Horizontal category pills
│   │   │   ├── ProductCard.tsx   # Card with pricing & starting EMI pill
│   │   │   ├── ProductDetails.tsx# Full product detail view
│   │   │   ├── VariantSelector.tsx# Storage & color selectors with price diffs
│   │   │   ├── EMIPlanCard.tsx   # Tenure option card with 0% interest tags
│   │   │   ├── EMIPlanSelector.tsx# EMI selection and collateral breakdown
│   │   │   └── OrderSummarySheet.tsx# Proceed checkout sheet & loan confirmation
│   │   └── tabs/
│   │       ├── TopBrandsTab.tsx  # Blank / Coming soon state for Top Brands
│   │       └── NearbyStoresTab.tsx# Blank / Empty state for Nearby Stores
│   ├── App.tsx                   # Master screen flow and device frame wrapper
│   ├── index.css                 # 1Fi design tokens & typography
│   └── main.tsx                  # Application entry point
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🧪 Evaluation Rubric Checklist

| Criteria | Implementation Highlights | Status |
| :--- | :--- | :---: |
| **1. Product Understanding** | Replicated 1Fi's unique Loan-Against-Mutual-Funds value proposition with 0% EMI and collateral calculation. | ✅ Completed |
| **2. UI/UX Consistency** | Exact `#712CDC` brand purple, pill tab container, card borders, floating island bottom nav, and hero banner. | ✅ Completed |
| **3. Engineering Quality** | Modular React 19 + TypeScript, custom hooks, zero type errors (`npm run build` exits with code 0). | ✅ Completed |
| **4. Functionality** | End-to-end shopping flow: browse $\rightarrow$ filter $\rightarrow$ details $\rightarrow$ variant $\rightarrow$ EMI plan $\rightarrow$ proceed $\rightarrow$ order placed. | ✅ Completed |
| **5. Data / API Handling** | Dedicated async mock API layer (`api.ts`) with promises, simulated network latency, and zero hardcoded JSX data. | ✅ Completed |
| **6. Attention to Detail** | Skeleton loaders, error state with retry, empty state for searches, device frame toggle for evaluators. | ✅ Completed |
