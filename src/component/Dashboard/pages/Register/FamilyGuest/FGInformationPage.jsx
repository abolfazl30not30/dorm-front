import React, { Component } from 'react';
import * as yup from 'yup';
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
import DateInput from "../../../../CustomInputs/DateInput";


class FGInformationPage extends Component {
    static contextType = BuildingContext;

    state = {}

    render() {
        return (
            <>
                <form className="register-step-box" onSubmit={this.handleSubmit} noValidate>
                    <h2>مهمان (بستگان درجه یک)</h2>

                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationValidation.fullName_requiredReg}
                                value={this.context.familyGuestInformation.fullName}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'fullName'}
                                required={true}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationValidation.nationalCode_requiredReg}
                                condition4={this.context.familyGuestInformationValidation.nationalCode_numberReg}
                                value={this.context.familyGuestInformation.nationalCode}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'nationalCode'}
                                required={true}
                                label={'کد ملی'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationValidation.certificateNumber_requiredReg}
                                condition4={this.context.familyGuestInformationValidation.certificateNumber_numberReg}
                                value={this.context.familyGuestInformation.certificateNumber}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'certificateNumber'}
                                required={true}
                                label={'شماره شناسنامه'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                value={this.context.familyGuestInformation.placeOfIssue}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'placeOfIssue'}
                                label={'محل صدور'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <DateInput value={this.context.valueOfDates.familyGuest.birthDate}
                                       fieldNameString={'familyGuestInformation'}
                                       valueFieldString={'familyGuest'}
                                       valueOfInputString={'birthDate'}
                                       label={'تاریخ تولد'}
                                       timeInclude={false}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <DateInput condition1={this.context.familyGuestInformationValidation.admissionStartDate_requiredReg}
                                       value={this.context.valueOfDates.familyGuest.admissionStartDate}
                                       valueFieldString={'familyGuest'}
                                       fieldNameString={'familyGuestInformation'}
                                       valueOfInputString={'admissionStartDate'}
                                       required={true}
                                       label={' تاریخ شروع پذیرش'}
                                       timeInclude={true}
                            />

                        </div>

                        <div className="input-group-register col-4">
                            <DateInput condition1={this.context.familyGuestInformationValidation.admissionEndDate_requiredReg}
                                       value={this.context.valueOfDates.familyGuest.admissionEndDate}
                                       valueFieldString={'familyGuest'}
                                       fieldNameString={'familyGuestInformation'}
                                       valueOfInputString={'admissionEndDate'}
                                       required={true}
                                       label={'تاریخ اتمام پذیرش'}
                                       timeInclude={true}
                            />

                        </div>
                        <div className="input-group-register col-4">
                            <DateInput condition1={this.context.familyGuestInformationValidation.paymentDate_requiredReg}
                                       value={this.context.valueOfDates.familyGuest.paymentDate}
                                       valueFieldString={'familyGuest'}
                                       fieldNameString={'familyGuestInformation'}
                                       valueOfInputString={'paymentDate'}
                                       required={true}
                                       label={'تاریخ پرداخت'}
                                       timeInclude={false}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition4={this.context.familyGuestInformationValidation.rentPaymentAmount_numberReg}
                                value={this.context.familyGuestInformation.rentPaymentAmount}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'rentPaymentAmount'}
                                label={'مبلغ پرداخت اجاره'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition4={this.context.familyGuestInformationValidation.depositPaymentAmount_numberReg}
                                value={this.context.familyGuestInformation.depositPaymentAmount}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'depositPaymentAmount'}
                                label={'مبلغ پرداخت ودیعه'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
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
                            <SimpleTextInput
                                value={this.context.familyGuestInformation.address}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'address'}
                                label={'آدرس محل سکونت'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
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