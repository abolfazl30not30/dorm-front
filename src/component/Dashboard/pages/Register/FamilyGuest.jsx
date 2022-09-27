import React, { Component } from 'react';
import * as yup from 'yup';
import BuildingContext from "../../../../contexts/Building";
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

class FamilyGuest extends Component {
    static contextType = BuildingContext;

    state = {
        fields : {
            admission_start_date : '',
            admission_end_date : '',
            payment_date : '',
        },
    }

    // schema = yup.object().shape({
    //     admission_start_date: yup.string().required('فیلد "تاریخ شروع پذیرش" نمیتواند خالی باشد'),
    //     admission_end_date: yup.string().required('فیلد "تاریخ اتمام پذیرش" نمیتواند خالی باشد'),
    //     payment_date: yup.string().required('فیلد "تاریخ پرداخت" نمیتواند خالی باشد')
    // })

    // handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = await this.validate();
    //     console.log(result);
    // }
    //
    // validate = async () => {
    //     try {
    //         const result = await this.schema.validate(this.state.fields, {abortEarly : false});
    //         return result;
    //     } catch (error){
    //         console.log(error.errors);
    //         this.setState({error: error.errors});
    //     }
    // }

    render() {
        // const {admission_start_date, admission_end_date, payment_date} = this.state.fields;
        return (
            <>
                <form className="register-step-box" onSubmit={this.handleSubmit} noValidate>
                    <h2>مهمان (بستگان درجه یک)</h2>

                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.asd_numberReg && this.context.specificValidations.asd_requiredReg) === false ? "is-invalid" : ""}`}
                                   placeholder=" "
                                   name='admission_start_date'
                                   value={this.context.fields.admission_start_date}
                                   onChange={(e) => this.context.handleFields(e, 'admission_start_date')}/>
                                    {/*this.props.updateData*/}
                            <label className="placeholder" style={{right: (this.context.specificValidations.asd_numberReg && this.context.specificValidations.asd_requiredReg) === false ? '35px' : '12px'}}>تاریخ شروع پذیرش<span style={{color : 'red'}}>*</span></label>

                            {
                                this.context.specificValidations.asd_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                this.context.specificValidations.asd_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }
                        </div>

                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.aed_numberReg && this.context.specificValidations.aed_requiredReg) === false ? "is-invalid" : ""}`}
                                   placeholder=" "
                                   name='admission_end_date'
                                   value={this.context.fields.admission_end_date}
                                   onChange={(e) =>  this.context.handleFields(e, 'admission_end_date')}/>
                            <label className="placeholder" style={{right: (this.context.specificValidations.aed_numberReg && this.context.specificValidations.aed_requiredReg) === false ? '35px' : '12px'}}>تاریخ اتمام پذیرش<span style={{color : 'red'}}>*</span></label>

                            {
                                this.context.specificValidations.aed_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                this.context.specificValidations.aed_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.pd_numberReg && this.context.specificValidations.pd_requiredReg) === false ? "is-invalid" : ""}`}
                                   placeholder=" "
                                   name='payment_date'
                                   value={this.context.fields.payment_date}
                                   onChange={(e) => this.context.handleFields(e, 'payment_date')}/>
                            <label className="placeholder" style={{right: (this.context.specificValidations.pd_numberReg && this.context.specificValidations.pd_requiredReg) === false ? '35px' : '12px'}}>تاریخ پرداخت<span style={{color : 'red'}}>*</span></label>

                            {
                                this.context.specificValidations.pd_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                this.context.specificValidations.pd_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }


                        </div>
                        <div>
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
                        <div className="input-group-register col-8">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">آدرس محل سکونت</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تماس</label>    
                        </div>
                    </div>
                </form>
            </>
        );
    }
}
 
export default FamilyGuest;