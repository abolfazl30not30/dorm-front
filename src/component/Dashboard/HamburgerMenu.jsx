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
            <div className='sidebar' style={
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
                        <NavLink activeClassName='active-sidebar' to="/dashboard/payment" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-calculator"></i>
                            ثبت فاکتور
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/dashboard/Calender" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-calendar"></i>
                            تقويم
                        </NavLink>
                    </li>
                    {
                        localStorage.getItem('role') === 'SUPERVISOR'
                            ? <li className='sidenav-item'>
                                <NavLink activeClassName='active-sidebar' to="/dashboard/Request" className='sidenav-link'
                                         onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                                    <i className="bi bi-person-circle"/>
                                    درخواست
                                </NavLink>
                            </li>
                            : null
                    }
                    {
                        localStorage.getItem('role') === 'MANAGER'
                        ? <li className='sidenav-item'>
                                <NavLink activeClassName='active-sidebar' to="/dashboard/Request-manager" className='sidenav-link'
                                         onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                                    <i className="bi bi-envelope"></i>
                                    درخواست (مدیریت)
                                </NavLink>
                            </li>
                            : null
                    }
                    {/*<li className='sidenav-item'>*/}
                    {/*    <NavLink activeClassName='active-sidebar' to="/dashboard/camera-history" className='sidenav-link'*/}
                    {/*             onClick={window.innerWidth <= 768 && this.context.handleSidebar}>*/}
                    {/*        <i className="bi bi-camera-video"></i>*/}
                    {/*        دوربین*/}
                    {/*    </NavLink>*/}
                    {/*</li>*/}
                    {
                        localStorage.getItem('role') === 'MANAGER'
                            ? <li className='sidenav-item'>
                                <NavLink activeClassName='active-sidebar' to="/dashboard/PaymentHistory" className='sidenav-link'
                                         onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                                    <i className="bi bi-layout-text-sidebar"></i>
                                    صورتحساب
                                </NavLink>
                            </li>

                            : null
                    }
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/dashboard/contacts" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-rolodex"></i>
                            مخاطبین
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/dashboard/CallHistory" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-telephone"></i>
                            تاریخچه تماس ها
                        </NavLink>
                    </li>
                    <li className='sidenav-item'>
                        <NavLink activeClassName='active-sidebar' to="/dashboard/taskManagement" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-gear"></i>
                            مدیریت وظایف
                        </NavLink>
                    </li>
                    <li className="sidenav-item">
                        <NavLink activeClassName='active-sidebar' to="/dashboard/Inventory" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-boxes"></i>
                            انبار
                        </NavLink>
                    </li>

                    <li className='sidenav-item'>
                        <NavLink to="/dashboard/personnel" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-circle" />
                            پرسنل
                        </NavLink>
                    </li>

                    {
                        localStorage.getItem('role') === 'MANAGER'
                            ? <li className='sidenav-item'>
                                <NavLink to="/dashboard/PersonnelRegister" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                                    <i className="bi bi-file-earmark-text" />
                                    ثبت پرسنل
                                </NavLink>
                            </li>
                            : null
                    }

                    <li className="sidenav-item">
                        <NavLink activeClassName='active-sidebar' to="/dashboard/PresenceAbsence" className='sidenav-link'
                                 onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-hand-thumbs-up"></i>
                            نوبت نظافت شبانه
                        </NavLink>
                    </li>
                    {localStorage.getItem('role') === 'MANAGER'
                        ?
                        <li className="sidenav-item">
                            <NavLink activeClassName='active-sidebar' to="/dashboard/log" className='sidenav-link'
                                     onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                                <i className="bi bi-clock-history"></i>
                                تاریخپه کارها
                            </NavLink>
                        </li>
                        :
                        null}
                </ul>
            </div>
        );
    }
}


export default HamburgerMenu;