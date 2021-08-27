// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
// import dotenv from 'dotenv';

// dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: 'The Big Saucer',
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in the whole world!',
    twitter: '@GaneshDash_005',
  },
  plugins: [
    'gatsby-plugin-styled-components', // we can directly import and use this inside our compnents, but for servering rendering/prebuilding which would improve SEO, we need to add them as plugins here
    'gatsby-plugin-react-helmet',
    {
      // this is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    FAST_REFRESH: true,
  },
};
