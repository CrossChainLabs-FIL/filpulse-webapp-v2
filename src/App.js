import React, { createContext, useReducer } from 'react';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { initialState, reducer } from "./store/reducer";
import Dashboard from './pages/Dashboard';

export const AuthContext = createContext();

export default function App() {
  const [stateLogin, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        stateLogin,
        dispatch
      }}
    >
      <ThemeProvider>
        <ScrollToTop />
        <Router />
        <Dashboard />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

