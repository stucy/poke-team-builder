import React, { useState } from 'react';

import Aux from '../Aux';
import Header from '../../components/Header/Header';
import Filters from '../../components/Filters/Filters';

const Layout = ({children}) => {

    return (
            <Aux>
                <Header/>
                {children}
            </Aux>
        )
};

export default Layout;