import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import { CartItem, OrderType } from "../types";
import { formatCurrency } from "../utils/cartUtils";
import {
  CreditCard,
  Utensils,
  ShoppingBag,
  CheckCircle2,
  Loader2,
  Home as HomeIcon,
} from "lucide-react";

interface CheckoutScreenProps {
  onHome: () => void;
  cart: CartItem[];
  total: number;
  orderType: OrderType | null;
}

type PaymentState = "idle" | "processing" | "success";

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onHome,
  cart,
  total,
  orderType,
}) => {
  const { t } = useLanguage();
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const tax = total * 0.08;
  const grandTotal = total + tax;
  const orderNumber = "247";

  useEffect(() => {
    let timeout: any;
    if (paymentState === "processing") {
      timeout = setTimeout(() => {
        setPaymentState("success");
      }, 4000);
    } else if (paymentState === "success") {
      timeout = setTimeout(() => {
        onHome();
      }, 6000);
    }
    return () => clearTimeout(timeout);
  }, [paymentState, onHome]);

  if (paymentState === "processing") {
    return (
      <div className="absolute inset-0 bg-black z-[200] flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#111] border-2 border-primary/20 rounded-[40px] p-16 max-w-xl w-full shadow-[0_0_100px_rgba(30,176,30,0.1)]"
        >
          <div className="mb-12 relative flex justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          </div>
          <h2 className="text-4xl font-black uppercase text-white mb-6 tracking-tighter leading-tight">
            Processing Payment
          </h2>
          <p className="text-xl text-white/60 font-bold uppercase tracking-widest leading-relaxed">
            Please follow the instructions on the card reader to complete your
            payment.
          </p>
        </motion.div>
      </div>
    );
  }

  if (paymentState === "success") {
    return (
      <div className="absolute inset-0 bg-black z-[200] flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#111] border-2 border-primary rounded-[40px] p-16 max-w-xl w-full shadow-[0_0_100px_rgba(30,176,30,0.2)]"
        >
          <div className="mb-10 flex justify-center">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-black" />
            </div>
          </div>
          <h2 className="text-5xl font-black uppercase text-white mb-6 tracking-tighter">
            Thank You!
          </h2>
          <div className="space-y-4 mb-12">
            <p className="text-2xl font-bold text-primary uppercase tracking-widest italic">
              Order #{orderNumber}
            </p>
            <p className="text-lg text-white/50 font-bold uppercase tracking-widest leading-none">
              Your order is being prepared
            </p>
            <p className="text-sm text-white/30 font-black uppercase tracking-[0.2em]">
              Your order has been sent to the kitchen
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full h-20 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
            onClick={onHome}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="font-black uppercase tracking-widest">
              Return Home
            </span>
          </Button>

          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            Auto-resetting in a few seconds...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[#050505] flex flex-col z-[100]">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 pb-40">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-black rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden border-2 border-primary/20 flex flex-col"
          >
            {/* Invoice Header */}
            <div className="p-8 lg:p-12 text-center border-b-[3px] border-dotted border-black/20">
              <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-1">
                choo choo TORTAS
              </h1>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-[0.4em] mb-8">
                Official Order Invoice
              </p>

              <div className="bg-black text-white py-4 px-8 inline-block rounded-sm mb-6">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] mb-1 opacity-50">
                  Transaction ID
                </p>
                <h2 className="text-6xl lg:text-7xl font-black tracking-tighter leading-none">
                  #{orderNumber}
                </h2>
              </div>

              <div className="flex flex-col items-center gap-2 mb-8">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30">
                  Service Mode
                </p>
                <div
                  className={`px-10 py-3 rounded-xl border-2 flex items-center gap-3 ${orderType === "take-out" ? "border-accent bg-accent/5 text-accent" : "border-primary bg-primary/5 text-primary"}`}
                >
                  {orderType === "eat-in" ? (
                    <Utensils className="w-5 h-5" />
                  ) : (
                    <ShoppingBag className="w-5 h-5" />
                  )}
                  <span className="text-xl font-black uppercase tracking-tighter">
                    {orderType === "eat-in" ? "EAT IN" : "TAKE OUT"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-black/40 px-4">
                <span>Terminal #01</span>
                <span>{new Date().toLocaleDateString()}</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="p-8 lg:p-12">
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-black/30 border-b border-black/10 pb-2 mb-4">
                  <span>Item & Description</span>
                  <span>Total</span>
                </div>
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 pb-4 border-b border-black/5 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-black text-sm">
                          {item.quantity}x
                        </span>
                        <div>
                          <h3 className="font-black text-sm uppercase leading-tight">
                            {item.menuItem.name}
                          </h3>
                          {item.addedExtras.length > 0 && (
                            <p className="text-[9px] font-bold text-black/50 lowercase italic leading-none mt-1">
                              + {item.addedExtras.map((e) => e.name).join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-black text-sm">
                        {formatCurrency(item.totalPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Section */}
              <div className="border-t-[3px] border-black pt-6 space-y-2">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-black/40">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-black/40">
                  <span>Tax & Surcharge</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-black/5">
                  <span className="text-xl font-black uppercase tracking-tighter">
                    Amount Due
                  </span>
                  <span className="text-3xl font-black border-b-4 border-primary">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-dotted border-black/20 text-center">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-4 h-1 bg-black/10" />
                  ))}
                </div>
                <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest">
                  Receipt End
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STICKY BOTTOM BUTTON PANEL */}
      <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-xl border-t border-primary/20 p-8 lg:p-12 z-[150] shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <Button
            variant="primary"
            size="xl"
            className="w-full h-24 rounded-[32px] text-3xl font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(30,176,30,0.4)] active:scale-[0.98] transition-all"
            onClick={() => setPaymentState("processing")}
          >
            CONFIRM & PAY
          </Button>

          <button
            onClick={onHome}
            className="w-full text-white/30 text-[10px] font-black uppercase tracking-[0.4em] py-2 active:text-white/60 transition-colors"
          >
            Cancel and Return Home
          </button>
        </div>
      </div>
    </div>
  );
};
