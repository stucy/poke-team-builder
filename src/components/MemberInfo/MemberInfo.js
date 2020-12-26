import React from 'react';

import './MemberInfo.css';

const MemberInfo = ({data}) => {
    console.log(data);

    return (
        <div className="MemberInfo">
            <img className="InfoImg" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" />
            <div className="infoContainer" style={{zIndex: 2}}>
                <button> &lsaquo; </button>

                <div className="statsContainer">
                    <h1 className="infoTitle">Stats</h1>
                    <div className="dataContainer">
                        <div className="stat">
                            <div className="statTitle">HP</div>
                            <div className="statNumber">35</div>
                            <div className="statLine" style={{width: (35/180) * 100}}></div>
                        </div>
                    </div>
                </div>

                <button> &rsaquo; </button>
            </div>
        </div>
    );
}

export default MemberInfo;