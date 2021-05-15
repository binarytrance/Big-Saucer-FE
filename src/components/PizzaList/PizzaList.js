import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const AllPizzasStyle = styled.div`
  ul.pizza-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 25px;
    /* grid-auto-rows: auto auto 500; */
  }
`;

const PizzaListItemStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  // take your row sizing not from the PizzaListItemStyles div, but from the PizzaGridStyles grid
  grid-template-rows: var(
    --rows,
    subgrid
  ); // check if the variable --row exists, else use subgrid
  grid-row: span 3;
  grid-gap: 10px;
  h2,
  p {
    margin: 0;
  }
`;

function PizzaListItem({ pizza }) {
  return (
    <PizzaListItemStyles>
      <Link className="pizza-items__item" to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaListItemStyles>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <AllPizzasStyle>
      <ul className="pizza-items">
        {pizzas.map((pizza) => (
          <PizzaListItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </AllPizzasStyle>
  );
}
