import React from 'react';

import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => (
    <div className="Header">
        <div className="Logo">Logo</div>
        <ul className="Navigation">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/pokedex">Pokedex</Link>
            </li>
            <li>
                <Link to="/team-builder">Team Builder</Link>
            </li>
        </ul>
    </div>
);

export default Header;