import type { Metadata } from "next"
import DictionaryClientPage from "./DictionaryClientPage"

export const metadata: Metadata = {
  title: "Dictionary API | Bless API Book",
  description: "Learn how to use the Dictionary API to get word definitions and more",
}

export default function DictionaryAPIPage() {
  return <DictionaryClientPage />
}
