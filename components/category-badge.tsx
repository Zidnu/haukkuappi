import { cn } from "@/lib/utils"
import { categoryLabel, type CategoryId } from "@/lib/data"

const styles: Record<CategoryId, string> = {
  "sled-dog": "bg-sky-100 text-sky-800",
  agility: "bg-emerald-100 text-emerald-800",
  showlink: "bg-violet-100 text-violet-800",
  obedience: "bg-rose-100 text-rose-800",
  general: "bg-amber-100 text-amber-800",
  "local-clubs": "bg-teal-100 text-teal-800",
}

export function CategoryBadge({ category }: { category: CategoryId }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        styles[category],
      )}
    >
      {categoryLabel(category)}
    </span>
  )
}
