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
                            <i className="bi bi-calculator"></i>
                            ثبت فاکتور
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/Calender" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-calendar"></i>
                            تقويم
                        </NavLink>
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
                            <i className="bi bi-envelope"></i>
                            درخواست (مدیریت)
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/camera-history" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-camera-video"></i>
                            دوربین
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/PaymentHistory" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-layout-text-sidebar"></i>
                            صورتحساب
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/contacts" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-rolodex"></i>
                            مخاطبین
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/CallHistory" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-telephone"></i>
                            تاریخچه تماس ها
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/taskManagement" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-gear"></i>
                            مدیریت وظایف
                        </NavLink>
                    </li>
                    <li className="sidenav-item">
                        <NavLink activeClassName='active-sidebar' to="/Inventory" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-boxes"></i>
                            انبار
                        </NavLink>
                    </li>

                    <li className='sidenav-item'>
                        <NavLink to="/PersonnelRegister" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-file-earmark-text" />
                            ثبت پرسنل
                        </NavLink>
                    </li>
                    <li className="sidenav-item">
                        <NavLink activeClassName='active-sidebar' to="/PresenceAbsence" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-hand-thumbs-up"></i>
                            نوبت نظافت شبانه
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}


export default HamburgerMenu;