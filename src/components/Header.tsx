import React from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { formatCurrency } from "../utils/cartUtils";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  onBack: () => void;
  onHome: () => void;
  onCartClick: () => void;
  cartTotal: number;
  cartCount: number;
  showCart: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onBack,
  onCartClick,
  cartTotal,
  cartCount,
  showCart,
}) => {
  const { t } = useLanguage();

  return (
    <header className="h-[80px] bg-black border-b border-white/5 flex items-center justify-between px-10 shrink-0 relative z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="h-12 px-6 bg-[#111] border border-white/20 rounded-xl text-white active:scale-95 transition-all flex items-center gap-2 active:bg-primary/30"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
          <span className="font-bold uppercase tracking-widest text-sm">{t('back')}</span>
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <h1 className="text-[20px] font-black uppercase tracking-tight text-white whitespace-nowrap">
          CHOOCHOO <span className="text-primary underline decoration-primary underline-offset-4">TORTAS</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {showCart && (
          <button
            onClick={onCartClick}
            className="flex items-center gap-4 bg-primary px-6 h-12 rounded-xl shadow-lg active:scale-95 transition-all group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xl font-black text-black leading-none">{formatCurrency(cartTotal)}</span>
          </button>
        )}
      </div>
    </header>
  );
};
