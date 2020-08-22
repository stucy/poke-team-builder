import React from 'react';

import TeamMember from './TeamMember/TeamMember';

import './TeamContainer.css';

const TeamContainer = ({ team, selected, select }) => {
    return (
        <div className="TeamContainer-outer">
            <div className="TeamContainer-inner">
                {team.map((el, index) => (
                    <TeamMember 
                    key={index}
                    click={() => {
                        console.log(index);
                        select(index)
                    }}
                    selected={selected == index}
                    data={el}/>
                ))}
            </div>
        </div>
    )
}

export default TeamContainer;