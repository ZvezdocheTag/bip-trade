import React, { Component } from 'react';
import { setAlarmPair, fetchData, activeWatcher } from '../actions'


export const AlarmForm = (props) => {
    const confirmSetting = (e) => {
      e.preventDefault()
      const highEvent = document.querySelector('[name="alarm-high-price"]');
      const lowEvent = document.querySelector('[name="alarm-low-price"]');
      const { dispatch, name, marketData, notifications } = props.main.props;
      const pairData = {
        ...props.data,
        high: highEvent.value,
        low: lowEvent.value
      }
      if(notifications.selectedAlarmPair.length === 0) {
        dispatch(activeWatcher(true))
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