import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home';
import Register from './pages/Sigin';
import RegisterCompany from './pages/Sigin/company'
import Login from './pages/Login'
import Usuario from './pages/Usuario'
import Empresa from './pages/Empresa'
import Passagens from './pages/Passagens'
import Comprar from './pages/ComprarPassagem'

import history from './history';

export default function Routes() {
    return(
        <Router history={history}>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path="/registerCompany" component={RegisterCompany}/>
                <Route path="/login" component={Login}/>
                <Route path="/user" component={Usuario}/>
                <Route path="/company" component={Empresa}/>
                <Route path="/results" component={Passagens}/>
                <Route path="/purchase" component={Comprar}/>
            </Switch>
        </Router>
    );
}