import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import TeamBuilder from './TeamBuilder/TeamBuilder';
import Pokedex from './Pokedex/Pokedex';
import Home from './Home/Home';

import Layout from '../hoc/Layout/Layout';

import './App.css';

const App = () => {

    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/pokedex" component={Pokedex}/>
                    <Route exact path="/team-builder" component={TeamBuilder}/>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
