import React, { useState } from 'react'

import TeamMember from '../../components/TeamMember/TeamMember';
import MemberInfo from '../../components/MemberInfo/MemberInfo';
import Modal from '../../hoc/Modal/Modal';
import PokemonSearch from '../../components/PokemonSearch/PokemonSearch';

import './TeamBuilder.css';

import PokeballImg from '../../images/pokeballBG.svg';
import PokeballIcon from '../../images/pokeballIcon.svg';

const emptyTeam = [
{active: true, name: null, id: null, stats: [], allMoves: [], selectedMoves: [
    {active: true, name: null},
    {active: false, name: null},
    {active: false, name: null},
    {active: false, name: null}
]},
{active: false, name: null, id: null, stats: [], allMoves: [], selectedMoves: [
    {active: true, name: null},
    {active: false, name: null},
    {active: false, name: null},
    {active: false, name: null}
]},
{active: false, name: null, id: null, stats: [], allMoves: [], selectedMoves: [
    {active: true, name: null},
    {active: false, name: null},
    {active: false, name: null},
    {active: false, name: null}
]},
{active: false, name: null, id: null, stats: [], allMoves: [], selectedMoves: [
    {active: true, name: null},
    {active: false, name: null},
    {active: false, name: null},
    {active: false, name: null}
]},
{active: false, name: null, id: null, stats: [], allMoves: [], selectedMoves: [
    {active: true, name: null},
    {active: false, name: null},
    {active: false, name: null},
    {active: false, name: null}
]},
{active: false, name: null, id: null, stats: [], allMoves: [], selectedMoves: [
    {active: true, name: null},
    {active: false, name: null},
    {active: false, name: null},
    {active: false, name: null}
]},
];

const url = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {

    const [activeMember, setActiveMember] = useState(0);
    const [team, setTeam] = useState(emptyTeam);
    const [isOpen, setIsOpen] = useState(false);

    // console.log(team)
    // console.log(activeMember)

    return (
        <div className="TeamBuilder">

            <div className="PokemonTeam">
                <h2 className="TeamBuilderTitle">
                    <img src={PokeballIcon} className="TitleIcon" />
                    Team Builder
                </h2>
                {emptyTeam.map((member, index) => {
                    return <TeamMember data={member} key={index}
                                open={() => setIsOpen(true)}
                                teamPlace={index}
                                remove={setTeam}
                                setActive={setActiveMember}
                                activeMember={activeMember}
                            />
                })}
            </div>
            <div className="PokemonInfo">

                <img className="PokeballBG" src={PokeballImg} alt="Pokeball" />
                <MemberInfo data={team[activeMember]} open={() => setIsOpen2(true)} setTeam={setTeam}
                activeMember={activeMember}/>
                
            </div>

            <Modal close={() => setIsOpen(false)} open={isOpen} >
                <PokemonSearch setMember={setTeam} activeMember={activeMember}/>
            </Modal>

        </div>
    );
}

export default App;
