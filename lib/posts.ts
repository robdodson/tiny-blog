import * as path from 'path';
import * as fs from 'fs';

import matter from 'gray-matter';

export const POSTS_PATH = path.join(process.cwd(), 'posts');

export const getSourceOfFile = (fileName: string) => {
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
