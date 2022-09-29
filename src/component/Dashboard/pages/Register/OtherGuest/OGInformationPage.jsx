import React, { Component } from 'react';
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";

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
                            <input type="text"
                                   className={`input form-control ${this.context.otherGuestInformationValidation.fullName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformation.fullName}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformation', 'fullName')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.otherGuestInformationValidation.fullName_requiredReg === false ? '35px' : '12px'}}>
                                نام و نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationValidation.fullName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.otherGuestInformationValidation.nationalCode_requiredReg &&
                                       this.context.otherGuestInformationValidation.nationalCode_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformation.nationalCode}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformation', 'nationalCode')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.otherGuestInformationValidation.nationalCode_requiredReg &&
                                    this.context.otherGuestInformationValidation.nationalCode_numberReg) === false ? '35px' : '12px'}}>
                                کد ملی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationValidation.nationalCode_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }
                            {
                                (this.context.otherGuestInformationValidation.nationalCode_numberReg === false &&
                                    this.context.otherGuestInformationValidation.nationalCode_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.otherGuestInformationValidation.certificateNumber_requiredReg &&
                                       this.context.otherGuestInformationValidation.certificateNumber_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformation.certificateNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformation', 'certificateNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.otherGuestInformationValidation.certificateNumber_requiredReg &&
                                    this.context.otherGuestInformationValidation.certificateNumber_numberReg) === false ? '35px' : '12px'}}>
                                شماره شناسنامه
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.otherGuestInformationValidation.certificateNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }
                            {
                                (this.context.otherGuestInformationValidation.certificateNumber_numberReg === false &&
                                    this.context.otherGuestInformationValidation.certificateNumber_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.otherGuestInformation.placeOfIssue}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformation', 'placeOfIssue')}
                                   placeholder=" "
                            />
                            <label className="placeholder">محل صدور</label>
                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.otherGuestInformationValidation.admissionStartDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.otherGuestInformation.admissionStartDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'otherGuestInformation', 'admissionStartDate')}
                            />
                            <label className="placeholder" style={{right: this.context.otherGuestInformationValidation.admissionStartDate_requiredReg === false ? '35px' : '12px'}}>
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
                            <label className="placeholder" style={{right: this.context.otherGuestInformationValidation.admissionEndDate_requiredReg === false ? '35px' : '12px'}}>
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
                            <label className="placeholder">تاریخ پرداخت</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.otherGuestInformationValidation.rentPaymentAmount_numberReg === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformation.rentPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformation', 'rentPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.otherGuestInformationValidation.rentPaymentAmount_numberReg === false ? '35px' : '12px'}}>
                                مبلغ پرداخت اجاره
                            </label>

                            {
                                this.context.otherGuestInformationValidation.rentPaymentAmount_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.otherGuestInformationValidation.depositPaymentAmount_numberReg === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformation.depositPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformation', 'depositPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.otherGuestInformationValidation.depositPaymentAmount_numberReg === false ? '35px' : '12px'}}>
                                مبلغ پرداخت ودیعه
                            </label>

                            {
                                this.context.otherGuestInformationValidation.depositPaymentAmount_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.otherGuestInformationValidation.discountPaymentAmount_numberReg === false ? "is-invalid" : ""}`}
                                   value={this.context.otherGuestInformation.discountPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'otherGuestInformation', 'discountPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.otherGuestInformationValidation.discountPaymentAmount_numberReg === false ? '35px' : '12px'}}>
                                مبلغ پرداخت تخفیف
                            </label>

                            {
                                this.context.otherGuestInformationValidation.discountPaymentAmount_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control`}
                                        value={this.context.otherGuestInformation.birthDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'otherGuestInformation', 'birthDate')}
                            />
                            <label className="placeholder">تاریخ تولد</label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default OGInformationPage;