import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter/ToppingsFilter';
import SEO from '../components/SEO';

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  console.log(pizzas, 'total pizzas');

  // this is all prebuilt. happens during build time rather than render time.
  // therefore we do not need any loaders. YAY!!!
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All Pizzas'
        }
      />
      <ToppingsFilter pizzas={pizzas} activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}
// graphql query -> gatsby recognises one by the graphql query
// all this is generated upfront; at build time
// in gatsby we need to specify everything that we need explicitly, if that's too cumbersome we can use a fragment - a collection of fields that we want
// this is dynamic query -> can take variables and can only be done on pages, not components
// static queries -> do not take variables and are the only ones that work in components
export const pageQuery = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        id
        name
        price
        toppings {
          id
          name
          vegetarian
        }
        slug {
          current
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
// export const pageQuery = graphql`
//   query PizzaQuery($topping: [String]) {
//     pizzas: allSanityPizza(
//       filter: { toppings: { elemMatch: { name: { in: $topping } } } }
//     ) {
//       nodes {
//         id
//         name
//         price
//         toppings {
//           id
//           name
//           vegetarian
//         }
//         slug {
//           current
//         }
//         image {
//           asset {
//             fixed(width: 200, height: 200) {
//               ...GatsbySanityImageFixed
//             }
//             fluid(maxWidth: 400) {
//               ...GatsbySanityImageFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `;
