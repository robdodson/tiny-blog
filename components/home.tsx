import React from 'react';
import { Helmet } from 'react-helmet';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

export default function Home({ post }) {
  const { frontmatter, content } = post;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{frontmatter.title}</title>
        <link rel="canonical" href="http://robdodson.me" />
      </Helmet>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
    </>
  );
}
