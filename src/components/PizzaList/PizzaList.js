import { Link } from 'gatsby';
import React from 'react';

function PizzaListItem({ pizza }) {
  return (
    <Link to={pizza.slug.current}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
    </Link>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <ul>
      {pizzas.map((pizza) => (
        <PizzaListItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}
