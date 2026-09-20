"use client"

import { ChevronRight } from "lucide-react"
import { categories, feedItems, type CategoryId } from "@/lib/data"
import { CategoryBadge } from "@/components/category-badge"

type CategoriesViewProps = {
  onSelect: (id: CategoryId) => void
}

export function CategoriesView({ onSelect }: CategoriesViewProps) {
  return (
    <section aria-labelledby="categories-heading" className="space-y-3">
      <h2 id="categories-heading" className="sr-only">
        Browse categories
      </h2>
      {categories.map((category) => {
        const count = feedItems.filter((i) => i.category === category.id).length
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="flex flex-col gap-1.5">
              <CategoryBadge category={category.id} />
              <span className="text-sm text-muted-foreground">
                {count} {count === 1 ? "post" : "posts"}
              </span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>
        )
      })}
    </section>
  )
}
