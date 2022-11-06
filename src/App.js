import React, { createContext, useReducer } from 'react';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { initialState, reducer } from "./store/reducer";

export const AuthContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <ThemeProvider>
        <ScrollToTop />
        <Router />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

