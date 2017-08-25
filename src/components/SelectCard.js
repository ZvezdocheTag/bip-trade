import React, { Component } from 'react';
import {AlarmForm} from './AlarmForm'
import AlarmCard from './AlarmCard'

const BidItem = (props) => {
  var data = props.data;
  
  return (
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
  )
}
export const SelectedCard = (props) => {
    let data = props.data;
    if(typeof data !== "undefined" &&  props.data.length > 0  ) {
      data = props.data[0]
      // console.log(props.main)
        return (
          <div className="card">
            <h3 className="card__name">{data.MarketName}</h3>
            <BidItem data={data}/>
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
              <AlarmCard main={props.main}/>
              <AlarmForm main={props.main} data={data}/> 
          </div> 
        )
    } else {
      return <div>No card yeat</div>
    }
  }