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
  const { frontmatter, content } = props.page;
  return (
    <>
      <h1>{frontmatter.introHeading}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <h2>Posts</h2>
      <ul>
        {props.posts.map((post) => (
          <li key={post.url}>
            <a href={post.url}>{post.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
