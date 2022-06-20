type Page = {
  frontmatter: Frontmatter;
  slug: string;
  permalink: string;
  content: string;
};

type Frontmatter = {
  [key: string]: any;
};
