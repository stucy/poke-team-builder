import React, { useState, useEffect } from 'react'
import axios from 'axios';

import TeamContainer from '../components/TeamContainer/TeamContainer';
import PokemonSearch from '../components/PokemonSearch/PokemonSearch';
import Aux from '../hoc/Aux';

import './App.css';

const emptyTeam = [{},{},{},{},{},{}]

const App = () => {
    const [team, setTeam] = useState(emptyTeam);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    // useEffect(() => {

    // }, [clicked])

    return (
        <Aux>
            <h1>Header</h1>
            <div className="container">
                <TeamContainer 
                    team={team} 
                    selected={selectedSlot}
                    select={setSelectedSlot}/>
                <PokemonSearch 
                    result={searchResult}
                    click={setClicked}
                    change={setSearch}/>
            </div>
        </Aux>
    );
}

export default App;
