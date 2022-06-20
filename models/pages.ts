import * as path from "path";
import * as fs from "fs";

import glob from "fast-glob";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

export const SITE_DIR = path.join(process.cwd(), "site");
export const DIST_DIR = path.join(process.cwd(), "dist");

const md = new MarkdownIt({ html: true });

let pagesCache: PageData[] = [];

export function defaultPermalink(fileName: string) {
  return path
    .join(path.dirname(fileName), path.basename(fileName, ".md"), "index.html")
    .replace(SITE_DIR, DIST_DIR);
}

export const getSourceOfFile = (fileName: string) => {
  return fs.readFileSync(fileName, "utf-8");
};

export async function getPages(): Promise<PageData[]> {
  if (pagesCache.length) {
    return pagesCache;
  }

  let files = await glob(path.join(SITE_DIR, "**", "*.md"));
  let out = [];
  for (const fileName of files) {
    const source = getSourceOfFile(fileName);
    const slug = fileName.replace(/\.md$/, "");
    const { data, content } = matter(source);

    let permalink = defaultPermalink(fileName);
    if (data.permalink) {
      permalink = path.join(DIST_DIR, data.permalink);
    }
    const url = permalink.replace(DIST_DIR, "").replace("index.html", "");

    out.push({
      frontmatter: data,
      slug: slug,
      url,
      permalink,
      content: md.render(content),
    });
  }
  pagesCache = out;
  return out;
}
