import React from "react";
import { Link } from "gatsby";

export default ({ children }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
      <div style={{ maxWidth: "36rem", margin: "auto" }}>{children}</div>
    </div>
  );
};
