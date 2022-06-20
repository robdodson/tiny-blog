import React from "react";
import { getPages } from "../models/pages";

export async function loader() {
  const pages = await getPages();
  const posts = pages.filter((page) => page.permalink.includes("/posts/"));
  return { posts };
}

type Props = {
  page: PageData;
  posts: PageData[];
};

export default function Home(props: Props) {
  const { posts } = props;
  return (
    <>
      <main className="mx-auto max-w-4xl py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <article className="prose md:prose-lg lg:prose-xl">
          <h1>Posts Archive</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.frontmatter.title}>
                <a href={post.url}>{post.frontmatter.title}</a>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  );
}
