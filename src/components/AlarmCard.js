import React, { Component } from 'react';



export const AlarmCard = (props) => {
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