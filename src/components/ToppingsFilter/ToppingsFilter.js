import { Link } from 'gatsby';
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
    .active {
      background: var(--yellow);
    }
  }
`;

export default function ToppingsFilter({ pizzas }) {
  const getUniqueToppings = (pizzaList) => {
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
  const toppingsArray = getUniqueToppings(pizzas);
  return (
    <>
      <ToppingStyle>
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
