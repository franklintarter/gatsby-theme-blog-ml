module.exports = themeOptions => {
  const contentPath = themeOptions.contentPath || `src/content/posts`;
  const assetPath = themeOptions.assetPath || `static/uploads`;

  return {
    contentPath,
    assetPath
  };
};
