import React, { Component } from 'react'
import "../../../../style/registerPage.css"
class InformationFurtherPage extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات تکمیلی</h2>
                    <div className='d-flex flex-wrap justify-content-between'>
                        <div className="input-group-register col-12">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">آدرس محل سکونت</label>    
                        </div>
                        <div className="input-group-register col-6">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تلفن منزل</label>    
                        </div>
                        <div className="input-group-register col-6">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تماس پدر</label>    
                        </div>
                        <div className="input-group-register col-6">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تماس مادر</label>    
                        </div>
                        <div className="input-group-register col-6">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تماس اقامتگر</label>    
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
 
export  default InformationFurtherPage ;