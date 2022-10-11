import React, { Component } from 'react';
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";

class OGInformationPage extends Component {
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
                    <h2>مهمان (متفرقه)</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationValidation.fullName_requiredReg}
                                value={this.context.otherGuestInformation.fullName}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'fullName'}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationValidation.nationalCode_requiredReg}
                                condition4={this.context.otherGuestInformationValidation.nationalCode_numberReg}
                                value={this.context.otherGuestInformation.nationalCode}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'nationalCode'}
                                label={'کد ملی'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationValidation.certificateNumber_requiredReg}
                                condition4={this.context.otherGuestInformationValidation.certificateNumber_numberReg}
                                value={this.context.otherGuestInformation.certificateNumber}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'certificateNumber'}
                                label={'شماره شناسنامه'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                value={this.context.otherGuestInformation.placeOfIssue}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'placeOfIssue'}
                                label={'محل صدور'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.otherGuestInformationValidation.admissionStartDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.otherGuestInformation.admissionStartDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'otherGuestInformation', 'admissionStartDate')}
                            />
                            <label className="placeholder" style={this.context.otherGuestInformation.admissionStartDate !== "" ? ({display:"none"}):
                                (this.context.otherGuestInformationValidation.admissionStartDate_requiredReg === false ? ({right:'35px',display:"inline"}) : ({right:'12px',display:"inline"}))}>
                                تاریخ شروع پذیرش
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationValidation.admissionStartDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.otherGuestInformationValidation.admissionEndDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.otherGuestInformation.admissionEndDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'otherGuestInformation', 'admissionEndDate')}
                            />
                            <label className="placeholder" style={this.context.otherGuestInformation.admissionEndDate !== "" ? ({display:"none"}):
                                (this.context.otherGuestInformationValidation.admissionEndDate_requiredReg === false ? ({right:'35px',display:"inline"}) : ({right:'12px',display:"inline"}))}>
                                تاریخ اتمام پذیرش
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationValidation.admissionEndDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control`}
                                        value={this.context.otherGuestInformation.paymentDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'otherGuestInformation', 'paymentDate')}
                            />
                            <label className="placeholder" style={this.context.otherGuestInformation.paymentDate !== "" ? ({display:"none"}):
                                ({display:"inline"})}>تاریخ پرداخت</label>
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition4={this.context.otherGuestInformationValidation.rentPaymentAmount_numberReg}
                                value={this.context.otherGuestInformation.rentPaymentAmount}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'rentPaymentAmount'}
                                // required={true}
                                label={'مبلغ پرداخت اجاره'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition4={this.context.otherGuestInformationValidation.depositPaymentAmount_numberReg}
                                value={this.context.otherGuestInformation.depositPaymentAmount}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'depositPaymentAmount'}
                                label={'مبلغ پرداخت ودیعه'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition4={this.context.otherGuestInformationValidation.discountPaymentAmount_numberReg}
                                value={this.context.otherGuestInformation.discountPaymentAmount}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'discountPaymentAmount'}
                                label={' مبلغ پرداخت تخفیف'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control`}
                                        value={this.context.otherGuestInformation.birthDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'otherGuestInformation', 'birthDate')}
                            />
                            <label className="placeholder" style={this.context.otherGuestInformation.birthDate !== "" ? ({display:"none"}):
                                ({display:"inline"})}>تاریخ تولد</label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default OGInformationPage;