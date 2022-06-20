import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as path from "path";
import * as fs from "fs";
import { Helmet } from "react-helmet";

import { getPosts } from "./models/posts";
import Layout from "./components/layout";
import * as Post from "./pages/post";
import * as Home from "./pages/home";

// TODO: Generate the import map using a script and then consume it in this file.
// esbuild doesn't support dynamic imports (without writing a custom plugin)
// so, for now, I'm doing this gross import map thing
// https://github.com/evanw/esbuild/issues/56
const importMap: Record<
  string,
  { Component: React.FunctionComponent; loader?: () => Promise<any> }
> = {
  default: { Component: Post.default },
  home: { Component: Home.default, loader: Home.loader },
  post: { Component: Post.default },
};

type RenderProps = {
  page: Page;
  Component: React.FunctionComponent;
  loaderData?: any;
};

function render({ page, Component, loaderData }: RenderProps) {
  const { permalink } = page;
  fs.mkdirSync(path.dirname(permalink), { recursive: true });
  const props = { page, ...loaderData };

  const appString = ReactDOMServer.renderToStaticMarkup(
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
  const pages = await getPosts();
  for (const page of pages) {
    const { Component, loader } =
      importMap[page.frontmatter.layout] || importMap["default"];
    let loaderData;
    if (loader) {
      loaderData = await loader();
    }
    render({ page, Component, loaderData });
  }
}

main().catch((err) => console.error(err));
