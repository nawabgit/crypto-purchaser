import { Reducer } from "react";
import { produce } from "immer";
import exhaustivenessCheck from "common/utils/exhaustivenessCheck";

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
