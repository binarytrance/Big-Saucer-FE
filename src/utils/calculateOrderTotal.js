export default function calculateOrderTotal(pizzaInCart) {
  const total = pizzaInCart.reduce(
    (acc, pizza) => acc + Math.ceil(pizza.priceInCents),
    0
  );
  return total;
}
