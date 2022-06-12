import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as path from 'path';
import * as fs from 'fs';
import { Helmet } from 'react-helmet';

import { getAllPosts, HOME_PATH, POSTS_PATH } from './lib/posts';
import Layout from './components/layout';

// TODO:
// https://github.com/evanw/esbuild/issues/56
// https://github.com/RtVision/esbuild-dynamic-import

async function renderPosts() {
  const posts = getAllPosts(POSTS_PATH);
  for (const post of posts) {
    const permalink = `dist/posts/${post.slug}/index.html`;
    const Component = (await import('./components/post')).default;
    const props = { post };
    render({ permalink, Component, props });
  }
}

type RenderProps = {
  permalink: string;
  Component: React.FunctionComponent;
  props: Object;
};

function render({ permalink, Component, props }: RenderProps) {
  fs.mkdirSync(path.dirname(permalink), { recursive: true });

  const appString = ReactDOMServer.renderToString(
    <Layout>
      {/* @ts-ignore */}
      <Component {...props} />
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

  fs.writeFileSync(permalink, html);
}

async function main() {
  renderPosts();
}

main().catch((err) => console.error(err));
