import React from "react";
import { Link } from "gatsby";

export default ({ title, url }) => {
  return (
    <Link to={url}>
      <article>
        <h3>{title}</h3>
      </article>
    </Link>
  );
};
