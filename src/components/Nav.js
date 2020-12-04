import React from 'react';

import { Link, navigate } from 'gatsby';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/beers">Beers</Link>
        </li>
        <li>
          <Link to="/slicemasters">Slice Masters</Link>
        </li>
      </ul>
    </nav>
  );
}
