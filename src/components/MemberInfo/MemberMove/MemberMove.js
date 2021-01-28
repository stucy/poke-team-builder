import React from 'react';

import Aux from "../../../hoc/Aux";

import './MemberMove.css';

const TeamMember = ({data}) => {
    // console.log(data);

    // data.name = null;

    let classes = `MemberMove `;
    if(data.name == null){
        classes += data.active ? "active" : "empty";
    }
    else{
        classes += `${data.type} move`;
    }

    return (
        <div className={classes}>
            {data.name == null ? null :
                <Aux>
                    <div className="moveName">{data.name}</div>
                    <div className="movePP">{data.pp} PP</div>
                </Aux>
            }
        </div>
    );
}

export default TeamMember;