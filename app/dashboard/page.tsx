import { ResourceGrid } from "@/components/resource-grid"
import { SearchFilters } from "@/components/search-filters"
import { Calendar } from "@/components/calendar"
import { StorageQuota } from "@/components/storage-quota"
import { TagCloud } from "@/components/tag-cloud"
import { AddMaterial } from "@/components/add-material"
import { WelcomeBanner } from "@/components/welcome-banner"
import { AiRecommendations } from "@/components/ai-recommendations"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <WelcomeBanner userName="Alex" notificationCount={3} />
        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-6">
            <QuickActions />
            <SearchFilters />
            <ResourceGrid />
          </div>
          <div className="space-y-6">
            <AiRecommendations />
            <Calendar />
            <StorageQuota />
            <TagCloud />
          </div>
        </div>
      </div>
      <AddMaterial />
    </div>
  )
}

