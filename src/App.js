import React, {Component, Fragment} from 'react';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';
import Users from './Users';
import Search from './Search';

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
                    <Switch>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/users/:idx?' component={Users}/>
                        <Route exact path='/users/search/:searchTerm?/:idx?' component={Search} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default App