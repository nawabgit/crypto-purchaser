import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  * {
    scrollbar-width: thin;
    scrollbar-color: gray gray;
  }
  
  *::-webkit-scrollbar {
    width: 4px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 20px;
  }
`;

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
