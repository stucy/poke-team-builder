import React, { useState } from 'react'
import axios from 'axios';

import TeamContainer from '../components/TeamContainer/TeamContainer';
import PokemonSearch from '../components/PokemonSearch/PokemonSearch';
import Aux from '../hoc/Aux';
import Modal from '../hoc/Modal/Modal';

import './App.css';

const emptyTeam = [{},{},{},{},{},{}]
const url = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
    const [team, setTeam] = useState(emptyTeam);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [modal, setModal] = useState(false);

    const searchHandler = () => {
        axios.get(`${url}${search.toLocaleLowerCase()}`).then(res => {
            // console.log(res);
            setSearchResult(res.data)
        })
        .catch(err => {
            console.log(err);
            setSearchResult("No such pokemon!")
        })
    }

    const setMemberHandler = () => {
        if(selectedSlot == null) return;

        let newTeam = [ ...team ];
        newTeam[selectedSlot] = searchResult;
        setTeam(newTeam);
    }

    return (
        <Aux>
            <h1>Header</h1>
            <div className="container">
                <TeamContainer 
                    team={team} 
                    selected={selectedSlot}
                    select={setSelectedSlot}/>
                <PokemonSearch 
                    click={searchHandler}
                    change={setSearch}
                    pokemon={searchResult}
                    setMember={setMemberHandler}/>
            </div>
            <button onClick={() => setModal(true)}>Open Modal</button>
            <Modal open={modal} close={setModal}>
                <h1>Test Modal</h1>
                <button onClick={() => setModal(false)}>Close Modal</button>
            </Modal>
        </Aux>
    );
}

export default App;
