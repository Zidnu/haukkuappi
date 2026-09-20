"use client"

import { useMemo, useState } from "react"
import { CalendarX, Search as SearchIcon, Star } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { BottomNav } from "@/components/bottom-nav"
import { FilterBar } from "@/components/filter-bar"
import { FeedList } from "@/components/feed-list"
import { CategoriesView } from "@/components/categories-view"
import { SettingsView } from "@/components/settings-view"
import { EmptyState } from "@/components/empty-state"
import { useSavedEvents } from "@/hooks/use-saved-events"
import { feedItems, events, type CategoryId, type FeedItem } from "@/lib/data"
import type { View } from "@/lib/nav"

function matchesQuery(item: FeedItem, q: string): boolean {
  if (!q) return true
  const haystack = [
    item.title,
    item.type === "event" ? item.organizer : item.excerpt,
    item.type === "event" ? item.location : "",
    item.type === "event" ? item.description : "",
  ]
    .join(" ")
    .toLowerCase()
  return haystack.includes(q.toLowerCase())
}

const viewTitles: Record<View, string> = {
  feed: "Latest Feed",
  saved: "My Saved Events",
  categories: "Categories",
  settings: "Settings",
}

const viewSubtitles: Record<View, string> = {
  feed: "News and events from your dog community, all in one place.",
  saved: "Events you've bookmarked to keep track of.",
  categories: "Browse bulletins and events by activity.",
  settings: "Manage your feed and preferences.",
}

export default function Page() {
  const [view, setView] = useState<View>("feed")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<CategoryId | "all">("all")
  const { isSaved, toggle, saved } = useSavedEvents()

  const filteredFeed = useMemo(
    () =>
      feedItems.filter(
        (item) =>
          (category === "all" || item.category === category) &&
          matchesQuery(item, query),
      ),
    [category, query],
  )

  const savedEvents = useMemo(
    () => events.filter((e) => saved.includes(e.id) && matchesQuery(e, query)),
    [saved, query],
  )

  function handleSelectCategory(id: CategoryId) {
    setCategory(id)
    setView("feed")
  }

  function handleClearSaved() {
    saved.forEach((id) => toggle(id))
  }

  return (
    <div className="min-h-dvh bg-background pb-24 sm:pb-10">
      <SiteHeader
        query={query}
        onQueryChange={setQuery}
        view={view}
        onViewChange={setView}
        savedCount={saved.length}
      />

      <main className="mx-auto max-w-3xl px-4 py-5 sm:px-6 lg:max-w-5xl">
        <div className="mb-4">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {viewTitles[view]}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{viewSubtitles[view]}</p>
        </div>

        {view === "feed" && (
          <div className="space-y-4">
            <FilterBar active={category} onChange={setCategory} />
            {filteredFeed.length > 0 ? (
              <FeedList items={filteredFeed} isSaved={isSaved} onToggleSave={toggle} />
            ) : (
              <EmptyState
                icon={SearchIcon}
                title="No matches found"
                description="Try a different search term or clear the active category filter."
              />
            )}
          </div>
        )}

        {view === "saved" && (
          <div>
            {savedEvents.length > 0 ? (
              <FeedList items={savedEvents} isSaved={isSaved} onToggleSave={toggle} />
            ) : (
              <EmptyState
                icon={saved.length === 0 ? Star : CalendarX}
                title={saved.length === 0 ? "No saved events yet" : "No matches found"}
                description={
                  saved.length === 0
                    ? "Tap the star on any event to keep it here for quick access."
                    : "None of your saved events match the current search."
                }
              />
            )}
          </div>
        )}

        {view === "categories" && (
          <CategoriesView onSelect={handleSelectCategory} />
        )}

        {view === "settings" && (
          <SettingsView savedCount={saved.length} onClearSaved={handleClearSaved} />
        )}
      </main>

      <BottomNav view={view} onViewChange={setView} savedCount={saved.length} />
    </div>
  )
}
