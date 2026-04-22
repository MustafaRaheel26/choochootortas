import React from "react";
import { Button } from "./Button";
import { Delete, Space } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface TouchKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export const TouchKeyboard: React.FC<TouchKeyboardProps> = ({
  value,
  onChange,
  onClose,
}) => {
  const { t } = useLanguage();
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", " "],
  ];

  const handleKeyClick = (key: string) => {
    onChange(value + key);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <div className="bg-black p-10 py-12 shadow-2xl">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          {rows.map((row, i) => (
            <div key={i} className="flex justify-center gap-3">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={`
                    flex items-center justify-center
                    ${key === " " ? "w-80" : "w-16 h-20"} 
                    bg-[#111] rounded-xl shadow-sm active:bg-primary active:text-black active:scale-95 transition-all
                    text-3xl font-bold border-2 border-white/5 text-white
                  `}
                >
                  {key === " " ? <Space className="w-10 h-10" /> : key}
                </button>
              ))}
              {i === 2 && (
                <button
                  onClick={handleBackspace}
                  className="w-24 h-20 bg-primary/20 border-2 border-primary/40 rounded-xl shadow-sm active:bg-primary active:text-black active:scale-95 transition-all flex items-center justify-center"
                >
                  <Delete className="w-10 h-10 text-primary" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="primary" size="lg" onClick={onClose} className="rounded-2xl px-20 h-16 text-xl font-black uppercase">
            {t('finish')}
          </Button>
        </div>
      </div>
    </div>
  );
};
