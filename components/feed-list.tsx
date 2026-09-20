"use client"

import { EventCard } from "@/components/event-card"
import { BulletinCard } from "@/components/bulletin-card"
import type { FeedItem } from "@/lib/data"

type FeedListProps = {
  items: FeedItem[]
  isSaved: (id: string) => boolean
  onToggleSave: (id: string) => void
}

export function FeedList({ items, isSaved, onToggleSave }: FeedListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          {item.type === "event" ? (
            <EventCard
              event={item}
              saved={isSaved(item.id)}
              onToggleSave={onToggleSave}
            />
          ) : (
            <BulletinCard bulletin={item} />
          )}
        </li>
      ))}
    </ul>
  )
}
