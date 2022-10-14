import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
class OGInformationFurtherPage extends Component {
    static contextType = BuildingContext;

    state = {  }
    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات تکمیلی</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-6">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationFurtherValidation.resident_tel_requiredReg}
                                condition2={this.context.otherGuestInformationFurtherValidation.resident_tel_telephoneReg}
                                value={this.context.otherGuestInformationFurther.phoneNumber}
                                fieldNameString={'otherGuestInformationFurther'}
                                valueOfInputString={'resident_tel'}
                                required={true}
                                label={'شماره تماس اقامتگر'}
                            />
                        </div>
                        <div className="input-group-register col-6">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationFurtherValidation.home_tel_requiredReg}
                                condition3={this.context.otherGuestInformationFurtherValidation.home_tel_homeTelephoneReg}
                                value={this.context.otherGuestInformationFurther.telephoneNumber}
                                fieldNameString={'otherGuestInformationFurther'}
                                valueOfInputString={'home_tel'}
                                required={true}
                                label={'شماره تلفن منزل'}
                            />
                        </div>
                        <div className="input-group-register col-12">
                            <SimpleTextInput
                                condition1={this.context.otherGuestInformationFurtherValidation.address_requiredReg}
                                value={this.context.otherGuestInformationFurther.address}
                                fieldNameString={'otherGuestInformationFurther'}
                                valueOfInputString={'address'}
                                required={true}
                                label={'آدرس محل سکونت'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export  default OGInformationFurtherPage ;