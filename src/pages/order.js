import React from 'react';
import SEO from '../components/SEO';

const order = () => (
  <>
    <SEO title="Orders" />
    <form>
      <fieldset>
        <legend>Your Info</legend>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
        <label htmlFor="email">E-Mail</label>
        <input id="email" type="email" />
        {/* <label htmlFor="name">Name</label>
        <input name="name" type="text" /> */}
      </fieldset>
      <fieldset>
        <legend>Menu</legend>
      </fieldset>
      <fieldset>
        <legend>Order</legend>
      </fieldset>
    </form>
  </>
);

export default order;
