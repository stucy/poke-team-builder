import React from 'react';
import { Link } from 'react-router-dom';

import './PokemonCard.css';

const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/`;

const PokemonCard = React.forwardRef(( {pokemon}, ref) => {
    
    const TransfromDigit = (number) =>{
        return number = `00${number}`.slice(-3);
    }

    const imgNumber = TransfromDigit(pokemon.id);

    const types = pokemon.types.map( ({type, slot}) => (
        <div className={type.name} key={slot}>{type.name}</div>
    ))
    
    return(
        <Link to={`/pokemon/${pokemon.name}`}>
            <div ref={ref} className={`PokemonCard ${pokemon.types[0].type.name}`}>
            
                <img src={`${imgUrl}${imgNumber}.png`} alt={pokemon.name} />
                <div className="info">
                    <div className="name">{pokemon.name}</div>
                    <div>#{TransfromDigit(pokemon.id)}</div>
                </div>
                <div className="types">
                    {types}
                </div>
                
            </div>
        </Link>
    )
})

export default PokemonCard