import type { Metadata } from "next"
import RESTCountriesAPIPageClient from "./RESTCountriesAPIPageClient"

export const metadata: Metadata = {
  title: "REST Countries API | Bless API Book",
  description: "Learn how to use the REST Countries API to get information about countries",
}

export default function RESTCountriesAPIPage() {
  return <RESTCountriesAPIPageClient />
}
