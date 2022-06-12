import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as path from 'path';
import * as fs from 'fs';
import { Helmet } from 'react-helmet';

import { getAllPosts } from './lib/posts';
import Layout from './components/layout';
import Post from './components/post';

const posts = getAllPosts();
posts.forEach((post) => {
  const file = `dist/posts/${post.slug}/index.html`;
  fs.mkdirSync(path.dirname(file), { recursive: true });

  const appString = ReactDOMServer.renderToString(
    <Layout>
      <Post post={post} />
    </Layout>
  );
  const helmet = Helmet.renderStatic();

  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        ${appString}
      </body>
    </html>
  `;

  fs.writeFileSync(file, html);
});
