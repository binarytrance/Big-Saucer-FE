import path from 'path';

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
    console.log('creating page for', pizza.slug.current);
    actions.createPage({
      path: `pizza/${pizza.slug.current}`, // path for the new page
      component: pizzaTemplate,
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
  console.log(data.toppings.nodes);
  data.toppings.nodes.forEach((topping) => {
    console.log(topping.name);
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
  ]);
  //   3. Slicemasters
}
