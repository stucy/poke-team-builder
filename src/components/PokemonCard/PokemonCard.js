import React from 'react';

import './PokemonCard.css';

const imgUrl1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
const imgUrl2 = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/`;

const PokemonCard = ( {pokemon} ) => {
    
    const TransfromDigit = (number) =>{

        if ( number < 10 ){
            return "00" + number
        }

        if( number < 100 ) {
            return "0" + number;
        }

        return number;
    }

    let startIndex = pokemon.pokemon_species.url.indexOf("pokemon-species");
    let imgNumber = pokemon.pokemon_species.url.substring(startIndex + 16, pokemon.pokemon_species.url.length - 1);
    let imgNumber2 = `00${imgNumber}`.slice(-3);
    
    return(
        <div className="PokemonCard">
            <div>#{TransfromDigit(pokemon.entry_number)}</div>
            <img src={`${imgUrl2}${imgNumber2}.png`} alt={pokemon.pokemon_species.name} />
            <div className="name">{pokemon.pokemon_species.name}</div>
        </div>
    )
}

export default PokemonCard