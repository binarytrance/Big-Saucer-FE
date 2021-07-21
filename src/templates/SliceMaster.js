import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const SliceMaster = ({ data: { sliceMaster }, pageContext }) => {
  console.log(sliceMaster);
  return (
    <div className="center">
      <Img fluid={sliceMaster.image.asset.fluid} />
      <h2>
        <span className="mark">{sliceMaster.name}</span>
      </h2>
      <p>{sliceMaster.description}</p>
    </div>
  );
};

export const query = graphql`
  query($id: String) {
    sliceMaster: sanityPerson(id: { eq: $id }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

export default SliceMaster;
