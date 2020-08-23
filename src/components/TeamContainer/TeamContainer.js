import React from 'react';

import TeamMember from './TeamMember/TeamMember';

import './TeamContainer.css';

const TeamContainer = ({ team, selected, select, openModal}) => {
    return (
        <div className="TeamContainer-outer">
            <div className="TeamContainer-inner">
                {team.map((el, index) => (
                    <TeamMember 
                    key={index}
                    click={() => {
                        select(index)
                    }}
                    selected={selected == index}
                    data={el}
                    openModal={openModal}/>
                ))}
            </div>
        </div>
    )
}

export default TeamContainer;