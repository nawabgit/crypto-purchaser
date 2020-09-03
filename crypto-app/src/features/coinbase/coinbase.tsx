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
import { Link, useLocation, useParams } from "react-router-dom";
import useDispatch from "common/utils/useDispatch";
import { doCoinbaseLogin } from "./state";

const Button = muiStyled(MuiButton)(spacing);
const TextField = muiStyled(MuiTextField)(spacing);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Coinbase() {
  // We can keep track of the query params here
  const query = useQuery();
  const dispatch = useDispatch();

  // Check if the user has been authenticated
  const authToken = query.get("code");
  if (authToken) {
    dispatch(doCoinbaseLogin(authToken));
  }

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
          <Button
            onClick={() =>
              (window.location.href =
                "https://www.coinbase.com/oauth/authorize?client_id=6acfc527a0e140861665040c76bab83dc417b884a021d82eacc4beb43fd6b230&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcoinbase&response_type=code&scope=wallet%3Auser%3Aread")
            }
            mt={2}
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
          >
            Log In
          </Button>
        </CardContent>
      </CardContentContainer>
    </Fade>
  );
}

export default Coinbase;
