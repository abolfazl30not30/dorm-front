import React, {Component} from 'react';
import HamburgerMenu from './HamburgerMenu.jsx';
import "../../style/header.css";
import MainContext from '../../contexts/ContextProvider';
import Dropdown from 'react-bootstrap/Dropdown';
import {BsFillPersonFill, BsPerson, BsPersonPlus} from "react-icons/bs"
import {IoMdExit} from "react-icons/io"
import {GoTasklist} from "react-icons/go"
import {AiOutlineHome} from "react-icons/ai";
import {MdSettings} from "react-icons/md";
import {MdOutlineInventory} from "react-icons/md"
import {NavLink, Link} from "react-router-dom";

class Header extends Component {
    static contextType = MainContext;
    state = {
        activeStyle: {
            textDecoration: "underline",
        },
        activeClassName: "underline"
    }

    render() {
        return (
            <>
                <div className='header'>
                    <div className="d-flex align-item-center">
                        <button className='btn' onClick={() => {
                            this.context.handleSidebar()
                        }}><i className="bi bi-list"></i></button>
                        <ul className="d-flex navbar">
                            <li className='navbar-item'>
                                <NavLink
                                    activeClassName='active-header' to="/dashboard" replace={true} className='sidenav-link' end>
                                    <AiOutlineHome style={{paddingLeft: "7px"}} font-size="20px"/>
                                    خانه
                                </NavLink>
                            </li>
                            <li className='navbar-item'>
                                <NavLink activeClassName='active-header' to="/dashboard/Register"
                                         className='sidenav-link'>
                                    <BsPersonPlus style={{paddingLeft: "7px"}} font-size="20px"/>
                                    پذیرش
                                </NavLink>
                            </li>
                            <li className='navbar-item'>
                                <NavLink activeClassName='active-header' to="/dashboard/People"
                                         className='sidenav-link'>
                                    <BsPerson style={{paddingLeft: "7px"}} font-size="20px"/>
                                    اشخاص
                                </NavLink>
                            </li>
                            <li className='navbar-item'>
                                <NavLink activeClassName='active-header' to="/dashboard/booking"
                                         className='sidenav-link'>
                                    <MdOutlineInventory style={{paddingLeft: "7px"}} font-size="20px"/>
                                    موجودی و ظرفیت
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle className="profile-dropdown" id="dropdown-basic">
                                <div className="profile-img-container d-flex align-items-center">
                                    <button className="none-btn">
                                        <img className="profile-img"
                                             src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                             alt="profile"/>
                                    </button>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{
                                zIndex: "100",
                                width: "250px",
                                textAlign: "right",
                                borderRadius: "20px",
                                border: "none",
                                padding: "12px",
                                boxShadow: "0px 0px 4px 0px #0000004d"
                            }}>
                                <div className="dropdown-items">
                                    <Link to="/dashboard">
                                        <div className="d-flex align-items-center px-3 py-1 sidebar-profile">
                                            <div className="sidebar-profile-img">
                                                <img className="profile-img"
                                                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                     alt="profile"/>
                                            </div>
                                            <div className="d-flex flex-column justify-content-center mx-3">
                                                <h6>
                                                    {localStorage.getItem("role") === "MANAGER" ?
                                                    "مدیر" :
                                                        localStorage.getItem('username')
                                                    }
                                                </h6>
                                                {
                                                    localStorage.getItem('role') === "SUPERVISOR"
                                                    ?
                                                        <p onClick={() => {
                                                            window.location = `/personnel/${localStorage.getItem('id')}`
                                                        }}>
                                                            مشاهده پروفایل
                                                        </p>
                                                    :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="dropdown-items">
                                    <Link to="/dashboard/taskManagement">
                                        <GoTasklist/>
                                        <span>مشاهده وظایف</span>
                                    </Link>
                                </div>
                                <div className="dropdown-items">
                                    <Link to="/dashboard/setting">
                                        <MdSettings/>
                                        <span>تنظیمات</span>
                                    </Link>
                                </div>
                                <div className="dropdown-items">
                                    <Link to="/" onClick={() => {
                                        localStorage.removeItem('role')
                                        localStorage.removeItem('id')
                                        localStorage.removeItem('fullName')
                                        localStorage.removeItem('accessToken')
                                        localStorage.removeItem('refreshToken')
                                    }}>
                                        <IoMdExit/>
                                        <span>خروج</span>
                                    </Link>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </>
        );
    }

}


export default Header;