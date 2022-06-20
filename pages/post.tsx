import React from "react";
import { Helmet } from "react-helmet";

import Tags from "../components/tags";

export default function Post({ page }) {
  const { frontmatter, content } = page;
  const { tags } = frontmatter;
  return (
    <>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <main className="mx-auto max-w-4xl py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <article className="prose md:prose-lg lg:prose-xl">
          <h1>{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <hr />
          {tags && tags.length && <Tags tags={tags} />}
        </article>
      </main>
    </>
  );
}
