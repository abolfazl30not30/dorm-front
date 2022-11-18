import React, {Component} from "react";
import '../../../../style/contacts.css'
import {BsSearch} from "react-icons/bs";
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import {DatePicker} from "react-persian-datepicker";
import './../../../../style/requestPage.css'

class callHistory extends Component {
    state = {
        calStyles : {
            calendarContainer: "calendarContainer",
            dayPickerContainer: "dayPickerContainer",
            monthsList: "monthsList",
            daysOfWeek: "daysOfWeek",
            dayWrapper: "dayWrapper",
            selected: "selected",
            heading: "heading",
            next: "next",
            prev: "prev",
            title: "title",
        },
        callHistory: [],
        show: false,
        title: "",
        callerName: "",
        phoneNumber: "",
        date: "",
        description: "",
        validations: {
            title_requiredReg: '',
            callerName_requiredReg: '',
            date_requiredReg: '',
            phoneNumber_requiredReg: '',
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8089/api/v1/telephoneHistory').then((response) => response.json())
            .then((data) => this.setState({callHistory : data}));
    }

    render() {
        return (
            <>
                <div className="contact">
                    <div className="title">تاریخچه تماس ها</div>
                    <button className='btn-done my-4' onClick={() => {
                        this.handleShow()
                    }}><AiOutlinePlus className='ms-2'/>افزودن
                    </button>
                    <div className="row align-items-center">
                        <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                        <div className="col-md-3 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                            <Form.Select aria-label="Default select example" style={{height:"50px",fontSize:"14px"}} value={this.state.searchType} onChange={(e)=>{this.setState({searchType:e.target.value})}}>
                                <option value="fullName">نام و نام خانوادگی</option>
                                <option value="nationalCode">شماره همراه</option>
                                <option value="phoneNumber"> تلفن ثابت</option>
                            </Form.Select>
                        </div>
                        <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex" style={{paddingRight: "0"}}>
                            <input type="text" id="inputSearch" className="input" placeholder="جسـتوجـو" style={{padding:"6px"}} onChange={(e)=>{this.handleSearchInput(e)}}/>
                            <button className="btn outline-secondary"><BiSearch fontSize="25px" onClick={this.handleSearchBtn}/>
                            </button>
                        </div>
                    </div>
                    <div className="table-box">
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>عنوان</th>
                                <th>نام تماس گیرنده</th>
                                <th>شماره تماس</th>
                                <th>تاریخ</th>
                                <th>توضیحات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.callHistory.map((i) => (
                                    <tr>
                                        <td>{i.title}</td>
                                        <td>{i.callerName}</td>
                                        <td>{i.phoneNumber}</td>
                                        <td>{i.date}</td>
                                        <td>{i.description}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal className='report-modal' centered show={this.state.show} onHide={
                    () => this.handleClose()
                }>
                    <Modal.Header closeButton>
                        <Modal.Title><span>ثبت تماس</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='input-group-register mb-3'>
                            <input type='text'
                                   className={`input form-control ${this.state.validations.title_requiredReg === false ? "is-invalid" : ""}`}
                                   onChange={(e) => {
                                this.getValueInputTitle(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>
                                عنوان
                                <span style={{color: 'red'}}>*</span>
                            </label>
                        </div>
                        <div className='input-group-register mb-3'>
                            <input type='text'
                                   className={`input form-control ${this.state.validations.callerName_requiredReg === false ? "is-invalid" : ""}`}
                                   onChange={(e) => {
                                this.getValueInputCallerName(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>
                                نام تماس گیرنده
                                <span style={{color: 'red'}}>*</span>
                            </label>
                        </div>
                        <div className='input-group-register mb-3'>
                            <input type='text'
                                   className={`input form-control ${this.state.validations.phoneNumber_requiredReg === false ? "is-invalid" : ""}`}
                                   onChange={(e) => {
                                this.getValueInputPhoneNumber(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>
                                شماره تماس
                                <span style={{color: 'red'}}>*</span>
                            </label>
                        </div>
                        <div className='input-group-register mb-3'>
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className={`input form-control date-picker ${this.state.validations.date_requiredReg === false ? "is-invalid" : ""}`}
                                        onChange={(e) => {
                                            this.getValueInputDate(e)
                                        }}
                            />
                            <label className='placeholder' style={{right: this.state.validations.date_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ
                                <span style={{color: 'red'}}>*</span>
                            </label>
                        </div>
                        <div className='input-group-register mb-3'>
                            <textarea className='input form-control' onChange={(e) => {
                                this.getValueInputDescription(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>توضیحات</label>
                        </div>

                        {/*{
                            this.state.inputTelephone.map((telephone, index) => (
                                <div className='input-group-register mb-3'>
                                    <AiOutlineClose className='btn-delete-input' onClick={() => {this.deleteInputTelephone(index)}}/>
                                    <input type='text' className='input form-control' onChange={(e) => {
                                        this.getValueInputTelephone(e.target.value, index+1)
                                    }}/>
                                    <label className="placeholder" style={{right: '12px'}}>تلفن ثابت</label>
                                </div>
                            ))
                        }
                        <div className="add-input-contact mb-3" onClick={() => {
                            this.addInputTelephoneNumbers()
                        }}>
                            <AiOutlinePlus className='ms-2'/>
                        </div>



                        <div className='input-group-register mb-3'>
                            <input type='text' className='input form-control' onChange={(e) => {
                                this.getValueInputMobile(e.target.value,0)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>تلفن همراه</label>
                        </div>
                        {
                            this.state.inputMobile.map((mobile, index) => (
                                <div className='input-group-register mb-3'>
                                    <AiOutlineClose className='btn-delete-input' onClick={() => {this.deleteInputMobile(index)}}/>
                                    <input type='text' className='input form-control' onChange={(e) => {
                                        this.getValueInputMobile(e.target.value, index+1)
                                    }}/>
                                    <label className="placeholder" style={{right: '12px'}}>تلفن همراه</label>
                                </div>
                            ))
                        }
                        <div className="add-input-contact mb-3" onClick={() => {
                            this.addInputMobileNumbers()
                        }}>
                            <AiOutlinePlus className='ms-2'/>
                        </div>*/}

                        <button className='btn btn-record-contact' onClick={() => {
                            if (this.handleValidations()) {
                                this.handleRecordContact();
                                this.handleClose();
                            }
                        }}>ثبت
                        </button>



                    </Modal.Body>
                </Modal>
            </>
        );
    }

    handleClose = () => {
        this.setState({show: false})
    };
    handleShow = () => {
        this.setState({show: true})
    };

    getValueInputTitle = (e) => {
        this.setState({title: e})
    }
    getValueInputCallerName = (e) => {
        this.setState({callerName: e})
    }
    getValueInputPhoneNumber = (e) => {
        this.setState({phoneNumber: e})
    }
    getValueInputDate = (e) => {
        let date = new Date(e._d);
        let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()+" 00:00:00";
        this.setState({date: convertDate})
    }
    getValueInputDescription = (e) => {
        this.setState({description: e})
    }

    handleValidations = () => {
        let requiredReg = /^\s*$/;

        let title_requiredReg = !requiredReg.test(this.state.title);
        let callerName_requiredReg = !requiredReg.test(this.state.callerName);
        let date_requiredReg = !requiredReg.test(this.state.date);
        let phoneNumber_requiredReg = !requiredReg.test(this.state.phoneNumber);

        let updatedValidations = {...this.state.validations};
        updatedValidations.title_requiredReg = title_requiredReg;
        updatedValidations.callerName_requiredReg = callerName_requiredReg;
        updatedValidations.date_requiredReg = date_requiredReg;
        updatedValidations.phoneNumber_requiredReg = phoneNumber_requiredReg;
        this.setState({validations : updatedValidations});

        return title_requiredReg && callerName_requiredReg && date_requiredReg && phoneNumber_requiredReg;
    }

    handleRecordContact = async () => {

        const newCall = {
            title : this.state.title,
            callerName: this.state.callerName,
            phoneNumber: this.state.phoneNumber,
            date: this.state.date,
            description: this.state.description
        }




        const rawResponse = await fetch('http://localhost:8089/api/v1/telephoneHistory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCall)
        });

        const response = await fetch('http://localhost:8089/api/v1/telephoneHistory').then((response) => response.json())
            .then((data) => this.setState({callHistory : data}));

        // this.setState({show: false})
        this.setState({title:"",callerName:"",phoneNumber:"",date:"",description:""})
    }
}

export default callHistory;