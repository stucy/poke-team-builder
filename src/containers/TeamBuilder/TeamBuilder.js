import React, { useState } from 'react'
import axios from 'axios';


import './TeamBuilder.css';

import PokeballImg from '../../images/pokeballBG.svg';

const emptyTeam = [{},{},{},{},{},{}]
const url = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {

    return (
        <div className="TeamBuilder">
            <img className="PokeballBG" src={PokeballImg} alt="Pokeball" />
        </div>
    );
}

export default App;
