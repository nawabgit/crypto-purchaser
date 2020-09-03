import React, { SyntheticEvent } from "react";
import { CardContentContainer } from "app";
import {
  Button as MuiButton,
  CardHeader,
  IconButton,
  CardContent,
  TextField as MuiTextField,
  styled as muiStyled,
  Fade,
  CircularProgress,
  Card as MuiCard,
  Snackbar,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MuiAlert from "@material-ui/lab/Alert";

import coinbaseLogo from "common/images/coinbase-logo.png";
import { Link, useLocation, useHistory } from "react-router-dom";
import useDispatch from "common/utils/useDispatch";
import { doCoinbaseLogin, doGetCoinbaseAccounts } from "./state";
import useSelector from "common/utils/useSelector";

const Button = muiStyled(MuiButton)(spacing);
const Card = muiStyled(MuiCard)(spacing);
const TextField = muiStyled(MuiTextField)(spacing);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Coinbase() {
  // We can keep track of the query params here
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const { pending, success } = useSelector((state) => state.coinbase.auth);

  // Check if the user has been authenticated
  const authToken = query.get("code");
  if (authToken) {
    history.push("/coinbase");
    dispatch(doCoinbaseLogin(authToken));
  }

  // Snackbar functions
  const [open, setOpen] = React.useState(false);
  const handleClose = (event: SyntheticEvent<Element, Event>) => {
    setOpen(false);
  };

  React.useEffect(() => setOpen(success), [success]);

  return (
    <>
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
            {success ? (
              <>
                <div></div>
                <LoggedIn />
              </>
            ) : pending ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={() =>
                  (window.location.href =
                    "https://www.coinbase.com/oauth/authorize?client_id=6acfc527a0e140861665040c76bab83dc417b884a021d82eacc4beb43fd6b230&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcoinbase&response_type=code&scope=wallet%3Aaccounts%3Aread")
                }
                mt={2}
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
              >
                Log In
              </Button>
            )}
          </CardContent>
        </CardContentContainer>
      </Fade>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
        >
          Successfully Authenticated with Coinbase!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

function LoggedIn() {
  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.coinbase.accounts);

  React.useEffect(() => {
    dispatch(doGetCoinbaseAccounts());
  }, []);

  return (
    <>
      {!!accounts && <div>YAY</div>}
      <Fade timeout={2000} in={true}>
        <Card elevation={2}>
          <CardContent>Body</CardContent>
        </Card>
      </Fade>
      <Fade timeout={2000} in={true}>
        <Card elevation={2} mt={2}>
          <CardContent>Body</CardContent>
        </Card>
      </Fade>
      <Fade timeout={2000} in={true}>
        <Card elevation={2} mt={2}>
          <CardContent>Body</CardContent>
        </Card>
      </Fade>
      <Fade timeout={2000} in={true}>
        <Card elevation={2} mt={2}>
          <CardContent>Body</CardContent>
        </Card>
      </Fade>
    </>
  );
}

export default Coinbase;
