import React from "react";
import { motion } from "motion/react";
import { CartItem } from "../types";
import { ShoppingBag, Plus, Trash2, Minus } from "lucide-react";
import { formatCurrency } from "../utils/cartUtils";
import { Button } from "../components/Button";
import { useLanguage } from "../context/LanguageContext";

const DESSERTS = [
  {
    id: "leches-cake",
    name: "Leches Cake",
    price: 7.0,
    image: "https://picsum.photos/seed/lechescake/200/200",
  },
  {
    id: "churros",
    name: "Churros (3)",
    price: 6.0,
    image: "https://picsum.photos/seed/churros/200/200",
  },
  {
    id: "flan",
    name: "Flan",
    price: 6.0,
    image: "https://picsum.photos/seed/flan/200/200",
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
  const tax = total * 0.08;
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
              <span>{t("tax")}</span>
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
