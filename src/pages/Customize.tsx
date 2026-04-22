import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem } from "../data/menu";
import { formatCurrency } from "../utils/cartUtils";
import { Button } from "../components/Button";
import { Plus, Minus, Info, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import { TouchKeyboard } from "../components/TouchKeyboard";

interface CustomizeProps {
  item: MenuItem;
  onAddToCart: (customizedItem: any) => void;
}

export const Customize: React.FC<CustomizeProps> = ({
  item,
  onAddToCart,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [removed, setRemoved] = useState<string[]>([]);
  const [added, setAdded] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [activeNotes, setActiveNotes] = useState("");

  const totalItemPrice = useMemo(() => {
    return (item.price + added.reduce((sum, extra) => sum + extra.price, 0));
  }, [item.price, added]);

  const toggleIngredient = (ing: string) => {
    setRemoved((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  const toggleExtra = (extra: any) => {
    setAdded((prev) =>
      prev.some((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBackStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // STEP-BY-STEP SPECIAL FLOW
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex overflow-hidden bg-black"
    >
      {/* 🔴 LIVE SUMMARY PANEL (Requirement 4) */}
      <div className="w-[35%] h-full bg-[#111] border-r border-[#173a00] flex flex-col p-8 relative overflow-hidden">
        <div className="mb-6 text-center">
          <img src={item.image} alt={item.name} className="w-32 h-32 mx-auto rounded-[24px] border-2 border-[#173a00] shadow-2xl mb-4 object-cover" />
          <h2 className="text-3xl font-black uppercase text-white leading-tight">{item.name}</h2>
          <p className="text-primary text-xl font-black mt-1 mb-6">{formatCurrency(item.price)}</p>

          {/* 🔘 QUANTITY STEPPER (Moved from Step 3) */}
          <div className="flex items-center justify-center gap-3 bg-black/50 p-2 rounded-[20px] border border-[#173a00]/30 w-fit mx-auto mb-8">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-[#111] rounded-lg border border-[#173a00] flex items-center justify-center active:scale-90 transition-all">
              <Minus className="w-5 h-5 text-white" />
            </button>
            <span className="text-2xl font-black text-white w-10 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center active:scale-90 transition-all">
              <Plus className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-2">
          {/* Sub-summary sections */}
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mb-2">{t('includes')}</p>
            <p className="text-[11px] font-medium text-white/40 leading-relaxed italic">{item.ingredients.join(", ")}</p>
          </div>

          {removed.length > 0 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-red-500 mb-2">{t('remove_ingredients')}</p>
              <div className="flex flex-wrap gap-1.5">
                {removed.map(ing => (
                  <span key={ing} className="bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full text-[8px] font-black uppercase">-{ing}</span>
                ))}
              </div>
            </motion.div>
          )}

          {added.length > 0 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mb-2">{t('add_extras')}</p>
              <div className="flex flex-wrap gap-1.5">
                {added.map(ex => (
                  <span key={ex.name} className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full text-[8px] font-black uppercase">+{ex.name}</span>
                ))}
              </div>
            </motion.div>
          )}

          {activeNotes && (
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">{t('special_requests')}</p>
              <p className="text-[11px] font-bold text-white italic">"{activeNotes}"</p>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-[#173a00]">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('item_total')}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('total')}</span>
          </div>
          <div className="text-3xl font-black text-primary drop-shadow-[0_0_20px_rgba(23,58,0,0.4)]">
            {formatCurrency(totalItemPrice * quantity)}
          </div>
        </div>
      </div>

      {/* 🔴 STEPS AREA (Requirement 2) */}
      <div className="flex-1 min-w-0 flex flex-col h-full bg-black relative">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-[#111] flex">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-transparent'}`} />
          ))}
        </div>

        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h2 className="text-4xl font-black uppercase text-white mb-2">{t('remove_ingredients')}</h2>
                  <p className="text-white/40 uppercase tracking-widest font-black text-[10px]">{t('includes')}: {item.ingredients.length} items</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {item.ingredients.map(ing => (
                    <button
                      key={ing}
                      onClick={() => toggleIngredient(ing)}
                      className={`p-6 rounded-[20px] border-2 transition-all flex items-center justify-between group active:scale-95 ${removed.includes(ing) ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-[#111] active:border-primary'}`}
                    >
                      <span className={`text-lg font-black uppercase tracking-tight ${removed.includes(ing) ? 'line-through opacity-40 text-red-500' : 'text-white'}`}>{ing}</span>
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${removed.includes(ing) ? 'bg-red-500 border-red-500' : 'border-[#173a00]'}`}>
                        {removed.includes(ing) && <Minus className="text-white w-5 h-5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h2 className="text-4xl font-black uppercase text-white mb-2">{t('add_extras')}</h2>
                  <p className="text-white/40 uppercase tracking-widest font-black text-[10px] italic">Customize your taste</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {item.extras.map(ex => {
                    const isAdded = added.some(a => a.name === ex.name);
                    return (
                      <button
                        key={ex.name}
                        onClick={() => toggleExtra(ex)}
                        className={`p-6 rounded-[20px] border-2 transition-all flex items-center justify-between group active:scale-95 ${isAdded ? 'border-primary bg-primary/10' : 'border-white/10 bg-[#111] active:border-primary'}`}
                      >
                        <div className="text-left">
                          <p className={`text-lg font-black uppercase tracking-tight ${isAdded ? 'text-primary' : 'text-white'}`}>{ex.name}</p>
                          <p className="text-primary font-black mt-0.5 text-sm">+{formatCurrency(ex.price)}</p>
                        </div>
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${isAdded ? 'bg-primary border-primary rotate-0' : 'border-[#173a00] rotate-90'}`}>
                          {isAdded ? <Plus className="text-black w-5 h-5" /> : <Plus className="text-[#173a00] w-5 h-5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h2 className="text-4xl font-black uppercase text-white mb-2">{t('special_requests')}</h2>
                  <p className="text-white/40 uppercase tracking-widest font-black text-[10px]">Anything else we should know?</p>
                </div>
                
                <div>
                  <button
                    onClick={() => setIsKeyboardOpen(true)}
                    className="w-full h-64 bg-[#0a0a0a] border-2 border-dashed border-primary/20 rounded-[32px] p-12 text-left active:border-primary transition-all group relative overflow-hidden flex flex-col"
                  >
                    <div className="absolute inset-0 bg-primary/5 active:opacity-100 transition-opacity" />
                    <p className="text-4xl font-bold text-white/60 uppercase italic leading-relaxed">
                      {activeNotes || t('tap_to_add_notes')}
                    </p>
                    {activeNotes && (
                      <div className="mt-auto self-end flex items-center gap-2 text-primary">
                        <span className="text-sm font-black uppercase tracking-widest">Edit Notes</span>
                        <Info className="w-6 h-6" />
                      </div>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard Overlay - Strictly constrained to Right Panel */}
        <AnimatePresence>
          {isKeyboardOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute inset-x-0 bottom-0 z-[100] bg-black/95 backdrop-blur-xl border-t-8 border-primary overflow-hidden"
            >
              <TouchKeyboard 
                value={activeNotes} 
                onChange={setActiveNotes} 
                onClose={() => setIsKeyboardOpen(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="p-8 bg-[#050505] border-t border-[#173a00] flex gap-4 transition-all">
          {step > 1 && (
            <button onClick={handleBackStep} className="h-16 px-10 bg-[#111] text-white rounded-[20px] font-black uppercase tracking-widest border border-[#173a00] active:scale-95 transition-all text-lg">
              {t('back')}
            </button>
          )}
          
          {step < 3 ? (
            <Button variant="primary" size="lg" className="flex-1 h-16 text-2xl shadow-[0_0_40px_rgba(23,58,0,0.2)] whitespace-nowrap" onClick={handleNext}>
              {t('next')}
            </Button>
          ) : (
            <Button variant="primary" size="lg" className="flex-1 h-16 shadow-[0_0_40px_rgba(30,176,30,0.2)] flex items-center justify-center gap-3 active:scale-95 transition-all" onClick={() => onAddToCart({ menuItem: item, removedIngredients: removed, addedExtras: added, notes: activeNotes, quantity, totalPrice: totalItemPrice })}>
              <span className="text-2xl font-black uppercase tracking-tighter">{t('confirm')}</span>
              <Check className="w-8 h-8 stroke-[4px]" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
