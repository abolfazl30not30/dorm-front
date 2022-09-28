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

    state = { }

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
        return (
            <>
                <form className="register-step-box" onSubmit={this.handleSubmit} noValidate>
                    <h2>مهمان (بستگان درجه یک)</h2>

                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.fg_fullName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.fg_fullName}
                                   onChange={(e) => this.context.handleFields(e, 'fg_fullName')}
                                   placeholder=" "
                            />
                            <label className="placeholder"
                                   style={{right: this.context.specificValidations.fg_fullName_requiredReg === false ? '35px' : '12px'}}>
                                نام و نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.fg_fullName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.fg_nationalCode_requiredReg &&
                                       this.context.specificValidations.fg_nationalCode_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.fg_nationalCode}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_nationalCode')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.specificValidations.fg_nationalCode_requiredReg &&
                                    this.context.specificValidations.fg_nationalCode_numberReg) === false ? '35px' : '12px'}}>
                                کد ملی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.fg_nationalCode_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.specificValidations.fg_nationalCode_numberReg === false && this.context.specificValidations.fg_nationalCode_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.fg_certificateNumber_requiredReg &&
                                       this.context.specificValidations.fg_certificateNumber_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.fg_certificateNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_certificateNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.specificValidations.fg_certificateNumber_requiredReg &&
                                    this.context.specificValidations.fg_certificateNumber_numberReg) === false ? '35px' : '12px'}}>
                                شماره شناسنامه
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.fg_certificateNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.specificValidations.fg_certificateNumber_numberReg === false && this.context.specificValidations.fg_certificateNumber_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.fields.fg_placeOfIssue}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_placeOfIssue')}
                                   placeholder=" "
                            />
                            <label className="placeholder">محل صدور</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.fields.fg_birthDate}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_birthDate')}
                                   placeholder=" "
                            />
                            <label className="placeholder">تاریخ تولد</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.fg_admissionStartDate_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.fg_admissionStartDate}
                                   onChange={(e) => this.context.handleFields(e, 'fg_admissionStartDate')}
                                   placeholder=" "
                                   name='admission_start_date'
                            />
                                    {/*this.props.updateData*/}
                            <label className="placeholder" style={{right: this.context.specificValidations.fg_admissionStartDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ شروع پذیرش
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.fg_admissionStartDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>

                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.fg_admissionEndDate_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.fg_admissionEndDate}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_admissionEndDate')}
                                   placeholder=" "
                                   name='admission_end_date'
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.fg_admissionEndDate_requiredReg === false ? '35px' : '12px'}}>تاریخ اتمام پذیرش<span style={{color : 'red'}}>*</span></label>

                            {
                                this.context.specificValidations.fg_admissionEndDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.fg_paymentDate_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.fg_paymentDate}
                                   onChange={(e) => this.context.handleFields(e, 'fg_paymentDate')}
                                   placeholder=" "
                                   name='payment_date'
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.fg_paymentDate_requiredReg === false ? '35px' : '12px'}}>تاریخ پرداخت<span style={{color : 'red'}}>*</span></label>

                            {
                                this.context.specificValidations.fg_paymentDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.fields.fg_rentPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_rentPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder">مبلغ پرداخت اجاره</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.fields.fg_depositPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_depositPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder">مبلغ پرداخت ودیعه</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.fields.fg_discountPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_discountPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder">مبلغ پرداخت تخفیف</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'
                                    value={this.context.fields.fg_relationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e, 'fg_relationshipWithResident')}
                            >
                                <option value='father'>پدر</option>
                                <option value='mother'>مادر</option>
                                <option value='sister'>خواهر</option>
                                <option value='brother'>برادر</option>
                                <option value='other'>غیره</option>
                            </select>
                            <label className="placeholder">نسبت با اقامتگر</label>    
                        </div>
                        <div className="input-group-register col-8">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.fields.fg_address}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_address')}
                                   placeholder=" "
                            />
                            <label className="placeholder">آدرس محل سکونت</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.fields.fg_phoneNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'fg_phoneNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder">شماره تماس</label>    
                        </div>
                    </div>
                </form>
            </>
        );
    }
}
 
export default FamilyGuest;