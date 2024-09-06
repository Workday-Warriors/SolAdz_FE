import React, { useState } from "react";

interface GradientButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  text = "Get Your Invitation Link",
  onClick,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        py-4 px-[30px] sm:px-[45px] md:px-[85px] rounded-[7px]
        text-base md:text-xl font-bold uppercase tracking-wide 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        relative overflow-hidden transition-all duration-300 ease-in-out
        ${className}
      `}
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #4338CA, #6D28D9, #9333EA)"
          : "linear-gradient(135deg, #3730A3, #4338CA, #6D28D9)",
        backgroundSize: "200% 200%",
        animation: "gradientShift 5s ease infinite",
        boxShadow: isHovered
          ? "0 8px 15px rgba(107, 40, 217, 0.3)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <span className="relative z-10 text-white mix-blend-overlay">
        {text}
      </span>
      <span 
        className="absolute inset-0 z-0 animate-text-glow"
        aria-hidden="true"
      >
        {text}
      </span>
    </button>
  );
};
