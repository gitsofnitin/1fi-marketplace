import { useState, useRef } from 'react';
import { DesktopNavbar } from './components/layout/DesktopNavbar';
import { AppHeader } from './components/layout/AppHeader';
import { ShopHeroBanner } from './components/layout/ShopHeroBanner';
import { ShopTabs, type ShopTabType } from './components/layout/ShopTabs';
import { BottomNav, type NavTab } from './components/layout/BottomNav';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProductDetails } from './components/marketplace/ProductDetails';
import { TopBrandsTab } from './components/tabs/TopBrandsTab';
import { NearbyStoresTab } from './components/tabs/NearbyStoresTab';
import { EmptyState } from './components/common/EmptyState';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';
import { ReceiptIndianRupee, ChartNoAxesCombined, User, Home, Smartphone, Monitor } from 'lucide-react';

export function App() {
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('shop');
  const [activeShopTab, setActiveShopTab] = useState<ShopTabType>('marketplace');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [, setRefreshKey] = useState<number>(0);

  const shopSectionRef = useRef<HTMLDivElement>(null);

  // Trigger re-render when reviewer toggles simulated error mode
  const handleTriggerSimulateError = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleStartShopping = () => {
    setActiveNavTab('shop');
    setActiveShopTab('marketplace');
    if (shopSectionRef.current) {
      shopSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckEligibility = () => {
    setActiveNavTab('limit');
  };

  return (
    <div className="min-h-screen bg-[#faf9ff] flex flex-col items-center justify-start text-gray-900 selection:bg-purple-100 selection:text-[#712CDC]">
      {/* Desktop Mode: Official 1Fi Floating Navbar */}
      {!isMobileFrame && (
        <DesktopNavbar
          activeNavTab={activeNavTab}
          onNavTabChange={(tab) => {
            setActiveNavTab(tab);
            setSelectedProductId(null);
          }}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={setIsMobileFrame}
          onTriggerSimulateError={handleTriggerSimulateError}
          onOpenCalculator={handleCheckEligibility}
        />
      )}

      {/* Mobile Frame Mode: Evaluator Switcher Strip */}
      {isMobileFrame && (
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
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#712CDC] text-white shadow-xs transition-all"
            >
              <Smartphone className="h-3 w-3" />
              <span>Mobile (1Fi App)</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileFrame(false)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
            >
              <Monitor className="h-3 w-3" />
              <span>Responsive Full</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Container / Viewport */}
      <div
        className={`w-full transition-all duration-300 min-h-[calc(100vh-42px)] flex flex-col relative ${
          isMobileFrame
            ? 'max-w-[480px] my-0 sm:my-4 sm:rounded-[36px] bg-white shadow-2xl border border-gray-200/80 overflow-hidden ring-8 ring-black/5'
            : 'max-w-7xl px-4 sm:px-6 lg:px-8 py-4'
        }`}
      >
        {/* Mobile Header (Shown only in Mobile Frame mode or when inspecting details) */}
        {isMobileFrame && (
          <AppHeader
            title={selectedProductId ? 'Product Details' : 'Shop'}
            showBack={!!selectedProductId}
            onBack={() => setSelectedProductId(null)}
            onTriggerSimulateError={handleTriggerSimulateError}
          />
        )}

        {/* Dynamic Page Content */}
        <main className={`flex-1 flex flex-col ${isMobileFrame ? 'px-4 py-4 pb-28 gap-4 overflow-x-hidden' : 'gap-6 pb-20'}`}>
          {activeNavTab === 'shop' ? (
            /* SHOP FLOW */
            <>
              {/* Product Details View */}
              {selectedProductId ? (
                <ProductDetails
                  productId={selectedProductId}
                  onBack={() => setSelectedProductId(null)}
                />
              ) : (
                /* MAIN SHOP DASHBOARD WITH 3 TABS */
                <>
                  {/* Hero Banner: Desktop Expansive vs Mobile Compact */}
                  <ShopHeroBanner
                    isDesktop={!isMobileFrame}
                    onStartShopping={handleStartShopping}
                    onCheckEligibility={handleCheckEligibility}
                  />

                  {/* 3 Shop Tabs: Top Brands | Nearby Stores | 1Fi Marketplace */}
                  <div ref={shopSectionRef} className={`scroll-mt-6 ${!isMobileFrame ? 'max-w-xl mx-auto w-full' : ''}`}>
                    <ShopTabs
                      activeTab={activeShopTab}
                      onChange={setActiveShopTab}
                      isDesktop={!isMobileFrame}
                    />
                  </div>

                  {/* Tab Contents */}
                  <div className="mt-2">
                    {activeShopTab === 'top-brands' && <TopBrandsTab />}
                    {activeShopTab === 'nearby-stores' && <NearbyStoresTab />}
                    {activeShopTab === 'marketplace' && (
                      <MarketplaceView
                        onSelectProduct={(id) => setSelectedProductId(id)}
                        isMobileFrame={isMobileFrame}
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
                  icon={<Home className="h-8 w-8" />}
                  title="1Fi Home Dashboard"
                  description="Your mutual fund portfolio, available credit limit, and investment growth tracker."
                  actionText="Explore 1Fi Marketplace"
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

        {/* Floating Bottom Navigation Bar (For Mobile Frame or Mobile Screens) */}
        {isMobileFrame && !selectedProductId && (
          <BottomNav
            activeTab={activeNavTab}
            onTabChange={(tab) => {
              setActiveNavTab(tab);
              setSelectedProductId(null);
            }}
          />
        )}
      </div>

      {/* Floating WhatsApp Customer Support Widget */}
      <WhatsAppWidget />
    </div>
  );
}

export default App;
