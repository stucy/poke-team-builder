import React, { useState } from 'react'
import axios from 'axios';

import TeamMember from '../../components/TeamMember/TeamMember';
import MemberInfo from '../../components/MemberInfo/MemberInfo';

import './TeamBuilder.css';

import PokeballImg from '../../images/pokeballBG.svg';
import PokeballIcon from '../../images/pokeballIcon.svg';

const emptyTeam = [
    {active: true, name: 'test'},
    {active: true},
    {active: false},
    {active: false},
    {active: false},
    {active: false}
];

const url = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {

    const [activeMember, setActiveMember] = useState(0);
    const [team, setTeam] = useState(emptyTeam);

    return (
        <div className="TeamBuilder">

            <div className="PokemonTeam">
                <h2 className="TeamBuilderTitle">
                    <img src={PokeballIcon} className="TitleIcon" />
                    Team Builder
                </h2>
                {emptyTeam.map((member, index) => {
                    return <TeamMember data={member} key={index}/>
                })}
            </div>
            <div className="PokemonInfo">

                <img className="PokeballBG" src={PokeballImg} alt="Pokeball" />
                <MemberInfo data={team[activeMember]}/>
                
            </div>
        </div>
    );
}

export default App;
