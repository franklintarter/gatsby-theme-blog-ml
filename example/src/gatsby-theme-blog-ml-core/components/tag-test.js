import React from "react"
import { usePosts, useTags } from "gatsby-theme-blog-ml-core"

export default ({ tag }) => {
  const posts = usePosts({ tag })
  const tags = useTags()
  // return <pre>{JSON.stringify({}, null, 2)}</pre>
  return <pre>{JSON.stringify({ posts, tags }, null, 2)}</pre>
}
