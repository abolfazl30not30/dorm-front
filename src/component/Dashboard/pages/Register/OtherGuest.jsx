import React, { Component } from 'react';
import BuildingContext from "../../../../contexts/Building";

class OtherGuest extends Component {
    static contextType = BuildingContext;

    state = {  } 
    render() { 
        return (
            <>
                <div className="register-step-box">
                <h2>مهمان (متفرقه)</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.o_fullName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.o_fullName}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_fullName')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.o_fullName_requiredReg === false ? '35px' : '12px'}}>
                                نام و نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.o_fullName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.o_nationalCode_requiredReg &&
                                       this.context.specificValidations.o_nationalCode_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.o_nationalCode}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_nationalCode')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.specificValidations.o_nationalCode_requiredReg &&
                                    this.context.specificValidations.o_nationalCode_numberReg) === false ? '35px' : '12px'}}>
                                کد ملی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.o_nationalCode_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }
                            {
                                (this.context.specificValidations.o_nationalCode_numberReg === false &&
                                    this.context.specificValidations.o_nationalCode_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.o_certificateNumber_requiredReg &&
                                       this.context.specificValidations.o_certificateNumber_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.o_certificateNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_certificateNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.specificValidations.o_certificateNumber_requiredReg &&
                                    this.context.specificValidations.o_certificateNumber_numberReg) === false ? '35px' : '12px'}}>
                                شماره شناسنامه
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.o_certificateNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }
                            {
                                (this.context.specificValidations.o_certificateNumber_numberReg === false &&
                                    this.context.specificValidations.o_certificateNumber_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.fields.o_placeOfIssue}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_placeOfIssue')}
                                   placeholder=" "
                            />
                            <label className="placeholder">محل صدور</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.o_admissionStartDate_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.o_admissionStartDate}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_admissionStartDate')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.o_admissionStartDate_requiredReg === false ? '35px' : '12px'}}>تاریخ شروع پذیرش<span style={{color : 'red'}}>*</span></label>

                            {
                                this.context.specificValidations.o_admissionStartDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.o_admissionEndDate_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.o_admissionEndDate}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_admissionEndDate')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.o_admissionEndDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ اتمام پذیرش
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.o_admissionEndDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.fields.o_paymentDate}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_paymentDate')}
                                   placeholder=" "
                            />
                            <label className="placeholder">تاریخ پرداخت</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.o_rentPaymentAmount_numberReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.o_rentPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_rentPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.o_rentPaymentAmount_numberReg === false ? '35px' : '12px'}}>
                                مبلغ پرداخت اجاره
                            </label>

                            {
                                this.context.specificValidations.o_rentPaymentAmount_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.o_depositPaymentAmount_numberReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.o_depositPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_depositPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.o_depositPaymentAmount_numberReg === false ? '35px' : '12px'}}>
                                مبلغ پرداخت ودیعه
                            </label>

                            {
                                this.context.specificValidations.o_depositPaymentAmount_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.o_discountPaymentAmount_numberReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.o_discountPaymentAmount}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_discountPaymentAmount')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.o_discountPaymentAmount_numberReg === false ? '35px' : '12px'}}>
                                مبلغ پرداخت تخفیف
                            </label>

                            {
                                this.context.specificValidations.o_discountPaymentAmount_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.fields.o_birthDate}
                                   onChange={(e) =>  this.context.handleFields(e, 'o_birthDate')}
                                   placeholder=" "
                            />
                            <label className="placeholder">تاریخ تولد</label>    
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
 
export default OtherGuest;