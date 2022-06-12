import * as path from 'path';
import * as fs from 'fs';

import glob from 'fast-glob';
import matter from 'gray-matter';

export const SITE_PATH = path.join(process.cwd(), 'site');

export function defaultPermalink(fileName: string) {
  return path.join(
    path.dirname(fileName),
    path.basename(fileName, '.md'),
    'index.html'
  );
}

export const getSourceOfFile = (fileName: string) => {
  return fs.readFileSync(fileName, 'utf-8');
};

export async function getAllPages(): Promise<Page[]> {
  let pages = await glob(path.join(SITE_PATH, '**', '*.md'));
  return pages.map((fileName) => {
    const source = getSourceOfFile(fileName);
    const slug = fileName.replace(/\.md$/, '');
    const { data, content } = matter(source);
    return {
      frontmatter: data,
      slug: slug,
      permalink: data.permalink ?? defaultPermalink(fileName),
      content,
    };
  });
}
