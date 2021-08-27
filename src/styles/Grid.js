import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

// for a single grid item on the homepage
export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    height: auto;
    border: solid;
  }
  p {
    top: 0;
    transform: rotate(-2deg) translateY(-10px);
    position: absolute;
    width: 100%;
    left: 0;
    margin: 0;
  }
  .mark {
    display: inline;
  }

  @keyframes shine {
    from {
      background-position: 40px;
    }
    to {
      background-position: 500px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 1s infinite linear;
  }
`;
