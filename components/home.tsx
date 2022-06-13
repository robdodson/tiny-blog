import React from 'react';
import { Helmet } from 'react-helmet';
import MarkdownIt from 'markdown-it';
import { getAllPages } from '../lib/posts';
const md = new MarkdownIt();

export async function loader() {
  const pages = await getAllPages();
  const posts = pages.filter((page) => page.permalink.includes('/posts/'));
  return { posts };
}

export default function Home(props) {
  const { frontmatter, content } = props.page;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>robdodson.me</title>
        <link rel="canonical" href="http://robdodson.me" />
      </Helmet>

      <h1>{frontmatter.introHeading}</h1>
      <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
      <h2>Posts</h2>
      <ul>
        {props.posts.map((post) => (
          <li key={post.slug}>
            <a href={post.slug}>{post.frontmatter.title}</a>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
}
