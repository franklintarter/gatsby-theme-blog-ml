module.exports = themeOptions => {
  const contentPath = themeOptions.contentPath || `content/posts`;
  const assetPath = themeOptions.assetPath || `static/uploads`;

  return {
    contentPath,
    assetPath
  };
};
