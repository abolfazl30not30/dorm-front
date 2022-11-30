import React, { Component } from 'react';
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
import DateInput from "../../../../CustomInputs/DateInput";

class OGInformationPage extends Component {
    static contextType = BuildingContext;

    state = {}
    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مهمان (متفرقه)</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationValidation.firstName_requiredReg}
                                value={this.context.otherGuestInformation.firstName}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'firstName'}
                                label={'نام'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationValidation.lastName_requiredReg}
                                value={this.context.otherGuestInformation.lastName}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'lastName'}
                                label={'نام خانوادگی'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationValidation.nationalCode_requiredReg}
                                condition4={this.context.otherGuestInformationValidation.nationalCode_numberReg}
                                value={this.context.otherGuestInformation.nationalCode}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'nationalCode'}
                                label={'کد ملی'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationValidation.certificateNumber_requiredReg}
                                condition4={this.context.otherGuestInformationValidation.certificateNumber_numberReg}
                                value={this.context.otherGuestInformation.certificateNumber}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'certificateNumber'}
                                label={'شماره شناسنامه'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput value={this.context.valueOfDates.otherGuest.birthDate}
                                       valueFieldString={'otherGuest'}
                                       fieldNameString={'otherGuestInformation'}
                                       valueOfInputString={'birthDate'}
                                       label={'تاریخ تولد'}
                                       timeInclude={false}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.otherGuestInformation.placeOfIssue}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'placeOfIssue'}
                                label={'محل صدور'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput condition1={this.context.otherGuestInformationValidation.startDate_requiredReg}
                                       value={this.context.valueOfDates.otherGuest.startDate}
                                       valueFieldString={'otherGuest'}
                                       fieldNameString={'otherGuestInformation'}
                                       valueOfInputString={'startDate'}
                                       required={true}
                                       label={' تاریخ شروع پذیرش'}
                                       timeInclude={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput timeInclude={true}
                                       condition1={this.context.otherGuestInformationValidation.endDate_requiredReg}
                                       value={this.context.valueOfDates.otherGuest.endDate}
                                       valueFieldString={'otherGuest'}
                                       fieldNameString={'otherGuestInformation'}
                                       valueOfInputString={'endDate'}
                                       required={true}
                                       label={'تاریخ اتمام پذیرش'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput value={this.context.valueOfDates.otherGuest.paymentDate}
                                       valueFieldString={'otherGuest'}
                                       fieldNameString={'otherGuestInformation'}
                                       valueOfInputString={'paymentDate'}
                                       label={'تاریخ پرداخت'}
                                       timeInclude={false}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition4={this.context.otherGuestInformationValidation.rentPaymentAmount_numberReg}
                                value={this.context.otherGuestInformation.rentPaymentAmount}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'rentPaymentAmount'}
                                label={'مبلغ پرداخت اجاره'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition4={this.context.otherGuestInformationValidation.depositPaymentAmount_numberReg}
                                value={this.context.otherGuestInformation.depositPaymentAmount}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'depositPaymentAmount'}
                                label={'مبلغ پرداخت ودیعه'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition4={this.context.otherGuestInformationValidation.discountPaymentAmount_numberReg}
                                value={this.context.otherGuestInformation.discountPaymentAmount}
                                fieldNameString={'otherGuestInformation'}
                                valueOfInputString={'discountPaymentAmount'}
                                label={' مبلغ پرداخت تخفیف'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default OGInformationPage;