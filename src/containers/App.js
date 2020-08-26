import React, { useState } from 'react'
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';

import TeamContainer from '../components/TeamContainer/TeamContainer';
import PokemonSearch from '../components/PokemonSearch/PokemonSearch';
import PokemonInfo from '../components/PokemonInfo/PokemonInfo';
import Aux from '../hoc/Aux';
import Modal from '../hoc/Modal/Modal';

import './App.css';

const emptyTeam = [{},{},{},{},{},{}]
const url = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
    const [team, setTeam] = useState(emptyTeam);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [modal, setModal] = useState({open: false, data: {}});

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

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { destination } = result;
        let newTeam = [...team];
        newTeam[destination.droppableId] = searchResult;
        setTeam(newTeam);
        // setSearchResult(null);
        // setSearch('');
    }

    const openInfoModal = (pokemon) => {
        setModal({
            open: true,
            data: pokemon
        });

    }

    return (
        <Aux>
            <h1>Header</h1>
            <div className="container">
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    <TeamContainer 
                        team={team} 
                        openModal={openInfoModal}
                    />
                    <PokemonSearch 
                        click={searchHandler}
                        change={setSearch}
                        pokemon={searchResult}
                        openModal={openInfoModal}
                    />
                </DragDropContext>
            </div>
            {/* <button onClick={() => setModal(true)}>Open Modal</button> */}
            <Modal open={modal.open} close={setModal}>
                <PokemonInfo data={modal.data}/>
            </Modal>
        </Aux>
    );
}

export default App;
