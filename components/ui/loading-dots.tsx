import { cn } from "@/lib/utils"

interface LoadingDotsProps {
  className?: string
  color?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingDots({ className, color = "bg-current", size = "md" }: LoadingDotsProps) {
  const sizeClasses = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  }

  const gapClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  }

  return (
    <div className={cn("flex items-center", gapClasses[size], className)}>
      <div className={cn("animate-bounce rounded-full", color, sizeClasses[size])} />
      <div className={cn("animate-bounce rounded-full animation-delay-200", color, sizeClasses[size])} />
      <div className={cn("animate-bounce rounded-full animation-delay-500", color, sizeClasses[size])} />
    </div>
  )
}

