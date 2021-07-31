import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. create a state to hold our order
  const [order, setOrder] = useState([]);
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
  // 4. send this data to a serverless func when we checkout

  return [order, addPizzaToOrder, removePizzaFromOrder];
}
