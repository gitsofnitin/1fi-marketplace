# 1Fi - Marketplace & LAMF EMI Shopping Feature

> **Frontend SDE Assignment Submission — 1Fi (OneFinancial / Fiquity Technology Private Limited)**

A production-grade, pixel-perfect replication of the **1Fi mobile web app & desktop web experience**, implementing the **1Fi Marketplace** inside the **Shop** section with Loan-Against-Mutual-Funds (LAMF) EMI calculations, dynamic variant pricing, and an interactive loan approval checkout flow.

---

## 🚀 Live Demo & Quick Start

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Run Locally
```bash
# 1. Clone the repository
git clone https://github.com/gitsofnitin/1fi-marketplace.git
cd 1fi-marketplace

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. Production Build & Verification
```bash
# Type-check and build production bundle
npm run build

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

---

## 📱 Feature Overview & Architecture

### 1. Brand Alignment with 1Fi (`1fi.in` & Mobile App)
- **Signature 1Fi Design Tokens:** Official purple brand color (`#712CDC`), hover state (`#5b24b5`), accent gradient (`from-[#712CDC] to-[#a203d5]`), and pill container backgrounds (`#f5f0ff`).
- **Official Desktop Navbar:** Replicates 1Fi's official floating pill navbar with the `[1Fi]` purple badge logo, complete navigation links (*Home*, *About Us*, *How it Works*, *Shop*, *Calculator*, *Contact Us*, *Partner With Us*, *FAQs*), and the signature `Shop Now ↗` CTA.
- **Official Home Screen:** Authentic hero section (*"Shop today, Pay later using mutual funds"*), live portfolio credit limit eligibility calculator, and 1Fi value proposition pillars.
- **Floating Island Navigation:** 5 mobile navigation tabs matching 1Fi production (*Home*, *Shop* [Active], *EMI Dues*, *Limit*, *Profile*).
- **Floating WhatsApp Support Widget:** Floats cleanly above the bottom navigation bar without obstructing tabs.

### 2. The 3 Shop Tabs (Core Assignment Requirement)
As specified in the assignment document:
1. **Top Brands:** Blank / Coming Soon state for partner stores (*"Online stores are coming soon"*).
2. **Nearby Stores:** Blank / Empty state with location pill selector (*"No nearby stores found"*).
3. **1Fi Marketplace (Core Feature):** Complete interactive e-commerce catalog and affordability financing flow.

### 3. Marketplace & Product Details Experience
- **Real-time Search:** Instant search by model, brand, tagline, or keyword with a quick clear button.
- **Category Filter:** Horizontal pill chips (*All*, *Phones*, *Laptops*, *Audio*, *Watches*) with dynamic item counts.
- **Dual-Responsive Layout:**
  - **Desktop:** Expansive 2-column studio layout (`lg:grid-cols-12`) featuring a 500px high-res product showcase stage, interactive thumbnail selector, 1Fi trust pillars, and clear typography.
  - **Mobile / F12 / Mobile Frame:** Single-column layout with centered product stage and streamlined controls.
- **Dynamic Variant Selection:** Switch between storage (*128GB*, *256GB*, *512GB*, *1TB*) and colors with instant price recalculation.

### 4. Loan-Against-Mutual-Funds (LAMF) EMI Calculator
- **Flexible Tenures:**
  - **3 & 6 Months:** 0% Interest (No-Cost EMI)
  - **9, 12, 18, 24 Months:** Standard low-interest (8% p.a. LAMF rate)
- **Live Cost Breakdown:** Computes monthly installment, total interest, processing fee (₹0), and total repayable amount.
- **Mutual Fund Collateral:** Dynamically calculates the exact value of mutual fund units required to pledge against a 50% LTV ratio.

### 5. Functional Proceed CTA & Loan Approval
- **Sticky CTA Bar:** Screen-bottom action bar with the selected EMI tenure and `Proceed with EMI` button.
- **Slide-up Review Sheet:** Displays product specifications, chosen variant, tenure breakdown, and depository selection (**CAMS**, **KFintech**, **MFCentral**).
- **Instant Loan Confirmation:** Submitting triggers a celebratory animated order confirmation screen with a unique Order ID (`1FI-XXXXXX`).

