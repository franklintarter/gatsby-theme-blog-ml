const withDefaults = require(`./utils/default-options`);
const remarkSlug = require(`remark-slug`);

module.exports = themeOptions => {
  const options = withDefaults(themeOptions);
  const { mdx = true } = themeOptions;
  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.assetPath,
          name: options.assetPath
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.contentPath,
          name: options.contentPath
        }
      },
      "gatsby-plugin-sharp",
      "gatsby-transformer-sharp",
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          gatsbyRemarkPlugins: [
            { resolve: `gatsby-remark-relative-images` },
            {
              resolve: "gatsby-remark-images",
              options: {
                // It's important to specify the maxWidth (in pixels) of
                // the content container as this plugin uses this as the
                // base for generating different widths of each image.
                maxWidth: 1280
              }
            },
            { resolve: `gatsby-remark-smartypants` }
          ],
          remarkPlugins: [remarkSlug],
          plugins: [`gatsby-remark-images`]
        }
      }
    ].filter(Boolean)
  };
};
