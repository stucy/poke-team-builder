import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import './Pokedex.css';

const url1 = "https://pokeapi.co/api/v2/region";
const url2 = "https://pokeapi.co/api/v2/pokemon";

const Pokedex = () =>{
    // const [regions, setRegions] = useState([]);
    const [curRegion, setCurRegion] = useState(1);
    const [pokedex, setPokedex] = useState([]); 

    let isInitialMount = useRef(true);

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

            axios.get(`${url1}/${curRegion}`).then(res => {
                const pokedexes = [...res.data.pokedexes];
                Promise.all(
                    pokedexes.map(el => {
                        return axios(el.url);
                    })
                ).then(res => {
    
                    Promise.all(res.map( ({data}) => {
                        return Promise.all(data.pokemon_entries.map( el => {
                            let startIndex = el.pokemon_species.url.indexOf("pokemon-species");
                            let number = el.pokemon_species.url.substring(startIndex + 16, el.pokemon_species.url.length - 1);
                            return axios(`${url2}/${number}`)
                        }))
                    })).then(res2 => {
                        
                        let data = res.map( ({data}, index) => {
                            let obj =  {
                                id: data.id,
                                name: data.name,
                                pokemon: res2[index],
                            }
                            return obj;
                        });
                        setPokedex(data);
                        
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
    }, [curRegion]);

    // const regionComp = regions.map((el, index) => {
    //     return <button 
    //                 key={index}
    //                 onClick={() => setCurRegion(index + 1)}
    //             >
    //                 {el.name}
    //             </button>
    // });

    const PokemonCards = pokedex.map(el => {
        return  <div key={el.id}>
                    <div className="regionName" >{el.name}</div>
                    <div className="PokedexPart">
                        {el.pokemon.map( ({data}) => (
                            <PokemonCard 
                                key={data.id}
                                pokemon={data}
                            />
                        ))}
                    </div>
                </div>
    })

    return(
        <div className="pokedexContainer">
            {/* <div className="Region">
                {regionComp}
            </div> */}
            <div className="Pokedex">
                {PokemonCards}
            </div>
        </div>
    )
}

export default Pokedex;