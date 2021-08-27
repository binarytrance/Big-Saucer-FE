import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({ order, removeFromOrder, pizzas }) =>
  order.map((pizzaFromOrder, index) => {
    const orderedPizzaDetails = pizzas.find(
      (pizzeria) => pizzeria.id === pizzaFromOrder.id
    );
    return (
      <MenuItemStyles key={pizzaFromOrder.id + index}>
        <Img
          width="50"
          height="50"
          fluid={orderedPizzaDetails.image.asset.fluid}
          alt={orderedPizzaDetails.name}
        />
        <h2>{orderedPizzaDetails.name}</h2>
        <div>
          {pizzaFromOrder.size}{' '}
          {formatMoney(
            calculatePizzaPrice(orderedPizzaDetails.price, pizzaFromOrder.size)
          )}
          <button
            type="button"
            key={index}
            onClick={() => removeFromOrder(index)}
            title={`Remove ${orderedPizzaDetails.name} from cart`}
          >
            &times;
          </button>
        </div>
      </MenuItemStyles>
    );
  });

export default PizzaOrder;
