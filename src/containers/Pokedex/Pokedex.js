import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Filters from '../../components/Filters/Filters';
import Aux from '../../hoc/Aux';
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
    const toggleTypeHandler = (node) => {
        node.classList.toggle('active');
        let type = node.textContent;
        let index = selectedTypes.indexOf(type);
        let newSelectedTypes = selectedTypes;
        if(index > -1){
            newSelectedTypes.splice(index, -1);
        }
        else{
            newSelectedTypes.push(type);
        }

        setSelectedTypes(newSelectedTypes);
    };

    const toggleOptionHandler = (node) => {
        if(node.nodeName == 'INPUT'){
            let option = node.value;
            let index = selectedOptions.indexOf(option);
            let newSelectedOptions = selectedOptions;
            if(index > -1){
                newSelectedOptions.splice(index, -1);
            }
            else{
                newSelectedOptions.push(option);
            }

            newSelectedOptions.sort();

            setSelectedOption(newSelectedOptions);
        }
    }

    const applyFilterHandler = () => {
        setPokedex([]);
        setPokemon([]);
        setFilterActive('');
        setFilterApplied(true);
        
        Promise.all(selectedOptions.map( el => {
            return axios(`${url4}/${pickedFilter}/${el}`);
        }))
        .then( res => {
            if(pickedFilter == 'generation'){
                let data = res.map( ({data}) => data.pokemon_species).flat();
                setPokedex(data);
                setLazyLoad({offset: 0, limit: 20})
            }
            else{
                Promise.all(res.map(el => {
                    let promises = [];
                    let dexes = el.data.pokedexes;
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
        setPokemon([]);
        setFilterActive('');
        setLoading(true);
        setFilterApplied(false);

        let i;
        for(i = 0; i < typesRef.current.children.length; i++){
            typesRef.current.children[i].classList.remove('active');
        }

        for(i = 0; i < optionsRef.current.children.length; i++){
            optionsRef.current.children[i].children[0].checked = false;
        }

        setSelectedOption([]);
        setSelectedTypes([]);

        axios.get(`${url2}/1`).then(res => {

            const pokemon = res.data.pokemon_entries.map(el => el.pokemon_species);
            setPokedex(pokemon);
            setLazyLoad({offset: 0, limit: 20})
        })
        .catch(err => console.log(err));
    }

    //Get data on initial load
    useEffect(() => {
        if(!firstLoad.current) return;
         
        setLoading(true);

        //Gets national pokedex
        axios.get(`${url2}/1`).then(res => {

            const pokemon = res.data.pokemon_entries.map(el => el.pokemon_species);
            setPokedex(pokemon);

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
            let startIndex = el.url.indexOf("pokemon-species");
            let number = el.url.substring(startIndex + 16, el.url.length - 1);
            return axios(`${url1}/${number}`)
        }))
        .then(res => {

            // console.log(filterApplied);
            // console.log(selectedTypes);

            if(filterApplied){
                res = res.filter( ({data}) => {
                    let bool = false;
                    data.types.forEach(el => {
                        if(selectedTypes.includes(el.type.name)){
                            bool = true;
                        }
                    });
                    return bool;
                });
            }

            setPokemon(prev => {
                return [...prev, ...res];
            });
            setLoading(false);
        })

    }, [lazyLoad]);

    //On filter choice change
    useEffect(() => {
        if(firstLoad.current) return;

        axios(`${url4}/${pickedFilter}`).then(res => {
            setFilterOptions(res.data.results);
            for(let i = 0; i < optionsRef.current.children.length; i++){
                optionsRef.current.children[i].children[0].checked = false;
            }
            setSelectedOption([]);
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
        </Aux>
    )
}

export default Pokedex;