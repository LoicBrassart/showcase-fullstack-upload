import styled from 'styled-components';

const SForm = styled.article`
  --card-width: 30vw;
  --card-height: calc(var(--card-width) * 3 / 4);
  --figure-height: 120%;
  --footer-height: 30%;
  --footer-top: var(--card-height);
  --footer-top-hover: calc(var(--card-height) - var(--footer-height));
  --transition: ease-in-out 0.15s all;

  width: var(--card-width);
  height: var(--card-height);
  position: relative;
  margin: 1vw;
  overflow: hidden;
  border-radius: 3pt;
  transition: var(--transition);
  transform: scale(0.95);

  &:hover {
    transform: scale(1);
    box-shadow: 0px 0px 64px -10px rgba(0, 0, 0, 0.75);

    .background {
      filter: sepia(100%) blur(1px);
    }

    .avatar {
      right: 3vh;
      filter: grayscale(0);
    }

    footer {
      top: var(--footer-top-hover);
    }
  }

  .background {
    width: 100%;
    height: auto;
    transition: var(--transition);
    object-fit: cover;
  }

  .avatar {
    height: var(--figure-height);
    position: absolute;
    right: 0;
    filter: grayscale(100%);
    transition: var(--transition);
  }

  footer {
    height: var(--footer-height);
    width: 100%;
    position: absolute;
    top: var(--footer-top);
    background-image: linear-gradient(to bottom, #0000, #000f);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);

    h3 {
      color: white;
      font-family: 'Anton', sans-serif;
      letter-spacing: 1pt;
      font-size: 1.3em;
    }
  }
`;

export default SForm;
