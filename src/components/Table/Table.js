import React from 'react';

import "./Table.css";

const Table = ({pokemon}) => {

    console.log(pokemon);

    const TransfromDigit = (number) => {
        return number = `00${number}`.slice(-3);
    }

    return (
        <table className="pokeData-table">
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
    );

}

export default Table;