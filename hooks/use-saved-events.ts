"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "tassutiedote:saved-events"

export function useSavedEvents() {
  const [saved, setSaved] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSaved(JSON.parse(raw))
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {
      // ignore quota/serialization errors
    }
  }, [saved, hydrated])

  const isSaved = useCallback((id: string) => saved.includes(id), [saved])

  const toggle = useCallback((id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  return { saved, isSaved, toggle, hydrated }
}
