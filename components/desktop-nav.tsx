"use client"

import { cn } from "@/lib/utils"
import { navItems, type View } from "@/lib/nav"

type DesktopNavProps = {
  view: View
  onViewChange: (view: View) => void
  savedCount: number
}

export function DesktopNav({ view, onViewChange, savedCount }: DesktopNavProps) {
  return (
    <nav aria-label="Primary" className="hidden sm:block">
      <ul className="flex items-center gap-1">
        {navItems.map((item) => {
          const active = view === item.id
          const Icon = item.icon
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onViewChange(item.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span>{item.label}</span>
                {item.id === "saved" && savedCount > 0 && (
                  <span
                    className={cn(
                      "ml-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold",
                      active
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-accent text-accent-foreground",
                    )}
                  >
                    {savedCount}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
