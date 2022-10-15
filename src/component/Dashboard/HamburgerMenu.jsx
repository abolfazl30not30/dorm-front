import React, { Component } from 'react';
import logo from "../../img/logo.png"
import "../../style/hamburgerMenu.css";
import { Link } from 'react-router-dom';
import MainContext from '../../contexts/ContextProvider';

class HamburgerMenu extends Component {
    state = {}
    static contextType = MainContext;

    render() {
        return (

            <div style={
                this.context.activeMenu ? { display: "none" } : { display: "block" }
            }>
                <div className='close-icon'>
                    <button onClick={() => { this.context.handleSidebar() }}>
                        <i className='bi bi-x'/>
                    </button>
                </div>
                <div className='logo-container'>
                    <img src={logo} className="sidenav-logo" alt="لوگو" />
                </div>
                <ul>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-people"/>
                            خانه
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/Register" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-plus"/>
                            پذیرش
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/People" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-plus" />
                            اشخاص
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/booking" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus" />
                            موجودی و ظرفیت
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/payment" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"></i>
                            ثبت فاکتور
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/Calender" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-file-earmark-text" />
                            تقويم
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/Request" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-circle" />
                            درخواست
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/PaymentHistory" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"></i>
                            صورتحساب
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/contacts" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-journal-plus"></i>
                            مخاطبین
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-file-earmark-text" />
                            ملزومات اداری
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link' onClick={window.innerWidth <= 768 && this.context.handleSidebar}>
                            <i className="bi bi-person-circle" />
                            کادر مدیریت
                        </Link>
                    </li>>
                </ul>
            </div>
        );
    }
}




export default HamburgerMenu;