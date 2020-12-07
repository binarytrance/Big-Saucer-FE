import React from 'react';

import { Link, navigate } from 'gatsby';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HOT NOW</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/logo">Logo</Link>
        </li>
        <li>
          <Link to="/slicemasters">Slice Masters</Link>
        </li>
      </ul>
    </nav>
  );
}
