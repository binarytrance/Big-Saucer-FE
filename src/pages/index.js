import React from 'react';
import ItemGrid from '../components/ItemGrid';
import Layout from '../components/Layout';
import LoadingGrid from '../components/LoadingGrid';
import useLatestData from '../customHooks/useLatestData';
import { HomePageGrid } from '../styles/Grid';

function CurrentlySlicing({ sliceMasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && (
        <p>No one is working right now!</p>
      )}
      {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
    </div>
  );
}
function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices!</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}{' '}
      {hotSlices && !hotSlices?.length && <p>Nothin' in the Case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function Homepage() {
  const [hotSlices, sliceMasters] = useLatestData();

  return (
    <>
      <div className="center">
        <h1>Most scrumptious saucers in the world!</h1>
        <p>Open 24/7</p>
        <HomePageGrid>
          <CurrentlySlicing sliceMasters={sliceMasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}
