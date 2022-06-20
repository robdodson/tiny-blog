import React from "react";
import { Helmet } from "react-helmet";

export default function Post({ page }) {
  const { frontmatter, content } = page;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{frontmatter.title}</title>
        <link rel="canonical" href="http://robdodson.me" />
      </Helmet>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
