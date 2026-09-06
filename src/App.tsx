import { useState } from 'react';
import { ShopHeroBanner } from './components/layout/ShopHeroBanner';
import { ShopTabs, type ShopTabType } from './components/layout/ShopTabs';
import { BottomNav, type NavTab } from './components/layout/BottomNav';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProductDetails } from './components/marketplace/ProductDetails';
import { TopBrandsTab } from './components/tabs/TopBrandsTab';
import { NearbyStoresTab } from './components/tabs/NearbyStoresTab';
import { EmptyState } from './components/common/EmptyState';
import { api } from './services/api';
import {
  Smartphone,
  Monitor,
  ReceiptIndianRupee,
  ChartNoAxesCombined,
  User,
  Home,
  Store,
  Sparkles,
  Bug,
  ArrowLeft,
} from 'lucide-react';

export function App() {
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('shop');
  const [activeShopTab, setActiveShopTab] = useState<ShopTabType>('marketplace');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false); // Default to True Full Screen!
  const [isErrorMode, setIsErrorMode] = useState<boolean>(api.getSimulateError());
  const [, setRefreshKey] = useState<number>(0);

  const handleToggleError = () => {
    const next = !isErrorMode;
    api.setSimulateError(next);
    setIsErrorMode(next);
    setRefreshKey((prev) => prev + 1);
  };

  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'shop' as NavTab, label: 'Shop', icon: Store },
    { id: 'emi-dues' as NavTab, label: 'EMI Dues', icon: ReceiptIndianRupee },
    { id: 'limit' as NavTab, label: 'Credit Limit', icon: ChartNoAxesCombined },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen w-full bg-white flex flex-col text-gray-900 selection:bg-purple-100 selection:text-[#712CDC]">
      {/* ================= UNIFIED FULL-WIDTH TOP NAVBAR ================= */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            {selectedProductId ? (
              <button
                type="button"
                onClick={() => setSelectedProductId(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label="Back to shop"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            ) : null}

            <div
              onClick={() => {
                setActiveNavTab('shop');
                setSelectedProductId(null);
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#712CDC] to-[#a203d5] text-white shadow-sm font-black text-sm tracking-tight">
                1Fi
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-gray-900 leading-tight">
                  1Fi Marketplace
                </span>
                <span className="text-[10.5px] text-gray-400 font-medium hidden sm:inline">
                  Mutual Fund Backed EMIs
                </span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation Bar (Only on Full Screen Desktop) */}
          {!isMobileFrame && (
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50/80 p-1">
              {navItems.map((item) => {
                const isActive = activeNavTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveNavTab(item.id);
                      setSelectedProductId(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-white text-[#712CDC] shadow-xs ring-1 ring-black/5'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right: Actions, Error Simulation & View Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Evaluator Helper: Simulate Network Error */}
            <button
              type="button"
              onClick={handleToggleError}
              title={
                isErrorMode
                  ? 'Disable simulated network error'
                  : 'Test simulated network error & retry flow'
              }
              className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full border transition-all ${
                isErrorMode
                  ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Bug className="h-3 w-3" />
              <span>{isErrorMode ? 'Error: ON' : 'Test Error'}</span>
            </button>

            {/* Credit Badge */}
            <div className="hidden sm:flex items-center gap-1 rounded-full bg-[#f5f0ff] border border-[#ece5ff] px-3 py-1 text-[11.5px] font-bold text-[#712CDC]">
              <Sparkles className="h-3.5 w-3.5 fill-[#712CDC]" />
              <span>₹2.5L Limit</span>
            </div>

            {/* View Mode Switcher (Full Screen vs Phone Frame) */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setIsMobileFrame(false)}
                title="View full screen edge-to-edge desktop experience"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-semibold transition-all ${
                  !isMobileFrame
                    ? 'bg-[#712CDC] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Full Screen</span>
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFrame(true)}
                title="View in mobile phone container"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-semibold transition-all ${
                  isMobileFrame
                    ? 'bg-[#712CDC] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mobile Frame</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div
        className={`w-full flex-1 flex flex-col ${
          isMobileFrame
            ? 'bg-neutral-100 items-center justify-start py-6'
            : 'bg-white'
        }`}
      >
        <div
          className={`w-full transition-all duration-300 flex flex-col relative ${
            isMobileFrame
              ? 'max-w-[460px] rounded-[36px] shadow-2xl border border-gray-200 bg-white overflow-hidden ring-8 ring-black/5 min-h-[840px] px-4 py-4'
              : 'max-w-7xl mx-auto px-4 sm:px-8 py-6'
          }`}
        >
          <main className="flex-1 flex flex-col gap-6">
            {activeNavTab === 'shop' ? (
              /* SHOP FLOW */
              <>
                {selectedProductId ? (
                  <ProductDetails
                    productId={selectedProductId}
                    onBack={() => setSelectedProductId(null)}
                  />
                ) : (
                  /* MAIN SHOP DASHBOARD WITH 3 TABS */
                  <>
                    {/* Hero Banner */}
                    <ShopHeroBanner />

                    {/* 3 Shop Tabs: Top Brands | Nearby Stores | 1Fi Marketplace */}
                    <div className={`mt-1 ${!isMobileFrame ? 'max-w-lg mx-auto w-full' : ''}`}>
                      <ShopTabs
                        activeTab={activeShopTab}
                        onChange={setActiveShopTab}
                      />
                    </div>

                    {/* Tab Contents */}
                    <div className="mt-2">
                      {activeShopTab === 'top-brands' && <TopBrandsTab />}
                      {activeShopTab === 'nearby-stores' && <NearbyStoresTab />}
                      {activeShopTab === 'marketplace' && (
                        <MarketplaceView
                          onSelectProduct={(id) => setSelectedProductId(id)}
                        />
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              /* OTHER 1FI BOTTOM NAV TABS (PLACEHOLDERS) */
              <div className="py-20 flex flex-col items-center">
                {activeNavTab === 'home' && (
                  <EmptyState
                    icon={<Home className="h-8 w-8" />}
                    title="1Fi Home Dashboard"
                    description="Your mutual fund portfolio, available credit limit, and investment growth tracker."
                    actionText="Go to Shop"
                    onAction={() => setActiveNavTab('shop')}
                  />
                )}
                {activeNavTab === 'emi-dues' && (
                  <EmptyState
                    icon={<ReceiptIndianRupee className="h-8 w-8" />}
                    title="No Pending Dues"
                    description="All your 1Fi EMI repayments are on track. No upcoming installments for this month."
                    actionText="Shop Now on EMI"
                    onAction={() => setActiveNavTab('shop')}
                  />
                )}
                {activeNavTab === 'limit' && (
                  <EmptyState
                    icon={<ChartNoAxesCombined className="h-8 w-8" />}
                    title="Mutual Fund Credit Limit"
                    description="Your eligible credit limit is ₹2,50,000 backed by your linked CAMS/KFintech mutual funds portfolio."
                    actionText="Use Limit on Marketplace"
                    onAction={() => setActiveNavTab('shop')}
                  />
                )}
                {activeNavTab === 'profile' && (
                  <EmptyState
                    icon={<User className="h-8 w-8" />}
                    title="Account Profile"
                    description="Manage your linked bank accounts, PAN verification, and depository pledge settings."
                    actionText="Back to Shop"
                    onAction={() => setActiveNavTab('shop')}
                  />
                )}
              </div>
            )}
          </main>

          {/* Floating Bottom Nav for Mobile Screen or Mobile Frame */}
          {(isMobileFrame || window.innerWidth < 768) && !selectedProductId && (
            <div className="md:hidden">
              <BottomNav
                activeTab={activeNavTab}
                onTabChange={(tab) => {
                  setActiveNavTab(tab);
                  setSelectedProductId(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
