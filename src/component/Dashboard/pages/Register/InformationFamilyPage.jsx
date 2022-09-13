import React, { Component } from 'react'
import "../../../../style/registerPage.css"
class InformationFamilyPage extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات بستگان</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className='col-12 pe-3 mb-3'>شخص اول</div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام و نام خانوادگی</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام  پدر</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'>
                                <option>پدر</option>
                                <option>مادر</option>
                                <option>خواهر</option>
                                <option>برادر</option>
                                <option>غیره</option>
                            </select>
                            <label className="placeholder">نسبت با اقامتگر</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تماس</label>    
                        </div>
                        <div className="input-group-register col-8">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">آدرس محل سکونت</label>    
                        </div>
                    </div>
                    <div className='d-flex flex-wrap justify-content-start mt-4'>
                        <div className='col-12 pe-3 mb-3'>شخص دوم</div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام و نام خانوادگی</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام  پدر</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'>
                                <option>پدر</option>
                                <option>مادر</option>
                                <option>خواهر</option>
                                <option>برادر</option>
                                <option>غیره</option>
                            </select>
                            <label className="placeholder">نسبت با اقامتگر</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تماس</label>    
                        </div>
                        <div className="input-group-register col-8">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">آدرس محل سکونت</label>    
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
 
export  default InformationFamilyPage ;