import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";

class FGInformationFamilyPage extends Component {
    static contextType = BuildingContext;

    state = {  }
    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات بستگان</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className='col-12 pe-3 mb-3'>شخص اول</div>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationFamilyValidation.firstPerson_FullName_requiredReg}
                                value={this.context.familyGuestInformationFamily.firstPerson_FullName}
                                fieldNameString={'familyGuestInformationFamily'}
                                valueOfInputString={'firstPerson_FullName'}
                                required={true}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationFamilyValidation.firstPerson_PhoneNumber_requiredReg}
                                condition2={this.context.familyGuestInformationFamilyValidation.firstPerson_PhoneNumber_telephoneReg}
                                value={this.context.familyGuestInformationFamily.firstPerson_PhoneNumber}
                                fieldNameString={'familyGuestInformationFamily'}
                                valueOfInputString={'firstPerson_PhoneNumber'}
                                required={true}
                                label={'شماره تماس'}
                            />
                        </div>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <SimpleTextInput
                                value={this.context.familyGuestInformationFamily.firstPerson_FatherName}
                                fieldNameString={'familyGuestInformationFamily'}
                                valueOfInputString={'firstPerson_FatherName'}
                                label={'نام  پدر'}
                            />
                        </div>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <select className='input'
                                    value={this.context.familyGuestInformationFamily.firstPerson_relationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e, 'familyGuestInformationFamily', 'firstPerson_relationshipWithResident')}
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
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationFamilyValidation.secondPerson_FullName_requiredReg}
                                value={this.context.familyGuestInformationFamily.secondPerson_FullName}
                                fieldNameString={'familyGuestInformationFamily'}
                                valueOfInputString={'secondPerson_FullName'}
                                required={true}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationFamilyValidation.secondPerson_PhoneNumber_requiredReg}
                                condition2={this.context.familyGuestInformationFamilyValidation.secondPerson_PhoneNumber_telephoneReg}
                                value={this.context.familyGuestInformationFamily.secondPerson_PhoneNumber}
                                fieldNameString={'familyGuestInformationFamily'}
                                valueOfInputString={'secondPerson_PhoneNumber'}
                                required={true}
                                label={'شماره تماس'}
                            />
                        </div>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <SimpleTextInput
                                value={this.context.familyGuestInformationFamily.secondPerson_FatherName}
                                fieldNameString={'familyGuestInformationFamily'}
                                valueOfInputString={'secondPerson_FatherName'}
                                label={'نام  پدر'}
                            />
                        </div>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <select className='input'
                                    value={this.context.familyGuestInformationFamily.secondPerson_relationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e, 'familyGuestInformationFamily', 'secondPerson_relationshipWithResident')}
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

export default FGInformationFamilyPage;