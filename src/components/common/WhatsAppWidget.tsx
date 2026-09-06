import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, ShieldCheck } from 'lucide-react';

interface WhatsAppWidgetProps {
  isMobile?: boolean;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed z-50 flex flex-col items-end transition-all duration-200 ${
        isMobile
          ? 'bottom-24 right-4'
          : 'bottom-24 right-4 md:bottom-8 md:right-8'
      }`}
    >
      {/* Popover Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-white p-4 shadow-2xl border border-gray-150 animate-slide-up">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xs">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-900">1Fi Customer Support</h5>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • Replies instantly
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 rounded-lg p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 rounded-xl bg-purple-50/60 p-3 border border-purple-150/60 text-xs text-gray-700 leading-relaxed">
            <p className="font-semibold text-[#712CDC]">Hi there! 👋</p>
            <p className="mt-1 text-gray-600">
              Need help checking your eligible mutual fund credit limit or understanding 0% EMI plans?
            </p>
            <div className="mt-2 flex items-center gap-1 text-[10.5px] font-semibold text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>SEBI & RBI Regulated Partners</span>
            </div>
          </div>

          <a
            href="https://wa.me/919999911111?text=Hi%201Fi%2C%20I%20have%20a%20question%20about%20Marketplace%20EMIs"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#20bd5a] transition-all"
          >
            <span>Start WhatsApp Chat</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with 1Fi Support on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 fill-white text-white" />
      </button>
    </div>
  );
};
