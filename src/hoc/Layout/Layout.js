import React from 'react';

import Aux from '../Aux';

const Layout = ({children}) => (
    <Aux>
        <h1>Header</h1>
        {children}
    </Aux>
);

export default Layout;