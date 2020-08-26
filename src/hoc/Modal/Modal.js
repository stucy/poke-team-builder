import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../Aux';

import './Modal.css';

const Modal = ({children, open, close}) => {
    if (!open) return null;

    return ReactDOM.createPortal(
       <Aux>
           <Backdrop close={close}/>
           <div className="Modal">
                {children}
            </div>
       </Aux>,
       document.getElementById('portal')
    )
};

export default Modal;