import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from '../utils/attachNamesAndPrices';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import formatMoney from '../utils/formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. create a state to hold our order
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  console.log(order);

  // 2. make a function to add things to our order
  const addPizzaToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // 3. make a function to remove things from our order
  const removePizzaFromOrder = (index) => {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  };

  // fun that runs when form is order form is submitted
  const submitOrder = async (e) => {
    console.log(e);
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    // all the data that needs to be sent
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order)),
      name: values.name,
      email: values.email,
    };
    console.log(body);
    // 4. send this data to a serverless func when we checkout
    const response = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await response.text());

    if (response.status >= 400 && response.status < 600) {
      setLoading(false);
      setError(text.error);
    } else {
      setLoading(false);
      setMessage('Your desired Big Saucers are ready for you to munch on!');
    }
  };

  return [
    order,
    addPizzaToOrder,
    removePizzaFromOrder,
    error,
    loading,
    message,
    submitOrder,
  ];
}
