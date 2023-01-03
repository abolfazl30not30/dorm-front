import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import { Calendar, DatePicker } from 'react-persian-datepicker';
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
import Error from "../../../../CustomInputs/Error";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Select} from "@mui/material";

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
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFamilyValidation.firstPersonFullName_requiredReg}
                                value={this.context.constantInformationFamily.firstPersonFullName}
                                fieldNameString={'constantInformationFamily'} // this.context.fieldsNAmeString
                                valueOfInputString={'firstPersonFullName'} // this.context.fieldsNAmeString.valueOfInputString
                                required={true}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFamilyValidation.firstPersonPhoneNumber_requiredReg}
                                condition2={this.context.constantInformationFamilyValidation.firstPersonPhoneNumber_telephoneReg}
                                value={this.context.constantInformationFamily.firstPersonPhoneNumber}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'firstPersonPhoneNumber'}
                                required={true}
                                label={'شماره تماس'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.constantInformationFamily.firstPersonFatherName}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'firstPersonFatherName'}
                                label={'نام  پدر'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                    id="select-field"
                                    value={this.context.constantInformationFamily.firstPersonRelationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'constantInformationFamily', 'firstPersonRelationshipWithResident')}
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
                    <div className='d-flex flex-wrap justify-content-start mt-4'>
                        <div className='col-12 pe-3 mb-3'>شخص دوم</div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFamilyValidation.secondPersonFullName_requiredReg}
                                value={this.context.constantInformationFamily.secondPersonFullName}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'secondPersonFullName'}
                                required={true}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.constantInformationFamilyValidation.secondPersonPhoneNumber_requiredReg}
                                condition2={this.context.constantInformationFamilyValidation.secondPersonPhoneNumber_telephoneReg}
                                value={this.context.constantInformationFamily.secondPersonPhoneNumber}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'secondPersonPhoneNumber'}
                                required={true}
                                label={'شماره تماس'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.constantInformationFamily.secondPersonFatherName}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'secondPersonFatherName'}
                                label={'نام  پدر'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                    id="select-field"
                                    value={this.context.constantInformationFamily.secondPersonRelationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'constantInformationFamily', 'secondPersonRelationshipWithResident')}
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
                    <div className='d-flex flex-wrap justify-content-start mt-4'>
                        <div className='col-12 pe-3 mb-3'>شخص سوم</div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.constantInformationFamily.thirdPersonFullName}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'thirdPersonFullName'}
                                label={'نام و نام خانوادگی'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition2={this.context.constantInformationFamilyValidation.thirdPersonPhoneNumber_telephoneReg}
                                value={this.context.constantInformationFamily.thirdPersonPhoneNumber}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'thirdPersonPhoneNumber'}
                                label={'شماره تماس'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.constantInformationFamily.thirdPersonFatherName}
                                fieldNameString={'constantInformationFamily'}
                                valueOfInputString={'thirdPersonFatherName'}
                                label={'نام  پدر'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                    id="select-field"
                                    value={this.context.constantInformationFamily.thirdPersonRelationshipWithResident}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'constantInformationFamily', 'thirdPersonRelationshipWithResident')}
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
                </div>
            </>
        );
    }
}

export  default CInformationFamilyPage ;