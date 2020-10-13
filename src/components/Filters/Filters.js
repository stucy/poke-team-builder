import React from 'react'

import './Filters.css';

const Filters = ({active, click, types, filterOptions, changeFilter, apply, reset, toggleOption, toggleType, optionsRef, typesRef}) => {

    //Loops over an array of Pokemon types and creates a button for each of them
    const typesEls = types.map( (el, index) => (
        <button className={`${el.name} filterType`} key={index} onClick={(e) => toggleType(e.target)} >{el.name}</button>
    ));

    //Loops over an array of options depending on the chosen category and creates buttons for them
    const options = filterOptions.map( (el, index) => {
        let name;

        //If generation is chosen we need to change the string
        if(el.name.includes('-')){
            name = el.name.split('-')
            name = `${name[0]} ${name[1].toUpperCase()}`;
        }
        else{
            name = el.name;
        }

        //Returns a custom checkbox for the options
        return (
            <label className="customInputContainer" key={index} onClick={(e) => toggleOption(e.target)}>
                {name}
                <input type="checkbox" value={index + 1}/>
                <span className="checkmark"></span>
            </label>
        );
        
    });

    return (
        <div className={`Filter ${active}`}>
            <div className="FilterControls">
                <div className="filterTypes" ref={typesRef}>
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
                <div className="filterOptions" ref={optionsRef}>
                    {options}
                </div>
                <div className="filterButtons">
                    <button onClick={reset}>Reset</button>
                    <button onClick={apply}>Filter</button>
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