module.exports = themeOptions => {
  const contentPath = themeOptions.contentPath || `static/posts`;
  const assetPath = themeOptions.assetPath || `static/images`;

  return {
    contentPath,
    assetPath
  };
};
