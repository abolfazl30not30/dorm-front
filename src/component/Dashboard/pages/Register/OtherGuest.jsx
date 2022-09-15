import React, { Component } from 'react';

class OtherGuest extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <div className="register-step-box">
                <h2>مهمان (متفرقه)</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">تاریخ شروع پذیرش</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">تاریخ اتمام پذیرش</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">تاریخ پرداخت</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">مبلغ پرداخت اجاره</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">مبلغ پرداخت ودیعه</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">مبلغ پرداخت تخفیف</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام و نام خانوادگی</label>   
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">کد ملی</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره شناسنامه</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">محل صدور</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">تاریخ تولد</label>    
                        </div>
                        <div className="input-group-register col-8">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">آدرس محل سکونت</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تماس</label>    
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
 
export default OtherGuest;