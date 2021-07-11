import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);

  // loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    // console.log('creating page for', pizza.slug.current);
    actions.createPage({
      path: `pizza/${pizza.slug.current}`, // path for the new page
      component: pizzaTemplate,
      // this is data that is passted to the template when we create the page
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // template for this page
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // query all the pizzas related to this topping
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // console.log(data.toppings.nodes);
  data.toppings.nodes.forEach((topping) => {
    // console.log(topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function turnBeersIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // console.log('beersfuck yea!');
  // 1. fetch a list of beers
  const res = await fetch(`https://api.sampleapis.com/beers/ale`);
  // console.log(res.json());
  const beers = await res.json();
  // console.log(beers);

  // 2. loop over each beers
  for (const beer of beers) {
    // 3. create a node for that beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      sliceMasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO: 2. turn each slicemaster into their page
  // 3. figure out how many pages there are based on how many slicemasters there are, and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.sliceMasters.totalCount / pageSize);
  console.log(
    `there are ${data.sliceMasters.totalCount} people, ${pageCount} pages with ${pageSize} / page`
  );

  // 4. loop from 1 to n and create pages for them
  for (let i = 0; i < pageCount; i++) {
    console.log(`creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  }
}

export async function sourceNodes(params) {
  await Promise.all([turnBeersIntoNodes(params)]);
}

export async function createPages(params) {
  // console.log('asdf');
  // create pages dynamically
  //   1. Pizzas
  // 2. Toppings
  // both these two promise based functions can be run concurrently since they are separate from each other
  // wait for all promises to resolve before finishing this function
  // await turnPizzasIntoPages(params);
  // await turnToppingsIntoPages(params);
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  //   3. Slicemasters
}