import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import './Pokedex.css';

const url1 = "https://pokeapi.co/api/v2/region";
const url2 = "https://pokeapi.co/api/v2/pokemon";

const Pokedex = () =>{
    // const [regions, setRegions] = useState([]);
    const [curRegion, setCurRegion] = useState(1);
    const [pokemon, setPokemon] = useState([]);
    const [load, setLoad] = useState({offset: 0, limit: 20});
    const [loading, setLoading] = useState(false);

    let isInitialMount = useRef(false);
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

        console.log('call')
    }, [loading]);

    // useEffect(() => {
    //     axios.get(url1).then(res => {
    //         // console.log(res);
    //         res.data.results.pop();
    //         setRegions(res.data.results);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // },[]);

    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current = false;
        }else{
            // setLoading(true);
            axios.get(`${url1}/${curRegion}`).then(res => {
                const pokedexes = [...res.data.pokedexes];
                Promise.all(
                    pokedexes.map(el => {
                        return axios(el.url);
                    })
                ).then(res => {
    
                    Promise.all(res.map( ({data}) => {
                        return Promise.all(data.pokemon_entries.slice(load.offset, load.limit).map( el => {
                            let startIndex = el.pokemon_species.url.indexOf("pokemon-species");
                            let number = el.pokemon_species.url.substring(startIndex + 16, el.pokemon_species.url.length - 1);
                            return axios(`${url2}/${number}`)
                        }))
                    })).then(res2 => {
                        
                        let data = res.map( ({data}, index) => {
                            return res2[index];
                        }).flat();

                        setPokemon(prev => {
                            return [...prev, ...data];
                        });
                        
                        setLoading(false);
                        
                    }).catch(err => {
                        console.log(err);
                    })
    
             
                })
                .catch(err =>{
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })

        }
    }, [curRegion, load]);

    // const regionComp = regions.map((el, index) => {
    //     return <button 
    //                 key={index}
    //                 onClick={() => setCurRegion(index + 1)}
    //             >
    //                 {el.name}
    //             </button>
    // });

    const PokemonCards = pokemon.map( ({data}, index) => {
        if(pokemon.length == index + 1) {
            return <PokemonCard ref={lastEl} key={data.id} pokemon={data} />
        }
        return  <PokemonCard key={data.id} pokemon={data} />
    })

    return(
        <div className="pokedexContainer">
            {/* <div className="Region">
                {regionComp}
            </div> */}
            <div className="Pokedex">
                {PokemonCards}
            </div>
            {loading ? <div>Loading...</div> : null}
        </div>
    )
}

export default Pokedex;