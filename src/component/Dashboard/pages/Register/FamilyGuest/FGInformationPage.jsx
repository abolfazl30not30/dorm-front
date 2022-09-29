import React, { Component } from 'react';
import * as yup from 'yup';
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";


class FGInformationPage extends Component {
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
                <form className="register-step-box" onSubmit={this.handleSubmit} noValidate>
                    <h2>مهمان (بستگان درجه یک)</h2>

                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.familyGuestInformationValidation.fullName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.familyGuestInformation.fullName}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'fg_fullName')}
                                   placeholder=" "
                            />
                            <label className="placeholder"
                                   style={{right: this.context.familyGuestInformationValidation.fullName_requiredReg === false ? '35px' : '12px'}}>
                                نام و نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationValidation.fullName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.familyGuestInformationValidation.nationalCode_requiredReg &&
                                       this.context.familyGuestInformationValidation.nationalCode_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.familyGuestInformation.nationalCode}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'nationalCode')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.familyGuestInformationValidation.nationalCode_requiredReg &&
                                    this.context.familyGuestInformationValidation.nationalCode_numberReg) === false ? '35px' : '12px'}}>
                                کد ملی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationValidation.nationalCode_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.familyGuestInformationValidation.nationalCode_numberReg === false && this.context.familyGuestInformationValidation.nationalCode_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.familyGuestInformationValidation.certificateNumber_requiredReg &&
                                       this.context.familyGuestInformationValidation.certificateNumber_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.familyGuestInformation.certificateNumber}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'certificateNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.familyGuestInformationValidation.certificateNumber_requiredReg &&
                                    this.context.familyGuestInformationValidation.certificateNumber_numberReg) === false ? '35px' : '12px'}}>
                                شماره شناسنامه
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationValidation.certificateNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.familyGuestInformationValidation.certificateNumber_numberReg === false && this.context.familyGuestInformationValidation.certificateNumber_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.familyGuestInformation.placeOfIssue}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'placeOfIssue')}
                                   placeholder=" "
                            />
                            <label className="placeholder">محل صدور</label>
                        </div>
                        <div className="input-group-register col-4">
                            {/*<input type="text"*/}
                            {/*       className="input form-control"*/}
                            {/*       value={this.context.familyGuestInformation.birthDate}*/}
                            {/*       onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'birthDate')}*/}
                            {/*       placeholder=" "*/}
                            {/*/>*/}
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className="input form-control"
                                        value={this.context.familyGuestInformation.birthDate} // فقعلا فقط required
                                // value={this.state.value}
                                        onChange={(value) =>  this.context.handleDates(value, 'familyGuestInformation', 'birthDate')}
                                // placeholder=" "
                            />
                            <label className="placeholder">تاریخ تولد</label>
                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.familyGuestInformationValidation.admissionStartDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.familyGuestInformation.admissionStartDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'familyGuestInformation', 'admissionStartDate')}
                            />
                            <label className="placeholder" style={{right: this.context.familyGuestInformationValidation.admissionStartDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ شروع پذیرش
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationValidation.admissionStartDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>

                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.familyGuestInformationValidation.admissionEndDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.familyGuestInformation.admissionEndDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'familyGuestInformation', 'admissionEndDate')}
                            />
                            <label className="placeholder" style={{right: this.context.familyGuestInformationValidation.admissionEndDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ اتمام پذیرش
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationValidation.admissionEndDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.familyGuestInformationValidation.paymentDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.familyGuestInformation.paymentDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'familyGuestInformation', 'paymentDate')}
                            />
                            <label className="placeholder" style={{right: this.context.familyGuestInformationValidation.paymentDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ پرداخت
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationValidation.paymentDate_requiredReg === false
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
                                   value={this.context.familyGuestInformation.rentPaymentAmount}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'rentPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder">مبلغ پرداخت اجاره</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.familyGuestInformation.depositPaymentAmount}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'depositPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder">مبلغ پرداخت ودیعه</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.familyGuestInformation.discountPaymentAmount}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'discountPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder">مبلغ پرداخت تخفیف</label>
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'
                                    value={this.context.familyGuestInformation.relationshipWithResident}
                                    onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'relationshipWithResident')}
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
                                   value={this.context.familyGuestInformation.address}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'address')}
                                   placeholder=" "
                            />
                            <label className="placeholder">آدرس محل سکونت</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input form-control"
                                   value={this.context.familyGuestInformation.phoneNumber}
                                   onChange={(e) => this.context.handleFields(e, 'familyGuestInformation', 'phoneNumber')}
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

export default FGInformationPage;