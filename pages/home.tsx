import React from "react";
import { getPosts } from "../models/posts";

export async function loader() {
  const pages = await getPosts();
  const posts = pages.filter((page) => page.permalink.includes("/posts/"));
  return { posts };
}

export default function Home(props) {
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
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <pre>{content}</pre>
    </>
  );
}
