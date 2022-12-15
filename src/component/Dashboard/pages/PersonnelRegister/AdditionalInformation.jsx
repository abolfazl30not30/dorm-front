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

                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.personnelFields.university}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'university'}
                                label={'دانشگاه'}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.personnelFields.major}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'major'}
                                label={'رشته'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.bankName_requiredReg}
                                value={this.context.personnelFields.bankName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankName'}
                                label={'نام بانک'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.bankAccountOwnerName_requiredReg}
                                value={this.context.personnelFields.bankAccountOwnerName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankAccountOwnerName'}
                                label={'نام مالک حساب'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.cardNumber_requiredReg}
                                condition4={this.context.personnelFieldsValidation.cardNumber_numberReg}
                                value={this.context.personnelFields.cardNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'cardNumber'}
                                label={'شماره کارت'}
                                // maxLength={16}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.bankAccountNumber_requiredReg}
                                condition4={this.context.personnelFieldsValidation.bankAccountNumber_numberReg}
                                value={this.context.personnelFields.bankAccountNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankAccountNumber'}
                                label={'شماره حساب'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.bankAccountShabaNumber_requiredReg}
                                condition4={this.context.personnelFieldsValidation.bankAccountShabaNumber_numberReg}
                                value={this.context.personnelFields.bankAccountShabaNumber}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankAccountShabaNumber'}
                                label={'شماره شبا'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.personnelFields.fullName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'fullName'}
                                label={'نام و نام خانوادگی مالک کارت'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AdditionalInformation;