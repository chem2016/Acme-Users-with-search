import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {HashRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';
import Users from './Users';

class App extends Component{
    constructor(){
        super()
    }

    render(){
        return (
            <Router>
                <Fragment>
                    <h1>Acme Users</h1>
                    <Route path='/' component={Nav}/>
                    <Route path='/Home' component={Home}/>
                    <Route path='/Users/:idx?' component={Users}/>
                </Fragment>
            </Router>
        )
    }
}

export default App