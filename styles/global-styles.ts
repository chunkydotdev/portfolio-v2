import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Londrina Solid';
    src: url('/LondrinaSolid-Regular.ttf');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Fresca';
    src: url('/Fresca-Regular.ttf');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Fresca', sans-serif;
    color: #fff;
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Londrina Solid', cursive;
    color: #fff !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`
