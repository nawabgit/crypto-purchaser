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
import { Link } from "react-router-dom";

const CompanyLogo = styled(CardMedia)`
  width: 400px;
  height: 125px;
  border-bottom: solid 1px #d3d3d3;
`;

const Button = muiStyled(MuiButton)(spacing);

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function Home() {
  return (
    <Fade timeout={2000} in={true}>
      <div>
        <CompanyLogo image={companyLogo} title="Crypto App Logo" />
        <CardContent>
          <StyledLink to="/bitstamp">
            <Button mt={2} fullWidth variant="outlined" color="primary">
              Log into Bitstamp
            </Button>
          </StyledLink>
          <StyledLink to="/coinbase">
            <Button mt={2} fullWidth variant="outlined" color="secondary">
              Log into Coinbase
            </Button>
          </StyledLink>
        </CardContent>
      </div>
    </Fade>
  );
}

export default Home;
