import React from 'react';

import './TeamMember.css';

const TeamMember = ({ click, data, openModal}) => {

    return(
        <div className="TeamMember" onClick={click}>
            {
                data.name != undefined ?
                <img 
                src={data.sprites.front_default} 
                alt={data.name}
                onClick={() => openModal(data)}/>
                : null
            }            
        </div>
    )
}

export default TeamMember;