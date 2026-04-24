import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Utensils, ShoppingBag, Train, ChevronDown, Globe } from "lucide-react";
import { OrderType } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface HomeProps {
  onStart: (type: OrderType) => void;
}

const LANGUAGES = [
  { code: "US", country: "us", name: "English", id: "en" },
  { code: "MX", country: "mx", name: "Español", id: "es" },
] as const;

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const currentLang = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  return (
    <div
      className="h-full w-full flex flex-col text-white relative"
      style={{ background: "#000000" }}
    >
      {/* Background Decor - behind everything */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{ borderRadius: "inherit", overflow: "hidden" }}
      >
        <Globe className="absolute -top-24 -left-24 w-[600px] h-[600px] text-white" />
      </div>

      {/* TOP BLACK SECTION */}
      <div className="relative flex-1 flex flex-col items-center pt-32 z-20">
        {/* Language Selector */}
        <div className="absolute top-8 right-8">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-4 bg-[#111] border-2 border-white/20 rounded-2xl px-5 py-3.5 active:border-primary transition-all active:scale-95 shadow-xl"
            >
              <img
                src={`https://flagcdn.com/w80/${currentLang.country}.png`}
                alt={currentLang.name}
                className="w-8 h-auto rounded-sm border border-white/10"
                referrerPolicy="no-referrer"
              />
              <span className="text-sm font-black uppercase tracking-[0.2em]">
                {currentLang.code}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${isLangOpen ? "rotate-180 text-primary" : "text-white/40"}`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-60 bg-[#111] border border-white/20 rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] z-50 p-2"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.id);
                        setIsLangOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-4 rounded-2xl active:bg-white active:text-black transition-all duration-200 group mb-1 last:mb-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://flagcdn.com/w80/${lang.country}.png`}
                          alt={lang.name}
                          className="w-8 h-auto rounded-sm border border-white/10"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col items-start translate-y-[1px]">
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                            {lang.code}
                          </span>
                          <span className="text-sm font-bold tracking-tight">
                            {lang.name}
                          </span>
                        </div>
                      </div>
                      {language === lang.id && (
                        <div className="w-2.5 h-2.5 bg-primary rounded-full group-active:bg-black" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* LOGO */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6 mb-16"
        >
          <div className="w-40 h-40 bg-[#111] rounded-3xl flex items-center justify-center border-2 border-primary shadow-[0_0_60px_rgba(255,0,0,0.1)] overflow-hidden">
            <img
              src="/assets/logo.jpg"
              alt="Choo Choo Tortas Logo"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <span className="text-[40px] font-black tracking-tight text-white uppercase drop-shadow-2xl">
            CHOO CHOO{" "}
            <span className="text-primary underline decoration-primary underline-offset-8">
              TORTAS
            </span>
          </span>
        </motion.div>

        {/* HEADLINE */}
        <div className="text-center px-10">
          <h1 className="text-[40px] font-bold leading-[1.1] max-w-[500px] mx-auto text-white uppercase tracking-tight">
            {t("where_eating")}
          </h1>
        </div>
      </div>

      {/* SVG WAVE DIVIDER */}
      <div className="absolute top-[40%] left-0 w-full leading-[0] z-0">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-[220px]"
        >
          <path fill="#ff0000" d="M0,120 Q720,320 1440,120 V320 H0 Z" />
        </svg>
      </div>

      {/* BOTTOM GREEN SECTION */}
      <div className="h-[45%] w-full bg-[#ff0000] flex items-center justify-center pb-12 z-10">
        <div className="flex gap-16">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onStart("eat-in")}
            className="w-[180px] h-[180px] bg-[#1a1a1a] rounded-[24px] flex flex-col items-center justify-center gap-6 shadow-2xl transition-all border-2 border-white/10 active:border-white active:border-4 group"
          >
            <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center border border-white/20 group-active:border-white transition-colors">
              <Utensils className="w-10 h-10 text-white" />
            </div>
            <span className="text-[16px] font-black text-white uppercase tracking-widest">
              {t("eat_in")}
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onStart("take-out")}
            className="w-[180px] h-[180px] bg-[#1a1a1a] rounded-[24px] flex flex-col items-center justify-center gap-6 shadow-2xl transition-all border-2 border-white/10 active:border-white active:border-4 group"
          >
            <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center border border-white/20 group-active:border-white transition-colors">
              <ShoppingBag className="w-10 h-10 text-white" />
            </div>
            <span className="text-[16px] font-black text-white uppercase tracking-widest">
              {t("take_out")}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
