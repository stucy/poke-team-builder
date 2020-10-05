import React from 'react';

import ProductInfo from '../../components/ProductInfo/ProductInfo';
import Aux from '../../hoc/Aux';
import ProductImg1 from '../../images/product1.png';

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
        <ProductInfo img={product1.img} text={product1.text} title={product1.title} orientation={product1.orientation}/>
        <ProductInfo img={product2.img} text={product2.text} title={product2.title} orientation={product2.orientation}/>
    </Aux>
);

export default Home;