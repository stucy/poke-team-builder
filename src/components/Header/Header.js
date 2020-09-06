import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import './Header.css';

import Logo from '../../images/PokeTB.svg';

const Header = ({show}) => {

    useEffect(()=>{
        let location = window.location.pathname;
        if(location == '/pokedex') show(true);
    }, [])
    
    return (
        <div className="Header">
            <div className="logoContainer">
                <div className="Logo">
                    <img src={Logo} alt="PokeTB Logo"/>
                </div>
                <div className="circleContainer">
                    <div className="circle red"></div>
                    <div className="circle yellow"></div>
                    <div className="circle green"></div>
                </div>
            </div>
            <ul className="Navigation">
                <li onClick={() => show(false)}>
                    <Link to="/">Home</Link>
                </li>
                <li onClick={() => show(true)}>
                    <Link to="/pokedex">Pokedex</Link>
                </li>
                <li onClick={() => show(false)}>
                    <Link to="/team-builder">Team Builder</Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;