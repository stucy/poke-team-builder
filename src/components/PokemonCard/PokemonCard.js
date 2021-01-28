import React from 'react';

import './PokemonCard.css';

const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/`;

const PokemonCard = React.forwardRef(( {pokemon, click}, ref) => {


    //Transforms a number to a 3 digit number: 3 => 003; 23 => 023;
    const TransfromDigit = (number) =>{
        return number = `00${number}`.slice(-3);
    }

    //We get the pokedex number of the pokemon to use it to get the image
    const imgNumber = TransfromDigit(pokemon.id);

    //We loop through the types of the pokemon and create the elements for the card
    const types = pokemon.types.map( ({type, slot}) => (
        <div className={type.name} key={slot}>{type.name}</div>
    ))
    
    return(
        <div ref={ref} className={`PokemonCard ${pokemon.types[0].type.name}`} onClick={click}>
                
            <img src={`${imgUrl}${imgNumber}.png`} alt={pokemon.name} />
            <div className="info">
                <div className="name">{pokemon.name}</div>
                <div>#{TransfromDigit(pokemon.id)}</div>
            </div>
            <div className="types">
                {types}
            </div>
            
        </div>
    )
})

export default PokemonCard