import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase'
import ws from './utils/ws'



  // var config = {
  //   apiKey: "AIzaSyD-HSSoQ99IhZW4VYh1YFDxBCszQJIuIB4",
  //   authDomain: "bip-trade.firebaseapp.com",
  //   databaseURL: "https://bip-trade.firebaseio.com",
  //   projectId: "bip-trade",
  //   storageBucket: "",
  //   messagingSenderId: "24158785314"
  // };
  // firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      speed: 10
    }
  }

  // componentDidMount() {
  //   console.log(firebase.database().ref().child('bip-trade'))
  //   const rootRef = firebase.database().ref();
  //   const speedRef = rootRef.child('speed');
  //   speedRef.on('value', snap => {
  //     console.log(snap.val())
  //     this.setState({

  //       speed: snap.val()
  //     })
  //   })
  // }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <span>    
            {this.state.speed}
          </span>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}



export default App;
