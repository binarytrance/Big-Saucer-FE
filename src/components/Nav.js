import React from 'react';

import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

export const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    --rotate: -3deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">HOT NOW</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/logo">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">Slice Masters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
