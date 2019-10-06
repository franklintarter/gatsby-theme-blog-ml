import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Post = ({
  data: {
    post,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => (
  <div>
    <MDXRenderer>{post.body}</MDXRenderer>
  </div>
)

export default Post
