import React, { Component } from 'react';
import * as yup from 'yup';
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
import CustomInput from "../../../../CustomInput";


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
                            <CustomInput
                                condition1={this.context.familyGuestInformationValidation.fullName_requiredReg}
                                value={this.context.familyGuestInformation.fullName}
                                fieldNameString={'familyGuestInformation'} // this.context.fieldsNAmeString
                                valueOfInputString={'fullName'} // this.context.fieldsNAmeString.valueOfInputString
                                required={true}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <CustomInput
                                condition1={this.context.familyGuestInformationValidation.nationalCode_requiredReg}
                                condition4={this.context.familyGuestInformationValidation.nationalCode_numberReg}
                                value={this.context.familyGuestInformation.nationalCode}
                                fieldNameString={'familyGuestInformation'} // this.context.fieldsNAmeString
                                valueOfInputString={'nationalCode'} // this.context.fieldsNAmeString.valueOfInputString
                                required={true}
                                label={'کد ملی'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <CustomInput
                                condition1={this.context.familyGuestInformationValidation.certificateNumber_requiredReg}
                                condition4={this.context.familyGuestInformationValidation.certificateNumber_numberReg}
                                value={this.context.familyGuestInformation.certificateNumber}
                                fieldNameString={'familyGuestInformation'} // this.context.fieldsNAmeString
                                valueOfInputString={'certificateNumber'} // this.context.fieldsNAmeString.valueOfInputString
                                required={true}
                                label={'شماره شناسنامه'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <CustomInput
                                value={this.context.familyGuestInformation.placeOfIssue}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'placeOfIssue'}
                                label={'محل صدور'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className="input form-control"
                                        value={this.context.familyGuestInformation.birthDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'familyGuestInformation', 'birthDate')}
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
                            <CustomInput
                                condition4={this.context.familyGuestInformationValidation.rentPaymentAmount_numberReg}
                                value={this.context.familyGuestInformation.rentPaymentAmount}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'rentPaymentAmount'}
                                label={'مبلغ پرداخت اجاره'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <CustomInput
                                condition4={this.context.familyGuestInformationValidation.depositPaymentAmount_numberReg}
                                value={this.context.familyGuestInformation.depositPaymentAmount}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'depositPaymentAmount'}
                                label={'مبلغ پرداخت ودیعه'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <CustomInput
                                condition4={this.context.familyGuestInformationValidation.discountPaymentAmount_numberReg}
                                value={this.context.familyGuestInformation.discountPaymentAmount}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'discountPaymentAmount'}
                                label={'مبلغ پرداخت تخفیف'}
                            />
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
                            <CustomInput
                                condition2={this.context.familyGuestInformationValidation.phoneNumber_telephoneReg}
                                value={this.context.familyGuestInformation.phoneNumber}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'phoneNumber'}
                                label={'شماره تماس'}
                            />
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default FGInformationPage;