import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import MenuItemStyles from '../styles/MenuItemStyles';
import OrderStyles from '../styles/OrderStyles';
import usePizza from '../customHooks/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const [values, updateValue] = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });

  const [
    order,
    addPizzaToOrder,
    removePizzaFromOrder,
    error,
    loading,
    message,
    submitOrder,
  ] = usePizza({
    pizzas,
    values,
  });
  console.log(error, message);

  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
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
          <input
            type="mapleSyrup"
            name="mapleSyrup"
            id="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="maple-syrup"
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
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
                {['S', 'M', 'L'].map((size) => {
                  const pizzaPrice = calculatePizzaPrice(pizza.price, size);
                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() =>
                        addPizzaToOrder({
                          id: pizza.id,
                          size,
                          priceInCents: pizzaPrice,
                        })
                      }
                    >
                      {size} {formatMoney(pizzaPrice)}
                    </button>
                  );
                })}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removePizzaFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset>
          <h3>Your Total is {formatMoney(calculateOrderTotal(order))}</h3>
          <div aria-live="polite" aria-atomic="true">
            {error ? <p>Error: {error}</p> : ''}
          </div>
          <button type="submit" disabled={loading}>
            <span aria-live="assertive" aria-atomic="true">
              {loading ? 'Placing Order...' : ''}
            </span>
            {loading ? '' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
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
