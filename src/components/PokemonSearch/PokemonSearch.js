import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import './PokemonSearch.css';

const PokemonSearch = ({setMember, activeMember}) =>{
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);

    const searchInput = useRef();

    useEffect(() => {
        searchInput.current.focus();
    }, [])

    const searchHandler = () => {
        setPokemon(null);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
        .then(res =>  {
            setError(false);
            setPokemon(res.data);
        })
        .catch(err => {
            console.log(err);
            setError(true);
        })
    }
    
    return (
        <div className="SearchContainer">
            <input type="text" placeholder="Search" ref={searchInput} onChange={event => setSearch(event.target.value)}
            onKeyPress={event => {
                if(event.key == "Enter")
                    searchHandler();
            }}/>
            {!pokemon ? null 
            : <PokemonCard pokemon={pokemon} click={() => {
                setMember(prevState => {

                    if(activeMember + 1 < 6)
                        prevState[activeMember + 1].active = true;
                    prevState[activeMember].name = pokemon.name;
                    prevState[activeMember].stats = pokemon.stats;
                    prevState[activeMember].allMoves = pokemon.moves;
                    prevState[activeMember].id = pokemon.id;

                    // console.log(prevState)
                    return [...prevState];
                });
            }}/>}
            {error ? <p>That pokemon does not exist!</p> : null}
        </div>
    )
}

export default PokemonSearch;