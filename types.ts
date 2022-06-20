type PageData = {
  frontmatter: Frontmatter;
  slug: string;
  url: string;
  permalink: string;
  content: string;
};

type Frontmatter = {
  [key: string]: any;
};
