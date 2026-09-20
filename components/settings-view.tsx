"use client"

import { useState } from "react"
import { Bell, Moon, Globe, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ToggleRow = {
  id: string
  icon: typeof Bell
  label: string
  description: string
}

const toggles: ToggleRow[] = [
  {
    id: "notifications",
    icon: Bell,
    label: "Event reminders",
    description: "Get a nudge the day before saved events.",
  },
  {
    id: "digest",
    icon: Globe,
    label: "Weekly digest",
    description: "A Monday summary of new bulletins in your feed.",
  },
  {
    id: "dark",
    icon: Moon,
    label: "Reduce motion",
    description: "Minimise animations across the app.",
  },
]

type SettingsViewProps = {
  savedCount: number
  onClearSaved: () => void
}

export function SettingsView({ savedCount, onClearSaved }: SettingsViewProps) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    notifications: true,
    digest: false,
    dark: false,
  })

  return (
    <section aria-labelledby="settings-heading" className="space-y-3">
      <h2 id="settings-heading" className="sr-only">
        Settings
      </h2>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {toggles.map((row, i) => {
          const Icon = row.icon
          const on = enabled[row.id]
          return (
            <div
              key={row.id}
              className={cn(
                "flex items-center gap-3 p-4",
                i !== toggles.length - 1 && "border-b border-border",
              )}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={row.label}
                onClick={() =>
                  setEnabled((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                }
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                  on ? "bg-primary" : "bg-muted-foreground/30",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform",
                    on ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </button>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Saved events</p>
            <p className="text-xs text-muted-foreground">
              {savedCount} {savedCount === 1 ? "event" : "events"} stored on this device.
            </p>
          </div>
          <button
            type="button"
            onClick={onClearSaved}
            disabled={savedCount === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Clear
          </button>
        </div>
      </div>

      <p className="px-1 text-center text-xs text-muted-foreground">
        TassuTiedote · Preferences are saved on this device.
      </p>
    </section>
  )
}
