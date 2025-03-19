import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingCardProps {
  hasHeader?: boolean
  hasFooter?: boolean
  lines?: number
}

export function LoadingCard({ hasHeader = true, hasFooter = false, lines = 3 }: LoadingCardProps) {
  return (
    <Card className="overflow-hidden">
      {hasHeader && (
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
      )}
      <CardContent className="px-4 py-2">
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} className="h-4" style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }} />
          ))}
        </div>
      </CardContent>
      {hasFooter && (
        <CardFooter className="px-4 py-3">
          <Skeleton className="h-8 w-full" />
        </CardFooter>
      )}
    </Card>
  )
}

