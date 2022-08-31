import React, { Component } from 'react';

class HamburgerMenu extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <div className='sidenav'>
                    <div>لوگو</div>
                    <ul>
                        <li>پرسنل</li>
                        <li>گزینش</li>
                        <li>کافه رستوران</li>
                        <li>باشگاه</li>
                        <li>ملزومات اداری</li>
                        <li>کادر مدیریت</li>
                        <li>دوربین</li>
                        <li>تنظیمات</li>
                        <li>تماس با ما</li>
                    </ul>
                    <div>
                        پروفایل
                    </div>
                </div>
            </>
        );
    }
}
 
export default HamburgerMenu;