import React from 'react';
import Carousel from 'react-elastic-carousel';
import Table from "../../components/Table/Table";

import "./PokeData.css";

const PokeData = ({ pokemon, name, imgUrl }) => {

    console.log(pokemon);

    const TransfromDigit = (number) => {
        return number = `00${number}`.slice(-3);
    }

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    //We loop through the types of the pokemon and create the elements for the card
    const types = pokemon[0].types.map(({ type, slot }) => (
        <div className={type.name} key={slot}>{type.name}</div>
    ));

    const initialTable = [
        {
            title: "No.",
            value: TransfromDigit(pokemon[0].id)
        },
        {
            title: "Height",
            value: pokemon[0].height
        },
        {
            title: "Weight",
            value: pokemon[0].weight
        },
        {
            title: "Abilities",
            value: pokemon[0].abilities
        },
    ];

    const moreInfoTable = [
        {
            title: "Habitat",
            value: capitalize(pokemon[1].habitat.name)
        },
        {
            title: "Evolves From",
            value: capitalize(pokemon[1].evolves_from_species.name)
        },
        {
            title: "Base Happiness",
            value: pokemon[1].base_happiness
        },
        {
            title: "Capture Rate",
            value: pokemon[1].capture_rate
        },
        {
            title: "Base EXP",
            value: pokemon[0].base_experience
        }
    ];

    const statsTable = [
        {
            title: "HP",
            value: pokemon[0].stats[0].base_stat
        },
        {
            title: "Attack",
            value: pokemon[0].stats[1].base_stat
        },
        {
            title: "Deffence",
            value: pokemon[0].stats[2].base_stat
        },
        {
            title: "Speed",
            value: pokemon[0].stats[3].base_stat
        },
        {
            title: "Special Attack",
            value: pokemon[0].stats[4].base_stat
        },
        {
            title: "Special Deffence",
            value: pokemon[0].stats[5].base_stat
        },
    ]

    return (
        <div className="pokeData">
            <div className="pokeTitle">
                <span className="name">
                    <img src={`${imgUrl}/${TransfromDigit(pokemon[0].id)}.png`} />
                    No. {`${TransfromDigit(pokemon[0].id)} `}
                </span>
                <span className="tags">{types}</span>
            </div>
            <div className="tables">
                <div className="pokeName">{name}</div>
                <Carousel itemsToShow={1}>
                    <div>
                        <Table data={initialTable} />
                    </div>
                    <div>
                        <Table data={statsTable} />
                    </div>
                    <div>
                        <Table data={moreInfoTable} />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default PokeData