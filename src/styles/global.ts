import { createGlobalStyle } from "styled-components";

import githubBackground from "../assets/github-background.svg";

export default createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    outline: none;
    border: none;
    box-sizing: border-box;
    font-family: monospace;
  }

  body {
    background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0px auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`;
