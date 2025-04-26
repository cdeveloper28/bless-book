import type { Metadata } from "next"
import IPGeolocationClientPage from "./IPGeolocationClientPage"

export const metadata: Metadata = {
  title: "IP Geolocation API | Bless API Book",
  description: "Learn how to use the IP Geolocation API to get location data from IP addresses",
}

export default function IPGeolocationAPIPage() {
  return <IPGeolocationClientPage />
}
