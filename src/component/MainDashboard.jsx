import React, { Component } from 'react';
import Header from './Dashboard/Header';
import "../style/hamburgerMenu.css"
import MainContext from '../contexts/ContextProvider';
import HamburgerMenu from './Dashboard/HamburgerMenu';

class MainDashboard extends Component {
    state = {
        activeMenu: false
    }
    render() {
        return (
            <MainContext.Provider value={{ handleSidebar: this.handleSidebar }}>
                <Header />
                {this.state.activeMenu ? (
                    <div className='sidenav' style={{ animation: "open-sidebar 0.3s linear both" }}>
                        <HamburgerMenu />
                    </div>
                ) : (
                    <div className="sidenav" style={{ animation: "close-sidebar 0.3s linear both" }}>
                        <HamburgerMenu />
                    </div>
                )}
            </MainContext.Provider>


        );
    }

    handleSidebar = () => {
        if (this.state.activeMenu) {
            this.setState({ activeMenu: false })
        } else {
            this.setState({ activeMenu: true })
        }
        console.log("hello")
    }
}

export default MainDashboard;