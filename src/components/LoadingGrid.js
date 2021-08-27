import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grid';

const LoadingGrid = ({ count }) => (
  <div>
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={i}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            width="500"
            height="400"
            alt="Loading"
            className="loading"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  </div>
);

export default LoadingGrid;
