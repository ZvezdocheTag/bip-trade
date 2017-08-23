import React, { Component } from 'react';
import { setAlarmPair, fetchData } from '../actions'


export const AlarmForm = (props) => {
    const confirmSetting = (e) => {
      e.preventDefault()

      let { dispatch, name } = props.main.props;
      dispatch(setAlarmPair({name: name, low: 2, hight: 4}))
    }

    const changeInput = (e) => {
      const attrName = e.target.getAttribute('name');
      const checkLow = attrName.indexOf('low');
      const checkHight = attrName.indexOf('high');

      if(checkLow) {
        console.log(e.target.value)
      }
      if(checkHight) {
        console.log(e.target.value)

      }
      // console.log(this, ``)
    }
    
    return (
      <form className="alarm">
        <div className="alarm__field">
          <label >
            Set alarm hight
          </label>
          <input type="number" name="alarm-high-price" onChange={changeInput}/> 
        </div>
        <div className="alarm__field">
          <label  >
            Set alarm low
          </label>
          <input type="number" name="alarm-low-price"  onChange={changeInput}/> 
        </div>
        <button type="submit" className="alarm__confirm" onClick={confirmSetting}>Confirm</button>
      </form>
    )
  }