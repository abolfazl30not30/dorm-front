import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import { Calendar, DatePicker } from 'react-persian-datepicker';
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
import Error from "../../../../CustomInputs/Error";

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
                            <SimpleTextInput
                                condition1={this.context.constantInformationFamilyValidation.firstPerson_FullName_requiredReg}
                                value={this.context.constantInformationFamily.firstPersonFullName}
                                fieldNameString={'constantInformationFamily'} // this.context.fieldsNAmeString
                                valueOfInputString={'firstPerson_FullName'} // this.context.fieldsNAmeString.valueOfInputString
                                required={true}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-3">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg}
                                condition2={this.context.constantInformationFamilyValidation.firstPerson_PhoneNumber_telephoneReg}
                                value={this.context.constantInformationFamily.firstPersonPhoneNumber}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'firstPerson_PhoneNumber'}
                                required={true}
                                label={'شماره تماس'}
                            />
                        </div>
                        <div className="input-group-register col-3">
                            <SimpleTextInput
                                value={this.context.constantInformationFamily.firstPersonFatherName}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'firstPerson_FatherName'}
                                label={'نام  پدر'}
                            />
                        </div>
                        <div className="input-group-register col-3">
                            <select className='input'
                                    value={this.context.constantInformationFamily.firstPersonRelationshipWithResident}
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
                            <SimpleTextInput
                                condition1={this.context.constantInformationFamilyValidation.secondPerson_FullName_requiredReg}
                                value={this.context.constantInformationFamily.secondPersonFullName}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'secondPerson_FullName'}
                                required={true}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-3">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg}
                                condition2={this.context.constantInformationFamilyValidation.secondPerson_PhoneNumber_telephoneReg}
                                value={this.context.constantInformationFamily.secondPersonPhoneNumber}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'secondPerson_PhoneNumber'}
                                required={true}
                                label={'شماره تماس'}
                            />
                        </div>
                        <div className="input-group-register col-3">
                            <SimpleTextInput
                                value={this.context.constantInformationFamily.secondPersonFatherName}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'secondPerson_FatherName'}
                                label={'نام  پدر'}
                            />
                        </div>
                        <div className="input-group-register col-3">
                            <select className='input'
                                    value={this.context.constantInformationFamily.secondPersonRelationshipWithResident}
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