"use client"

import { cn } from "@/lib/utils"
import { categories, type CategoryId } from "@/lib/data"

type FilterBarProps = {
  active: CategoryId | "all"
  onChange: (value: CategoryId | "all") => void
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  const pills: { id: CategoryId | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ]

  return (
    <div className="-mx-4 sm:-mx-6">
      <div
        className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filter by category"
      >
        {pills.map((pill) => {
          const isActive = active === pill.id
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => onChange(pill.id)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {pill.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
