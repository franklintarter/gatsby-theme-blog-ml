import React from "react";

export default ({ caption, url }) => {
  if (!caption) {
    return <></>;
  }
  let captionElement;
  if (!url) {
    captionElement = (
      <span
        style={{
          color: "#718096"
        }}
      >
        {caption}
      </span>
    );
  } else {
    captionElement = (
      <a
        style={{
          color: "#718096"
        }}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={caption}
      >
        {caption}
      </a>
    );
  }
  return (
    <div style={{ textAlign: "center", padding: "0.75rem 1rem 1.25rem" }}>{captionElement}</div>
  );
};
