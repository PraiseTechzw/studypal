import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" variant="primary" />
        <p className="text-muted-foreground animate-pulse">Loading resource exchange...</p>
      </div>
    </div>
  )
}

