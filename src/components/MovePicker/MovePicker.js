import React, {useState, useRef} from 'react';

import './MovePicker.css';

const MovePicker = ({allMoves, setTeam, activeMember, activeMove, close}) =>{
    const [move, setMove] = useState('Moves');
    const [moves, setMoves] = useState(allMoves);

    const dropdown = useRef();
    
    const searchHandler = (e) => {
        let filteredMoves = moves.filter(({move}) => move.name.includes(e.target.value));

        setMoves(filteredMoves);
    }
    
    return (
        <div className="MovePicker">
            <h2>Pick a Move</h2>
            <div className="dropdown">
                <div className='dropdownBtn' onClick={() => dropdown.current.classList.toggle('show')}>{move}</div>
                <div id="myDropdown" ref={dropdown} className="dropdown-content">
                    <input type="text" placeholder="Search.." onKeyUp={searchHandler} id="myInput"/>
                    {moves.map( ({move}, index) => { 
                        return <span key={index} onClick={(e) => {
                            setMove(e.target.textContent);
                            dropdown.current.classList.toggle('show');
                        }}>{move.name}</span>
                    })}
                </div>
            </div>
            <button className="moveBtn" onClick={() => {
                if(move == 'Moves')
                    return;
                setTeam(prevState => {
                    prevState[activeMember].selectedMoves[activeMove].name = move;
                    if(activeMove + 1 < 4)
                        prevState[activeMember].selectedMoves[activeMove + 1].active = true;

                    return [...prevState];
                });
                close();
            }}>Set Move</button>
        </div>
    )
}

export default MovePicker;