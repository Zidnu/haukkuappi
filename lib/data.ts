export type CategoryId =
  | "sled-dog"
  | "agility"
  | "showlink"
  | "general"
  | "local-clubs"
  | "obedience"

export type Category = {
  id: CategoryId
  label: string
}

export const categories: Category[] = [
  { id: "sled-dog", label: "Sled Dog Sports" },
  { id: "agility", label: "Agility" },
  { id: "showlink", label: "Showlink" },
  { id: "obedience", label: "Obedience" },
  { id: "general", label: "General News" },
  { id: "local-clubs", label: "Local Clubs" },
]

export function categoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id
}

export type EventItem = {
  id: string
  type: "event"
  category: CategoryId
  title: string
  organizer: string
  location: string
  description: string
  /** ISO date string */
  date: string
}

export type BulletinItem = {
  id: string
  type: "bulletin"
  category: CategoryId
  title: string
  excerpt: string
  /** ISO date string */
  publishedAt: string
}

export type FeedItem = EventItem | BulletinItem

export const events: EventItem[] = [
  {
    id: "e1",
    type: "event",
    category: "agility",
    title: "Spring Agility Trial & Fun Match",
    organizer: "Northlake Agility Club",
    location: "Riverside Sports Field, Tampere",
    description:
      "A friendly qualifying trial with beginner and advanced courses. On-site vet check and coffee stand available all day.",
    date: "2026-04-18T09:00:00",
  },
  {
    id: "e2",
    type: "event",
    category: "sled-dog",
    title: "Snowline Sprint — 8 Dog Class",
    organizer: "Arctic Runners Kennel Assoc.",
    location: "Pyhä Trails, Lapland",
    description:
      "Two-day sprint racing across groomed forest trails. Spectator area and warm-up cabin open from 7am.",
    date: "2026-02-07T08:30:00",
  },
  {
    id: "e3",
    type: "event",
    category: "showlink",
    title: "All-Breed Championship Show",
    organizer: "Southern Kennel District",
    location: "Expo Hall B, Helsinki",
    description:
      "Conformation judging across all groups with international judges. Junior handling ring in the afternoon.",
    date: "2026-03-21T10:00:00",
  },
  {
    id: "e4",
    type: "event",
    category: "obedience",
    title: "Obedience Class III Competition",
    organizer: "Meadowbrook Dog Society",
    location: "Community Sports Hall, Turku",
    description:
      "Sanctioned obedience event with heelwork, retrieves and scent discrimination. Entries close two weeks prior.",
    date: "2026-05-09T11:00:00",
  },
  {
    id: "e5",
    type: "event",
    category: "local-clubs",
    title: "Puppy Socialisation Meetup",
    organizer: "Lakeside Paws Club",
    location: "Central Park Dog Green, Oulu",
    description:
      "Casual weekend meetup for puppies under 6 months. Guided play, basic handling tips and treats provided.",
    date: "2026-02-22T14:00:00",
  },
  {
    id: "e6",
    type: "event",
    category: "agility",
    title: "Indoor Winter Agility Camp",
    organizer: "Northlake Agility Club",
    location: "Arena 4 Indoor Hall, Jyväskylä",
    description:
      "Three-session weekend camp focused on contact obstacles and handling systems for all levels.",
    date: "2026-01-31T09:30:00",
  },
]

export const bulletins: BulletinItem[] = [
  {
    id: "b1",
    type: "bulletin",
    category: "general",
    title: "New National Guidelines for Outdoor Trials Published",
    excerpt:
      "The kennel federation released updated welfare and safety guidance for cold-weather events, effective next season.",
    publishedAt: "2026-01-12T10:00:00",
  },
  {
    id: "b2",
    type: "bulletin",
    category: "sled-dog",
    title: "Record Entries for This Winter's Sprint Series",
    excerpt:
      "Organisers report a 30% rise in registrations, prompting an expanded schedule and additional volunteer calls.",
    publishedAt: "2026-01-08T08:15:00",
  },
  {
    id: "b3",
    type: "bulletin",
    category: "showlink",
    title: "Online Show Registration Portal Gets a Refresh",
    excerpt:
      "The Showlink platform now supports mobile entries, digital catalogues and instant result notifications.",
    publishedAt: "2026-01-05T16:30:00",
  },
  {
    id: "b4",
    type: "bulletin",
    category: "local-clubs",
    title: "Lakeside Paws Club Opens Winter Membership",
    excerpt:
      "Early-bird memberships include free entry to two training days and a discount on the spring handling course.",
    publishedAt: "2025-12-28T12:00:00",
  },
  {
    id: "b5",
    type: "bulletin",
    category: "agility",
    title: "Course Design Workshop Announced for Judges",
    excerpt:
      "A two-day workshop will cover flow, safety spacing and the latest international course-building standards.",
    publishedAt: "2025-12-20T09:45:00",
  },
]

export const feedItems: FeedItem[] = [...events, ...bulletins].sort((a, b) => {
  const da = a.type === "event" ? a.date : a.publishedAt
  const db = b.type === "event" ? b.date : b.publishedAt
  return +new Date(db) - +new Date(da)
})
