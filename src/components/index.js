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
          picked: {},
        }
    }
    componentWillMount() {
        let { dispatch } = this.props;
        dispatch(fetchData(this.props.selectMarket))
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
                    main={this}
                />
            </div>
        );
    }
}


const mapStateToProps = state => state;
export default connect(mapStateToProps)(Core);