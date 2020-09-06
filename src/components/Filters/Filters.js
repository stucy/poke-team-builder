import React from 'react'

import './Filters.css';

const Filters = ({active, click}) => (
    <div className={`Filter ${active}`}>
        <div className="FilterControls">
            Filter Controls
        </div>
        <button className="FilterBtn" onClick={() => {
            let a;
            switch (active) {
                case 'active':
                    a = 'closed';
                    break;
                default:
                    a = 'active';
                    break;
            }
            click(a);
        }}>Filters</button>
    </div>
);

export default Filters;