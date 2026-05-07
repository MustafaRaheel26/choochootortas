import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem, CATEGORIES, MENU_ITEMS } from "../data/menu";
import { formatCurrency } from "../utils/cartUtils";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { fetchMenu, fetchCategories, MenuItem as ApiMenuItem, Category as ApiCategory } from "../services/api";

interface MenuProps {
  selectedCategoryId: string;
  onSelectItem: (item: MenuItem) => void;
  onSelectCategory: (id: string) => void;
}

/**
 * Backend Data Fetcher - Now connected to real backend API
 */
const useBackendData = () => {
  const [categories, setCategories] = useState(CATEGORIES);
  const [menuItems, setMenuItems] useState(MENU_ITEMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch both categories and menu items from backend
        const [apiCategories, apiMenuItems] = await Promise.all([
          fetchCategories(),
          fetchMenu()
        ]);

        // Build a map: categoryId -> first menu item image
        const categoryImageMap = new Map();
        for (const item of apiMenuItems) {
          if (!categoryImageMap.has(item.categoryId) && item.image && item.image.trim() !== '') {
            categoryImageMap.set(item.categoryId, item.image);
          }
        }

        const defaultImage = "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=600&h=400&fit=crop";

        // Transform backend categories to match frontend Category type
        // Priority: 1) Menu item image, 2) Default placeholder
        const transformedCategories = apiCategories.map((cat: ApiCategory) => ({
          id: cat.id,
          name: cat.name,
          icon: "",
          image: categoryImageMap.get(cat.id) || defaultImage,
        }));

        // Transform backend menu items to match frontend MenuItem type
        const transformedMenuItems = apiMenuItems.map((item: ApiMenuItem) => ({
          id: item.id,
          name: item.itemName,
          description: item.description,
          price: item.price,
          image: item.image || defaultImage,
          category: item.categoryId,
          ingredients: item.ingredients,
          extras: item.extras,
        }));

        setCategories(transformedCategories);
        setMenuItems(transformedMenuItems);
        setError(null);
      } catch (err) {
        console.error("Failed to load backend data:", err);
        setError("Failed to load menu. Using local data.");
        // Keep local data as fallback
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { categories, menuItems, loading, error };
};

export const Menu: React.FC<MenuProps> = ({
  selectedCategoryId,
  onSelectItem,
  onSelectCategory,
}) => {
  // Use backend data instead of local static data
  const { categories, menuItems, loading, error } = useBackendData();

  // Items are filtered based on selection
  const items = useMemo(() => {
    if (!selectedCategoryId) return [];
    return menuItems.filter((item) => item.category === selectedCategoryId);
  }, [menuItems, selectedCategoryId]);

  const activeCategory = useMemo(() => 
    categories.find((c) => c.id === selectedCategoryId), 
  [categories, selectedCategoryId]);

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

  // Show loading state
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden bg-black h-full w-full">
      {/* LEFT SIDE: Category Sidebar - 25% Width */}
      <aside className="w-[25%] bg-[#050505] flex flex-col border-r border-white/5 relative z-20 shadow-2xl">
        <div className="p-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-2 opacity-60">{t('catalog')}</h2>
          <p className="text-2xl font-black uppercase text-white tracking-widest leading-none">{t('menu')}</p>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 space-y-4 custom-scrollbar">
          {categories.map((cat) => {
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
                    referrerPolicy="no-referrer"
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
            {activeCategory ? (
              <>
                <h1 className="text-4xl font-black uppercase tracking-tight text-white leading-none">
                  {activeCategory.name}
                </h1>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em]">
                  {items.length} {items.length === 1 ? 'Option Available' : 'Options Available'}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-black uppercase tracking-tight text-white/20 leading-none">
                  Choo Choo Tortas
                </h1>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">
                  Select a category to begin
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pt-10 pb-32 custom-scrollbar z-10">
          {items.length === 0 ? (
            // Show this message whenever there are no items to display
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <ChevronRight className="w-16 h-16 text-white/20" />
              </div>
              <p className="text-2xl font-bold text-white/40 uppercase tracking-widest mb-4">
                SELECT ITEMS FROM LEFT
              </p>
              <p className="text-white/30 text-lg font-medium">
                Please select a category first from the left menu
              </p>
              <p className="text-white/20 text-sm mt-4">
                Then items will appear here
              </p>
            </div>
          ) : (
            // Show items when available
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
                    {/* Item Visual */}
                    <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl mb-4 relative bg-black/50 border border-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover active:scale-105 transition-transform duration-[1.2s] ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Pricing & Identity */}
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
          )}
        </div>
      </main>
    </div>
  );
};