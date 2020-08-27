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

export type Mode = "Home" | "Bitstamp" | "Coinbase";

export function App() {
  const [mode, setMode] = useState<Mode>("Home");

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundContainer>
        <PickCompanyCard>
          {mode == "Home" && <Home setMode={setMode} />}
          {mode == "Bitstamp" && (
            <Fade timeout={2000} in={true}>
              <Bitstamp setMode={setMode} />
            </Fade>
          )}
          {mode == "Coinbase" && (
            <Fade timeout={2000} in={true}>
              <Coinbase setMode={setMode} />
            </Fade>
          )}
        </PickCompanyCard>
      </BackgroundContainer>
    </MuiThemeProvider>
  );
}

export default App;
