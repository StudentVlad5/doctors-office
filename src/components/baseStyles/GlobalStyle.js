import "modern-normalize";
import { createGlobalStyle } from "styled-components";
import { theme } from "./Variables.styled";

export const GlobalStyle = createGlobalStyle`
  body {
  position: relative;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  background-color: ${theme.colors.grey};
  }

  /* code {
  font-family: source-code-pro, 'Menlo', 'Monaco', 'Consolas', 'Courier New',
    monospace;
  } */
  
  main {
    width: 100%;
    min-height: calc(100vh - 50px);
  }
  #root{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }

//-----reset-----//
h1, h2, h3, h4, h5, h6, p {
  padding: 0;
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

img {
  display:block;
  max-width: 100%;
  height: auto;
}
`;
