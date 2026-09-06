import { useState, useRef, useEffect } from 'react';
import { DesktopNavbar } from './components/layout/DesktopNavbar';
import { EvaluatorToolbar } from './components/layout/EvaluatorToolbar';
import { AppHeader } from './components/layout/AppHeader';
import { HomeScreen } from './components/home/HomeScreen';
import { ShopHeroBanner } from './components/layout/ShopHeroBanner';
import { ShopTabs, type ShopTabType } from './components/layout/ShopTabs';
import { BottomNav, type NavTab } from './components/layout/BottomNav';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProductDetails } from './components/marketplace/ProductDetails';
import { TopBrandsTab } from './components/tabs/TopBrandsTab';
import { NearbyStoresTab } from './components/tabs/NearbyStoresTab';
import { EmptyState } from './components/common/EmptyState';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';
import { ReceiptIndianRupee, ChartNoAxesCombined, User } from 'lucide-react';

export function App() {
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('shop');
  const [activeShopTab, setActiveShopTab] = useState<ShopTabType>('marketplace');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [, setRefreshKey] = useState<number>(0);

  // Screen size detection for real mobile devices or F12 responsive mode
  const [isScreenMobile, setIsScreenMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsScreenMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effective mobile mode: True if toggled via bottom toolbar OR in F12 / mobile browser
  const isMobile = isMobileFrame || isScreenMobile;

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
      {/* Desktop Mode: Official 1Fi Floating Navbar (Only shown on desktop viewports) */}
      {!isMobile && (
        <DesktopNavbar
          activeNavTab={activeNavTab}
          onNavTabChange={(tab) => {
            setActiveNavTab(tab);
            setSelectedProductId(null);
          }}
          onOpenCalculator={handleCheckEligibility}
        />
      )}

      {/* Main Container / Viewport */}
      <div
        className={`w-full transition-all duration-300 min-h-[calc(100vh-42px)] flex flex-col relative ${
          isMobileFrame && !isScreenMobile
            ? 'max-w-[480px] my-0 sm:my-4 sm:rounded-[36px] bg-white shadow-2xl border border-gray-200/80 overflow-hidden ring-8 ring-black/5'
            : isScreenMobile
            ? 'max-w-[480px] w-full bg-white shadow-sm'
            : 'max-w-7xl px-4 sm:px-6 lg:px-8 py-6'
        }`}
      >
        {/* Mobile Header (Shown on mobile frame or F12 / real mobile screen) */}
        {isMobile && (
          <AppHeader
            title={selectedProductId ? 'Product Details' : activeNavTab === 'home' ? '1Fi' : 'Shop'}
            showBack={!!selectedProductId}
            onBack={() => setSelectedProductId(null)}
            onTriggerSimulateError={handleTriggerSimulateError}
          />
        )}

        {/* Dynamic Page Content */}
        <main className={`flex-1 flex flex-col ${isMobile ? 'px-4 py-4 pb-28 gap-4 overflow-x-hidden' : 'gap-8 pb-24'}`}>
          {/* 1. HOME SCREEN: Featuring the official 1Fi Hero Section & Highlights */}
          {activeNavTab === 'home' && (
            <HomeScreen
              onNavigateToShop={handleStartShopping}
              onSelectProduct={(id) => {
                setActiveNavTab('shop');
                setSelectedProductId(id);
              }}
              isMobileFrame={isMobile}
            />
          )}

          {/* 2. SHOP SCREEN: Product Details OR Main Shop Dashboard */}
          {activeNavTab === 'shop' && (
            <>
              {selectedProductId ? (
                <ProductDetails
                  productId={selectedProductId}
                  onBack={() => setSelectedProductId(null)}
                  isMobileFrame={isMobile}
                />
              ) : (
                <>
                  {/* Shop Banner */}
                  <ShopHeroBanner
                    isDesktop={!isMobile}
                    isShopBanner={true}
                    onStartShopping={handleStartShopping}
                    onCheckEligibility={handleCheckEligibility}
                  />

                  {/* 3 Shop Tabs: Top Brands | Nearby Stores | 1Fi Marketplace */}
                  <div ref={shopSectionRef} className={`scroll-mt-6 ${!isMobile ? 'max-w-xl mx-auto w-full' : ''}`}>
                    <ShopTabs
                      activeTab={activeShopTab}
                      onChange={setActiveShopTab}
                      isDesktop={!isMobile}
                    />
                  </div>

                  {/* Tab Contents */}
                  <div className="mt-2">
                    {activeShopTab === 'top-brands' && <TopBrandsTab />}
                    {activeShopTab === 'nearby-stores' && <NearbyStoresTab />}
                    {activeShopTab === 'marketplace' && (
                      <MarketplaceView
                        onSelectProduct={(id) => setSelectedProductId(id)}
                        isMobileFrame={isMobile}
                      />
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/* 3. EMI DUES TAB */}
          {activeNavTab === 'emi-dues' && (
            <div className="py-16 flex flex-col items-center">
              <EmptyState
                icon={<ReceiptIndianRupee className="h-8 w-8" />}
                title="No Pending Dues"
                description="All your 1Fi EMI repayments are on track. No upcoming installments for this month."
                actionText="Shop Now on EMI"
                onAction={() => setActiveNavTab('shop')}
              />
            </div>
          )}

          {/* 4. CREDIT LIMIT TAB */}
          {activeNavTab === 'limit' && (
            <div className="py-16 flex flex-col items-center">
              <EmptyState
                icon={<ChartNoAxesCombined className="h-8 w-8" />}
                title="Mutual Fund Credit Limit"
                description="Your eligible credit limit is ₹2,50,000 backed by your linked CAMS/KFintech mutual funds portfolio."
                actionText="Use Limit on Marketplace"
                onAction={() => setActiveNavTab('shop')}
              />
            </div>
          )}

          {/* 5. PROFILE TAB */}
          {activeNavTab === 'profile' && (
            <div className="py-16 flex flex-col items-center">
              <EmptyState
                icon={<User className="h-8 w-8" />}
                title="Account Profile"
                description="Manage your linked bank accounts, PAN verification, and depository pledge settings."
                actionText="Back to Shop"
                onAction={() => setActiveNavTab('shop')}
              />
            </div>
          )}
        </main>

        {/* Floating Bottom Navigation Bar (For Mobile Frame or F12 / Mobile Device) */}
        {isMobile && !selectedProductId && (
          <BottomNav
            activeTab={activeNavTab}
            onTabChange={(tab) => {
              setActiveNavTab(tab);
              setSelectedProductId(null);
            }}
          />
        )}
      </div>

      {/* Floating WhatsApp Customer Support Widget (Bottom-Right) */}
      <WhatsAppWidget />

      {/* Floating Evaluator Toolbar (Shown on desktop viewports) */}
      {!isScreenMobile && (
        <EvaluatorToolbar
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={setIsMobileFrame}
          onTriggerSimulateError={handleTriggerSimulateError}
        />
      )}
    </div>
  );
}

export default App;
