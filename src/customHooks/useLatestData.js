import { useEffect, useState } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [sliceMasters, setSliceMasters] = useState();

  // use a sideeffect to fetch data from the graphql endpoint
  useEffect(() => {
    // when the component loads, fetch data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query{
            StoreSettings(id: "koramangala") {
              name
              slicemasters {
                name
              }
              hotSlices {
                name
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: set states
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemasters);
      });
  }, []);

  return [hotSlices, sliceMasters];
}
