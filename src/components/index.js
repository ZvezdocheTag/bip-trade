import React, { Component } from 'react';
import io from 'socket.io-client';
import Select from 'react-select';

import { connect } from 'react-redux'
import { fetchData } from '../actions'
import {SelectedCard} from './SelectCard'
import 'react-select/dist/react-select.css';


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
        let { dispatch } = this.props;
        dispatch(fetchData(this.props.selectMarket))
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
        //   console.log("GOGOOG", alarm)
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
    

    render() {
        let { tradePair } = this.props.marketData;
        let filterPare = tradePair.map(item => ({value: item.MarketName, label: item.MarketName}));
        let filterState = tradePair.filter(item => item.MarketName === this.state.picked)

        let alarm  = this.state.alarm;
        if(alarm.set) {
        //   console.log("sec GOOGO", this.state.alarm)
        }

        return (
            <div className="application">
                <Select
                    name="form-field-name"
                    value="one"
                    data={tradePair}
                    options={filterPare}
                    onChange={logChange}
                    stata={this.settle.bind(this)}
                />
                <SelectedCard 
                    data={filterState} 
                    handlerChange={this.handlerChange.bind(this)} 
                    alarmName={this.setAlarmName.bind(this)} 
                    alarm={this.state.alarm}
                />
            </div>
        );
    }
}


const mapStateToProps = state => state;
export default connect(mapStateToProps)(Core);