import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
import DateInput from "../../../../CustomInputs/DateInput";

class CInformationPage extends Component {
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
                    <h2>مشخصات</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationPageValidation.firstName_requiredReg}
                                value={this.context.constantInformationPage.firstName}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'firstName'}
                                required={true}
                                label={'نام'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationPageValidation.lastName_requiredReg}
                                value={this.context.constantInformationPage.lastName}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'lastName'}
                                required={true}
                                label={'نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.constantInformationPageValidation.alias}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'alias'}
                                label={'نام مستعار'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationPageValidation.nationalCode_requiredReg}
                                condition4={this.context.constantInformationPageValidation.nationalCode_numberReg}
                                value={this.context.constantInformationPage.nationalCode}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'nationalCode'}
                                required={true}
                                label={'کد ملی'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationPageValidation.certificateNumber_requiredReg}
                                condition4={this.context.constantInformationPageValidation.certificateNumber_numberReg}
                                value={this.context.constantInformationPage.certificateNumber}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'certificateNumber'}
                                required={true}
                                label={'شماره شناسنامه'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationPageValidation.placeOfIssue_requiredReg}
                                value={this.context.constantInformationPage.placeOfIssue}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'placeOfIssue'}
                                required={true}
                                label={' محل صدور'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12 date-container">
                            <DateInput condition1={this.context.constantInformationPageValidation.birthDate_requiredReg}
                                       value={this.context.valueOfDates.constantResident.birthDate}
                                       valueFieldString={'constantResident'}
                                       fieldNameString={'constantInformationPage'}
                                       valueOfInputString={'birthDate'}
                                       required={true}
                                       label={'تاریخ تولد'}
                                       timeInclude={false}
                            />

                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationPageValidation.nationality_requiredReg}
                                value={this.context.constantInformationPage.nationality}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'nationality'}
                                required={true}
                                label={'ملیت'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationPageValidation.fatherName_requiredReg}
                                value={this.context.constantInformationPage.fatherName}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'fatherName'}
                                required={true}
                                label={'نام پدر'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <select className='input'
                                    value={this.context.constantInformationPage.religion}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'constantInformationPage', 'religion')}
                            >
                                <option value='islam'>اسلام</option>
                                <option value='christianity'>مسیحیت</option>
                                <option value='hinduism'>هندوئیسم</option>
                                <option value='buddhism'>آیین بودایی</option>
                                <option value='other'>سایر</option>
                            </select>
                            <label className="placeholder">دین</label>
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.constantInformationPage.subReligion}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'subReligion'}
                                label={'مذهب'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.constantInformationPage.university}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'university'}
                                label={'دانشگاه محل تحصیل'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition4={this.context.constantInformationPageValidation.studentNumber_numberReg}
                                value={this.context.constantInformationPage.studentNumber}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'studentNumber'}
                                label={'شماره دانشجویی'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.constantInformationPage.fatherJob}
                                fieldNameString={'constantInformationPage'}
                                valueOfInputString={'fatherJob'}
                                label={'شغل پدر'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <select className='input'
                                    name='maritalStatus'
                                    value={this.context.constantInformationPage.maritalStatus}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'constantInformationPage', 'maritalStatus')}
                            >
                                <option value='single' >مجرد</option>
                                <option value='married'>متاهل</option>
                                <option value='divorced'>متارکه</option>
                            </select>
                            <label className="placeholder">وضعیت تاهل</label>
                        </div>
                        {
                            this.context.constantInformationPage.maritalStatus === 'married' ? (
                                <>
                                    <div className="input-group-register col-md-4 col-12">
                                        <SimpleTextInput
                                            condition1={this.context.constantInformationPageValidation.spouseFullName_requiredReg}
                                            condition5={this.context.fields.maritalStatus === 'married'}
                                            value={this.context.constantInformationPage.spouseFullName}
                                            fieldNameString={'constantInformationPage'}
                                            valueOfInputString={'spouseFullName'}
                                            required={true}
                                            label={'نام و نام خانوادگی همسر'}
                                        />
                                    </div>
                                    <div className="input-group-register col-md-4 col-12">
                                        <SimpleTextInput
                                            value={this.context.constantInformationPage.spouseJob}
                                            fieldNameString={'constantInformationPage'}
                                            valueOfInputString={'spouseJob'}
                                            label={'شغل همسر'}
                                        />
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                        }
                        <div className="input-group-register col-md-4 col-12">
                            <select className='input'
                                    value={this.context.constantInformationPage.health}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'constantInformationPage', 'health')}
                            >
                                <option value='false'>خیر</option>
                                <option value='true'>بله</option>
                            </select>
                            <label className="placeholder">آیا بیماری خاصی دارید؟</label>
                        </div>
                        {
                            this.context.constantInformationPage.health === 'true' ? (
                                <>
                                    <div className="input-group-register col-12">
                                        <textarea
                                            className={`input form-control ${(this.context.constantInformationPageValidation.healthyStatus_requiredReg === false &&
                                                this.context.constantInformationPage.health === 'true') ? "is-invalid" : ""}`}
                                            value={this.context.constantInformationPage.healthyStatus}
                                            onChange={(e) =>  this.context.handleFields(e.target.value, 'constantInformationPage', 'healthyStatus')}
                                            placeholder=" "
                                        />
                                        <label className="placeholder" style={{right: (this.context.constantInformationPageValidation.healthyStatus_requiredReg === false &&
                                                this.context.constantInformationPage.health === 'true') ? '35px' : '12px'}}>
                                            توضیحات
                                            <span style={{color : 'red'}}>*</span>
                                        </label>

                                        {
                                            (this.context.constantInformationPageValidation.healthyStatus_requiredReg === false &&
                                                this.context.constantInformationPage.health === 'true')
                                                ? <small
                                                    className="text-danger">{this.context.errors['required']}</small>
                                                : <div/>
                                        }
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
            </>
        );
    }
}

export  default CInformationPage ;