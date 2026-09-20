import { ArrowRight, Newspaper } from "lucide-react"
import { CategoryBadge } from "@/components/category-badge"
import type { BulletinItem } from "@/lib/data"

export function BulletinCard({ bulletin }: { bulletin: BulletinItem }) {
  const published = new Date(bulletin.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-center justify-between gap-2">
        <CategoryBadge category={bulletin.category} />
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Newspaper className="size-3.5" aria-hidden="true" />
          Bulletin
        </span>
      </div>

      <h3 className="text-pretty text-base font-semibold leading-snug text-foreground">
        {bulletin.title}
      </h3>

      <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{bulletin.excerpt}</p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <time className="text-xs text-muted-foreground" dateTime={bulletin.publishedAt}>
          {published}
        </time>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          Read more
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
