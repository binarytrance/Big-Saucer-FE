import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const SliceMaster = ({ data: { sliceMaster } }) => {
  console.log(sliceMaster);
  return (
    <>
      <SEO
        title={`Slice Master - ${sliceMaster.name}`}
        image={sliceMaster.image?.asset?.fluid.src}
      />
      <div className="center">
        <Img fluid={sliceMaster.image.asset.fluid} />
        <h2>
          <span className="mark">{sliceMaster.name}</span>
        </h2>
        <p>{sliceMaster.description}</p>
      </div>
    </>
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
