import React from 'react';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

export default function Post({ post }) {
  const { frontmatter, content } = post;
  return (
    <html>
      <head>
        <title>{frontmatter.title}</title>
      </head>
      <body>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
      </body>
    </html>
  );
}
