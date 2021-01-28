import React from 'react';
import Carousel from 'react-elastic-carousel';

import MemberMove from './MemberMove/MemberMove';

import './MemberInfo.css';

const MemberInfo = ({data}) => {
    // console.log(data);

    return (
        <div className="MemberInfo">
            <img className="InfoImg" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" />
            <div className="infoContainer" style={{zIndex: 2}}>
                {/* <button> &lsaquo; </button> */}

                <Carousel itemsToShow={1}>

                    <div className="moveContainer">
                        <h1 className="infoTitle">Moves</h1>
                        <MemberMove data={{name: 'Thunder', type: "electric", pp: 10}}/>
                        <MemberMove data={{active: true}}/>
                        <MemberMove data={{active: false}}/>
                        <MemberMove data={{active: false}}/>
                    </div>

                    <div className="statsContainer">
                        <h1 className="infoTitle">Stats</h1>
                        <div className="dataContainer">

                            <div className="stat">
                                <div className="statTitle">HP</div>
                                <div className="statNumber">35</div>
                                <div className="statLine" style={{width: `${(35/255) * 100}%`}}></div>
                            </div>

                            <div className="stat">
                                <div className="statTitle">Attack</div>
                                <div className="statNumber">55</div>
                                <div className="statLine" style={{width: `${(55/255) * 100}%`}}></div>
                            </div>

                            <div className="stat">
                                <div className="statTitle">Defence</div>
                                <div className="statNumber">40</div>
                                <div className="statLine" style={{width: `${(40/255) * 100}%`}}></div>
                            </div>

                        </div>
                    </div>

                    <div className="typesContainer">
                        <h1 className="infoTitle">Stats</h1>
                        <div className="dataContainer">
                            <div className="typeInfo">
                                <div>Weak to:</div>
                                
                                <div className="type">
                                    <div className="type ground">
                                        <div>Ground</div>
                                        <div className="typeDmg">2x</div>
                                    </div>
                                </div>

                            </div>
                            <div>Immune to:</div>
                            <div>Resistant to:</div>
                        </div>
                    </div>

                </Carousel>

               
                {/* <button> &rsaquo; </button> */}
            </div>
        </div>
    );
}

export default MemberInfo;