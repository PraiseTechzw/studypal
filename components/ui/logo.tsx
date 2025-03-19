import { BrainCircuit } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "minimal"
  showText?: boolean
}

export function Logo({ className, size = "md", variant = "default", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg",
          variant === "default" ? "bg-gradient-to-br from-[#319795] to-[#2D3748] p-1.5" : "",
          sizeClasses[size],
        )}
      >
        <BrainCircuit
          className={cn(
            "text-white",
            variant === "minimal" && "text-[#319795]",
            size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6",
          )}
        />
        {variant === "default" && (
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>
      {showText && <span className={cn("font-bold tracking-tight", textSizeClasses[size])}>StudPal</span>}
    </div>
  )
}

