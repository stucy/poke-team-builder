import React from 'react';

import "./PokeData.css";

const PokeData = ({ pokemon, name, imgUrl }) => {

    const TransfromDigit = (number) => {
        return number = `00${number}`.slice(-3);
    }

    //We loop through the types of the pokemon and create the elements for the card
    const types = pokemon.types.map(({ type, slot }) => (
        <div className={type.name} key={slot}>{type.name}</div>
    ));

    return (
        <div className="pokeData">
            <div className="pokeTitle">
                <span className="name">
                    <img src={`${imgUrl}/${TransfromDigit(pokemon.id)}.png`} />
                                    No. {`${TransfromDigit(pokemon.id)} `}
                </span>
                <span className="tags">{types}</span>
            </div>
            <div>
                <table className="pokeData-table">
                    <thead>
                        <tr>
                            <td colSpan="2">{`${name}`}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tableTitle">No. </td>
                            <td>#{TransfromDigit(pokemon.id)}</td>
                        </tr>
                        <tr>
                            <td className="tableTitle">Height</td>
                            <td>{pokemon.height} ft.</td>
                        </tr>
                        <tr>
                            <td className="tableTitle">Weight</td>
                            <td>{pokemon.weight} kg.</td>
                        </tr>
                        <tr>
                            <td className="tableTitle">Abilities</td>
                            <td>
                                {pokemon.abilities.map((el, index) => {
                                    if (el.is_hidden) {
                                        return <div key={index} >{`${el.ability.name} (hidden ability)`}</div>
                                    }
                                    return <div key={index} >{`${index + 1}. ${el.ability.name}`}</div>
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PokeData