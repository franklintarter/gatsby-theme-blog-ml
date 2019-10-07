# Gatsby Theme: Blog Mortar Labs

This is the theme [Mortar Labs](https://mortar-labs.com) uses to add blog functionality to client sites.

## Setup

```bash
yarn install gatsby-theme-blog-ml
```

### Quick Setup

```js
// gatsby-config.js
module.exports = {
  plugins: [`gatsby-theme-blog-ml-core`, "gatsby-plugin-netlify-cms"]
};
```

### Options

```js
// gatsby-config.js
plugins[
  {
    resolve: `gatsby-theme-blog-ml-core`,
    options: {
      contentPath: "", // where the posts.mdx will live defaults to `static/posts`
      assetPath: "" // where the imgs (or other assets) will live defaults to `static/images`
    }
  }
];
```

### NetlifyCMS

Check out [static/admin/config.yml](https://github.com/franklintarter/gatsby-theme-blog-ml/tree/master/example) to see an example NetlifyCMS setup that works with the theme default values.

### Component Shadowing

The components and pages are unstyled by design and meant to be shadowed. Check out the [src](https://github.com/franklintarter/gatsby-theme-blog-ml/tree/master/gatsby-theme-blog-ml-core/src) directory to shadow any of the pages/components/templates the theme provides.

```txt:title="gatsby-theme-blog-ml-core"
src
├── components
│   ├── ...
├── gatsby-theme-blog-ml-core
    ├───components
    ├───── BlogPreview.js
    ├───── ...
    ├── templates
    ├────── post-page.js
    ├────── ...
    └── pages
        └─── blog
             ├── index.js
             ├── ...
```

### Example

See [example project](https://github.com/franklintarter/gatsby-theme-blog-ml/tree/master/example) for full usage example.

## Contribute

Ideas? Issues? Open an issue or a PR!
