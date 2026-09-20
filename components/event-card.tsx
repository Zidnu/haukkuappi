"use client"

import { MapPin, Users, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { CategoryBadge } from "@/components/category-badge"
import type { EventItem } from "@/lib/data"

type EventCardProps = {
  event: EventItem
  saved: boolean
  onToggleSave: (id: string) => void
}

export function EventCard({ event, saved, onToggleSave }: EventCardProps) {
  const date = new Date(event.date)
  const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
  const day = date.getDate()
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" })

  return (
    <article className="group relative flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col items-center justify-center rounded-xl bg-primary/10 px-3 py-2 text-center text-primary">
        <span className="text-[11px] font-bold tracking-wide">{month}</span>
        <span className="text-2xl font-bold leading-none">{day}</span>
        <span className="mt-0.5 text-[11px] font-medium text-primary/70">{weekday}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <CategoryBadge category={event.category} />
          <button
            type="button"
            onClick={() => onToggleSave(event.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${event.title} from saved events` : `Save ${event.title} to my events`}
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
              saved
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Star className={cn("size-5", saved && "fill-current")} aria-hidden="true" />
          </button>
        </div>

        <h3 className="text-pretty text-base font-semibold leading-snug text-foreground">
          {event.title}
        </h3>

        <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5 shrink-0" aria-hidden="true" />
            <dt className="sr-only">Organizer</dt>
            <dd className="truncate">{event.organizer}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <dt className="sr-only">Location</dt>
            <dd className="truncate">{event.location}</dd>
          </div>
        </dl>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/80">
          {event.description}
        </p>

        <p className="mt-2 text-xs font-medium text-primary">Starts {time}</p>
      </div>
    </article>
  )
}
