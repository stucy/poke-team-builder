import React from 'react';

import './PokemonSearch.css';

const PokemonSearch = ({click, change, pokemon, setMember}) =>{
    
    const bool = pokemon != null;
    let el;

    if(typeof(pokemon) == 'string'){
        el = <h2>{pokemon}</h2>
    }else if(bool){
        el = <div className="Pokemon" onClick={setMember}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <h1>{pokemon.name}</h1>
            </div>
    }
    
    return (
        <div className="SearchContainer">
             <input type="text"  
                placeholder="Search"
                onChange={(event) => change(event.target.value)}
                onKeyPress={(event)=>{
                    if(event.key == 'Enter'){
                        click();
                    }
                }}/>
            {bool ? el : null}
        </div>
    )
}

export default PokemonSearch;