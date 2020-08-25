import React, { useState } from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";

import companyLogo from "../src/common/images/cover.png";

import {
  Card,
  CardContent,
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
  CardMedia,
  Divider,
  Fade,
} from "@material-ui/core";

const Button = muiStyled(MuiButton)(spacing);

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

const CompanyLogo = styled(CardMedia)`
  width: 400px;
  height: 125px;
  border-bottom: solid 1px #d3d3d3;
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

type Mode = "Home" | "Bitstamp" | "Coinbase";

export function App() {
  const [mode, setMode] = useState<Mode>("Home");

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundContainer>
        <PickCompanyCard>
          {mode == "Home" && (
            <Fade timeout={2000} in={true}>
              <div>
                <CompanyLogo image={companyLogo} title="Crypto App Logo" />
                <Divider />
                <CardContent>
                  <Button
                    mt={2}
                    onClick={() => setMode("Bitstamp")}
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >
                    Log into Bitstamp
                  </Button>
                  <Button
                    mt={2}
                    onClick={() => setMode("Coinbase")}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  >
                    Log into Coinbase
                  </Button>
                </CardContent>
              </div>
            </Fade>
          )}
          {mode == "Bitstamp" && (
            <Fade timeout={2000} in={true}>
              <div>
                <CompanyLogo image={companyLogo} title="Crypto App Logo" />
                <Divider />
                <CardContent>
                  <Button
                    mt={2}
                    onClick={() => setMode("Bitstamp")}
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >
                    Log into Bitstamp
                  </Button>
                  <Button
                    mt={2}
                    onClick={() => setMode("Coinbase")}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  >
                    Log into Coinbase
                  </Button>
                </CardContent>
              </div>
            </Fade>
          )}
          {mode == "Coinbase" && (
            <Fade timeout={2000} in={true}>
              <div>
                <CompanyLogo image={companyLogo} title="Crypto App Logo" />
                <Divider />
                <CardContent>
                  <Button
                    mt={2}
                    onClick={() => setMode("Bitstamp")}
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >
                    Log into Bitstamp
                  </Button>
                  <Button
                    mt={2}
                    onClick={() => setMode("Coinbase")}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  >
                    Log into Coinbase
                  </Button>
                </CardContent>
              </div>
            </Fade>
          )}
        </PickCompanyCard>
      </BackgroundContainer>
    </MuiThemeProvider>
  );
}

export default App;
