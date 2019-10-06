import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Image from "gatsby-image";
import { MDXProvider } from "@mdx-js/react";
import { Layout, ImageCaption } from "../components";
import { useTags } from "../hooks";

export default ({ data }) => {
  const { blogPost, next, previous } = data;
  const { mdx } = blogPost;
  const { body, frontmatter } = mdx;
  const { title, date, tags, featuredImage, featuredImageCaption, featuredImageUrl } = frontmatter;
  const postTags = useTags({ tags });
  const tagElements = postTags.map(t => (
    <li key={t.name}>
      <Link to={t.slug}>{t.name}</Link>
    </li>
  ));

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{date}</p>
      <Image fluid={featuredImage.childImageSharp.fluid} />
      <ImageCaption caption={featuredImageCaption} url={featuredImageUrl} /> 
      <MDXProvider>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>

      {postTags.length > 0 && (
        <div>
          <span>Tags</span>
          <ul>{tagElements}</ul>
        </div>
      )}
      {next && <Link to={next.mdx.frontmatter.slug}>Next {next.mdx.frontmatter.title}</Link>}
      <br />
      <br />
      {previous && <Link to={previous.mdx.frontmatter.slug}>Previous {previous.mdx.frontmatter.title}</Link>}
    </Layout>
  );
};

export const query = graphql`
  query PostPageQuery($id: String!, $previousId: String, $nextId: String) {
    blogPost(id: { eq: $id }) {
      id
      mdx {
        excerpt
        body
        frontmatter {
          slug
          title
          tags
          featuredImageCaption
          featuredImageUrl
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 700, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      mdx {
        excerpt
        frontmatter {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      mdx {
        excerpt
        frontmatter {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;
