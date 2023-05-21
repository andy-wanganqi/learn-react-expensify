import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import createStore from '../src/store/store.js';

export const renderWith = (
  ui,
  {
    withProvider = false,
    withRouter = false,
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  function WrapWithProvider({ children }) {
    return (<Provider store={store}>{children}</Provider>);
  }
  
  if (withRouter) {
    return { store, ...render(WrapWithProvider({ children: ui }), { wrapper: BrowserRouter, ...renderOptions }) }
  } else {
    return { store, ...render(ui, { wrapper: WrapWithProvider, ...renderOptions }) }
  }
};
