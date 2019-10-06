import React from "react";
import BlogPreview from "./BlogPreview";

export default ({ posts }) => {
  const postElements = posts.map(p => (
    <BlogPreview key={p.mdx.frontmatter.slug} title={p.mdx.frontmatter.title} url={p.mdx.frontmatter.slug} />
  ));

  return <div>{postElements}</div>;
};
