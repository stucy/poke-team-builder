import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import TeamBuilder from './TeamBuilder/TeamBuilder';
import Pokedex from './Pokedex/Pokedex';
import Home from './Home/Home';
import PokemonPage from './PokemonPage/PokemonPage';

import Layout from '../hoc/Layout/Layout';

import './App.css';

const App = () => {

    return (
        <Router>
            <Layout showFilters>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/pokedex" component={Pokedex}/>
                    <Route path="/team-builder" component={TeamBuilder}/>
                    <Route path="/pokemon/:name" component={PokemonPage}/>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
