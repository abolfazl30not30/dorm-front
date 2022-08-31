import React, { Component } from 'react';
import Login from './component/Login';
import HamburgerMenu from './component/Dashboard/HamburgerMenu'

class App extends Component {
    state = {} 
    render() { 
        return (
            <>
            <HamburgerMenu/>
            </>
        );
    }
}
 
export default App;