import React, { Component } from 'react'
import "../../../../style/registerPage.css"
import BuildingContext from "../../../../contexts/Building";
class InformationPage extends Component {
    static contextType = BuildingContext;

    state = { 
        haveWife: 'single',
        sickness: 'false'
     } 
    getStatus = (e) => {
        const status = e.target.value;
        this.setState({haveWife: status})
    }
    sickness = (e) => {
        const status = e.target.value;
        this.setState({sickness: status})
    }
    render() { 
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.c_firstName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_firstName}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_firstName')}
                                   placeholder=" "
                                   name='admission_start_date'
                            />
                            <label className="placeholder"  style={{right: this.context.specificValidations.c_firstName_requiredReg === false ? '35px' : '12px'}}>
                                نام
                                <span style={{color : 'red'}}>*</span></label>

                            {
                                this.context.specificValidations.c_firstName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.c_lastName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_lastName}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_lastName')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.c_lastName_requiredReg === false ? '35px' : '12px'}}>
                                نام خانوادگی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.c_lastName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.fields.c_nickName}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_nickName')}
                                   placeholder=" "
                            />
                            <label className="placeholder">نام مستعار</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.c_nationalCode_requiredReg &&
                                       this.context.specificValidations.c_nationalCode_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_nationalCode}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_nationalCode')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.specificValidations.c_nationalCode_requiredReg &&
                                    this.context.specificValidations.c_nationalCode_numberReg) === false ? '35px' : '12px'}}>
                                کد ملی
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.c_nationalCode_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.specificValidations.c_nationalCode_numberReg === false && this.context.specificValidations.c_nationalCode_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${(this.context.specificValidations.c_certificateNumber_requiredReg &&
                                       this.context.specificValidations.c_certificateNumber_numberReg) === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_certificateNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_certificateNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: (this.context.specificValidations.c_certificateNumber_requiredReg &&
                                    this.context.specificValidations.c_certificateNumber_numberReg) === false ? '35px' : '12px'}}>
                                شماره شناسنامه
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.c_certificateNumber_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                            {
                                (this.context.specificValidations.c_certificateNumber_numberReg === false && this.context.specificValidations.c_certificateNumber_requiredReg === true)
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.c_placeOfIssue_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_placeOfIssue}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_placeOfIssue')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.c_placeOfIssue_requiredReg === false ? '35px' : '12px'}}>
                                محل صدور
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.c_placeOfIssue_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.c_birthDate_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_birthDate} // فعلا فقط required
                                   onChange={(e) =>  this.context.handleFields(e, 'c_birthDate')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.c_birthDate_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ تولد
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.c_birthDate_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.c_nationality_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_nationality}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_nationality')}
                                   placeholder=" "
                            />
                            <label className="placeholder"  style={{right: this.context.specificValidations.c_nationality_requiredReg === false ? '35px' : '12px'}}>
                                ملیت
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.c_nationality_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.c_fatherName_requiredReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_fatherName}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_fatherName')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.c_fatherName_requiredReg === false ? '35px' : '12px'}}>
                                نام پدر
                                <span style={{color : 'red'}}>*</span>
                            </label>

                            {
                                this.context.specificValidations.c_fatherName_requiredReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['required']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <select className='input '>
                                <option>اسلام</option>
                                <option>مسیحیت</option>
                                <option>هندوئیسم</option>
                                <option>آیین بودایی</option>
                                <option>فاقد دین</option>
                            </select>
                            <label className="placeholder">دین</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.fields.c_subReligion}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_subReligion')}
                                   placeholder=" "
                            />
                            <label className="placeholder">مذهب</label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.fields.c_university}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_university')}
                                   placeholder=" "
                            />
                            <label className="placeholder">دانشگاه محل تحصیل</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control ${this.context.specificValidations.c_studentNumber_numberReg === false ? "is-invalid" : ""}`}
                                   value={this.context.fields.c_studentNumber}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_studentNumber')}
                                   placeholder=" "
                            />
                            <label className="placeholder" style={{right: this.context.specificValidations.c_studentNumber_numberReg === false ? '35px' : '12px'}}>شماره دانشجویی</label>

                            {
                                this.context.specificValidations.c_studentNumber_numberReg === false
                                    ? <small
                                        className="text-danger">{this.context.errors['numberRequired']}</small>
                                    : <div/>
                            }

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className={`input form-control`}
                                   value={this.context.fields.c_fatherJob}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_fatherJob')}
                                   placeholder=" "
                            />
                            <label className="placeholder">شغل پدر</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'
                                    name='maritalStatus'
                                    onChange={(e) => {this.context.handleFields(e, 'c_maritalStatus');}}>
                                <option value='single' >مجرد</option>
                                <option value='married'>متاهل</option>
                                <option value='divorced'>متارکه</option>
                            </select>
                            <label className="placeholder">وضعیت تاهل</label>    
                        </div>
                        {
                           this.context.fields.c_maritalStatus === 'married' ? (
                            <>
                                <div className="input-group-register col-4">
                                    <input type="text"
                                           className={`input form-control ${(this.context.specificValidations.c_spouseFullName_requiredReg === false &&
                                               this.context.fields.c_maritalStatus === 'married') ? "is-invalid" : ""}`}
                                           value={this.context.fields.c_spouseFullName}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_spouseFullName')}
                                           placeholder=" "
                                    />
                                    <label className="placeholder" style={{right: (this.context.specificValidations.c_spouseFullName_requiredReg === false &&
                                            this.context.fields.c_maritalStatus === 'married') ? '35px' : '12px'}}>
                                        نام و نام خانوادگی همسر
                                        <span style={{color : 'red'}}>*</span>
                                    </label>

                                    {
                                        (this.context.specificValidations.c_spouseFullName_requiredReg === false && this.context.fields.c_maritalStatus === 'married')
                                            ? <small
                                                className="text-danger">{this.context.errors['required']}</small>
                                            : <div/>
                                    }

                                </div>
                                <div className="input-group-register col-4">
                                    <input type="text"
                                           className={`input form-control`}
                                           value={this.context.fields.c_spouseJob}
                                   onChange={(e) =>  this.context.handleFields(e, 'c_spouseJob')}
                                           placeholder=" "
                                    />
                                    <label className="placeholder">شغل همسر</label>    
                                </div>
                            </>
                           ) : (
                            <></>
                           )
                        }
                        <div className="input-group-register col-4">
                            <select className='input'
                                    onChange={(e) => this.context.handleFields(e, 'c_health')}>
                                <option value='false'>خیر</option>
                                <option value='true'>بله</option>
                            </select>
                            <label className="placeholder">آیا بیماری خاصی دارید؟</label>    
                        </div>
                        {
                            this.context.fields.c_health === 'true' ? (
                                <>
                                    <div className="input-group-register col-12">
                                        <textarea
                                            className={`input form-control ${(this.context.specificValidations.c_healthDescription_requiredReg === false &&
                                                this.context.fields.c_health === 'true') ? "is-invalid" : ""}`}
                                                  value={this.context.fields.c_healthDescription}
                                                  onChange={(e) => this.context.handleFields(e, 'c_healthDescription')}
                                            placeholder=" "
                                        />
                                        <label className="placeholder" style={{right: (this.context.specificValidations.c_healthDescription_requiredReg === false &&
                                                this.context.fields.c_health === 'true') ? '35px' : '12px'}}>
                                            توضیحات
                                            <span style={{color : 'red'}}>*</span>
                                        </label>

                                        {
                                            (this.context.specificValidations.c_healthDescription_requiredReg === false &&
                                                this.context.fields.c_health === 'true')
                                                ? <small
                                                    className="text-danger">{this.context.errors['required']}</small>
                                                : <div/>
                                        }

                                    </div>
                                </>
                               ) : (
                                <></>
                               )
                        }
                    </div>
                </div>
            </>
        );
    }
}
 
export  default InformationPage ;