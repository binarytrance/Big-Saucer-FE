import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });
  return (
    <>
      <SEO title="Order a Pizza!" />
      <fieldset>
        <legend>Your Info</legend>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValue}
          />
        </label>
        {/* <input
            type="mapleSyrup"
            name="mapleSyrup"
            id="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          /> */}
      </fieldset>
      <fieldset>
        <legend>Menu</legend>
        {pizzas.map((pizza) => (
          <div key={pizza.id}>
            <Img
              width="50"
              height="50"
              fluid={pizza.image.asset.fluid}
              alt={pizza.name}
            />
            <div>
              <h2>{pizza.name}</h2>
            </div>
            <div>
              {['S', 'M', 'L'].map((size) => (
                <button
                  type="button"
                  key={size}
                  // onClick={() =>
                  //   addToOrder({
                  //     id: pizza.id,
                  //     size,
                  //   })
                  // }
                >
                  {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                </button>
              ))}
            </div>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Order</legend>
        {/* <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          /> */}
      </fieldset>
      {/* <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div aria-live="polite" aria-atomic="true">
            {error ? <p>Error: {error}</p> : ''}
          </div>
          <button type="submit" disabled={loading}>
            <span aria-live="assertive" aria-atomic="true">
              {loading ? 'Placing Order...' : ''}
            </span>
            {loading ? '' : 'Order Ahead'}
          </button>
        </fieldset> */}
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
