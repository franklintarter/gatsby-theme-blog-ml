import React from "react";
import { Link } from "gatsby";
import useTags from "../hooks/useTags";

export default ({ tag }) => {
  const tags = useTags();

  const tagElements = tags.map(t => {
    const color = t.name === tag ? "red" : "black";
    return (
      <li key={t.name}>
        <Link to={t.slug} style={{ color }}>
          {t.name} ({t.count})
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h3>Tags</h3>
      <ul>{tagElements}</ul>
    </div>
  );
};
