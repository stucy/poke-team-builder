import React from 'react';
import Carousel from 'react-elastic-carousel';
import Table from "../../components/Table/Table";

import "./PokeData.css";

const PokeData = ({ pokemon, name, imgUrl }) => {

    console.log(pokemon);

    const TransfromDigit = (number) => {
        return number = `00${number}`.slice(-3);
    }

    //We loop through the types of the pokemon and create the elements for the card
    const types = pokemon.types.map(({ type, slot }) => (
        <div className={type.name} key={slot}>{type.name}</div>
    ));

    const initialTable = {
        id: pokemon.id,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities
    };

    return (
        <div className="pokeData">
            <div className="pokeTitle">
                <span className="name">
                    <img src={`${imgUrl}/${TransfromDigit(pokemon.id)}.png`} />
                                    No. {`${TransfromDigit(pokemon.id)} `}
                </span>
                <span className="tags">{types}</span>
            </div>
            <div className="tables">
                <div className="pokeName">{name}</div>
                <Carousel itemsToShow={1}>
                    <div>
                        <Table pokemon={initialTable}></Table>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default PokeData