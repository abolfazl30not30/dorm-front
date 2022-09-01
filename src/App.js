import React, { Component } from 'react';
import Login from './component/Login';
import HamburgerMenu from './component/Dashboard/HamburgerMenu'
import Header from './component/Dashboard/Header';

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
                <Header/>
                <HamburgerMenu status='close'/>
            </div>
            
            </>
        );
    }
}
 
export default App;