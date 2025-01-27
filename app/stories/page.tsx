import { Suspense } from "react"
import StoriesContent from "./stories-content"
import Loading from "./loading"

export default function Stories() {
  return (
    <Suspense fallback={<Loading />}>
      <StoriesContent />
    </Suspense>
  )
}

