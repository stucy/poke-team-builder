import React from 'react';

import Aux from '../Aux';
import Header from '../../components/Header/Header';

const Layout = ({children}) => {

    return (
            <Aux>
                <Header/>
                {children}
            </Aux>
        )
};

export default Layout;