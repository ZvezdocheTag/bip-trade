import React, { Component } from 'react';
import io from 'socket.io-client';
import Select from 'react-select';
//AUTH
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Home from './auth/Home'
import Dashboard from './auth/Dashboard'
import { logOut } from '../helper/auth'
import { firebaseAuth } from '../config/constants'
//REDUX
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import { compareArray } from '../helper'
import {SelectedCard} from './SelectCard'
import 'react-select/dist/react-select.css';

import Push from 'push.js';

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
            ? <Component {...props}/>
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
             />
    )
}


function PublicRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === false
                ? <Component {...props} />
                : <Redirect to='/dashboard' />}
         />
    )
}





function logChange(val) {
    let pick = this.data.filter(item => item.MarketName === val.value)
  
    this.stata(pick)
}

class Core extends Component {
constructor() {
    super()
        this.state = {
          picked: {},
          authed: false,
          loading: true,
        }
    }

    componentDidMount () {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              authed: true,
              loading: false,
            })
          } else {
            this.setState({
              authed: false,
              loading: false
            })
          }
        })
        console.log(this, "DID")
      }

    componentWillMount() {
        let { dispatch } = this.props;
        dispatch(fetchData(this.props.selectMarket))
        console.log(this, "WILL")
        // this.removeListener()
    }


      settle(data) {
        this.setState({
          picked:data[0].MarketName 
        })
      }
    
    notifier() {
        let { activeWatcher, selectedAlarmPair  } = this.props.notifications;
        if(selectedAlarmPair.length) {

            selectedAlarmPair.map((item) => {
                let high = +item.high;
                let low = +item.low;
                if(item.Last > high) {
                    console.log('HIGHER')
                }
                if(item.Last < low) {
                    console.log('LOWER')
                }
                console.log("NORMAL")
                return item;
            })
        }

    }

    pushOn() {
        Push.create('Hello World!')
    }
    render() {
        let { tradePair, activeWatcher } = this.props.marketData;
        let filterPare = tradePair.map(item => ({value: item.MarketName, label: item.MarketName}));
        let filterState = tradePair.filter(item => item.MarketName === this.state.picked)

        this.notifier()
       
            return this.state.loading === true ? <h1>Loading</h1> : (
                <BrowserRouter>
                  <div>
                    <nav className="navbar navbar-default navbar-static-top">
                      <div className="container">
                        <div className="navbar-header">
                          <Link to="/" className="navbar-brand">React Router + Firebase Auth</Link>
                        </div>
                        <ul className="nav navbar-nav pull-right">
                          <li>
                            <Link to="/" className="navbar-brand">Home</Link>
                          </li>
                          <li>
                            <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                          </li>
                          <li>
                            {this.state.authed
                              ? <button
                                  style={{border: 'none', background: 'transparent'}}
                                  onClick={() => {
                                    logOut()
                                  }}
                                  className="navbar-brand">Logout</button>
                              : <span>
                                  <Link to="/login" className="navbar-brand">Login</Link>
                                  <Link to="/register" className="navbar-brand">Register</Link>
                                </span>}
                          </li>
                        </ul>
                      </div>
                    </nav>
                    <div className="container">
                      <div className="row">
                        <Switch>
                          <Route path='/' exact component={Home} />
                          <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                          <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                          <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                          <Route render={() => <h3>No Match</h3>} />
                        </Switch>
                      </div>
                    </div>
                  </div>
                </BrowserRouter>
            // <div className="application">
            //     <button onClick={this.pushOn.bind(this)}>
            //         Get Push
            //     </button>
            //     <Select
            //         name="form-field-name"
            //         value="one"
            //         data={tradePair}
            //         options={filterPare}
            //         onChange={logChange}
            //         stata={this.settle.bind(this)}
            //     />
            //     <SelectedCard 
            //         data={filterState} 
            //         main={this}
            //     />
            // </div>
        );
    }
}


const mapStateToProps = state => state;
export default connect(mapStateToProps)(Core);