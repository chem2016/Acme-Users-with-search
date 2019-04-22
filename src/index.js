import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import App from './App';

const root = document.querySelector('#root');
ReactDOM.render(
    <Router>
        <Route path='/' component={App}/>
    </Router>, 
    root);


