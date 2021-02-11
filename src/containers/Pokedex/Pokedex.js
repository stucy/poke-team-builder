import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Filters from '../../components/Filters/Filters';
import Auxiliary from '../../hoc/Auxiliary';
import Loader from '../../components/Loader/Loader';

import './Pokedex.css';

const url1 = "https://pokeapi.co/api/v2/pokemon";
const url2 = "https://pokeapi.co/api/v2/pokedex";
const url3 = "https://pokeapi.co/api/v2/type/"
const url4 = "https://pokeapi.co/api/v2"

const pokedexType = [
    'updated',
    'extended',
    'kalos'
];

const Pokedex = () =>{

    //STATE

    //Pokedex state
    const [pokedex, setPokedex] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [lazyLoad, setLazyLoad] = useState({offset: 0, limit: 20});
    const [loading, setLoading] = useState(false);

    //Filter state
    const [filterActive, setFilterActive] = useState('');
    const [types, setTypes] = useState([]);
    const [pickedFilter, setPickedFilter] = useState('generation');
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedOptions, setSelectedOption] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);


    //REFS
    const firstLoad = useRef(true);
    const observer = useRef(null);
    const typesRef = useRef(null);
    const optionsRef = useRef(null);
    const lastEl = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setLazyLoad(prev => {
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
    
    //Toggles the types on and off
    const toggleTypeHandler = (node) => {
        //Toggles the active class on the type button
        node.classList.toggle('active');

        let type = node.textContent;

        //Gets the index of the clicked type if its in the array
        let index = selectedTypes.indexOf(type);

        //A variable for the new state
        let newSelectedTypes = selectedTypes;
        
        //Checks if clicked type is in the array
        if(index > -1){
            //Removes it if its in the array
            newSelectedTypes.splice(index, 1);
        }
        else{
            //Adds it if it isnt in the array
            newSelectedTypes.push(type);
        }


        // console.log(newSelectedTypes);

        setSelectedTypes(newSelectedTypes);
    };

    //Toggles the options on and off
    const toggleOptionHandler = (node) => {

        //We check if the input is clicked
        if(node.nodeName == 'INPUT'){
            let option = node.value;

            //Gets the index of the clicked type if its in the array
            let index = selectedOptions.indexOf(option);

            //A variable for the new state
            let newSelectedOptions = selectedOptions;

            //Checks if clicked type is in the array
            if(index > -1){
                //Removes it if it isnt in the array
                newSelectedOptions.splice(index, 1);
            }
            else{
                //Adds it if it isnt in the array
                newSelectedOptions.push(option);
            }

            //We sort the optios so that the pokemon are in order
            newSelectedOptions.sort();

            setSelectedOption(newSelectedOptions);
        }
    }

    const applyFilterHandler = () => {
        //Resets the state
        setPokedex([]);
        setPokemon([]);
        setFilterActive('');
        setFilterApplied(true);
        
        //Get all the selected options
        Promise.all(selectedOptions.map( el => {
            return axios(`${url4}/${pickedFilter}/${el}`);
        }))
        .then( res => {
            //If its by generation just update the state
            if(pickedFilter == 'generation'){
                let data = res.map( ({data}) => data.pokemon_species).flat();
                setPokedex(data);
                setLazyLoad({offset: 0, limit: 20})
            }
            else{
                //If its by region we need to get the pokedexes
                Promise.all(res.map(el => {
                    let promises = [];
                    let dexes = el.data.pokedexes;

                    //Some regions have more than one pokedex so we need to filter them
                    for(let i = 0; i < dexes.length; i++){
                        if( dexes[i].name.includes(pokedexType[0]) ||
                            dexes[i].name.includes(pokedexType[1]) ||
                            dexes[i].name.includes(pokedexType[2])
                        ){
                            promises.push(axios(dexes[i].url));
                        }
                    }
                    return Promise.all(promises)
                }))
                .then(res => {
                    //Then we remove parts of the data that we wont use and set the state
                    let data = res.flat().map(el => {
                        return el.data.pokemon_entries.map(el => el.pokemon_species);
                    }).flat()
                    setPokedex(data);
                    setLazyLoad({offset: 0, limit: 20})
                })
                .catch(err => console.log(err));
            }
            
        })
        .catch(err => console.log(err));
    };

    const resetFilterHandler = () => {
        //Resets the state
        setPokemon([]);
        setFilterActive('');
        setLoading(true);
        setFilterApplied(false);

        //Unchecks all the types
        let i;
        for(i = 0; i < typesRef.current.children.length; i++){
            typesRef.current.children[i].classList.remove('active');
        }

        //Unchecks all the options
        for(i = 0; i < optionsRef.current.children.length; i++){
            optionsRef.current.children[i].children[0].checked = false;
        }

        //Resets the state for the filters
        setSelectedOption([]);
        setSelectedTypes([]);

        //Gets the national pokedex and sets the state
        axios.get(`${url2}/1`).then(res => {

            const pokemon = res.data.pokemon_entries.map(el => el.pokemon_species);
            setPokedex(pokemon);
            setLazyLoad({offset: 0, limit: 20})
        })
        .catch(err => console.log(err));
    }

    //Get data on initial load
    useEffect(() => {
        //Run only at first load of the page
        if(!firstLoad.current) return;
         
        setLoading(true);

        //Gets national pokedex
        axios.get(`${url2}/1`).then(res => {

            const pokemon = res.data.pokemon_entries.map(el => el.pokemon_species);
            setPokedex(pokemon);

            //Gets the first 20 pokemon from the national pokedex
            Promise.all(pokemon.slice(lazyLoad.offset, lazyLoad.limit).map( el => {
                let startIndex = el.url.indexOf("pokemon-species");
                let number = el.url.substring(startIndex + 16, el.url.length - 1);
                return axios(`${url1}/${number}`)
            }))
            .then(res => {
                
                setPokemon(res);
                setLoading(false);
            })
            
            firstLoad.current = false
        })
        .catch(err => console.log(err));

        //Gets all pokemon types for the filter
        axios.get(url3).then(res => {
            let types = res.data.results
            
            //Removes shadow and unknown types
            types.pop();
            types.pop();

            setTypes(types);
        })
        .catch(err => console.log(err));

        //Gets default filter options for the filter
        axios.get(`${url4}/${pickedFilter}`).then(res => {
            setFilterOptions(res.data.results);
        })
        .catch(err => console.log(err));
          
    }, []);

    //Load more pokemon on scroll
    useEffect(() => {
        //Dont run on first load
        if(firstLoad.current) return;
        
        setLoading(true);

        //Gets the next 20 pokemon from the selected pokemon list
        Promise.all(pokedex.slice(lazyLoad.offset, lazyLoad.limit).map( el => {
            let startIndex = el.url.indexOf("pokemon-species");
            let number = el.url.substring(startIndex + 16, el.url.length - 1);
            return axios(`${url1}/${number}`)
        }))
        .then(res => {

            // console.log(filterApplied);
            // console.log(selectedTypes);

            if(filterApplied && selectedTypes.length > 0){

                //Filters pokemon based on the selected filter types
                res = res.filter( ({data}) => {
                    let bool = false;

                    //Checks if the current pokemon is of one of the selected types
                    data.types.forEach(el => {
                        if(selectedTypes.includes(el.type.name)){
                            bool = true;
                        }
                    });
                    return bool;
                });
            }

            //combines the old state and the new data
            setPokemon(prev => {
                return [...prev, ...res];
            });
            setLoading(false);
        })

    }, [lazyLoad]);

    //On filter choice change get the new options
    useEffect(() => {
        //Doesnt run on first load
        if(firstLoad.current) return;

        //Gets the options of the selected category
        axios(`${url4}/${pickedFilter}`).then(res => {
            //Sets the options state
            setFilterOptions(res.data.results);
            
            //Unchecks the selected options
            for(let i = 0; i < optionsRef.current.children.length; i++){
                optionsRef.current.children[i].children[0].checked = false;
            }

            //Resets the state for the selected options
            setSelectedOption([]);
        })
        .catch(err => console.log(err));

    }, [pickedFilter]);

    //Creates a card for each pokemon that has been fetched
    const PokemonCards = pokemon.map( ({data} ) => {
        return(
            <Link to={`/pokemon/${data.name}`}>
                <PokemonCard key={data.id} pokemon={data} />
            </Link>
        )
    });

    return(
        <Auxiliary>
            <Filters 
                active={filterActive} 
                click={setFilterActive}
                types={types}
                filterOptions={filterOptions}
                changeFilter={setPickedFilter}
                toggleType={toggleTypeHandler}
                toggleOption={toggleOptionHandler}
                reset={resetFilterHandler}
                apply={applyFilterHandler}
                typesRef={typesRef}
                optionsRef={optionsRef}
            />
            <div className="pokedexContainer">
                <div className="Pokedex">
                    {PokemonCards}
                </div>
                <hr ref={lastEl}/>
                {loading ? <Loader /> : null}
            </div>
        </Auxiliary>
    )
}

export default Pokedex;