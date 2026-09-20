"use client"

import { cn } from "@/lib/utils"
import { navItems, type View } from "@/lib/nav"

type BottomNavProps = {
  view: View
  onViewChange: (view: View) => void
  savedCount: number
}

export function BottomNav({ view, onViewChange, savedCount }: BottomNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur sm:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const active = view === item.id
          const Icon = item.icon
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => onViewChange(item.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-lg py-2 text-xs font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="relative">
                  <Icon className="size-5" aria-hidden="true" />
                  {item.id === "saved" && savedCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                      {savedCount}
                    </span>
                  )}
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
