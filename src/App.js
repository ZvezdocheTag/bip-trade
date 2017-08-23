import React, { Component } from 'react';
import './App.css';
import Core from './components'
import * as firebase from 'firebase'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'


const middleware = [ thunk ]

if(process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}


const store = createStore(
  reducer,
  applyMiddleware(...middleware)
) 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Core />
        </div>
      </Provider>
    );
  }
}

export default App;