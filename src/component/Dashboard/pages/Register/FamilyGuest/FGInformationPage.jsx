import React, { Component } from 'react';
import * as yup from 'yup';
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
import DateInput from "../../../../CustomInputs/DateInput";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Select} from "@mui/material";


class FGInformationPage extends Component {
    static contextType = BuildingContext;

    state = {}

    render() {
        return (
            <>
                <form className="register-step-box" onSubmit={this.handleSubmit} noValidate>
                    <h2>مهمان (بستگان درجه یک)</h2>

                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationValidation.firstName_requiredReg}
                                value={this.context.familyGuestInformation.firstName}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'firstName'}
                                required={true}
                                label={'نام'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationValidation.lastName_requiredReg}
                                value={this.context.familyGuestInformation.lastName}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'lastName'}
                                required={true}
                                label={'نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
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
                        <div className="input-group-register col-md-4 col-12">
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
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.familyGuestInformation.placeOfIssue}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'placeOfIssue'}
                                label={'محل صدور'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12 date-container">
                            <DateInput value={this.context.valueOfDates.familyGuest.birthDate}
                                       fieldNameString={'familyGuestInformation'}
                                       valueFieldString={'familyGuest'}
                                       valueOfInputString={'birthDate'}
                                       timeInclude={false}
                            />
                            <label className="placeholder" style={{
                                top: '-5px',
                                backgroundColor: '#fff',
                                color: '#84888a',
                                margin: '0 .3rem',
                                opacity: '1',
                            }}>تاریخ تولد<span style={{color: '#ff4f4f'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput condition1={this.context.familyGuestInformationValidation.startDate_requiredReg}
                                       value={this.context.valueOfDates.familyGuest.startDate}
                                       valueFieldString={'familyGuest'}
                                       fieldNameString={'familyGuestInformation'}
                                       valueOfInputString={'startDate'}
                                       timeInclude={true}
                            />
                            <label className="placeholder" style={{
                                top: '-5px',
                                backgroundColor: '#fff',
                                color: '#84888a',
                                margin: '0 .3rem',
                                opacity: '1',
                            }}>تاریخ شروع پذیرش<span style={{color: '#ff4f4f'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput condition1={this.context.familyGuestInformationValidation.endDate_requiredReg}
                                       value={this.context.valueOfDates.familyGuest.endDate}
                                       valueFieldString={'familyGuest'}
                                       fieldNameString={'familyGuestInformation'}
                                       valueOfInputString={'endDate'}
                                       timeInclude={true}
                            />
                            <label className="placeholder" style={{
                                top: '-5px',
                                backgroundColor: '#fff',
                                color: '#84888a',
                                margin: '0 .3rem',
                                opacity: '1',
                            }}>تاریخ اتمام پذیرش<span style={{color: '#ff4f4f'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-md-4 col-12 date-container">
                            <DateInput condition1={this.context.familyGuestInformationValidation.paymentDate_requiredReg}
                                       value={this.context.valueOfDates.familyGuest.paymentDate}
                                       valueFieldString={'familyGuest'}
                                       fieldNameString={'familyGuestInformation'}
                                       valueOfInputString={'paymentDate'}
                                       timeInclude={false}
                            />
                            <label className="placeholder" style={{
                                top: '-5px',
                                backgroundColor: '#fff',
                                color: '#84888a',
                                margin: '0 .3rem',
                                opacity: '1',
                            }}>تاریخ پرداخت<span style={{color: '#ff4f4f'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition4={this.context.familyGuestInformationValidation.rentPaymentAmount_numberReg}
                                value={this.context.familyGuestInformation.rentPaymentAmount}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'rentPaymentAmount'}
                                label={'مبلغ پرداخت اجاره'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition4={this.context.familyGuestInformationValidation.depositPaymentAmount_numberReg}
                                value={this.context.familyGuestInformation.depositPaymentAmount}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'depositPaymentAmount'}
                                label={'مبلغ پرداخت ودیعه'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition4={this.context.familyGuestInformationValidation.discountPaymentAmount_numberReg}
                                value={this.context.familyGuestInformation.discountPaymentAmount}
                                fieldNameString={'familyGuestInformation'}
                                valueOfInputString={'discountPaymentAmount'}
                                label={'مبلغ پرداخت تخفیف'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                    id="select-field"
                                    value={this.context.familyGuestInformation.relationshipWithResident}
                                    onChange={(e) => this.context.handleFields(e.target.value, 'familyGuestInformation', 'relationshipWithResident')}
                                >
                                    <MenuItem value='father'>پدر</MenuItem>
                                    <MenuItem value='mother'>مادر</MenuItem>
                                    <MenuItem value='sister'>خواهر</MenuItem>
                                    <MenuItem value='brother'>برادر</MenuItem>
                                    <MenuItem value='other'>غیره</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0',
                                    padding: '0 .4rem -0.4rem',
                                    opacity: '1',
                                }}>نسبت با اقامتگر</label>
                            </FormControl>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default FGInformationPage;