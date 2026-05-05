import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CartItem } from "../types";
import { ShoppingBag, Plus, Trash2, Minus } from "lucide-react";
import { formatCurrency } from "../utils/cartUtils";
import { Button } from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import { fetchTaxRate } from "../services/api";

const DESSERTS = [
  {
    id: "leches-cake",
    name: "Leches Cake",
    price: 7.0,
    image: "https://static.vecteezy.com/system/resources/previews/059/480/005/non_2x/delicious-isolated-mexican-tres-leches-dessert-with-fluffy-cream-topping-png.png",
  },
  {
    id: "churros",
    name: "Churros (3)",
    price: 6.0,
    image: "data:image/webp;base64,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",
  },
  {
    id: "flan",
    name: "Flan",
    price: 6.0,
    image: "https://th.bing.com/th/id/OIP._uT449pDajwxCiwx-UDiZQHaHa?w=195&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
];

interface CartProps {
  cart: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onBack: () => void;
  onCheckout: () => void;
  orderType: "eat-in" | "take-out" | null;
  onAddToCart: (item: Omit<CartItem, "id">) => void;
}

export const Cart: React.FC<CartProps> = ({
  cart,
  total,
  onUpdateQuantity,
  onBack,
  onCheckout,
  orderType,
  onAddToCart,
}) => {
  const { t } = useLanguage();
  const [taxRate, setTaxRate] = useState<number>(8.25); // default fallback
  const [loadingTax, setLoadingTax] = useState(true);

  // Fetch tax rate from backend
  useEffect(() => {
    const loadTax = async () => {
      try {
        const taxSettings = await fetchTaxRate();
        setTaxRate(taxSettings.taxRate);
      } catch (error) {
        console.error("Failed to fetch tax rate in Cart:", error);
        // keep default 8.25
      } finally {
        setLoadingTax(false);
      }
    };
    loadTax();
  }, []);

  const tax = total * (taxRate / 100);
  const grandTotal = total + tax;

  if (cart.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center bg-black">
        <div className="w-64 h-64 bg-surface rounded-full flex items-center justify-center mb-12 border-4 border-primary shadow-[0_0_50px_rgba(23,58,0,0.3)]">
          <ShoppingBag className="w-32 h-32 text-primary opacity-50" />
        </div>
        <h2 className="text-[48px] font-black uppercase tracking-tighter text-white mb-6">
          {t("empty_bag")}
        </h2>
        <p className="text-xl text-muted font-bold uppercase tracking-[0.2em] max-w-md mb-12 leading-relaxed">
          {t("add_something")}
        </p>
        <Button
          variant="primary"
          size="xl"
          className="px-24 h-24 rounded-full text-2xl"
          onClick={onBack}
        >
          {t("browse_menu")}
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-black overflow-hidden relative">
      {/* Scrollable Order List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-10 pb-40">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-end border-b border-primary/20 pb-8 mb-10">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-[48px] font-black uppercase tracking-tighter text-white leading-none">
                  {t("my_order")}
                </h2>
                <div
                  className={`px-4 py-1 rounded-full border ${orderType === "take-out" ? "border-accent text-accent" : "border-primary text-primary"} text-[10px] font-black uppercase tracking-widest`}
                >
                  {orderType === "take-out" ? "TAKE OUT" : "EAT IN"}
                </div>
              </div>
              <p className="text-xl font-bold text-white/40 uppercase tracking-[0.4em]">
                {cart.length} {t("items_selected")}
              </p>
            </div>
          </div>

          {cart.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0c0c0c] rounded-[24px] p-5 flex items-center gap-6 border border-white/10 transition-all group relative overflow-hidden"
            >
              {/* Item Image (More Compact) */}
              <div className="w-24 h-24 shrink-0 relative">
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-full h-full object-cover rounded-[16px] border border-white/10 shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Item Details (Responsive Typography) */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-0.5 truncate">
                      {item.menuItem.name}
                    </h3>
                    <p className="text-xs font-bold text-white/30 italic">
                      {formatCurrency(item.menuItem.price)} / ea
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em] mb-1">
                      Item Total
                    </p>
                    <span className="text-2xl font-black text-white leading-none whitespace-nowrap">
                      {formatCurrency(item.totalPrice * item.quantity)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                      {t("qty")}
                    </span>
                    <span className="text-lg font-black text-white">
                      x{item.quantity}
                    </span>
                  </div>

                  {item.removedIngredients.length > 0 && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">
                        {t("removed")}
                      </span>
                      <p className="text-[11px] font-bold text-white/40 italic leading-none truncate max-w-[200px]">
                        {item.removedIngredients.map((i) => `-${i}`).join(", ")}
                      </p>
                    </div>
                  )}

                  {item.addedExtras.length > 0 && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                        {t("extras")}
                      </span>
                      <p className="text-[11px] font-bold text-white/70 italic leading-none truncate max-w-[200px]">
                        {item.addedExtras.map((e) => `+${e.name}`).join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {item.notes && (
                  <div className="mt-3 pt-2 border-t border-white/5">
                    <p className="text-[10px] font-bold text-muted italic leading-tight truncate">
                      <span className="text-[8px] font-black text-white/20 uppercase tracking-widest not-italic mr-2">
                        {t("notes")}:
                      </span>
                      "{item.notes}"
                    </p>
                  </div>
                )}
              </div>

              {/* Precise Quantity Adjustment & Delete (Requirement 1) */}
              <div className="flex flex-col gap-2 pl-6 border-l border-white/5 w-14 shrink-0">
                <div className="flex flex-col items-center bg-[#111] rounded-xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-full h-12 flex items-center justify-center text-primary active:bg-primary active:text-black transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <div className="w-full h-[1px] bg-white/5" />
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-full h-12 flex items-center justify-center text-white/40 active:bg-white/10 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => onUpdateQuantity(item.id, -item.quantity)}
                  className="w-full h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center border border-red-500/20 active:bg-red-500 active:text-white transition-all"
                  title={t("remove")}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FIXED BOTTOM SUMMARY - RESPONSIVE & FOCUSED (Requirement 2 & 3) */}
      <div className="bg-[#050505]/98 backdrop-blur-2xl border-t border-primary/20 shadow-[0_-20px_80px_rgba(30,176,30,0.1)] z-[60] p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Dessert Suggestions */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 text-center">
              Add a Dessert?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {DESSERTS.map((dessert) => (
                <button
                  key={dessert.id}
                  onClick={() => {
                    const cartItem: Omit<CartItem, "id"> = {
                      menuItem: {
                        id: dessert.id,
                        name: dessert.name,
                        description: "",
                        price: dessert.price,
                        image: dessert.image,
                        category: "desserts",
                        ingredients: [],
                        extras: [],
                      },
                      quantity: 1,
                      removedIngredients: [],
                      addedExtras: [],
                      notes: "",
                      totalPrice: dessert.price,
                    };
                    onAddToCart(cartItem);
                  }}
                  className="bg-black/5 border border-primary/20 rounded-lg p-3 text-center active:bg-primary/10 active:border-primary transition-all active:scale-95"
                >
                  <img
                    src={dessert.image}
                    alt={dessert.name}
                    className="w-12 h-12 mx-auto rounded-md mb-2 object-cover"
                  />
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/60 leading-tight">
                    {dessert.name}
                  </p>
                  <p className="text-[10px] font-black text-primary mt-1">
                    {formatCurrency(dessert.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Row 1: Totals Vertical List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-muted font-black uppercase tracking-[0.3em] text-xs">
              <span>{t("subtotal")}</span>
              <span className="text-white text-lg">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted font-black uppercase tracking-[0.3em] opacity-40 text-xs">
              <span>{t("tax")} ({taxRate}%)</span>
              <span className="text-white text-lg">{formatCurrency(tax)}</span>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-sm">
                {t("grand_total")}
              </span>
              <span className="text-5xl font-black text-primary drop-shadow-[0_0_20px_rgba(30,176,30,0.2)]">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          {/* Row 2: Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onBack}
              className="w-[55%] h-20 bg-[#0c0c0c] text-white rounded-[24px] font-black uppercase tracking-widest border-2 border-primary shadow-[0_0_30px_rgba(23,58,0,0.2)] active:scale-95 transition-all text-xl flex items-center justify-center whitespace-nowrap px-6"
            >
              {t("add_more_items")}
            </button>
            <button
              onClick={onCheckout}
              className="w-[45%] h-20 bg-primary text-black rounded-[24px] font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(30,176,30,0.25)] active:scale-95 transition-all text-2xl flex items-center justify-center relative whitespace-nowrap px-4"
            >
              <span className="relative z-10">{t("checkout")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};