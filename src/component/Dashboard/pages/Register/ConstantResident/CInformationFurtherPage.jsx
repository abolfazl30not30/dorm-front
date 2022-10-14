import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
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
                            <SimpleTextInput
                                condition1={this.context.constantInformationFurtherValidation.resident_tel_requiredReg}
                                condition2={this.context.constantInformationFurtherValidation.resident_tel_telephoneReg}
                                value={this.context.constantInformationFurther.phoneNumber}
                                fieldNameString={'constantInformationFurther'}
                                valueOfInputString={'resident_tel'}
                                required={true}
                                label={'شماره تماس اقامتگر'}
                            />
                        </div>
                        <div className="input-group-register col-6">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFurtherValidation.home_tel_requiredReg}
                                condition3={this.context.constantInformationFurtherValidation.home_tel_homeTelephoneReg}
                                value={this.context.constantInformationFurther.telephoneNumber}
                                fieldNameString={'constantInformationFurther'}
                                valueOfInputString={'home_tel'}
                                required={true}
                                label={'شماره تلفن منزل'}
                            />
                        </div>
                        <div className="input-group-register col-6">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.constantInformationFurtherValidation.admissionStartDate_requiredReg === false ? "is-invalid" : ""}`}
                                        onChange={(value) =>  this.context.handleDates(value, 'constantInformationFurther', 'admissionStartDate')}
                            />
                            <label className="placeholder" style={this.context.constantInformationFurther.reservationDate !== "" ? ({display:"none"}):
                                (this.context.constantInformationFurtherValidation.admissionStartDate_requiredReg === false ? ({right:'35px',display:"inline"}) : ({right:'12px',display:"inline"}))}>

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
                                        onChange={(value) =>  this.context.handleDates(value, 'constantInformationFurther', 'admissionEndDate')}
                            />
                            <label className="placeholder" style={this.context.constantInformationFurther.admissionEndDate !== "" ? ({display:"none"}):
                                (this.context.constantInformationFurtherValidation.admissionEndDate_requiredReg === false ? ({right:'35px',display:"inline"}) : ({right:'12px',display:"inline"}))}>
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
                            <SimpleTextInput
                                condition1={this.context.constantInformationFurtherValidation.address_requiredReg}
                                value={this.context.constantInformationFurther.address}
                                fieldNameString={'constantInformationFurther'}
                                valueOfInputString={'address'}
                                required={true}
                                label={'آدرس محل سکونت'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export  default CInformationFurtherPage ;