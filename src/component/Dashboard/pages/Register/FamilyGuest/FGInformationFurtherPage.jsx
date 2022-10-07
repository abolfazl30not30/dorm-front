import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
class FGInformationFurtherPage extends Component {
    static contextType = BuildingContext;

    state = {  }
    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات تکمیلی</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationFurtherValidation.resident_tel_requiredReg}
                                condition2={this.context.familyGuestInformationFurtherValidation.resident_tel_telephoneReg}
                                value={this.context.familyGuestInformationFurther.resident_tel}
                                fieldNameString={'familyGuestInformationFurther'}
                                valueOfInputString={'resident_tel'}
                                required={true}
                                label={'شماره تماس اقامتگر'}
                            />
                        </div>
                        <div className="input-group-register col-12 col-md-4 my-2">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationFurtherValidation.home_tel_requiredReg}
                                condition3={this.context.familyGuestInformationFurtherValidation.home_tel_homeTelephoneReg}
                                value={this.context.familyGuestInformationFurther.home_tel}
                                fieldNameString={'familyGuestInformationFurther'}
                                valueOfInputString={'home_tel'}
                                required={true}
                                label={'شماره تلفن منزل'}
                            />
                        </div>
                        <div className="input-group-register col-12">
                            <SimpleTextInput
                                condition1={this.context.familyGuestInformationFurtherValidation.address_requiredReg}
                                value={this.context.familyGuestInformationFurther.address}
                                fieldNameString={'familyGuestInformationFurther'}
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

export  default FGInformationFurtherPage ;