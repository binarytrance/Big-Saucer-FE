import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

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
        query: gql`
          query {
            StoreSettings(id: "koramangala") {
              name
              slicemasters {
                ${deets}
              }
              hotSlices {
                ${deets}
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
      })
      .catch((err) => {
        console.log('shooot!', err);
      });
  }, []);

  return [hotSlices, sliceMasters];
}
