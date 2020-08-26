import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import './PokemonSearch.css';

const PokemonSearch = ({click, change, pokemon, openModal}) =>{
    
    const bool = pokemon != null;
    let el;

    if(typeof(pokemon) == 'string'){
        el = <h2>{pokemon}</h2>
    }else if(bool){
        el = <div className="Pokemon">
                 <Droppable droppableId={`${pokemon.name}-7`}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    height: 200,
                                }}
                            >
                                <Draggable key={pokemon.id} draggableId={pokemon.name}  index={7}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <img 
                                                    src={pokemon.sprites.front_default} 
                                                    alt={pokemon.name} 
                                                    onClick={() => openModal(pokemon)}    
                                                />
                                            </div>
                                        )
                                    }}
                                </Draggable>
                                {provided.placeholder}
                            </div>
                        )
                    }}
                 </Droppable>
                <h1>{pokemon.name}</h1>
            </div>


       
    }

    
    
    return (
        <div className="SearchContainer">
             <input type="text"  
                placeholder="Search"
                onChange={(event) => change(event.target.value)}
                onKeyPress={(event)=>{
                    if(event.key == 'Enter'){
                        click();
                    }
                }}/>
            {bool ? el : null}
        </div>
    )
}

export default PokemonSearch;