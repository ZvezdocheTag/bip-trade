import React, { Component } from 'react';
import { sBem } from '../helper/sbem'

export default class AlarmCard extends Component {
    render() {
        let b = sBem('alarm-card', {m: 'sweet'});
        // console.log(this)
        return (
            <div className={b()}>
                <div className={b('item', {m: 'hight'})}>
                    Good:   
                     <div>    

                     </div>    
                </div>
                <div className={b('item', {m: 'low'})}>
                    No Good:
                </div>
            </div>
        );
    }
}
