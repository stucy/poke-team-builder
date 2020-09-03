import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import './Pokedex.css';

const url1 = "https://pokeapi.co/api/v2/region";

const Pokedex = () =>{
    const [regions, setRegions] = useState([]);
    const [curRegion, setCurRegion] = useState(1);
    const [pokedex, setPokedex] = useState([]); 

    useEffect(() => {
        axios.get(url1).then(res => {
            // console.log(res);
            res.data.results.pop();
            setRegions(res.data.results);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    useEffect(() => {
        axios.get(`${url1}/${curRegion}`).then(res => {
            const pokedexes = [...res.data.pokedexes];
            let newPokedex = [];
            let data = Promise.all(
                pokedexes.map(el => {
                    return axios(el.url);
                })
            ).then(res => {

                let data = res.map( ({data}) => (
                    {
                        id: data.id,
                        name: data.name,
                        pokemon: data.pokemon_entries,
                    }
                ));
                setPokedex(data);
            })
            .catch(err =>{
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }, [curRegion]);

    const regionComp = regions.map((el, index) => {
        return <button 
                    key={index}
                    onClick={() => setCurRegion(index + 1)}
                >
                    {el.name}
                </button>
    });

    const PokemonCards = pokedex.map(el => {
        return  <div key={el.id}>
                    <div className="regionName" >{el.name}</div>
                    <div className="PokedexPart">
                        {el.pokemon.map(el => (
                            <PokemonCard 
                                key={el.entry_number}
                                pokemon={el}
                            />
                        ))}
                    </div>
                </div>
    })

    return(
        <div className="pokedexContainer">
            <div className="Region">
                {regionComp}
            </div>
            <div className="Pokedex">
                {PokemonCards}
            </div>
        </div>
    )
}

export default Pokedex;