import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import * as firebase from 'firebase'
import ws from './utils/ws'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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

const AlarmCard = (props) => {
  const confirmSetting = (e) => {
    e.preventDefault()
    props.alarmName(props.currentName)
  }
  
  return (
    <form className="alarm">
      <div className="alarm__field">
        <label >
          Set alarm hight
        </label>
        <input type="number" name="alarm-high-price" onChange={props.handlerChange}/> 
      </div>
      <div className="alarm__field">
        <label  >
          Set alarm low
        </label>
        <input type="number" name="alarm-low-price"  onChange={props.handlerChange}/> 
      </div>
      <button type="submit" className="alarm__confirm" onClick={confirmSetting}>Confirm</button>
    </form>
  )
}

const SelectedCard = (props) => {
  let data = props.data;
  if(typeof data !== "undefined" &&  props.data.length > 0  ) {
    data = props.data[0]
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
            <AlarmCard handlerChange={props.handlerChange} alarmName={props.alarmName} alarm={props.alarm} currentName={data.MarketName}/> 
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
      picked: {},
      alarm: {
        set: false,
        name: "",
        high: null,
        low: null
      }
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
  handlerChange (e) {
    let target = e.target;
    let value = target.value
    let name = target.getAttribute('name');
    let low, hight;

    if(name === "alarm-high-price") {
      this.setState({
        alarm:  {...this.state.alarm, high: value}
      })
    } else if(name === "alarm-low-price") {
      this.setState({
        alarm:  {...this.state.alarm, low: value}
      })
    }
    
  }

  sendNotificationMessage(alarm) {
      this.setState({
        alarm: {...this.state.alarm, set: true}
      })
      console.log("GOGOOG", alarm)
  }

  setAlarmName(name) {
    this.setState({
      alarm: {...this.state.alarm, name: name} 
    })

    this.sendNotificationMessage(this.state.alarm)
  }

  settle(data) {
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
    let alarm  = this.state.alarm;
    if(alarm.set) {
      console.log("sec GOOGO", this.state.alarm)
    }
    
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
        <SelectedCard data={filterState} handlerChange={this.handlerChange.bind(this)} alarmName={this.setAlarmName.bind(this)} alarm={this.state.alarm}/>

      
      </div>
    );
  }
}



export default App;
