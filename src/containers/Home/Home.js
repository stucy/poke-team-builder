import React from 'react';

import ProductInfo from '../../components/ProductInfo/ProductInfo';
import Aux from '../../hoc/Aux';

import './Home.css';

import ProductImg1 from '../../images/product1.png';

//Hardcoded data for the components
const product1 = {
    img: ProductImg1,
    title: 'Pokedex',
    orientation: 'left',
    text: 'A pokedex for every generation or region. Where you can filter pokemon by their type or search by name',
}

const product2 = {
    img: ProductImg1,
    title: 'Team Builder',
    orientation: 'right',
    text: 'An app where you can build and design a team of your liking. You can choose a pokemon, its move set, abilitie and item.',
}

const Home = () => (
    <Aux>
        <div className="HomeAbout">
            <h1>About</h1>
            <p>This is a web app made for educational purposes. I do not own the images or data that are being used. The functionalities below are made for practice with React.js and API calls.</p>
            <p>The data is from - <a href="https://pokeapi.co/" target="_blank">https://pokeapi.co/</a></p>
            <p>The images are from the official pokemon website.</p>
            <p>The design of the web app is by - Aleksandar</p>
        </div>
        <ProductInfo img={product1.img} text={product1.text} title={product1.title} orientation={product1.orientation} to={'/pokedex'}/>
        <ProductInfo img={product2.img} text={product2.text} title={product2.title} orientation={product2.orientation} to={'/team-builder'}/>
    </Aux>
);

export default Home;