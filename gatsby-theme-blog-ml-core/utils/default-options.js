module.exports = themeOptions => {
  const basePath = themeOptions.basePath || `/`;
  const contentPath = themeOptions.contentPath || `static/posts`;
  const assetPath = themeOptions.assetPath || `static/images`;

  return {
    basePath,
    contentPath,
    assetPath
  };
};
