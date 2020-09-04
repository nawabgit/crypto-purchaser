import { Reducer } from "react";
import produce from "immer";
import exhaustivenessCheck from "common/utils/exhaustivenessCheck";
import { ThunkAction } from "store";
import * as Redux from "redux";

export interface Account {
  name: string;
  type: string;
  balance: { amount: string; currency: string };
}

// Plain actions
interface AuthStarted {
  type: "coinbase/auth/started";
}

interface AuthFinished {
  type: "coinbase/auth/finished";
  success: boolean;
  accessToken?: string;
  error?: string;
}

interface AccountsStarted {
  type: "coinbase/accounts/started";
}

interface AccountsFinished {
  type: "coinbase/accounts/finished";
  accounts?: Account[];
  error?: string;
}

export type AuthActions = AuthStarted | AuthFinished;
export type AccountActions = AccountsStarted | AccountsFinished;

// States
interface AuthState {
  pending: boolean;
  success: boolean;
  accessToken: string | undefined;
  error: string | undefined;
}

const defaultAuthState: AuthState = {
  pending: false,
  success: false,
  accessToken: undefined,
  error: undefined,
};

interface AccountsState {
  pending: boolean;
  accounts: Account[] | undefined;
  error: string | undefined;
}

const defaultAccountsState: AccountsState = {
  pending: false,
  accounts: undefined,
  error: undefined,
};

// Reducers

export const loginReducer: Reducer<AuthState, AuthActions> = (
  state = defaultAuthState,
  action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "coinbase/auth/started":
        draft.pending = true;
        return;

      case "coinbase/auth/finished":
        draft.pending = false;
        draft.success = action.success;
        draft.accessToken = action.accessToken;
        draft.error = action.error;
        return;

      default:
        exhaustivenessCheck(action);
    }
  });

export const accountsReducer: Reducer<AccountsState, AccountActions> = (
  state = defaultAccountsState,
  action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "coinbase/accounts/started":
        draft.pending = true;
        return;

      case "coinbase/accounts/finished":
        draft.pending = false;
        draft.accounts = action.accounts;
        draft.error = action.error;
        return;

      default:
        exhaustivenessCheck(action);
    }
  });

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
}

interface AccountsResponse {
  data: Account[];
}

/**
 * Tries to authenticate the user with given code
 * @param code code returned by coinbase OAuth2
 */
export const doCoinbaseLogin = (
  code: string
): ThunkAction<Promise<void>> => async (dispatch, getState, { api }) => {
  dispatch({ type: "coinbase/auth/started" });

  try {
    // Create a x-www-form-urlencoded post body
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append(
      "client_id",
      "6acfc527a0e140861665040c76bab83dc417b884a021d82eacc4beb43fd6b230"
    );
    params.append(
      "client_secret",
      "530a57f121d9ca93e1fa9601988a5b491c2feba1cf0f298a7b7622d54353c12c"
    );
    params.append("redirect_uri", "http://localhost:3000/coinbase");

    const response = await api.post<TokenResponse>(
      "https://api.coinbase.com/oauth/token",
      params
    );

    dispatch({
      type: "coinbase/auth/finished",
      success: true,
      accessToken: response.data.access_token,
    });
  } catch (e) {
    dispatch({
      type: "coinbase/auth/finished",
      success: false,
      error: "Something went horribly wrong",
    });
  }
};

/**
 * Retrieves the accounts belonging to a user
 */
export const doGetCoinbaseAccounts = (): ThunkAction<Promise<void>> => async (
  dispatch,
  getState,
  { api }
) => {
  dispatch({ type: "coinbase/accounts/started" });

  try {
    const { accessToken } = getState().coinbase.auth;
    const response = await api.get<AccountsResponse>(
      "https://api.coinbase.com/v2/accounts",
      { headers: { Authorization: "Bearer " + accessToken } }
    );

    dispatch({
      type: "coinbase/accounts/finished",
      accounts: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: "coinbase/accounts/finished",
      error: "Failed to retrieve accounts",
    });
  }
};

export const reducers = Redux.combineReducers({
  auth: loginReducer,
  accounts: accountsReducer,
});
