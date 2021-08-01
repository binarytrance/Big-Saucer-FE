// only runs in the browser after the page has been generated in the browser
// allows a plugin to wrap the page element - everytime gatsby renders out a page, it will wrap that with, in this case Layout component
import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
