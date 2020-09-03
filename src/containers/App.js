import React from 'react'

import TeamBuilder from './TeamBuilder/TeamBuilder';

import Layout from '../hoc/Layout/Layout';

import './App.css';

const App = () => {

    return (
        <Layout>
            <TeamBuilder />
            {/* <Pokedex /> */}
        </Layout>
    );
}

export default App;
