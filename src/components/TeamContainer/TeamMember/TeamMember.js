import React from 'react';

import './TeamMember.css';

const TeamMember = ({selected, click, data, openModal}) => {
    let classes = 'TeamMember ';

    selected ? classes += 'active' : null;

    return(
        <div className={classes} onClick={click}>
            {
                data.name != undefined ?
                <img 
                src={data.sprites.front_default} 
                alt={data.name}
                onDoubleClick={() => openModal(true)}/>
                : null
            }            
        </div>
    )
}

export default TeamMember;