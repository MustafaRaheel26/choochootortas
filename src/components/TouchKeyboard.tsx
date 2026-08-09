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
    ["Z", "X", "C", "V", "B", "N", "M", " ", "@", "."],
  ];

  const handleKeyClick = (key: string) => {
    onChange(value + key);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <div className="bg-black/95 backdrop-blur-xl border-t-2 border-primary/30 p-6 pb-8 shadow-[0_-20px_60px_rgba(0,0,0,0.9)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-3">
          {rows.map((row, i) => (
            <div key={i} className="flex justify-center gap-2">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={`
                    flex items-center justify-center
                    ${key === " " ? "w-40" : "w-14 h-16"} 
                    ${key === "@" || key === "." ? "w-14 h-16" : "w-14 h-16"}
                    bg-[#1a1a1a] rounded-xl shadow-sm active:bg-primary active:text-black active:scale-95 transition-all
                    text-2xl font-bold border border-white/10 text-white hover:bg-[#2a2a2a]
                  `}
                >
                  {key === " " ? (
                    <Space className="w-8 h-8 text-white/60" />
                  ) : (
                    key
                  )}
                </button>
              ))}
              {i === 2 && (
                <button
                  onClick={handleBackspace}
                  className="w-20 h-16 bg-primary/20 border-2 border-primary/40 rounded-xl shadow-sm active:bg-primary active:text-black active:scale-95 transition-all flex items-center justify-center hover:bg-primary/30"
                >
                  <Delete className="w-8 h-8 text-primary" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="primary"
            size="lg"
            onClick={onClose}
            className="rounded-2xl px-16 h-14 text-lg font-black uppercase tracking-widest"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
