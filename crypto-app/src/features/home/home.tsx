import React from "react";
import styled from "styled-components";
import {
  Fade,
  CardContent,
  Button as MuiButton,
  CardMedia,
  styled as muiStyled,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import companyLogo from "common/images/company-logo-cover.png";
import { Mode } from "app";

const CompanyLogo = styled(CardMedia)`
  width: 400px;
  height: 125px;
  border-bottom: solid 1px #d3d3d3;
`;

const Button = muiStyled(MuiButton)(spacing);

interface HomeNode {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

function Home({ setMode }: HomeNode) {
  return (
    <Fade timeout={2000} in={true}>
      <div>
        <CompanyLogo image={companyLogo} title="Crypto App Logo" />
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
  );
}

export default Home;
