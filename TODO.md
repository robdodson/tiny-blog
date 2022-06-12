- Walk the site directory, for each markdown file, make a data object that includes
  the permalink, slug, frontmatter, and content.
- Pass the data object as props to the page component

- Add support for 'layout' frontmatter. This will dynamically import a React
  component.
- Add support for directory data files so you don't have to define the layout
  key for every component?
- Or steal the idea from Next.js with square bracket directory names?

OR

- Copy next's directory structure and remix's loaders?
