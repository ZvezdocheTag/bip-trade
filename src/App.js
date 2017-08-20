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
  let pick = this.data.filter(item => item.MarketName === val.value)

  this.stata(pick)
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

const AlarmCard = () => {
  return (
    
  )
}

const SelectedCard = (props) => {
  
  let data = props.data;
  if(typeof data !== "undefined" &&  props.data.length > 0  ) {
    data = props.data[0]
    // console.log(data)
      return (
        <div className="card">
          <h3 className="card__name">{data.MarketName}</h3>
          <div className="card__bids bid">
            <div className="bid__hight">
              <div className="bid__name">
                High
              </div>
              <div className="bid__value">
              {data.High}
              </div>
              </div>
            <div className="bid__low">
            <div className="bid__name">
                Low
              </div>
              <div className="bid__value">
              {data.Low}
              </div>
              </div>
            <div className="bid__last">
            <div className="bid__name">
                Last
              </div>
              <div className="bid__value">
              {data.Last}
              </div></div>
          </div>
          <div className="card__capitalization">
            <div className="card__label">
            Capitalization
          </div>
          <div className="card__value">
            {data.Volume}
          </div>
          </div>
          <div className="card__time">
          <div className="card__label">
            Time
          </div>
          <div className="card__value">
          {data.TimeStamp}
          </div>
            </div>
        </div> 
      )
  } else {
    return <div>No card yeat</div>
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      speed: 10,
      fxRates: [],
      picked: {}
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

  settle(data) {
    // console.log(data)
    this.setState({
      picked:data[0].MarketName 
    })
  }

  filterData(picked) {
    if(this.state.fxRates !== "undefined") {

      return this.state.fxRates.result.filter(item => item.MarketName === picked)
    } else {
      return ''
    }
  }
  render() {
    // console.log(this.state.picked)
    // console.log(this.state.fxRates)
    let data = [];
    let {filterPare, filterState} = [];
    if(this.state.fxRates !== null) {
       data = this.state.fxRates.result
       filterPare = typeof data !== "undefined" ? data.map(item => ({value: item.MarketName, label: item.MarketName})) : []
       filterState = typeof data !== "undefined" ? this.filterData(this.state.picked) : []
    }

    // console.log(filterState)

    
    // console.log(filterPare)
    return (
      <div className="App">
        <Select
          name="form-field-name"
          value="one"
          data={data}
          options={filterPare}
          onChange={logChange}
          stata={this.settle.bind(this)}
        />
        <SelectedCard data={filterState}/>
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
