import React, { Component } from 'react';
import {AlarmCard} from './AlarmCard'


export const SelectedCard = (props) => {
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