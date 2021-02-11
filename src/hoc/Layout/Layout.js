import React from 'react';

import Auxiliary from '../Auxiliary';
import Header from '../../components/Header/Header';

const Layout = ({children}) => {

    return (
            <Auxiliary>
                <Header/>
                {children}
            </Auxiliary>
        )
};

export default Layout;