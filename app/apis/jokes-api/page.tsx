import type { Metadata } from "next"
import JokesAPIPageClient from "./JokesAPIPageClient"

export const metadata: Metadata = {
  title: "Jokes API | Bless API Book",
  description: "Learn how to use the Jokes API to get random jokes for your applications",
}

export default function JokesAPIPage() {
  return <JokesAPIPageClient />
}
