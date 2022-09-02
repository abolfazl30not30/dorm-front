import React, { Component } from 'react';
import Header from './Dashboard/Header';
import MainContext from '../contexts/ContextProvider';

class MainDashboard extends Component {
    state = {
        activeMenu: false
    }
    render() {
        return (
            <MainContext.Provider value={{ handleSidebar: this.handleSidebar }}>
                <Header />
                {console.log(hello)}
            </MainContext.Provider>


        );
    }

    handleSidebar = () => {
        if (this.state.activeMenu) {
            this.state.activeMenu = false;
        } else {
            this.state.activeMenu = true;
        }
    }
}

export default MainDashboard;