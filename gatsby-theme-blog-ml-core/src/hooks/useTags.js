import { useStaticQuery, graphql } from "gatsby";

export default ({ tags } = {}) => {
  const { allTags } = useStaticQuery(graphql`
    query TagsQuery {
      allTags: allBlogTag(limit: 1000) {
        nodes {
          count
          name
          slug
        }
      }
    }
  `);

  let selectedTags = allTags.nodes;
  if (tags) {
    selectedTags = selectedTags.filter(t => tags.includes(t.name));
  }

  return selectedTags;
};
