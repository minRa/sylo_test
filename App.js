import React from 'react';
import Home from'./pages/home';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import textReducer from './reducers/textReducers'


const rootReducer = combineReducers({
  texts:textReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App()  {
  return (
    <Provider store={store}>
       <Home/>
    </Provider>
  );
};

