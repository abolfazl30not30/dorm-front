import {Component} from "react";
import BuildingContext from "../../../../contexts/Building";
import SimpleTextInput from "../../../CustomInputs/SimpleTextInput";
import DateInput from "../../../CustomInputs/DateInput";

class AdditionalInformation extends Component{
    static contextType = BuildingContext;

    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات تکمیلی</h2>
                    <div className='d-flex flex-wrap justify-content-start'>

                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                value={this.context.personnelFields.university}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'university'}
                                label={'دانشگاه'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.major_requiredReg}
                                value={this.context.personnelFields.major}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'major'}
                                label={'رشته'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.spouseFullName_requiredReg}
                                value={this.context.personnelFields.spouseFullName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'spouseFullName'}
                                label={'نام و نام خانوادگی همسر'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                value={this.context.personnelFields.spouseJob}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'spouseJob'}
                                label={'شغل همسر'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.bankName_requiredReg}
                                value={this.context.personnelFields.bankName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankName'}
                                label={'نام بانک'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.cardNumber_requiredReg}
                                condition4={this.context.personnelFieldsValidation.cardNumber_numberReg}
                                value={this.context.personnelFields.cardNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'cardNumber'}
                                label={'شماره کارت'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.bankAccountNumber_requiredReg}
                                condition4={this.context.personnelFieldsValidation.bankAccountNumber_numberReg}
                                value={this.context.personnelFields.bankAccountNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankAccountNumber'}
                                label={'شماره حساب'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.bankAccountOwnerName_requiredReg}
                                value={this.context.personnelFields.bankAccountOwnerName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankAccountOwnerName'}
                                label={'نام مالک حساب'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.bankAccountShabaNumber_requiredReg}
                                condition4={this.context.personnelFieldsValidation.bankAccountShabaNumber_numberReg}
                                value={this.context.personnelFields.bankAccountShabaNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankAccountShabaNumber'}
                                label={'شماره شبا'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <DateInput
                                condition1={this.context.personnelFieldsValidation.bankAccountExpirationDate_requiredReg}
                                value={this.context.valueOfDates.personnel.bankAccountExpirationDate}
                                valueFieldString={'personnel'}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankAccountExpirationDate'}
                                required={true}
                                label={'تاریخ انقضا کارت'}
                                timeInclude={false}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition4={this.context.personnelFieldsValidation.cvv2_numberReg}
                                value={this.context.personnelFields.cvv2}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'cvv2'}
                                label={'ccv2'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                value={this.context.personnelFields.fullName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'fullName'}
                                label={'نام و نام خانوداگی'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.parentType_requiredReg}
                                value={this.context.personnelFields.parentType}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'parentType'}
                                label={'تایپ پرسنل'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.parentId_requiredReg}
                                value={this.context.personnelFields.parentId}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'parentId'}
                                label={'آیدی پرسنل'}
                            />
                        </div>
                        <div className="input-group-register col-4">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.gender_requiredReg}
                                value={this.context.personnelFields.gender}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'gender'}
                                label={'جنسیت'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AdditionalInformation;