import {Component} from "react";
import SimpleTextInput from "../../../CustomInputs/SimpleTextInput";
import BuildingContext from "../../../../contexts/Building";

class BasicInformation extends Component{
    static contextType = BuildingContext;

    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات اولیه</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.firstName_requiredReg}
                                value={this.context.personnelFields.firstName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'firstName'}
                                label={'نام'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.lastName_requiredReg}
                                value={this.context.personnelFields.lastName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'lastName'}
                                label={'نام خانوادگی'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.nationalCode_requiredReg}
                                condition4={this.context.personnelFieldsValidation.nationalCode_numberReg}
                                value={this.context.personnelFields.nationalCode}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'nationalCode'}
                                label={'کد ملی'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.placeOfIssue_requiredReg}
                                value={this.context.personnelFields.placeOfIssue}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'placeOfIssue'}
                                label={'محل صدور'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.certificateNumber_requiredReg}
                                condition4={this.context.personnelFieldsValidation.certificateNumber_numberReg}
                                value={this.context.personnelFields.certificateNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'certificateNumber'}
                                label={'شماره شناسنامه'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.phoneNumber_requiredReg}
                                condition2={this.context.personnelFieldsValidation.phoneNumber_phoneNumberReg}
                                value={this.context.personnelFields.phoneNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'phoneNumber'}
                                label={'شماره تماس'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.address_requiredReg}
                                value={this.context.personnelFields.address}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'address'}
                                label={'محل سکونت'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.telephoneNumber_requiredReg}
                                condition3={this.context.personnelFieldsValidation.telephoneNumber_homeTelephoneReg}
                                value={this.context.personnelFields.telephoneNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'telephoneNumber'}
                                label={'تلفن ثابت'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.emergencyNumber_requiredReg}
                                condition6={this.context.personnelFieldsValidation.emergencyNumber_MobileOrHomeTelephoneReg}
                                value={this.context.personnelFields.emergencyNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'emergencyNumber'}
                                label={'تلفن اضطراری'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.birthPlace_requiredReg}
                                value={this.context.personnelFields.birthPlace}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'birthPlace'}
                                label={'محل تولد'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.birthDate_requiredReg}
                                value={this.context.personnelFields.birthDate}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'birthDate'}
                                label={'تاریخ تولد'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.education_requiredReg}
                                value={this.context.personnelFields.education}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'education'}
                                label={'تحصیلات'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.postalCode_requiredReg}
                                condition4={this.context.personnelFieldsValidation.personnelFieldsValidation}
                                value={this.context.personnelFields.postalCode}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'postalCode'}
                                label={'کد پستی'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.email_requiredReg}
                                condition7={this.context.personnelFieldsValidation.email_emailReg}
                                value={this.context.personnelFields.email}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'email'}
                                label={'ایمیل'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.nationality_requiredReg}
                                value={this.context.personnelFields.nationality}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'nationality'}
                                label={'ملیت'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.maritalStatus_requiredReg}
                                value={this.context.personnelFields.maritalStatus}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'maritalStatus'}
                                label={'وضعیت تاهل'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-4">
                        <SimpleTextInput
                            condition1={this.context.personnelFieldsValidation.religion_requiredReg}
                            value={this.context.personnelFields.religion}
                            fieldNameString={'personnelFields'}
                            valueOfInputString={'religion'}
                            label={'دین'}
                            required={true}
                        />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                value={this.context.personnelFields.subReligion}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'subReligion'}
                                label={'مذهب'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                value={this.context.personnelFields.health}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'health'}
                                label={'وضعیت سلامت'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                value={this.context.personnelFields.alias}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'alias'}
                                label={'نام کاربری'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default BasicInformation;