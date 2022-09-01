import React, { Component } from 'react';
import logo from "../../img/sadat logo-png.png"

class HamburgerMenu extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <div className={`sidenav ${this.props.status}`}>
                    <div>
                        <img src={logo} alt="لوگو" style={{width:"100px",height:"100px"}}/>
                    </div>
                    <ul>
                        <li className='sidenav-item'><i class="bi bi-people"></i>پرسنل</li>
                        <li className='sidenav-item'><i class="bi bi-check2-circle"></i>گزینش</li>
                        <li className='sidenav-item'><i class="bi bi-cup">کافه رستوران</i></li>
                        <li className='sidenav-item'><i class="bi bi-hand-thumbs-up"></i> باشگاه</li>
                        <li className='sidenav-item'><i class="bi bi-file-earmark-text"></i>ملزومات اداری</li>
                        <li className='sidenav-item'><i class="bi bi-person-circle"></i>کادر مدیریت</li>
                        <li className='sidenav-item'><i class="bi bi-camera-video"></i>دوربین</li>
                        <li className='sidenav-item'><i class="bi bi-gear"></i>تنظیمات</li>
                        <li className='sidenav-item'><i class="bi bi-telephone"></i>تماس با ما</li>
                    </ul>
                    <div>
                        پروفایل
                    </div>
                </div>
            </>
        );
    }
    toggleSidebar = () => {
        console.log('yoyo')
    }
}
 



export default HamburgerMenu;

