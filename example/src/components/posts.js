import React from "react"

const Posts = ({ location, posts, siteTitle }) => (
  <div>
    {location}
    {siteTitle}
    <ul>
      {posts.map(({ node }) => (
        <li>{node.title}</li>
      ))}
    </ul>
  </div>
)

export default Posts
