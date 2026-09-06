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
      <div className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-500 shadow-xs z-50">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[#712CDC]">1Fi SDE Assignment</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="hidden sm:inline font-medium text-gray-600">
            Marketplace Feature & LAMF EMIs
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 font-medium">Device View:</span>
          <button
            type="button"
            onClick={() => setIsMobileFrame(true)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              isMobileFrame
                ? 'bg-[#712CDC] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Smartphone className="h-3 w-3" />
            <span>Mobile (1Fi App)</span>
          </button>
          <button
            type="button"
            onClick={() => setIsMobileFrame(false)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              !isMobileFrame
                ? 'bg-[#712CDC] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Monitor className="h-3 w-3" />
            <span>Responsive Full</span>
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Device Simulator Frame */}
      <div
        className={`w-full transition-all duration-300 min-h-[calc(100vh-42px)] bg-white flex flex-col relative ${
          isMobileFrame
            ? 'max-w-[480px] my-0 sm:my-4 sm:rounded-[36px] shadow-2xl border border-gray-200/80 overflow-hidden ring-8 ring-black/5'
            : 'max-w-4xl shadow-sm border-x border-gray-200'
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
        <main className="flex-1 flex flex-col px-4 py-4 pb-28 gap-4 overflow-x-hidden">
          {activeNavTab === 'shop' ? (
            /* SHOP FLOW */
            <>
              {/* If on product details view, render product details */}
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
                  <div className="mt-1">
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
            <div className="py-12 flex flex-col items-center">
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

        {/* Floating Bottom Navigation Bar (Hidden when reviewing order details to maximize viewport) */}
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
