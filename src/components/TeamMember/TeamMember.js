import React from 'react';

import './TeamMember.css';

const TeamMember = ({data}) => {
    console.log(data);
    return (
        <div className="TeamMember">
            {data.name}
        </div>
    );
}

export default TeamMember;