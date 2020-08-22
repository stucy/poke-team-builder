import React from 'react';

import './TeamMember.css';

const TeamMember = ({selected, click, data}) => {
    let classes = 'TeamMember ';

    selected ? classes += 'active' : null;

    return(
        <div className={classes} onClick={click}>
            {
                data.name != undefined ?
                <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" 
                alt="Ditto"/>
                : null
            }            
        </div>
    )
}

export default TeamMember;