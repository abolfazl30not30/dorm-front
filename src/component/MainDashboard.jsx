import React, { Component } from 'react';
import Header from './Dashboard/Header';
import "../style/hamburgerMenu.css";
import "../style/mainDashboard.css";
import MainContext from '../contexts/ContextProvider';
import HamburgerMenu from './Dashboard/HamburgerMenu';
import MainPage from './Dashboard/MainPage';

class MainDashboard extends Component {
    state = {
        activeMenu: true,
        widthWindow:0,
    }
    componentWillUnmount() {
        this.setState({ activeMenu: true })
        this.setState({widthWindow:window.innerWidth})
    }
    componentDidMount() {

    }

    render() {
        return (
            <MainContext.Provider value={{ activeMenu: this.state.activeMenu, handleSidebar: this.handleSidebar }}>
                <div className="main-container">
                    <div className="sidenav" style={
                        window.innerWidth <= 426 ? (this.state.activeMenu ? {width : "0"} :{ width : "75%"}):
                            (window.innerWidth <= 768 ? (this.state.activeMenu ? {width : "0"} :{ width : "40%"}) :
                                (this.state.activeMenu ? { width: "0" } : { width: "22%" }))
                    }>
                        <HamburgerMenu />
                    </div>

                    <div className="main-page-container" style={
                        window.innerWidth <= 768 ? ({zIndex:"-1",width:"100%"}):
                        (this.state.activeMenu ? { width: "100%" } : { width: "78%" })
                    }>
                        <Header />
                        <MainPage />
                    </div>
                </div>
            </MainContext.Provider >


        );
    }

    handleSidebar = () => {
        if (this.state.activeMenu) {
            this.setState({ activeMenu: false })
        } else {
            this.setState({ activeMenu: true })
        }
    }
}

export default MainDashboard;