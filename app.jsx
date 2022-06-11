import * as React from 'react';
import * as Server from 'react-dom/server';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';

export const POSTS_PATH = path.join(process.cwd(), 'posts');

export const getSourceOfFile = (fileName) => {
  return fs.readFileSync(path.join(POSTS_PATH, fileName), 'utf-8');
};

export const getAllPosts = () => {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.md$/.test(path))
    .map((fileName) => {
      const source = getSourceOfFile(fileName);
      const slug = fileName.replace(/\.md$/, '');
      const { data, content } = matter(source);

      return {
        frontmatter: data,
        slug: slug,
        content,
      };
    });
};

function Post({ post }) {
  const { frontmatter, content } = post;
  return (
    <html>
      <head>
        <title>{frontmatter.title}</title>
      </head>
      <body>
        <h1>{frontmatter.title}</h1>
        <section>{content}</section>
      </body>
    </html>
  );
}

const posts = getAllPosts();
posts.forEach((post) => {
  const file = `dist/posts/${post.slug}/index.html`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Server.renderToString(<Post post={post} />));
});
