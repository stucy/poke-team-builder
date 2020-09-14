import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import "./PokemonPage.css";
import Loader from '../../components/Loader/Loader';
import Aux from '../../hoc/Aux';

const url1 = "https://pokeapi.co/api/v2/pokemon";
const url2 = "https://pokeapi.co/api/v2/pokemon-species";

const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full`;

const PokemonPage = () => {

    const TransfromDigit = (number) =>{
        return number = `00${number}`.slice(-3);
    }

    //State
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);

    //GET params
    const { name } = useParams();

    //Get pokemon data
    useEffect(() => {

        Promise.all([
            axios(`${url1}/${name}`),
            axios(`${url2}/${name}`),
        ])
        .then(res => {
            let data = res.map( ({data}) => data);
            setPokeData(data);
            setLoading(false)
        })
        .catch(err => console.log(err));
        
    }, []);

    return (
        <div className="PokemonPage">
           {loading ? <Loader /> 
           :
            <Aux>
                <div>
                    <span className="name">{`${name} `}</span>
                    is a 
                    {pokeData[0].types.length == 1 ? ` ${pokeData[0].types[0].type.name} `
                    : ` ${pokeData[0].types[0].type.name}/${pokeData[0].types[1].type.name} `}
                    pokemon.
                </div>
                <div className="pokePageInfo">
                    <img src={`${imgUrl}/${TransfromDigit(pokeData[0].id)}.png`} />
                    <div className="pokeData">
                        <h2>Pokedex Data</h2>
                        <div className="dataItem">
                            <span className="dataTitle">№</span>
                            <span className="dataText">{TransfromDigit(pokeData[0].id)}</span>
                        </div>
                        <div className="dataItem">
                            <span className="dataTitle">Height</span>
                            <span className="dataText">{pokeData[0].height}</span>
                        </div>
                        <div className="dataItem">
                            <span className="dataTitle">Weight</span>
                            <span className="dataText">{pokeData[0].weight}</span>
                        </div>
                        <div className="dataItem">
                            <span className="dataTitle">Abilities</span>
                            <span className="dataText">
                                {pokeData[0].abilities.map( (el, index) => {
                                    if(el.is_hidden){
                                        return <div key={index} >{`${el.ability.name} (hidden ability)`}</div>
                                    }
                                    return <div key={index} >{`${index + 1}. ${el.ability.name}`}</div>
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="pokeData">
                        <h2>Training</h2>
                        <div className="dataItem">
                            <span className="dataTitle">Catch Rate</span>
                            <span className="dataText">{pokeData[1].capture_rate}</span>
                        </div>
                        <div className="dataItem">
                            <span className="dataTitle">Base Friendship</span>
                            <span className="dataText">{pokeData[1].base_happiness}</span>
                        </div>
                        <div className="dataItem">
                            <span className="dataTitle">Base Exp</span>
                            <span className="dataText">{pokeData[0].base_experience}</span>
                        </div>
                        <div className="dataItem">
                            <span className="dataTitle">Growth Rate</span>
                            <span className="dataText">{pokeData[1].growth_rate.name}</span>
                        </div>
                        <h2>Breeding</h2>
                        <div className="dataItem">
                            <span className="dataTitle">Egg Groups</span>
                                <span className="dataText">
                                {pokeData[1].egg_groups.map( (el, index) => {
                                    return <div key={index}>{el.name}</div>
                                })}
                                
                            </span>
                        </div>
                        <div className="dataItem">
                            <span className="dataTitle">Egg Cycles</span>
                            <span className="dataText">{pokeData[1].hatch_counter}</span>
                        </div>
                    </div>
                </div>
            </Aux>
            }
        </div>
    )
}

export default PokemonPage;