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
  console.log(data);

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

export async function createPages(params) {
  console.log('asdf');
  // create pages dynamically
  //   1. Pizzas
  await turnPizzasIntoPages(params);
  //   2. Toppings
  //   3. Slicemasters
}
