import React, { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem, CATEGORIES, MENU_ITEMS } from "../data/menu";
import { formatCurrency } from "../utils/cartUtils";
import { ChevronRight } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

interface MenuProps {
  selectedCategoryId: string;
  onSelectItem: (item: MenuItem) => void;
  onSelectCategory: (id: string) => void;
}

/**
 * Backend Data Fetcher (Mock Implementation for now)
 * This is where you would connect to a real API like:
 * fetch(`${process.env.API_URL}/menu`).then(...)
 */
const fetchMenuData = async () => {
    // Simulated backend call logic with proper structure
    try {
        // const response = await fetch('/api/menu');
        // const data = await response.json();
        // return data;
        return { categories: CATEGORIES, items: MENU_ITEMS };
    } catch (error) {
        console.error("Backend connection failed:", error);
        return null;
    }
}

export const Menu: React.FC<MenuProps> = ({
  selectedCategoryId,
  onSelectItem,
  onSelectCategory,
}) => {
  // Items are filtered based on selection
  const items = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.category === selectedCategoryId);
  }, [selectedCategoryId]);

  const activeCategory = useMemo(() => 
    CATEGORIES.find((c) => c.id === selectedCategoryId), 
  [selectedCategoryId]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemAnim = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const { t } = useLanguage();

  return (
    <div className="flex-1 flex overflow-hidden bg-black h-full w-full">
      {/* LEFT SIDE: Category Sidebar - 25% Width */}
      <aside className="w-[25%] bg-[#050505] flex flex-col border-r border-white/5 relative z-20 shadow-2xl">
        <div className="p-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-2 opacity-60">{t('catalog')}</h2>
          <p className="text-2xl font-black uppercase text-white tracking-widest leading-none">{t('menu')}</p>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 space-y-4 custom-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full group relative rounded-3xl flex flex-col items-center p-2 transition-all duration-500 overflow-hidden border-2 ${
                  isActive 
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(30,176,30,0.2)]" 
                    : "border-white/10 bg-[#111] active:border-white/30"
                }`}
              >
                {/* Category Visual */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-black/50 border border-white/5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'opacity-90 active:opacity-100'}`}
                  />
                </div>
                <span className={`text-[13px] font-black uppercase tracking-widest text-center px-2 pb-2 ${isActive ? 'text-primary' : 'text-white/40'}`}>
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT SIDE: Items Canvas - 75% Width */}
      <main className="w-[75%] flex flex-col h-full bg-[#050505] relative overflow-hidden">
        <div className="px-10 py-10 flex items-end justify-between z-10 border-b border-white/5">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tight text-white leading-none">
              {activeCategory?.name}
            </h1>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em]">
               {items.length} {t('options_available')}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pt-10 pb-32 custom-scrollbar z-10">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            key={selectedCategoryId}
            className="grid grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemAnim}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#111] border-2 border-white/10 rounded-3xl flex flex-col p-2 cursor-pointer group active:border-primary transition-all duration-300 shadow-xl h-full"
                  onClick={() => onSelectItem(item)}
                >
                  {/* Item Visual - Max Size with Minimal Padding */}
                  <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl mb-4 relative bg-black/50 border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover active:scale-105 transition-transform duration-[1.2s] ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Pricing & Identity - Centered & Clean */}
                  <div className="flex flex-col items-center text-center px-2 pb-4 mt-auto">
                    <h3 className="text-lg font-black text-white uppercase tracking-wider leading-tight mb-2 active:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="space-y-0.5">
                      <span className="text-2xl font-black text-primary">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
