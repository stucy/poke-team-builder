import React from 'react';

import './PokemonInfo.css';

const PokemonInfo = ({ data }) => {
    console.log(data);

    const types = data.types.map(el => (
        <div className={`type ${el.type.name}`} key={el.type.name}>{el.type.name}</div>
    ))

    return (
        <div className="PokemonInfo">
            <div className="container">
                <img src={data.sprites.front_default} alt={data.name} />
                <div className="infoContainer">
                    <h1 className="pokemonName">#{data.id} {data.name}</h1>    
                    <div className="typeContainer">
                        {types}
                    </div>
                    <h1>HT {(data.height * 0.1).toFixed(2)}m</h1>
                    <h1>WT {(data.weight * 0.1).toFixed(2)}kg</h1>
                </div>
            </div>
            
        </div>
    )
}

export default PokemonInfo;