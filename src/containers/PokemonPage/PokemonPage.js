import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import "./PokemonPage.css";
import Loader from '../../components/Loader/Loader';
import Auxiliary from '../../hoc/Auxiliary';
import PokeData from '../../components/PokeData/PokeData';

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

    //GET params from the url
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

    const types = pokeData[0] ? pokeData[0].types.map(({ type, slot }) => (
        <div className={type.name} key={slot}>{type.name}</div>
    )) : "";

    return (
        <div className="PokemonPage">
            {loading ? <Loader /> 
            :
                <Auxiliary>
                    <div className="pokePageInfo">
                        <img style={{height: "60vh"}} src={`${imgUrl}/${TransfromDigit(pokeData[0].id)}.png`} />
                        <PokeData pokemon={pokeData} name={name} imgUrl={imgUrl} />
                    </div>
                </Auxiliary>
            }
        </div>
    )
}

export default PokemonPage;