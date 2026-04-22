import React from "react";
import { motion } from "motion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles = "flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-95 touch-none select-none rounded-[20px] border-2";
  
  const variants = {
    primary: "bg-primary text-black border-primary",
    secondary: "bg-[#111] text-primary border-primary/20",
    outline: "border-white/20 text-white bg-transparent",
    ghost: "bg-white/5 text-white border-transparent",
    danger: "bg-red-600 text-white border-red-600",
  };

  const sizes = {
    sm: "px-6 h-12 text-sm",
    md: "px-8 h-14 text-base",
    lg: "px-10 h-18 text-xl",
    xl: "px-12 h-24 text-2xl",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
