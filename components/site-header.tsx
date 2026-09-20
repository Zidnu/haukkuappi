"use client"

import { Search, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { DesktopNav } from "@/components/desktop-nav"
import type { View } from "@/lib/nav"

type SiteHeaderProps = {
  query: string
  onQueryChange: (value: string) => void
  view: View
  onViewChange: (view: View) => void
  savedCount: number
}

export function SiteHeader({
  query,
  onQueryChange,
  view,
  onViewChange,
  savedCount,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-3 sm:px-6 lg:max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <DesktopNav
            view={view}
            onViewChange={onViewChange}
            savedCount={savedCount}
          />
        </div>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search news, events, clubs..."
            aria-label="Search news and events"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
