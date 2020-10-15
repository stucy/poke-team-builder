import React from 'react';

import Aux from "../../hoc/Aux";

import './TeamMember.css';

const TeamMember = ({data}) => {
    console.log(data);

    let classes = `TeamMember `;
    if(data.name == null){
        classes += data.active ? "active" : "empty";
    }

    return (
        <div className={classes}>
            {data.name == null ? null :
                
                <Aux>
                    <img className="MemberImg" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" />
                    <div className="MemberInfo">
                        <span>Pikachu</span>
                        <span className="PokemonHealthBar"></span>
                        <span>35/35</span>
                    </div>
                </Aux>
            }
        </div>
    );
}

export default TeamMember;