const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const crypto = require(`crypto`);
const Debug = require(`debug`);
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

const debug = Debug(`gatsby-theme-blog-core`);
const withDefaults = require(`./utils/default-options`);

const _ = require("lodash");

const TagsTemplate = require.resolve("./src/templates/tag-page.js");
const PostTemplate = require.resolve("./src/templates/post-page.js");

exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const { contentPath, assetPath } = withDefaults(themeOptions);

  const dirs = [
    path.join(program.directory, contentPath),
    path.join(program.directory, assetPath)
  ];

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`);
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

exports.createPages = async ({ actions, graphql, createNodeId }) => {
  const { createPage, createNode } = actions;

  const result = await graphql(`
    {
      tagsQuery: allBlogPost(limit: 1000) {
        nodes {
          mdx {
            frontmatter {
              tags
            }
          }
        }
      }
      postsQuery: allBlogPost(limit: 1000) {
        nodes {
          id
          mdx {
            frontmatter {
              slug
              tags
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    result.errors.forEach(e => debug(e.toString()));
    return;
  }

  // Post pages
  const posts = result.data.postsQuery.nodes;
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];
    const { slug } = post.mdx.frontmatter;
    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.id : undefined,
        nextId: next ? next.id : undefined
      }
    });
  });

  // Tags pages
  const tags = _.uniq(
    result.data.tagsQuery.nodes
      .map(n => n.mdx.frontmatter.tags)
      .filter(t => t !== null)
      .reduce((acc, val) => acc.concat(val), [])
  );

  tags.forEach(tag => {
    const tagPath = `/tags/${_.kebabCase(tag)}/`;
    createPage({
      path: tagPath,
      component: TagsTemplate,
      context: {
        tag
      }
    });

    const count = result.data.postsQuery.nodes
      .filter(p => p.mdx.frontmatter.tags !== null)
      .filter(p => p.mdx.frontmatter.tags.includes(tag)).length;

    const id = createNodeId(tag);
    const fieldData = {
      name: tag,
      count,
      slug: tagPath
    };

    createNode({
      id,
      ...fieldData,
      children: [],
      internal: {
        type: "BlogTag",
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Implementation of the BlogTag interface`
      }
    });
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes(`interface IBlogTag @nodeInterface {
    id: ID!
    name: String!
    count: Int!
    slug: String!
  }`);

  createTypes(
    schema.buildObjectType({
      name: "BlogTag",
      fields: {
        id: { type: "ID!" },
        name: { type: "String!" },
        slug: { type: "String!" },
        count: { type: "Int!" }
      },
      interfaces: [`Node`, "IBlogTag"]
    })
  );

  createTypes([
    `
      interface IBlogPost @nodeInterface {
        id: ID!
        mdx: Mdx!
      }
    `
  ]);

  createTypes(
    schema.buildObjectType({
      name: "BlogPost",
      fields: {
        id: { type: "ID!" },
        mdx: { type: "Mdx!" }
      },
      interfaces: ["Node", "IBlogPost"]
    })
  );
};

exports.onCreateNode = async (
  { node, actions, createNodeId, getNode },
  themeOptions
) => {
  const { createNode } = actions;
  fmImagesToRelative(node);
  // Restrict blog post creation to MDX with the Source Instance Name Defined in Options
  if (node.internal.type !== "Mdx") {
    return;
  }
  const parent = getNode(node.parent);
  const { contentPath } = withDefaults(themeOptions);
  if (parent.sourceInstanceName !== contentPath) {
    return;
  }

  createNode({
    id: createNodeId(`BlogPost-${node.id}`),
    parent: node.id,
    mdx: node,
    internal: {
      type: "BlogPost",
      contentDigest: node.internal.contentDigest
    }
  });
};
