import * as Redux from "redux";
import axios, { AxiosInstance } from "axios";
import thunkMiddleware, { ThunkAction as BaseThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  AuthActions as CoinbaseAuthActions,
  loginReducer as CoinbaseLogin,
} from "features/coinbase/state";

export const api: AxiosInstance = axios.create({});

const rootReducer = Redux.combineReducers({ coinbase: CoinbaseLogin });

/**
 * The whole shape of our application state
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Union of all supported application actions
 */
export type PlainActions = CoinbaseAuthActions; // add other actions as union

interface ThunkExtra {
  /** Axios instance bound to the API. */
  api: typeof api;
}

/**
 * A thunk returned by a thunk-creator.
 */
export type ThunkAction<R> = BaseThunkAction<
  R | Promise<R>,
  RootState,
  ThunkExtra /* this is the extra argument again */,
  PlainActions
>;

/**
 * Redux store
 */
export const store = Redux.createStore(
  rootReducer,
  composeWithDevTools(
    Redux.applyMiddleware(thunkMiddleware.withExtraArgument({ api }))
  )
);

export default store;
