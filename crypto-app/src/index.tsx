import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

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
    <Provider store={store}>
      <React.StrictMode>
        <GlobalStyle />
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById("root")
);
