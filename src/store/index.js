/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // AsyncStorage if react-native
import thunk from 'redux-thunk';
import { createReactNavigationReduxMiddleware, createReduxContainer, createNavigationReducer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { Router } from 'react-native-router-flux';

import reducers from '../reducers';
import AppNavigator from '../routes';

// Redux Persist config
const config = {
  key: 'root',
  storage,
  blacklist: ['status'],
};

// default nav reducer
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('home'));
const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const reducer = persistCombineReducers(config, {
  ...reducers,
  nav: navReducer,
});

const middleware = [
  thunk,
  createReactNavigationReduxMiddleware(state => state.nav, 'root'),
];

export const ReduxNavigator = createReduxContainer(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
export const ReduxRouter = connect(mapStateToProps)(Router);

const configureStore = () => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  return {
    persistor,
    store,
  };
};

export default configureStore;
