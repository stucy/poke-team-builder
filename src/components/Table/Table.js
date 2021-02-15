import React from 'react';

import "./Table.css";

const Table = ({data}) => {

    const table = data.map((row, slot) => {

        let value = row.title == "Abilities" ? row.value.map((el, index) => {
                if (el.is_hidden) {
                    return <div key={index} >{`${el.ability.name} (hidden ability)`}</div>
                }
                return <div key={index} >{`${index + 1}. ${el.ability.name}`}</div>
            }) : row.value;

        return (
            <tr key={slot}>
                <td className="tableTitle">{row.title}</td>
                <td>{value}</td>
            </tr>
        )
    });

    return (
        <table className="pokeData-table">
            <tbody>
                {table}
            </tbody>
        </table>
    );

}

export default Table;