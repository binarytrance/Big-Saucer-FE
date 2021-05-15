import { graphql } from 'gatsby';
import React from 'react';

export default function SinglePizzaPage() {
  console.log('single pizza!!!');
  return <p>Single Pizza!!!</p>;
}

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
