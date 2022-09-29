import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import { Calendar, DatePicker } from 'react-persian-datepicker';

class CInformationFamilyPage extends Component {
    static contextType = BuildingContext;

    state = {}

    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات بستگان</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className='col-12 pe-3 mb-3'>شخص اول</div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationFamilyValidation.firstPerson_FullName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationFamily.firstPerson_FullName}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFamily', 'firstPerson_FullName')}
                                   placeholder=" "
                            />
                            <label className="placeholder"  style={{right: this.context.constantInformationFamilyValidation.firstPerson_FullName_requiredReg === false ? '35px' : '12px'}}>
                                نام و نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFamilyValidation.firstPerson_FullName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control ${(this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg &&
                                       this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_telephoneReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationFamily.firstPerson_PhoneNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFamily', 'firstPerson_PhoneNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg &&
                                    this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_telephoneReg) === false ? '35px' : '12px'}}>
                                شماره تماس
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }
                            {
                                (this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg === true &&
                                    this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_telephoneReg === false)
                                    ? <small
                                        className="text-danger">{this.context.errors['telephoneRegex']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.constantInformationFamily.firstPerson_FatherName}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFamily', 'firstPerson_FatherName')}
                                   placeholder=" "
                            />
                            <label className="placeholder">نام  پدر</label>

                        </div>
                        <div className="input-group-register col-3">
                            <select className='input'
                                    value={this.context.constantInformationFamily.firstPerson_relationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e, 'constantInformationFamily', 'firstPerson_relationshipWithResident')}
                            >
                                <option value='father'>پدر</option>
                                <option value='mother'>مادر</option>
                                <option value='sister'>خواهر</option>
                                <option value='brother'>برادر</option>
                                <option value='other'>غیره</option>
                            </select>
                            <label className="placeholder">نسبت با اقامتگر</label>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap justify-content-start mt-4'>
                        <div className='col-12 pe-3 mb-3'>شخص دوم</div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control ${this.context.constantInformationFamilyValidation.secondPerson_FullName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationFamily.secondPerson_FullName}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFamily', 'secondPerson_FullName')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.constantInformationFamilyValidation.secondPerson_FullName_requiredReg === false ? '35px' : '12px'}}>
                                نام و نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFamilyValidation.secondPerson_FullName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control ${(this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg &&
                                       this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_telephoneReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.constantInformationFamily.secondPerson_PhoneNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFamily', 'secondPerson_PhoneNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg &&
                                    this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_telephoneReg) === false ? '35px' : '12px'}}>
                                شماره تماس
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }
                            {
                                (this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg === true &&
                                    this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_telephoneReg === false)
                                    ? <small
                                        className="text-danger">{this.context.errors['telephoneRegex']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-3">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.constantInformationFamily.secondPerson_FatherName}
                                   onChange={(e) =>  this.context.handleFields(e, 'constantInformationFamily', 'secondPerson_FatherName')}
                                   placeholder=" "
                            />
                            <label className="placeholder">نام  پدر</label>

                        </div>
                        <div className="input-group-register col-3">
                            <select className='input'
                                    value={this.context.constantInformationFamily.secondPerson_relationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e, 'constantInformationFamily', 'secondPerson_relationshipWithResident')}
                            >
                                <option>پدر</option>
                                <option>مادر</option>
                                <option>خواهر</option>
                                <option>برادر</option>
                                <option>غیره</option>
                            </select>
                            <label className="placeholder">نسبت با اقامتگر</label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export  default CInformationFamilyPage ;