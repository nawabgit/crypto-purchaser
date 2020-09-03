import React from "react";
import { CardContentContainer } from "app";
import {
  Button as MuiButton,
  CardHeader,
  IconButton,
  CardContent,
  TextField as MuiTextField,
  styled as muiStyled,
  Fade,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import coinbaseLogo from "common/images/coinbase-logo.png";
import { Link } from "react-router-dom";

const Button = muiStyled(MuiButton)(spacing);
const TextField = muiStyled(MuiTextField)(spacing);

function Coinbase() {
  return (
    <Fade timeout={2000} in={true}>
      <CardContentContainer>
        <CardHeader
          avatar={
            <Link to="home">
              <IconButton aria-label="back" size="small">
                <ArrowBackIcon />
              </IconButton>
            </Link>
          }
          action={
            <img
              style={{
                borderRadius: 50,
                height: 40,
                width: 40,
                marginTop: 10,
                marginRight: 5,
              }}
              src={coinbaseLogo}
              title="Coinbase Logo"
            />
          }
        ></CardHeader>
        <CardContent>
          <Button mt={2} fullWidth variant="contained" color="secondary">
            Log In
          </Button>
        </CardContent>
      </CardContentContainer>
    </Fade>
  );
}

export default Coinbase;
