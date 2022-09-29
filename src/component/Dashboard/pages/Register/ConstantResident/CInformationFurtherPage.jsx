import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
class CInformationFurtherPage extends Component {
    static contextType = BuildingContext;

    state = {
        calStyles : {
            calendarContainer: "calendarContainer",
            dayPickerContainer: "dayPickerContainer",
            monthsList: "monthsList",
            daysOfWeek: "daysOfWeek",
            dayWrapper: "dayWrapper",
            selected: "selected",
            heading: "heading",
            next: "next",
            prev: "prev",
            title: "title",
        }
    }
    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات تکمیلی</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-6">
                            <input type="text"
                                   className={`input form-control ${(this.context.constantInformationFurtherValidation.resident_tel_telephoneReg &&
                                       this.context.constantInformationFurtherValidation.resident_tel_requiredReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationFurther.resident_tel}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFurther', 'resident_tel')}
                                   placeholder=" "/>
                            <label className="placeholder" style={{right: (this.context.constantInformationFurtherValidation.resident_tel_telephoneReg &&
                                    this.context.constantInformationFurtherValidation.resident_tel_requiredReg) === false ? '35px' : '12px'}}>
                                شماره تماس اقامتگر
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFurtherValidation.resident_tel_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.constantInformationFurtherValidation.resident_tel_telephoneReg === false &&
                                    this.context.constantInformationFurtherValidation.resident_tel_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['telephoneRegex']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-6">
                            <input type="text"
                                   className={`input form-control ${(this.context.constantInformationFurtherValidation.home_tel_requiredReg &&
                                       this.context.constantInformationFurtherValidation.home_tel_telephoneReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationFurther.home_tel}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFurther', 'home_tel')}
                                   placeholder=" "/>
                            <label className="placeholder"
                                   style={{right: (this.context.constantInformationFurtherValidation.home_tel_requiredReg &&
                                           this.context.constantInformationFurtherValidation.home_tel_telephoneReg) === false ? '35px' : '12px'}}>
                                شماره تلفن منزل
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFurtherValidation.home_tel_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.constantInformationFurtherValidation.home_tel_telephoneReg === false && this.context.constantInformationFurtherValidation.home_tel_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['homeTelephoneReg']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-6">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.constantInformationFurtherValidation.admissionStartDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.constantInformationFurther.admissionStartDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'constantInformationFurther', 'admissionStartDate')}
                            />
                            <label className="placeholder" style={{right: this.context.constantInformationFurtherValidation.admissionStartDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ شروع پذیرش
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFurtherValidation.admissionStartDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>

                        <div className="input-group-register col-6">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.constantInformationFurtherValidation.admissionEndDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.constantInformationFurther.admissionEndDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'constantInformationFurther', 'admissionEndDate')}
                            />
                            <label className="placeholder" style={{right: this.context.constantInformationFurtherValidation.admissionEndDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ اتمام پذیرش
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFurtherValidation.admissionEndDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-12">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationFurtherValidation.address_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationFurther.address}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFurther', 'address')}
                                   placeholder=" "/>
                            <label className="placeholder"
                                   style={{right: this.context.constantInformationFurtherValidation.address_requiredReg === false ? '35px' : '12px'}}>
                                آدرس محل سکونت <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFurtherValidation.address_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export  default CInformationFurtherPage ;