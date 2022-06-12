import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as path from 'path';
import * as fs from 'fs';
import { Helmet } from 'react-helmet';

import { getAllPages } from './lib/posts';
import Layout from './components/layout';

// TODO:
// https://github.com/evanw/esbuild/issues/56
// https://github.com/RtVision/esbuild-dynamic-import

type RenderProps = {
  page: Page;
  Component: React.FunctionComponent;
};

function render({ page, Component }: RenderProps) {
  const { permalink } = page;
  fs.mkdirSync(path.dirname(permalink), { recursive: true });

  const appString = ReactDOMServer.renderToString(
    <Layout>
      {/* @ts-ignore */}
      <Component page={page} />
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
  const Component = (await import('./components/post')).default;
  const pages = await getAllPages();
  for (const page of pages) {
    render({ page, Component });
  }
}

main().catch((err) => console.error(err));
