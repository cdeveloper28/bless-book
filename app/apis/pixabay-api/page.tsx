import type { Metadata } from "next"
import PixabayAPIPageClient from "./PixabayAPIPageClient"

export const metadata: Metadata = {
  title: "Pixabay API | Bless API Book",
  description: "Learn how to use the Pixabay API to access free stock images, videos, and illustrations",
}

export default function PixabayAPIPage() {
  return <PixabayAPIPageClient />
}
