import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Filters from '../../components/Filters/Filters';
import Aux from '../../hoc/Aux';

import './Pokedex.css';

import Loader from '../../images/Loader.svg';

const url1 = "https://pokeapi.co/api/v2/pokemon";
const url2 = "https://pokeapi.co/api/v2/pokedex/1";
const url3 = "https://pokeapi.co/api/v2/type/"
const url4 = "https://pokeapi.co/api/v2"

const Pokedex = () =>{

    //STATE

    //Pokedex state
    const [pokedex, setPokedex] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [lazyLoad, setLoad] = useState({offset: 0, limit: 20});
    const [loading, setLoading] = useState(false);

    //Filter state
    const [filterActive, setFilterActive] = useState('');
    const [types, setTypes] = useState([]);
    const [pickedFilter, setPickedFilter] = useState('generation');
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedOptions, setSelectedOption] = useState([]);


    //REFS
    const firstLoad = useRef(true);
    const observer = useRef(null);
    const lastEl = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setLoad(prev => {
                    return {
                        offset: prev.offset + 20,
                        limit: prev.limit + 20
                    }
                });
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    //function handlers
    const selectTypeHandler = (node) => {
        console.log(node);
    };

    const selectOptionHandler = (node) => {
        console.log(node);
    }

    const applyFilterHandler = () => {

    };

    const resetFilterHandler = () => {

    }

    //Get data on initial load
    useEffect(() => {
        setLoading(true);

        //Gets national pokedex
        axios.get(url2).then(res => {

            const pokemon = res.data.pokemon_entries;
            setPokedex(pokemon);

            Promise.all(pokemon.slice(lazyLoad.offset, lazyLoad.limit).map( el => {
                let startIndex = el.pokemon_species.url.indexOf("pokemon-species");
                let number = el.pokemon_species.url.substring(startIndex + 16, el.pokemon_species.url.length - 1);
                return axios(`${url1}/${number}`)
            }))
            .then(res => {
                setPokemon(res);
                setLoading(false);
            })
            
            firstLoad.current = false
        })
        .catch(err => console.log(err));

        //Gets all pokemon types
        axios.get(url3).then(res => {
            let types = res.data.results
            types.pop();
            types.pop();
            setTypes(types);
        })
        .catch(err => console.log(err));

        //Gets default filter options
        axios.get(`${url4}/${pickedFilter}`).then(res => {
            setFilterOptions(res.data.results);
        })
        .catch(err => console.log(err));
          
    }, []);

    //Load more pokemon on scroll
    useEffect(() => {
        if(firstLoad.current) return;
        
        setLoading(true);
        Promise.all(pokedex.slice(lazyLoad.offset, lazyLoad.limit).map( el => {
            let startIndex = el.pokemon_species.url.indexOf("pokemon-species");
            let number = el.pokemon_species.url.substring(startIndex + 16, el.pokemon_species.url.length - 1);
            return axios(`${url1}/${number}`)
        }))
        .then(res => {
            setPokemon(prev => {
                return [...prev, ...res];
            });
            setLoading(false);
        })

    }, [lazyLoad]);

    //On filter choice change
    useEffect(() => {
        if(firstLoad.current) return;

        console.log(pickedFilter)

        axios(`${url4}/${pickedFilter}`).then(res => {
            console.log(res.data.results)
            setFilterOptions(res.data.results);
        })
        .catch(err => console.log(err));

    }, [pickedFilter]);

    const PokemonCards = pokemon.map( ({data} ) => {
        return  <PokemonCard key={data.id} pokemon={data} />
    });

    return(
        <Aux>
            <Filters 
                active={filterActive} 
                click={setFilterActive}
                types={types}
                filterOptions={filterOptions}
                changeFilter={setPickedFilter}
                selectType={selectTypeHandler}
            />
            <div className="pokedexContainer">
                <div className="Pokedex">
                    {PokemonCards}
                </div>
                <hr ref={lastEl}/>
                {loading ? <img src={Loader} id="loader" alt="Loader"/> : null}
            </div>
        </Aux>
    )
}

export default Pokedex;