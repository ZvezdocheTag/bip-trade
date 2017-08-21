import React, { Component } from 'react';
import io from 'socket.io-client';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {SelectedCard} from './SelectCard'


function logChange(val) {
    let pick = this.data.filter(item => item.MarketName === val.value)
  
    this.stata(pick)
}

class Core extends Component {
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

        return (
            <div className="application">
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

export default Core;