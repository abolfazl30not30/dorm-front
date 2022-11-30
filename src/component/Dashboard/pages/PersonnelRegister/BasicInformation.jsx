import {Component} from "react";
import SimpleTextInput from "../../../CustomInputs/SimpleTextInput";
import BuildingContext from "../../../../contexts/Building";
import DateInput from "../../../CustomInputs/DateInput";
import {IconButton} from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import {Modal} from "react-bootstrap";

class BasicInformation extends Component{
    static contextType = BuildingContext;

    state = {
        types: [],
        tmpTypeInput: '',
        names: []
    }

    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>مشخصات اولیه</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.firstName_requiredReg}
                                value={this.context.personnelFields.firstName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'firstName'}
                                label={'نام'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.lastName_requiredReg}
                                value={this.context.personnelFields.lastName}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'lastName'}
                                label={'نام خانوادگی'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
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
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.placeOfIssue_requiredReg}
                                value={this.context.personnelFields.placeOfIssue}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'placeOfIssue'}
                                label={'محل صدور'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
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
                        <div className="input-group-register col-md-4 col-12">
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
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.address_requiredReg}
                                value={this.context.personnelFields.address}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'address'}
                                label={'محل سکونت'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
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
                        <div className="input-group-register col-md-4 col-12">
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
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.birthPlace_requiredReg}
                                value={this.context.personnelFields.birthPlace}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'birthPlace'}
                                label={'محل تولد'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <DateInput
                                condition1={this.context.personnelFieldsValidation.birthDate_requiredReg}
                                value={this.context.valueOfDates.personnel.birthDate}
                                valueFieldString={'personnel'}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'birthDate'}
                                required={true}
                                label={'تاریخ تولد'}
                                timeInclude={false}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <select
                                className={'input'}
                                value={this.context.personnelFields.gender}
                                onChange={(e) => this.context.handleFields(e.target.value, 'personnelFields', 'gender')}
                            >
                                <option value={'male'}>مرد</option>
                                <option value={'female'}>زن</option>
                            </select>
                            <label className="placeholder">جنسیت</label>
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
                                condition1={this.context.personnelFieldsValidation.postalCode_requiredReg}
                                condition4={this.context.personnelFieldsValidation.personnelFieldsValidation}
                                value={this.context.personnelFields.postalCode}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'postalCode'}
                                label={'کد پستی'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
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
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                condition1={this.context.personnelFieldsValidation.nationality_requiredReg}
                                value={this.context.personnelFields.nationality}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'nationality'}
                                label={'ملیت'}
                                required={true}
                            />
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <select
                                className={'input'}
                                value={this.context.personnelFields.maritalStatus}
                                onChange={(e) => this.context.handleFields(e.target.value, 'personnelFields', 'maritalStatus')}
                            >
                                <option value={'single'}>مجرد</option>
                                <option value={'married'}>متاهل</option>
                            </select>
                            <label className="placeholder">وضعیت تاهل</label>

                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <select className='input'
                                    value={this.context.personnelFields.religion}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'personnelFields', 'religion')}
                            >
                                <option value='islam'>اسلام</option>
                                <option value='christianity'>مسیحیت</option>
                                <option value='hinduism'>هندوئیسم</option>
                                <option value='buddhism'>آیین بودایی</option>
                                <option value='other'>سایر</option>
                            </select>
                            <label className="placeholder">دین</label>
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <SimpleTextInput
                                value={this.context.personnelFields.subReligion}
                                fieldNameString={'personnelFields'}
                                valueOfInputString={'subReligion'}
                                label={'مذهب'}
                            />
                        </div>
                        {/*<div className="input-group-register col-4">*/}
                        {/*    <SimpleTextInput*/}
                        {/*        value={this.context.personnelFields.health}*/}
                        {/*        fieldNameString={'personnelFields'}*/}
                        {/*        valueOfInputString={'health'}*/}
                        {/*        label={'وضعیت سلامت'}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="input-group-register col-md-4 col-12">
                            <select className='input'
                                    value={this.context.personnelFields.health}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'personnelFields', 'health')}
                            >
                                <option value='false'>خیر</option>
                                <option value='true'>بله</option>
                            </select>
                            <label className="placeholder">آیا بیماری خاصی دارید؟</label>
                        </div>
                        {
                            this.context.personnelFields.health === 'true' ? (
                                <>
                                    <div className="input-group-register col-12">
                                        <textarea
                                            className={`input form-control ${(this.context.personnelFieldsValidation.healthyStatus_requiredReg === false &&
                                                this.context.personnelFields.health === 'true') ? "is-invalid" : ""}`}
                                            value={this.context.personnelFields.healthyStatus}
                                            onChange={(e) =>  this.context.handleFields(e.target.value, 'personnelFields', 'healthyStatus')}
                                            placeholder=" "
                                        />
                                        <label className="placeholder" style={{right: (this.context.personnelFieldsValidation.healthyStatus_requiredReg === false &&
                                                this.context.personnelFields.health === 'true') ? '35px' : '12px'}}>
                                            توضیحات
                                            <span style={{color : 'red'}}>*</span>
                                        </label>

                                        {
                                            (this.context.personnelFieldsValidation.healthyStatus_requiredReg === false &&
                                                this.context.personnelFields.health === 'true')
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
                        <div className="input-group-register col-md-3 col-10">
                            <select className='input'
                                    style={{border: this.context.specificValidations.personnelFieldsValidation.type_requiredReg === false ? '2px solid red' : ''}}
                                    value={this.context.personnelFields.type}
                                    onChange={(e) =>  this.context.handleFields(e.target.value, 'personnelFields', 'type')}
                            >
                                <option selected="selected" value={''}/>
                                {
                                    this.state.names.map((t, index) => (
                                        <option value={t}>{t}</option>
                                    ))
                                }
                            </select>
                            <label className="placeholder">
                                نوع
                                <span style={{color: 'red'}}>*</span>
                            </label>
                            {
                                this.context.specificValidations.personnelFieldsValidation.type_requiredReg === false
                                ? <small className="text-danger">لطفا نوع را انتخاب کنید!</small>
                                    : null
                            }
                        </div>
                        <div className="col-md-1 col-2 d-flex align-item-center">
                            <IconButton color="primary" onClick={() => {
                                this.handleOpenAddModal();

                                // console.log(this.state.names);
                                // this.handleAddType();
                            }}>
                                <IoAddOutline size={30} width={'50%'} height={'50%'}/>
                            </IconButton>
                        </div>
                    </div>
                </div>

                <Modal centered={true} show={this.state.show} onHide={() => this.handleCloseAddModal()}>
                    <Modal.Header closeButton={true}>
                        اضافه کردن نوع
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className={`input form-control`}
                            onChange={(e) => this.setState({tmpTypeInput : e.target.value})}
                            placeholder='نوع'
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-success" onClick={(event) => {
                            if(this.handleIsValid(event)){
                                this.handleAddType();
                                this.handleCloseAddModal();

                            }
                        }}>ثبت
                        </button>

                        <button className="btn btn-light" onClick={() => {
                            this.handleCloseAddModal()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleIsValid = () => {
        let regCheck = /^\s*$/;

        let input_requiredReg = !regCheck.test(this.state.tmpTypeInput);

        return input_requiredReg;
    }

    handleOpenAddModal = () => {
        this.setState({show : true});
    }

    handleCloseAddModal = () => {
        this.setState({show : false});
    }

    handleAddNames = () => {
        for (let i = 0; i < this.state.types.length; i++) {
            let updatedNames = [...this.state.names];
            updatedNames.push(this.state.types[i].name);

            this.setState({names : updatedNames});
        }
    }

    componentDidMount = async () => {
        const response = await fetch(`https://api.saadatportal.com/api/v1/category/search?type=Personnel`).then((response) => response.json())
            .then((data) => {
                this.setState({types : data}, () => this.handleAddNames())
            });
    }

    handleAddType = () => {
        let updatedNames = [...this.state.names];
        updatedNames.push(this.state.tmpTypeInput);

        this.context.handleFields(this.state.tmpTypeInput, 'personnelFields', 'type')

        this.setState({names : updatedNames})
    }

}

export default BasicInformation;