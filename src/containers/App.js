import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

//Switch HashRouter to BrowserRouter when you host with express server

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
                    <Route path="/pokedex" component={Pokedex}/>
                    <Route path="/team-builder" component={TeamBuilder}/>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
