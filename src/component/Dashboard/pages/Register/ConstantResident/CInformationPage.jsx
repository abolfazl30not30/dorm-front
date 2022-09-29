import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import {DatePicker} from "react-persian-datepicker";

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
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationPageValidation.firstName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationPage.firstName}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'firstName')}
                                   placeholder=" "
                                   name='admission_start_date'
                            />
                            <label className="placeholder"  style={{right: this.context.constantInformationPageValidation.firstName_requiredReg === false ? '35px' : '12px'}}>
                                نام
                                <span style={{color : 'red'}}>*</span></label>

                            {
                                this.context.constantInformationPageValidation.firstName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationPageValidation.lastName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationPage.lastName}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'lastName')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.constantInformationPageValidation.lastName_requiredReg === false ? '35px' : '12px'}}>
                                نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationPageValidation.lastName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.constantInformationPage.nickName}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'nickName')}
                                   placeholder=" "
                            />
                            <label className="placeholder">نام مستعار</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.constantInformationPageValidation.nationalCode_requiredReg &&
                                       this.context.constantInformationPageValidation.nationalCode_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationPage.nationalCode}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'nationalCode')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.constantInformationPageValidation.nationalCode_requiredReg &&
                                    this.context.constantInformationPageValidation.nationalCode_numberReg) === false ? '35px' : '12px'}}>
                                کد ملی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationPageValidation.nationalCode_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.constantInformationPageValidation.nationalCode_numberReg === false && this.context.constantInformationPageValidation.nationalCode_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.constantInformationPageValidation.certificateNumber_requiredReg &&
                                       this.context.constantInformationPageValidation.certificateNumber_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationPage.certificateNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'certificateNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.constantInformationPageValidation.certificateNumber_requiredReg &&
                                    this.context.constantInformationPageValidation.certificateNumber_numberReg) === false ? '35px' : '12px'}}>
                                شماره شناسنامه
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationPageValidation.certificateNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.constantInformationPageValidation.certificateNumber_numberReg === false && this.context.constantInformationPageValidation.certificateNumber_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationPageValidation.placeOfIssue_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationPage.placeOfIssue}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'placeOfIssue')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.constantInformationPageValidation.placeOfIssue_requiredReg === false ? '35px' : '12px'}}>
                                محل صدور
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationPageValidation.placeOfIssue_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4 date-container">
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control ${this.context.constantInformationPageValidation.birthDate_requiredReg === false ? "is-invalid" : ""}`}
                                        value={this.context.constantInformationPage.birthDate}
                                        onChange={(value) =>  this.context.handleDates(value, 'constantInformationPage', 'birthDate')}
                            />
                            <label className="placeholder" style={{right: this.context.constantInformationPageValidation.birthDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ تولد
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationPageValidation.birthDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationPageValidation.nationality_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationPage.nationality}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'nationality')}
                                   placeholder=" "
                            />
                            <label className="placeholder"  style={{right: this.context.constantInformationPageValidation.nationality_requiredReg === false ? '35px' : '12px'}}>
                                ملیت
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationPageValidation.nationality_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationPageValidation.fatherName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationPage.fatherName}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'fatherName')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.constantInformationPageValidation.fatherName_requiredReg === false ? '35px' : '12px'}}>
                                نام پدر
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationPageValidation.fatherName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'
                                    value={this.context.constantInformationPage.religion}
                                    onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'religion')}
                            >
                                <option value='islam'>اسلام</option>
                                <option value='christianity'>مسیحیت</option>
                                <option value='hinduism'>هندوئیسم</option>
                                <option value='buddhism'>آیین بودایی</option>
                                <option value='other'>سایر</option>
                            </select>
                            <label className="placeholder">دین</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.constantInformationPage.subReligion}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'subReligion')}
                                   placeholder=" "
                            />
                            <label className="placeholder">مذهب</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.constantInformationPage.university}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'university')}
                                   placeholder=" "
                            />
                            <label className="placeholder">دانشگاه محل تحصیل</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationPageValidation.studentNumber_numberReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationPage.studentNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'studentNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder"
                                   style={{right: this.context.constantInformationPageValidation.studentNumber_numberReg === false ? '35px' : '12px'}}>
                                شماره دانشجویی
                            </label>

                            {
                                this.context.constantInformationPageValidation.studentNumber_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.constantInformationPage.fatherJob}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'fatherJob')}
                                   placeholder=" "
                            />
                            <label className="placeholder">شغل پدر</label>
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'
                                    name='maritalStatus'
                                    value={this.context.constantInformationPage.maritalStatus}
                                    onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'maritalStatus')}
                            >
                                <option value='single' >مجرد</option>
                                <option value='married'>متاهل</option>
                                <option value='divorced'>متارکه</option>
                            </select>
                            <label className="placeholder">وضعیت تاهل</label>
                        </div>
                        {
                            this.context.fields.maritalStatus === 'married' ? (
                                <>
                                    <div className="input-group-register col-4">
                                        <input type="text"
                                               className={`input form-control ${(this.context.constantInformationPageValidation.spouseFullName_requiredReg === false &&
                                                   this.context.fields.maritalStatus === 'married') ? "is-invalid" : ""}`}
                                               value={this.context.constantInformationPage.spouseFullName}
                                               onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'spouseFullName')}
                                               placeholder=" "
                                        />
                                        <label className="placeholder" style={{right: (this.context.constantInformationPageValidation.spouseFullName_requiredReg === false &&
                                                this.context.fields.maritalStatus === 'married') ? '35px' : '12px'}}>
                                            نام و نام خانوادگی همسر
                                            <span style={{color : 'red'}}>*</span>
                                        </label>

                                        {
                                            (this.context.constantInformationPageValidation.spouseFullName_requiredReg === false && this.context.fields.maritalStatus === 'married')
                                                ? <small
                                                    className="text-danger">{this.context.errors['required']}</small>
                                                : <div/>
                                        }

                                    </div>
                                    <div className="input-group-register col-4">
                                        <input type="text"
                                               className={`input form-control`}
                                               value={this.context.constantInformationPage.spouseJob}
                                               onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'spouseJob')}
                                               placeholder=" "
                                        />
                                        <label className="placeholder">شغل همسر</label>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                        }
                        <div className="input-group-register col-4">
                            <select className='input'
                                    value={this.context.constantInformationPage.health}
                                    onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'health')}
                            >
                                <option value='false'>خیر</option>
                                <option value='true'>بله</option>
                            </select>
                            <label className="placeholder">آیا بیماری خاصی دارید؟</label>
                        </div>
                        {
                            this.context.fields.health === 'true' ? (
                                <>
                                    <div className="input-group-register col-12">
                                        <textarea
                                            className={`input form-control ${(this.context.constantInformationPageValidation.healthDescription_requiredReg === false &&
                                                this.context.fields.health === 'true') ? "is-invalid" : ""}`}
                                            value={this.context.constantInformationPage.healthDescription}
                                            onChange={(e) =>  this.context.handleFields(e, 'constantInformationPage', 'healthDescription')}
                                            placeholder=" "
                                        />
                                        <label className="placeholder" style={{right: (this.context.constantInformationPageValidation.healthDescription_requiredReg === false &&
                                                this.context.fields.health === 'true') ? '35px' : '12px'}}>
                                            توضیحات
                                            <span style={{color : 'red'}}>*</span>
                                        </label>

                                        {
                                            (this.context.constantInformationPageValidation.healthDescription_requiredReg === false &&
                                                this.context.fields.health === 'true')
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