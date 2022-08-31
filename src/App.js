import React, { Component } from 'react';
import Login from './component/Login';
import HamburgerMenu from './component/Dashboard/HamburgerMenu'

class App extends Component {
    state = {} 
    render() { 
        const mystyle = {
            backgroundColor:'#eee',
            height:'100vh'
        }
        return (
            <>
            <div style={mystyle}>
                <HamburgerMenu/>
            </div>
            
            </>
        );
    }
}
 
export default App;