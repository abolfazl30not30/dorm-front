import React, { Component } from 'react';
import HamburgerMenu from './../Dashboard/HamburgerMenu';


class Header extends Component {
    state = {  } 
    render() { 
        console.log(this)
        return (
            <>
            <div className='header'>
                <button className='btn' onClick={this.toggleSidebar}><i class="bi bi-list"></i></button>
                <div><i class="bi bi-person"></i></div>
            </div>
            </>
        );
    }
    
}
 



export default Header;