### 6. Technical & Engineering Quality
- **Separation of Concerns:** Zero hardcoded data in UI JSX. All products, variants, and EMI plans are fetched dynamically via an asynchronous mock service layer (`src/services/api.ts`).
- **Loading & Skeleton States:** 1Fi-styled pulsing card skeletons (`SkeletonLoader.tsx`).
- **Error Handling & Retry:** Integrated error state banner with a functional **"Retry Request"** button.
- **Evaluator Dev Tools:**
  - **Device Switcher:** Floating bottom-left toolbar allows evaluators to toggle between **Desktop Full View** and a **480px Mobile Phone Frame**.
  - **Automatic F12 Detection:** Responsive resize hook automatically synchronizes mobile headers and bottom navigation in browser DevTools.
  - **Test Error Flow:** One-click toggle in the header and evaluator toolbar to simulate network errors and verify failure/retry recovery.

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
│   │   │   ├── DesktopNavbar.tsx # 1Fi official floating pill navbar
│   │   │   ├── AppHeader.tsx     # Mobile header with back navigation & error toggle
│   │   │   ├── ShopHeroBanner.tsx# 1Fi LAMF promotional hero banner
│   │   │   ├── ShopTabs.tsx      # 3 Shop tabs (Top Brands, Nearby Stores, 1Fi Marketplace)
│   │   │   ├── BottomNav.tsx     # 1Fi floating bottom navigation bar
│   │   │   └── EvaluatorToolbar.tsx# Floating toolbar for device preview & error testing
│   │   ├── home/
│   │   │   └── HomeScreen.tsx    # 1Fi signature home screen with eligibility calculator
│   │   ├── common/
│   │   │   ├── SearchBar.tsx     # Search bar with clear button
│   │   │   ├── SkeletonLoader.tsx# 1Fi pulse loading skeletons
│   │   │   ├── EmptyState.tsx    # 1Fi empty state with icon and action button
│   │   │   ├── ErrorCard.tsx     # Error banner with working retry button
│   │   │   └── WhatsAppWidget.tsx# Floating customer support widget
│   │   ├── marketplace/
│   │   │   ├── CategoryFilter.tsx# Horizontal category pills
│   │   │   ├── ProductCard.tsx   # Card with pricing & starting EMI pill
│   │   │   ├── ProductDetails.tsx# Dual-responsive product detail view
│   │   │   ├── VariantSelector.tsx# Storage & color selectors with price diffs
│   │   │   ├── EMIPlanCard.tsx   # Tenure option card with 0% interest tags
│   │   │   ├── EMIPlanSelector.tsx# EMI selection and collateral breakdown
│   │   │   └── OrderSummarySheet.tsx# Proceed checkout sheet & loan confirmation
│   │   └── tabs/
│   │       ├── TopBrandsTab.tsx  # Blank / Coming soon state for Top Brands
│   │       └── NearbyStoresTab.tsx# Blank / Empty state for Nearby Stores
│   ├── App.tsx                   # Master screen flow, responsive viewport sync & frame wrapper
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
| **3. Engineering Quality** | Modular React 19 + TypeScript, custom hooks, zero type errors (`tsc -b && vite build` exits with code 0). | ✅ Completed |
| **4. Functionality** | End-to-end shopping flow: browse $\rightarrow$ filter $\rightarrow$ details $\rightarrow$ variant $\rightarrow$ EMI plan $\rightarrow$ proceed $\rightarrow$ order placed. | ✅ Completed |
| **5. Data / API Handling** | Dedicated async mock API layer (`api.ts`) with promises, simulated network latency, and zero hardcoded JSX data. | ✅ Completed |
| **6. Attention to Detail** | Skeleton loaders, error state with retry, empty state for searches, device frame toggle for evaluators. | ✅ Completed |
