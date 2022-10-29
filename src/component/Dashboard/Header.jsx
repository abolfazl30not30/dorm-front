import React, {Component} from 'react';
import HamburgerMenu from './HamburgerMenu.jsx';
import "../../style/header.css";
import MainContext from '../../contexts/ContextProvider';
import Dropdown from 'react-bootstrap/Dropdown';
import {BsFillPersonFill} from "react-icons/bs"
import {IoMdExit} from "react-icons/io"
import {GoTasklist} from "react-icons/go"

class Header extends Component {
    static contextType = MainContext;
    state = {}

    render() {
        return (
            <>
                <div className='header'>
                    <button className='btn' onClick={() => {
                        this.context.handleSidebar()
                    }}><i className="bi bi-list"></i></button>
                    <div>

                        <Dropdown>
                            <Dropdown.Toggle className="profile-dropdown" id="dropdown-basic">
                                <div className="profile-img-container">
                                    <button className="none-btn">
                                        <img className="profile-img"
                                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBnUckFxDVe5FOT5vuVfWCvWWY1pUrOPBOFPu9CNZYpABJSYPCigxy9rEc32E6mBamw3c&usqp=CAU" alt="profile"/>
                                    </button>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu  style={{zIndex:"100",width:"350px",textAlign:"right"}} >
                                <div>
                                    <button className="none-btn">
                                        <BsFillPersonFill/>
                                        <span>علی محمدی</span>
                                        <p>مشاهده حساب کاربری</p>
                                    </button>
                                </div>
                                <div>
                                    <button className="none-btn">
                                        <GoTasklist/>
                                        <span>مشاهده وظایف</span>
                                    </button>
                                </div>
                                <div>
                                    <button className="none-btn">
                                        <IoMdExit/>
                                        <span>خروج</span>
                                    </button>
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