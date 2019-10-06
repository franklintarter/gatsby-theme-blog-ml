import React from "react";
import { TagsList, BlogRoll } from ".";
import { usePosts } from "../hooks";

export default ({ tag }) => {
  const posts = usePosts({ tag });
  const heading = tag ? `Posts on ${tag}` : "Recent Posts";
  return (
    <div>
      <h2>{heading}</h2>
      <BlogRoll posts={posts} />
      <TagsList tag={tag} feedType="tag" />
    </div>
  );
};
