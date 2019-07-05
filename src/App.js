/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './Store/ConfigureStore';
import Navigation from './Navigations';

const _configureStore = configureStore();

export default class App extends Component {
  constructor(properties) {
    super(properties);
  }

  componentWillUnmount() {
  }

  render() {
    const persistor = persistStore(_configureStore);

    return (
      <Provider store={_configureStore}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

