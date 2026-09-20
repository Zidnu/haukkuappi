import { PawPrint } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <PawPrint className="size-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Tassu<span className="text-primary">Tiedote</span>
      </span>
    </div>
  )
}
