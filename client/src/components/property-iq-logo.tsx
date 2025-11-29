import { Home } from "lucide-react";

interface PropertyIQLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  variant?: "default" | "light";
}

export function PropertyIQLogo({ size = "md", showText = true, className = "", variant = "default" }: PropertyIQLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl", 
    xl: "text-4xl"
  };

  const iconColorClasses = variant === "light" 
    ? "text-blue-400 fill-blue-200/50" 
    : "text-blue-600 fill-blue-100";
    
  const textColorClasses = variant === "light"
    ? "text-white"
    : "text-gray-900 dark:text-white";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Home 
          className={`${sizeClasses[size]} ${iconColorClasses}`}
          strokeWidth={1.5}
        />
      </div>
      {showText && (
        <span className={`font-bold ${textColorClasses} ${textSizeClasses[size]}`}>
          PropertyIQ
        </span>
      )}
    </div>
  );
}