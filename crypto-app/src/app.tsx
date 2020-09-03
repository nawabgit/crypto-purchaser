import React, { useState } from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {
  Card,
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
  Fade,
  TextField as MuiTextField,
} from "@material-ui/core";

import Home from "features/home/home";
import Bitstamp from "features/bitstamp/bitstamp";
import Coinbase from "features/coinbase/coinbase";
import { Route, Switch, Redirect } from "react-router-dom";

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #f5f5f5;
`;

const PickCompanyCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
`;

export const CardContentContainer = styled.div`
  width: 400px;
`;

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      light: "#43b16d",
      main: "#159e49",
      dark: "#0e6e33",
    },
    secondary: {
      light: "#4474f3",
      main: "#1652F0",
      dark: "#0f39a8",
    },
  },
});

export function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundContainer>
        <PickCompanyCard>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/bitstamp">
              <Bitstamp />
            </Route>
            <Route path="/coinbase">
              <Coinbase />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </PickCompanyCard>
      </BackgroundContainer>
    </MuiThemeProvider>
  );
}

export default App;
