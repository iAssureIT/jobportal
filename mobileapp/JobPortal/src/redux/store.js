
import {applyMiddleware,
        combineReducers, 
        createStore}          from 'redux';
import {composeWithDevTools}  from 'redux-devtools-extension/developmentOnly';
import thunk                  from 'redux-thunk';
import {AppStateReducer}      from './AppState';
import userDetails            from './user';
import wishDetails            from './wishDetails';
import globalSearch            from './globalSearch';
const appReducer = combineReducers({
  userDetails,
  wishDetails,
  globalSearch,
  appStateReducer: AppStateReducer,
});

export const USER_LOGOUT = 'USER_LOGOUT';

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
);