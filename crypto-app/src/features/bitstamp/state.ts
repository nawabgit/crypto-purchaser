import { Reducer } from "react";
import { produce } from "immer";
import exhaustivenessCheck from "common/utils/exhaustivenessCheck";
import { ThunkAction } from "store";

import CryptoJS from "crypto-js";
import Axios from "axios";

// Plain actions
interface AuthStarted {
  type: "bitstamp/auth/started";
}

interface AuthFinished {
  type: "bitstamp/auth/finished";
  success: boolean;
  apiKey: string | null;
  apiSecret: string | null;
  customerId: string | null;
  error?: string;
}

export type AuthActions = AuthStarted | AuthFinished;

// States

interface AuthState {
  pending: boolean;
  success: boolean;
  apiKey: string | null;
  apiSecret: string | null;
  customerId: string | null;
  error: string | void;
}

const defaultAuthState: AuthState = {
  pending: false,
  success: false,
  apiKey: null,
  apiSecret: null,
  customerId: null,
  error: undefined,
};

// Reducers

export const loginReducer: Reducer<AuthState, AuthActions> = (
  state = defaultAuthState,
  action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "bitstamp/auth/started":
        draft.pending = true;
        return;

      case "bitstamp/auth/finished":
        draft.pending = false;
        draft.success = action.success;
        draft.apiKey = action.apiKey;
        draft.apiSecret = action.apiSecret;
        draft.customerId = action.customerId;
        draft.error = action.error;
        return;

      default:
        exhaustivenessCheck(action);
    }
  });

/**
 * Tries to authenticate the user with given customer id, api key and api secret
 * @param customerId
 * @param apiKey
 * @param apiSecret
 */
export const doBitstampLogin = (
  customerId: string,
  apiKey: string,
  apiSecret: string
): ThunkAction<Promise<void>> => async (dispatch, getState, { api }) => {
  dispatch({ type: "bitstamp/auth/started" });

  const unix_timestamp_ms = Math.round(+new Date());
  const message = unix_timestamp_ms.toString() + customerId + apiKey;

  var signature = CryptoJS.HmacSHA256(message, apiSecret)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();

  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append("nonce", unix_timestamp_ms.toString());
  formData.append("user_type", signature);
  try {
    await Axios.post("https://www.bitstamp.net/api/balance/", formData);
  } catch (e) {
    // TODO
  }
};
