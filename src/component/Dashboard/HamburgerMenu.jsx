import React, { Component } from 'react';
import logo from "../../img/sadat logo-png.png"
import "../../style/hamburgerMenu.css";
import { Link } from 'react-router-dom';
import MainContext from '../../contexts/ContextProvider';

class HamburgerMenu extends Component {
    state = {}
    static contextType = MainContext;

    render() {
        return (
            <>
                <div className='close-icon'>
                    <button onClick={() => { this.context.handleSidebar() }}>
                        <i className='bi bi-x'></i>
                    </button>
                </div>
                <div className='logo-container'>
                    <img src={logo} className="sidenav-logo" alt="لوگو" />
                </div>
                <ul>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link'>
                            <i class="bi bi-people"></i>
                            پرسنل
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link'>
                            <i class="bi bi-check2-circle"></i>
                            گزینش
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link'>
                            <i class="bi bi-cup"></i>
                            کافه رستوران
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link'>
                            <i class="bi bi-hand-thumbs-up"></i>
                            باشگاه
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link'>
                            <i class="bi bi-file-earmark-text"></i>
                            ملزومات اداری
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link'>
                            <i class="bi bi-person-circle"></i>
                            کادر مدیریت
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link'>
                            <i class="bi bi-gear"></i>
                            تنظیمات
                        </Link>
                    </li>
                    <li className='sidenav-item'>
                        <Link to="/" className='sidenav-link'>
                            <i class="bi bi-telephone"></i>
                            تماس با ما
                        </Link>
                    </li>
                </ul>
            </>
        );
    }
    toggleSidebar = () => {
        console.log('yoyo')
    }
}




export default HamburgerMenu;

