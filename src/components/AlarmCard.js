import React, { Component } from 'react';
import { sBem } from '../helper/sbem'

export default class AlarmCard extends Component {
    render() {
        let b = sBem('alarm-card', {m: 'sweet'});
        let { selectedAlarmPair} = this.props.main.props.notifications;

        return (
            <div className={b()}>
                {
                    selectedAlarmPair.map((item, i) => {
                        return (
                            <div key={i}>
                                <div className={b('item', {m: 'title'})}>    
                                    {item.name}
                                </div>  
                                <div className={b('item', {m: 'hight'})}>
                                    Good:   
                                    <div>    
                                    {item.high}
                                    </div>    
                                </div>
                                <div className={b('item', {m: 'low'})}>
                                    No Good:{item.low}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
