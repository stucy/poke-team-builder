import React from 'react';

import './PokemonCard.css';

const Temp = {
    entry_number: 1,
    pokemon_species: {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/1/"
    }
}

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
    
    return(
        <div className="PokemonCard">
            <div>#{TransfromDigit(pokemon.entry_number)}</div>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgNumber}.png`} alt={pokemon.pokemon_species.name} />
            <div className="name">{pokemon.pokemon_species.name}</div>
        </div>
    )
}

export default PokemonCard