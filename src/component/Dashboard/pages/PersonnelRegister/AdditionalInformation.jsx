import React, {Component} from "react";
import BuildingContext from "../../../../contexts/Building";
import SimpleTextInput from "../../../CustomInputs/SimpleTextInput";

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
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.education_requiredReg}
                                value={this.context.personnelFields.education}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'education'}
                                label={'تحصیلات'}
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
                                condition1={this.context.personnelFieldsValidation.bankAccountOwnerName_requiredReg}
                                value={this.context.personnelFields.bankAccountOwnerName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'bankAccountOwnerName'}
                                label={'نام مالک حساب'}
                                required={true}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AdditionalInformation;