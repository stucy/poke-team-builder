import React from 'react';

const BackdropStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

const Backdrop = ({close}) => <div style={BackdropStyles} onClick={() => (
    close({open: false, data: null})
)}></div>;

export default Backdrop;