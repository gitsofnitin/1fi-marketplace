import { useState } from 'react';
import { AppHeader } from './components/layout/AppHeader';
import { ShopHeroBanner } from './components/layout/ShopHeroBanner';
import { ShopTabs, type ShopTabType } from './components/layout/ShopTabs';
import { BottomNav, type NavTab } from './components/layout/BottomNav';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProductDetails } from './components/marketplace/ProductDetails';
import { TopBrandsTab } from './components/tabs/TopBrandsTab';
import { NearbyStoresTab } from './components/tabs/NearbyStoresTab';
import { EmptyState } from './components/common/EmptyState';
import { Smartphone, Monitor, ReceiptIndianRupee, ChartNoAxesCombined, User, Home } from 'lucide-react';

export function App() {
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('shop');
  const [activeShopTab, setActiveShopTab] = useState<ShopTabType>('marketplace');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [, setRefreshKey] = useState<number>(0);

  // Trigger re-render when reviewer toggles simulated error mode
  const handleTriggerSimulateError = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-start text-gray-900 selection:bg-purple-100 selection:text-[#712CDC]">
      {/* Top Device / Viewport Switcher for Evaluators */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs text-gray-500 shadow-xs z-50 sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#712CDC] text-white font-black text-xs">
            1Fi
          </div>
          <span className="font-extrabold text-[#712CDC] text-sm tracking-tight">1Fi Marketplace</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="hidden sm:inline font-medium text-gray-600">
            SDE Assignment Submission by Nitin Kumar
          </span>
        </div>

        {/* Viewport Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">View Mode:</span>
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => setIsMobileFrame(true)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11.5px] font-semibold transition-all cursor-pointer ${
                isMobileFrame
                  ? 'bg-[#712CDC] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile Frame</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileFrame(false)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11.5px] font-semibold transition-all cursor-pointer ${
                !isMobileFrame
                  ? 'bg-[#712CDC] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Desktop Full</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container / Mobile Device Simulator Frame */}
      <div
        className={`w-full transition-all duration-300 min-h-[calc(100vh-50px)] bg-white flex flex-col relative ${
          isMobileFrame
            ? 'max-w-[480px] my-0 sm:my-5 sm:rounded-[36px] shadow-2xl border border-gray-200/90 overflow-hidden ring-8 ring-black/5'
            : 'max-w-6xl my-0 sm:my-6 sm:rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden'
        }`}
      >
        {/* App Header */}
        <AppHeader
          title={selectedProductId ? 'Product Details' : 'Shop'}
          showBack={!!selectedProductId}
          onBack={() => setSelectedProductId(null)}
          onTriggerSimulateError={handleTriggerSimulateError}
        />

        {/* Dynamic Page Content */}
        <main
          className={`flex-1 flex flex-col pb-28 gap-5 overflow-x-hidden ${
            isMobileFrame ? 'px-4 py-4' : 'px-4 sm:px-8 py-6'
          }`}
        >
          {activeNavTab === 'shop' ? (
            /* SHOP FLOW */
            <>
              {/* If on product details view, render responsive product details */}
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
                  <div className={`mt-1 ${!isMobileFrame ? 'max-w-md mx-auto w-full' : ''}`}>
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
            <div className="py-16 flex flex-col items-center">
              {activeNavTab === 'home' && (
                <EmptyState
                  icon={<Home className="h-7 w-7" />}
                  title="1Fi Home Dashboard"
                  description="Your mutual fund portfolio, available credit limit, and investment growth tracker."
                  actionText="Go to Shop"
                  onAction={() => setActiveNavTab('shop')}
                />
              )}
              {activeNavTab === 'emi-dues' && (
                <EmptyState
                  icon={<ReceiptIndianRupee className="h-7 w-7" />}
                  title="No Pending Dues"
                  description="All your 1Fi EMI repayments are on track. No upcoming installments for this month."
                  actionText="Shop Now on EMI"
                  onAction={() => setActiveNavTab('shop')}
                />
              )}
              {activeNavTab === 'limit' && (
                <EmptyState
                  icon={<ChartNoAxesCombined className="h-7 w-7" />}
                  title="Mutual Fund Credit Limit"
                  description="Your eligible credit limit is ₹2,50,000 backed by your linked CAMS/KFintech mutual funds portfolio."
                  actionText="Use Limit on Marketplace"
                  onAction={() => setActiveNavTab('shop')}
                />
              )}
              {activeNavTab === 'profile' && (
                <EmptyState
                  icon={<User className="h-7 w-7" />}
                  title="Account Profile"
                  description="Manage your linked bank accounts, PAN verification, and depository pledge settings."
                  actionText="Back to Shop"
                  onAction={() => setActiveNavTab('shop')}
                />
              )}
            </div>
          )}
        </main>

        {/* Floating Bottom Navigation Bar (Hidden on Product details to maximize view) */}
        {!selectedProductId && (
          <BottomNav
            activeTab={activeNavTab}
            onTabChange={(tab) => {
              setActiveNavTab(tab);
              setSelectedProductId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
