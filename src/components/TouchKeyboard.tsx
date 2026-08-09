import React, { useState } from "react";
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
  const [showNumbers, setShowNumbers] = useState(false);

  const lettersRow1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const lettersRow2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const lettersRow3 = ["z", "x", "c", "v", "b", "n", "m"];
  const numbersRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const symbolsRow = ["@", ".", "_", "-", " "];

  const handleKeyClick = (key: string) => {
    onChange(value + key);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const toggleNumbers = () => {
    setShowNumbers(!showNumbers);
  };

  // Determine which rows to show
  const getRows = () => {
    if (showNumbers) {
      return [numbersRow, symbolsRow];
    }
    return [lettersRow1, lettersRow2, lettersRow3, symbolsRow];
  };

  const rows = getRows();

  return (
    <div className="bg-black/95 border-t-2 border-primary/30 p-4 pb-6 shadow-[0_-20px_60px_rgba(0,0,0,0.9)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-2.5">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={`
                    flex items-center justify-center
                    ${key === " " ? "w-60" : "w-14 h-14"} 
                    ${key === "@" || key === "." || key === "_" || key === "-" ? "w-14 h-14" : "w-14 h-14"}
                    bg-[#1a1a1a] rounded-xl shadow-sm active:bg-primary active:text-black active:scale-95 transition-all
                    text-2xl font-bold border border-white/10 text-white hover:bg-[#2a2a2a]
                  `}
                >
                  {key === " " ? (
                    <Space className="w-7 h-7 text-white/60" />
                  ) : (
                    key
                  )}
                </button>
              ))}
              {rowIndex === rows.length - 1 && (
                <>
                  <button
                    onClick={handleBackspace}
                    className="w-20 h-14 bg-primary/20 border-2 border-primary/40 rounded-xl shadow-sm active:bg-primary active:text-black active:scale-95 transition-all flex items-center justify-center hover:bg-primary/30"
                  >
                    <Delete className="w-7 h-7 text-primary" />
                  </button>
                </>
              )}
            </div>
          ))}

          {/* Toggle button row */}
          <div className="flex justify-center gap-2 mt-1">
            <button
              onClick={toggleNumbers}
              className={`
                px-6 h-10 rounded-xl text-sm font-bold uppercase tracking-wider transition-all
                ${
                  showNumbers
                    ? "bg-primary/20 border border-primary/50 text-primary"
                    : "bg-[#1a1a1a] border border-white/10 text-white/60 hover:bg-[#2a2a2a]"
                }
              `}
            >
              {showNumbers ? "ABC" : "123"}
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="rounded-xl px-12 h-12 text-base font-black uppercase tracking-widest"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
