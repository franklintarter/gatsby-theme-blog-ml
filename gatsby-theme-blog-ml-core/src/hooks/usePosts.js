import { useStaticQuery, graphql } from "gatsby";

const usePosts = ({ tag = null } = {}) => {
  const { allBlogPost } = useStaticQuery(
    graphql`
      query PostsFeedQuery {
        allBlogPost(
          sort: {
            fields: [mdx___frontmatter___date, mdx___frontmatter___title]
            order: DESC
          }
          limit: 1000
        ) {
          edges {
            node {
              id
              mdx {
                excerpt
                frontmatter {
                  slug
                  title
                  tags
                  date(formatString: "MMMM DD, YYYY")
                  featuredImage {
                    childImageSharp {
                      fluid(maxWidth: 720, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const posts = allBlogPost.edges.map(e => e.node);

  if (tag) {
    return posts
      .filter(p => p.mdx.frontmatter.tags !== null)
      .filter(p => p.mdx.frontmatter.tags.includes(tag));
  }
  return posts;
};

export default usePosts;
