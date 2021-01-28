import React from 'react';

import Aux from "../../hoc/Aux";

import './TeamMember.css';

const TeamMember = ({data, open, remove, teamPlace, setActive, activeMember}) => {
    // console.log(data);

    //Transforms a number to a 3 digit number: 3 => 003; 23 => 023;
    const TransfromDigit = (number) =>{
        return number = `00${number}`.slice(-3);
    }

    let imgNumber;

    let classes = `TeamMember `;
    if(data.name == null){
        classes += data.active ? "active" : "empty";
    }else{
        imgNumber = TransfromDigit(data.id);
    }

    return (
        <div className={classes} onClick={() => {
            if(data.name == null && data.active){
                setActive(teamPlace);
                open();
            }

        }}>
            {data.name == null ? null :
                
                <Aux>
                    <img className="MemberImg" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgNumber}.png`} />
                    <div className="TeamMemberInfo">
                        <span>{data.name}</span>
                        <span className="PokemonHealthBar"></span>
                        <span>{data.hp}/{data.hp}</span>
                        <span className="removeMember" onClick={() => {
                            remove(prevState => {

                                prevState[teamPlace].name = null;
                                prevState[teamPlace].id = null;
                                prevState[teamPlace].hp = null;
                                prevState[teamPlace].active = false;

                                if(teamPlace == 5)
                                    prevState[teamPlace].active = true;

                                for(let i = teamPlace; i < prevState.length - 1; i++){
                                    prevState[i].active = prevState[i+1].active;
                                    prevState[i].id = prevState[i+1].id;
                                    prevState[i].hp = prevState[i+1].hp;
                                    prevState[i].name = prevState[i+1].name;
                                }

                                if(prevState[5].name != null){
                                    prevState[5].name = null;
                                    prevState[5].id = null;
                                    prevState[5].hp = null;
                                    prevState[5].active = true;
                                }

                                if(prevState[4].name == null){
                                    prevState[5].active = false;
                                }

                                return [...prevState];
                            })
                            let place = (activeMember - 1) < 0 ? 0 : activeMember - 1;
                            setActive(place);
                        }}>x</span>
                    </div>
                </Aux>
            }
        </div>
    );
}

export default TeamMember;