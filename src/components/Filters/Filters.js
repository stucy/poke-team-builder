import React from 'react'

import './Filters.css';

const Filters = ({active, click, types, filterOptions, changeFilter, selectType}) => {

    const typesEls = types.map( (el, index) => (
        <button className={`${el.name} filterType`} key={index} onClick={(e) => selectType(e.target)} >{el.name}</button>
    ));

    const options = filterOptions.map( (el, index) => {
        let name;

        if(el.name.includes('-')){
            name = el.name.split('-')
            name = `${name[0]} ${name[1].toUpperCase()}`;
        }
        else{
            name = el.name;
        }

        return (
            <label className="customInputContainer" key={index}>
                {name}
                <input type="checkbox" value={el.name}/>
                <span className="checkmark"></span>
            </label>
        );
        
    });

    return (
        <div className={`Filter ${active}`}>
            <div className="FilterControls">
                <div className="filterTypes">
                    {typesEls}
                </div>
                <div className="filterChoice">
                    <span>Search by: </span>
                    <label className="customInputContainer">
                        Generation
                        <input 
                            type="radio" 
                            value="generation" 
                            name="filterChoice" 
                            defaultChecked
                            onClick={(e) => changeFilter(e.target.value)}/>
                        <span className="checkmark radio"></span>
                    </label>
                    <label className="customInputContainer">
                        Region
                        <input 
                            type="radio" 
                            value="region" 
                            name="filterChoice" 
                            onClick={(e) => changeFilter(e.target.value)}/>
                        <span className="checkmark radio"></span>
                    </label>
                </div>
                <div className="filterOptions">
                    {options}
                </div>
                <div className="filterButtons">
                    <button>Reset</button>
                    <button>Filter</button>
                </div>
            </div>
            <button className="FilterBtn" onClick={() => {
                let a = active == "" ? 'active' : '';
                click(a);
            }}>Filters</button>
        </div>
    )
};

export default Filters;