import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../Auxiliary';

import './Modal.css';

const Modal = ({children, open, close}) => {

    //Checks if the modal is open and renders it if it is
    if (!open) return null;

    //Renders it using react portals so that there arent any elements that go above its backdrop
    return ReactDOM.createPortal(
       <Auxiliary>
           <Backdrop close={close}/>
           <div className="Modal">
               <span className="close-modal" onClick={() => close()}>X</span>
                {children}
            </div>
       </Auxiliary>,
       document.getElementById('portal')
    )
};

export default Modal;