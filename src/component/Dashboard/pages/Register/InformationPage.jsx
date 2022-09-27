import React, { Component } from 'react'
import "../../../../style/registerPage.css"
class InformationPage extends Component {
    state = { 
        haveWife: 'single',
        sickness: 'false'
     } 
    getStatus = (e) => {
        const status = e.target.value;
        this.setState({haveWife: status})
    }
    sickness = (e) => {
        const status = e.target.value;
        this.setState({sickness: status})
    }
    render() { 
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input"
                                   // value={}
                                   // onChange={}
                                   placeholder=" "/>
                            <label className="placeholder">نام <span style={{color : 'red'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام خانوادگی <span style={{color : 'red'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام مستعار</label>    
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
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">ملیت</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'>
                                <option>اسلام</option>
                                <option>مسیحیت</option>
                                <option>هندوئیسم</option>
                                <option>آیین بودایی</option>
                                <option>فاقد دین</option>
                            </select>
                            <label className="placeholder">دین</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'>
                                <option>اهل سنت</option>
                                <option>مسیحیت</option>
                            </select>
                            <label className="placeholder">مذهب</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">دانشگاه محل تحصیل</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره دانشجویی</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام پدر</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شغل پدر</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input' name='maritalStatus' onChange={this.getStatus}>
                                <option value='single' >مجرد</option>
                                <option value='married'>متاهل</option>
                            </select>
                            <label className="placeholder">وضعیت تاهل</label>    
                        </div>
                        {
                           this.state.haveWife === 'married' ? (
                            <>
                                <div className="input-group-register col-4">
                                    <input type="text" className="input" placeholder=" "/>
                                    <label className="placeholder">نام همسر</label>    
                                </div>
                                <div className="input-group-register col-4">
                                    <input type="text" className="input" placeholder=" "/>
                                    <label className="placeholder">شغل همسر</label>    
                                </div>
                            </>
                           ) : (
                            <></>
                           )
                        }
                        <div className="input-group-register col-4">
                            <select className='input' onChange={this.sickness}>
                                <option value='false'>خیر</option>
                                <option value='true'>بله</option>
                            </select>
                            <label className="placeholder">آیا بیماری خاصی دارید؟</label>    
                        </div>
                        {
                            this.state.sickness === 'true' ? (
                                <>
                                    <div className="input-group-register col-12">
                                        <textarea className='input'></textarea>
                                        <label className="placeholder">توضیحات</label>    
                                    </div>
                                </>
                               ) : (
                                <></>
                               )
                        }
                    </div>
                </div>
            </>
        );
    }
}
 
export  default InformationPage ;