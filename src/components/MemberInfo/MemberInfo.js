import React, {useState} from 'react';
import Carousel from 'react-elastic-carousel';

import MemberMove from './MemberMove/MemberMove';
import Aux from '../../hoc/Aux';
import Modal from '../../hoc/Modal/Modal';
import MovePicker from '../../components/MovePicker/MovePicker';

import './MemberInfo.css';

const MemberInfo = ({data, activeMember, setTeam}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMove, setActiveMove] = useState(0);

    // console.log(data);

    //Transforms a number to a 3 digit number: 3 => 003; 23 => 023;
    const TransfromDigit = (number) =>{
        return number = `00${number}`.slice(-3);
    }

    let imgNumber = TransfromDigit(data.id);

    return (
        <Aux>
        { data.name ?
        <div className="MemberInfo">
            <img className="InfoImg" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgNumber}.png`} />
            <div className="infoContainer" style={{zIndex: 2}}>
                {/* <button> &lsaquo; </button> */}

                <Carousel itemsToShow={1}>

                    <div className="moveContainer">
                        <h1 className="infoTitle">Moves</h1>
                        {data.selectedMoves.map((move, index) => {
                            return <MemberMove  allMoves={data.allMoves}
                                                key={index} 
                                                data={move}
                                                open={setIsOpen}
                                                setActiveMove={() => setActiveMove(index)}/>
                        })}
                    </div>

                    <div className="statsContainer">
                        <h1 className="infoTitle">Stats</h1>
                        <div className="dataContainer">

                            {data.stats.map(({stat, base_stat}) => {
                                return (
                                    <div className="stat" key={stat.name}>
                                        <div className="statTitle">{stat.name}</div>
                                        <div className="statNumber">{base_stat}</div>
                                        <div className="statLine" style={{width: `${(base_stat/450) * 100}%`}}></div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>

                    {/* <div className="typesContainer">
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
                    </div> */}

                </Carousel>

               
                {/* <button> &rsaquo; </button> */}
            </div>
        </div> 
        : <div style={{height: '300px'}}></div>}
            <Modal close={() => setIsOpen(false)} open={isOpen} >
                <MovePicker allMoves={data.allMoves} activeMember={activeMember} setTeam={setTeam} activeMove={activeMove} close={() => setIsOpen(false)}/>
            </Modal>
        </Aux>
    );
}

export default MemberInfo;