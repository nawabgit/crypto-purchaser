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

import bitstampLogo from "common/images/bitstamp-logo.svg";
import useDispatch from "common/utils/useDispatch";

const Button = muiStyled(MuiButton)(spacing);
const TextField = muiStyled(MuiTextField)(spacing);

interface BitstampNode {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

function Bitstamp({ setMode }: BitstampNode) {
  const dispatch = useDispatch();

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
                height: 50,
                width: 50,
                paddingTop: 10,
              }}
              src={bitstampLogo}
              title="Bitstamp Logo"
            />
          }
        ></CardHeader>
        <CardContent>
          <TextField
            mt={2}
            label="Customer ID *"
            variant="outlined"
            fullWidth
          />
          <TextField
            mt={2}
            label="API Key *"
            variant="outlined"
            type="password"
            fullWidth
          />
          <TextField
            mt={2}
            label="API Secret *"
            variant="outlined"
            type="password"
            fullWidth
          />
          <Button mt={2} fullWidth variant="contained" color="primary">
            Authenticate Key
          </Button>
        </CardContent>
      </CardContentContainer>
    </Fade>
  );
}

export default Bitstamp;
