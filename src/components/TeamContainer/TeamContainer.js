import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import TeamMember from './TeamMember/TeamMember';

import './TeamContainer.css';

const TeamContainer = ({ team, openModal}) => {
    return (
        <div className="TeamContainer-outer">
            <div className="TeamContainer-inner">
                {team.map((el, index) => (
                    <Droppable droppableId={`${index}`} key={index}>
                        {(provided, snapshot) => {
                            return(
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        height: 200,
                                        width: 200,
                                        background: snapshot.isDraggingOver ? 'lightblue' : 'transparent'
                                    }}
                                >
                                    <TeamMember 
                                    key={index}
                                    data={el}
                                    openModal={openModal}/>
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                ))}
            </div>
        </div>
    )
}

export default TeamContainer;