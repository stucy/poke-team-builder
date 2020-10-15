import React, { useState } from 'react'
import axios from 'axios';

import TeamMember from '../../components/TeamMember/TeamMember';

import './TeamBuilder.css';

import PokeballImg from '../../images/pokeballBG.svg';
import PokeballIcon from '../../images/pokeballIcon.svg';

const emptyTeam = [
    {active: true},
    {active: false},
    {active: false},
    {active: false},
    {active: false},
    {active: false}
];

const url = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {

    return (
        <div className="TeamBuilder">
            <img className="PokeballBG" src={PokeballImg} alt="Pokeball" />
            <h2 className="TeamBuilderTitle">
                <img src={PokeballIcon} className="TitleIcon" />
                Team Builder
            </h2>
            <div className="PokemonTeam">
                {emptyTeam.map((member, index) => {
                    return <TeamMember data={member} key={index}/>
                })}
            </div>
            <div className="PokemonInfo">

            </div>
        </div>
    );
}

export default App;
