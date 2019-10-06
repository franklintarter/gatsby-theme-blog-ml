import React from "react";
import { PostsFeed, Layout } from "../components";

export default ({ pageContext }) => {
  const { tag } = pageContext;
  return (
    <Layout>
      <PostsFeed tag={tag} />
    </Layout>
  );
};
