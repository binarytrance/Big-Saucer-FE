import React from 'react';
import Layout from '../components/Layout';
import useLatestData from '../customHooks/useLatestData';

function CurrentlySlicing() {
  return <p>CurrentlySlicing</p>;
}
function HotSlices() {
  return <p>HotSlices</p>;
}

export default function Homepage() {
  const [hotSlices, sliceMasters] = useLatestData();
  console.log(hotSlices, sliceMasters);

  return (
    <>
      <div className="center">
        <h1>Most scrumptious saucers in the world!</h1>
        <p>Open 24/7</p>
        <div>
          <CurrentlySlicing />
          <HotSlices />
        </div>
      </div>
    </>
  );
}
