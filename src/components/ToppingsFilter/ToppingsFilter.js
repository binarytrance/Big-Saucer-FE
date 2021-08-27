import { Link, useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &.active {
      background: var(--yellow);
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;
const getUniqueToppings = (pizzaList) => {
  // blog
  const toppings = pizzaList
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});

  // sort based on count
  const sortedToppings = Object.values(toppings).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
};
export default function ToppingsFilter() {
  // we could instead make a static query to fetch all the pizzas/toppings instead of passing as prop
  // for that we have to use the useStaticQuery hook
  // for eg:
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
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
  `);

  const toppingsArray = getUniqueToppings(pizzas.nodes);
  return (
    <>
      <ToppingStyle>
        <Link to="/pizzas">
          <span className="name">All</span>
          <span className="count">{toppingsArray.length}</span>
        </Link>
        {toppingsArray.map((topping) => (
          <Link to={`/topping/${topping.name}`} key={topping.id}>
            <span className="name">{topping.name}</span>
            <span className="count">{topping.count}</span>
          </Link>
        ))}
      </ToppingStyle>
    </>
  );
}
