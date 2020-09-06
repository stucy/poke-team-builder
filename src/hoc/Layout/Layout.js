import React, { useState } from 'react';

import Aux from '../Aux';
import Header from '../../components/Header/Header';
import Filters from '../../components/Filters/Filters';

const Layout = ({children}) => {
    const [showFilter, setShowFilter] = useState(false);
    const [filterActive, setFilterActive] = useState('')

    return (
            <Aux>
                <Header show={setShowFilter}/>
                {showFilter ? <Filters active={filterActive} click={setFilterActive}/> : null}
                {children}
            </Aux>
        )
};

export default Layout;