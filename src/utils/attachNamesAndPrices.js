import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((orderedPizza) => {
    const lookedUpPizza = pizzas.find((pizza) => orderedPizza.id === pizza.id);
    console.log(order);

    return {
      ...orderedPizza,
      name: lookedUpPizza.name,
      thumbnail: lookedUpPizza.image.asset.fluid.src,
      price: formatMoney(
        calculatePizzaPrice(orderedPizza.priceInCents, orderedPizza.size)
      ),
    };
  });
}
