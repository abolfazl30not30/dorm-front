import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
class FGInformationFurtherPage extends Component {
    static contextType = BuildingContext;

    state = {  }
    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات تکمیلی</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-6">
                            <input type="text"
                                   className={`input form-control ${(this.context.familyGuestInformationFurtherValidation.resident_tel_telephoneReg &&
                                       this.context.familyGuestInformationFurtherValidation.resident_tel_requiredReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.familyGuestInformationFurther.resident_tel}
                                   onChange={(e) =>  this.context.handleFields(e, 'familyGuestInformationFurther', 'resident_tel')}
                                   placeholder=" "/>
                            <label className="placeholder" style={{right: (this.context.familyGuestInformationFurtherValidation.resident_tel_telephoneReg &&
                                    this.context.familyGuestInformationFurtherValidation.resident_tel_requiredReg) === false ? '35px' : '12px'}}>
                                شماره تماس اقامتگر
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationFurtherValidation.resident_tel_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.familyGuestInformationFurtherValidation.resident_tel_telephoneReg === false &&
                                    this.context.familyGuestInformationFurtherValidation.resident_tel_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['telephoneRegex']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-6">
                            <input type="text"
                                   className={`input form-control ${(this.context.familyGuestInformationFurtherValidation.home_tel_requiredReg &&
                                       this.context.familyGuestInformationFurtherValidation.home_tel_telephoneReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.familyGuestInformationFurther.home_tel}
                                   onChange={(e) =>  this.context.handleFields(e, 'familyGuestInformationFurther', 'home_tel')}
                                   placeholder=" "/>
                            <label className="placeholder"
                                   style={{right: (this.context.familyGuestInformationFurtherValidation.home_tel_requiredReg &&
                                           this.context.familyGuestInformationFurtherValidation.home_tel_telephoneReg) === false ? '35px' : '12px'}}>
                                شماره تلفن منزل
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationFurtherValidation.home_tel_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.familyGuestInformationFurtherValidation.home_tel_telephoneReg === false && this.context.familyGuestInformationFurtherValidation.home_tel_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['homeTelephoneReg']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-12">
                            <input type="text"
                                   className={`input form-control ${this.context.familyGuestInformationFurtherValidation.address_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.familyGuestInformationFurther.address}
                                   onChange={(e) =>  this.context.handleFields(e, 'familyGuestInformationFurther', 'address')}
                                   placeholder=" "/>
                            <label className="placeholder"
                                   style={{right: this.context.familyGuestInformationFurtherValidation.address_requiredReg === false ? '35px' : '12px'}}>
                                آدرس محل سکونت <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.familyGuestInformationFurtherValidation.address_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export  default FGInformationFurtherPage ;