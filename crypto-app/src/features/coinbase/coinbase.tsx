import React from "react";
import { Mode, CardContentContainer } from "app";
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

const Button = muiStyled(MuiButton)(spacing);
const TextField = muiStyled(MuiTextField)(spacing);

interface CoinbaseNode {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

function Coinbase({ setMode }: CoinbaseNode) {
  return (
    <Fade timeout={2000} in={true}>
      <CardContentContainer>
        <CardHeader
          avatar={
            <IconButton
              aria-label="back"
              size="small"
              onClick={() => setMode("Home")}
            >
              <ArrowBackIcon />
            </IconButton>
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
