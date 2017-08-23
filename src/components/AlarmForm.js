import React, { Component } from 'react';
import { setAlarmPair, fetchData } from '../actions'


export const AlarmForm = (props) => {
    const confirmSetting = (e) => {
      e.preventDefault()
      const highEvent = document.querySelector('[name="alarm-high-price"]');
      const lowEvent = document.querySelector('[name="alarm-low-price"]');
      const { dispatch, name, marketData } = props.main.props;
      const pairData = {
        name: props.name,
        high: highEvent.value,
        low: lowEvent.value
      }

      dispatch(setAlarmPair(pairData))
    }

    return (
      <form className="alarm">
        <div className="alarm__field">
          <label >
            Set alarm hight
          </label>
          <input type="number" name="alarm-high-price"/> 
        </div>
        <div className="alarm__field">
          <label>
            Set alarm low
          </label>
          <input type="number" name="alarm-low-price" /> 
        </div>
        <button type="submit" className="alarm__confirm" onClick={confirmSetting}>Confirm</button>
      </form>
    )
  }