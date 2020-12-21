import React from 'react';

import './MemberInfo.css';

const MemberInfo = ({data}) => {
    console.log(data);

    return (
        <div className="MemberInfo">
            <img className="InfoImg" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" />
            <div className="infoContainer" style={{zIndex: 2}}>
                <button> Previouse </button>

                <div>
                    <h1 className="infoTitle">Stats</h1>
                    <div className="dataContainer">Container 1</div>
                </div>

                <button> Next </button>
            </div>
        </div>
    );
}

export default MemberInfo;