import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }
  
  #__next,
  html,
  body {
    position: relative;
    height: 100%;
    
  }
  body {
    color:#1A1D23;
    background-color: #F2F2F2;
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
  }
  input,
  button{
    font-family: 'Rubik', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
