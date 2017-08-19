import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import * as firebase from 'firebase'
import ws from './utils/ws'
import Select from 'react-select';
import 'react-select/dist/react-select.css';


var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log("Selected: " + JSON.stringify(val));
}
  // var config = {
  //   apiKey: "AIzaSyD-HSSoQ99IhZW4VYh1YFDxBCszQJIuIB4",
  //   authDomain: "bip-trade.firebaseapp.com",
  //   databaseURL: "https://bip-trade.firebaseio.com",
  //   projectId: "bip-trade",
  //   storageBucket: "",
  //   messagingSenderId: "24158785314"
  // };
  // firebase.initializeApp(config);
const List = () => {
  
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      speed: 10,
      fxRates: []
    }
  }
  componentWillMount() {
    io("http://localhost:3005").on("data", data => this.setState({ fxRates: data }));
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
    // console.log(this.state.fxRates)
    let data = [];
    let filterPare = [];
    if(this.state.fxRates !== null) {
       data = this.state.fxRates.result
       filterPare = typeof data !== "undefined" ? data.map(item => ({value: item.MarketName, label: item.MarketName})) : []
    }

    
    // console.log(filterPare)
    return (
      <div className="App">
        <Select
          name="form-field-name"
          value="one"
          options={filterPare}
          onChange={logChange}
        />
        {/* <ul>
           { typeof data === "undefined" ? <li> No data</li> :
            data.map((item, i) => {
              return (
                <li key={i}>
                  <a className="marketName">
                    {item.MarketName} 
                  </a> 
                </li>
              )
            })
           }
        </ul>   */}
      </div>
    );
  }
}



export default App;
