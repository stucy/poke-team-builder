import React from 'react';

import './MemberMove.css';

const TeamMember = ({data, open, setActiveMove}) => {
    // console.log(data);
    // console.log(allMoves)

    let classes = `MemberMove `;
    if(data.name == null){
        classes += data.active ? "active" : "empty";
    }
    else{
        classes += `${data.type} move`;
    }

    return <div className={classes} onClick={() => {
        if(data.active)
            open(true);
        setActiveMove();
    }}>{data.name}</div>
}

export default TeamMember;