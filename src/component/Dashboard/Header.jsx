import React, { Component } from 'react';
import HamburgerMenu from './HamburgerMenu.jsx';
import "../../style/header.css";
import MainContext from '../../contexts/ContextProvider';

class Header extends Component {
    static contextType = MainContext;
    state = {}
    render() {
        return (
            <>
                <div className='header'>
                    <button className='btn' onClick={() => { this.context.handleSidebar() }}><i class="bi bi-list"></i></button>
                    <div><i class="bi bi-person"></i></div>
                </div>
            </>
        );
    }

}




export default Header;

