import React, { useState } from 'react';

// create order context
const OrderContext = React.createContext();

// create a provider (component that lives at a higher lever and wraps the root)

const OrderProvider = ({ children }) => {
  // we need to stick the state in here
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
export { OrderProvider };
