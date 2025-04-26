import type { Metadata } from "next"
import RecipeAPIPageClient from "./RecipeAPIPageClient"

export const metadata: Metadata = {
  title: "Recipe API | Bless API Book",
  description: "Learn how to use the Recipe API to get food recipes and cooking instructions",
}

export default function RecipeAPIPage() {
  return <RecipeAPIPageClient />
}
