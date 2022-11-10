import React, {Component} from 'react';
import logo from "../../img/logo.png"
import "../../style/hamburgerMenu.css";
import {Link, NavLink} from 'react-router-dom';
import MainContext from '../../contexts/ContextProvider';

class HamburgerMenu extends Component {
    state = {}
    static contextType = MainContext;

    render() {
        return (

            <div style={
                this.context.activeMenu ? {display: "none"} : {display: "block"}
            }>
                <div className='close-icon'>
                    <button onClick={() => {
                        this.context.handleSidebar()
                    }}>
                        <i className='bi bi-x'/>
                    </button>
                </div>
                <div className='logo-container'>
                    <img src={logo} className="sidenav-logo" alt="لوگو"/>
                </div>
                <ul>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/payment" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"/>
                            ثبت فاکتور
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/Calender" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-file-earmark-text"/>
                            تقويم
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/PersonnelRegister" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-file-earmark-text" />
                            personnel register
                        </Link>
                    </li>
                    {/*<li className='sidenav-item'>*/}
                    {/*    <Link to="/Request" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>*/}
                    {/*        <i className="bi bi-person-circle" />*/}
                    {/*        درخواست*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/Request" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-circle"/>
                            درخواست
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/Request-manager" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-circle"/>
                            درخواست (مدیریت)
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/camera-history" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-circle"/>
                            دوربین
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/PaymentHistory" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"/>
                            صورتحساب
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/contacts" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"/>
                            مخاطبین
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/CallHistory" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"></i>
                            تاریخچه تماس ها
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/taskManagement" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"></i>
                            مدیریت وظایف
                        </NavLink>
                    </li>
                    <li className="sidenav-item">
                        <NavLink activeClassName='active-sidebar' to="/Inventory" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"></i>
                            انبار
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}


export default HamburgerMenu;