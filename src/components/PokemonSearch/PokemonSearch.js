import React from 'react';

import './PokemonSearch.css';

const PokemonSearch = ({result, click, change}) =>{
    
    const bool = result != null;
    return (
        <div className="SearchContainer">
             <input type="text"  
                placeholder="Search"
                onChange={(event) => change(event.target.value)}
                onKeyPress={(event)=>{
                    if(event.key == 'Enter'){
                        click(true);
                    }
                }}/>
            {bool ?
                <div className="Pokemon">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" alt="" />
                    <h1>Ditto</h1>
                </div>
                : null
            }
        </div>
    )
}

export default PokemonSearch;