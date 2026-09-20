import type { LucideIcon } from "lucide-react"
import { Home, Star, LayoutGrid, Settings } from "lucide-react"

export type View = "feed" | "saved" | "categories" | "settings"

export type NavItem = {
  id: View
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: "feed", label: "Feed", icon: Home },
  { id: "saved", label: "Saved", icon: Star },
  { id: "categories", label: "Categories", icon: LayoutGrid },
  { id: "settings", label: "Settings", icon: Settings },
]
