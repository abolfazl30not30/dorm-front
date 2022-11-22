import {Component} from "react";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import {Modal} from "react-bootstrap";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import {MdDone} from "react-icons/md";
// import React from "@types/react";

import '../../../../style/registerPage.css';
import '../../../../style/paymentHistory.css';

class CameraHistoryPage extends Component {

    state = {
        validation: {
            title_requireReg: '',
            date_requiredReg: '',
            unit_requireReg: '',
            assignee_requireReg: '',
            unit_numberReg: '',
        },

        showModal: false,

        tmpRequest: {
            title: '',
            description: '',
            unit: '',
            date: '',
            supervisor: '1111111',
            assignee: '',
        },
        dateValue: '',
        data: []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8089/api/v1/cameraHistory').then((response) => response.json())
            .then((data) => this.setState({data: data}));
    }

    render() {
        return (
            <>

                <div className="back-btn">
                    <Link to="/dashboard">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>

                <div className="payment-history">
                    <div className={'d-flex flex-row justify-content-between aligns-item-center'}>

                        <h4>
                            تاریخچه عکس
                        </h4>

                        <div className={'d-flex'} style={{justifyContent: 'center'}}>
                            <button className={'btn-done'} onClick={() => {
                                this.handleOpenModal()
                            }}>
                                <MdDone className='ms-1'/>ثبت درخواست
                            </button>
                        </div>
                    </div>

                    <div className="row align-items-center ">
                        <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                        <div className="col-md-3 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                            <Form.Select aria-label="Default select example" style={{height: "50px", fontSize: "14px"}}
                                         value={this.state.searchType} onChange={(e) => {
                                this.setState({searchType: e.target.value})
                            }}>
                                <option value="fullName">نام درخواست کننده</option>
                                <option value="title">عنوان</option>
                            </Form.Select>
                        </div>
                        <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex"
                             style={{paddingRight: "0"}}>
                            <input type="text" id="inputSearch" className="input" placeholder="جسـتوجـو"
                                   style={{padding: "6px"}} onChange={(e) => {
                                this.handleSearchInput(e)
                            }}/>

                            <button className="btn outline-secondary"><BiSearch fontSize="25px"
                                                                                onClick={this.handleSearchBtn}/>
                            </button>

                        </div>
                    </div>

                    <div className={'table-box'}>

                        <table className='table'>

                            <thead>
                            <tr>
                                <th>#</th>
                                <th>عنوان</th>
                                <th>تاریخ</th>
                                <th>واحد</th>
                                <th>نام درخواست کننده</th>
                                <th>توضیحات</th>
                            </tr>
                            </thead>

                            <tbody>

                            {
                                this.state.data.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.title}</td>
                                        <td>{data.date.replace(" 00:00:00","")}</td>
                                        <td>{data.unit}</td>
                                        <td>{data.assignee}</td>
                                        <td>{data.description}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                    </div>
                </div>
                <Modal centered show={this.state.showModal} onHide={() => {
                    this.handleCloseModal();
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>درخواست جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={'d-flex flex-wrap row'}>
                            <div className={'col-12 input-group-register'}>
                                <input
                                    className={`input form-control mb-2 ${this.state.validation.title_requireReg === false ? "is-invalid" : ""}`}
                                    placeholder={' '}
                                    onChange={(e) =>
                                        this.handleInitializingTmpRequestFields(e, 'title')}
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.validation.title_requireReg === false ? '40px' : '20px'}}>
                                    عنوان
                                    <span style={{color: 'red'}}>*</span>
                                </label>
                                {
                                    this.state.validation.title_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }
                            </div>

                            <div className={'col-12 input-group-register'}>
                                <DatePicker
                                    format="ِِِِِِYYYY/MM/DD"
                                    inputClass={`input form-control mb-2 ${this.state.validation.date_requiredReg === false ? "is-invalid" : ""}`}
                                    value={this.state.dateValue}
                                    onChange={(value) => {this.handleDateValue(value)}}

                                    style={{
                                        width: "188%",
                                        // boxSizing: "border-box",
                                        // height: "26px"
                                    }}

                                    mapDays={({date}) => {
                                        let props = {}
                                        let isWeekend = [6].includes(date.weekDay.index)

                                        if (isWeekend)
                                            props.className = "highlight highlight-red";

                                        return props
                                    }}

                                    weekDays={
                                        [
                                            ["شنبه", "Sat"],
                                            ["یکشنبه", "Sun"],
                                            ["دوشنبه", "Mon"],
                                            ["سه شنبه", "Tue"],
                                            ["چهارشنبه", "Wed"],
                                            ["پنجشنبه", "Thu"],
                                            ["جمعه", "Fri"],
                                        ]
                                    }

                                    calendar={persian}
                                    locale={persian_fa}
                                >
                                    <button type="button" className={"btn btn-secondary mb-2"} onClick={() => {
                                        let updatedTmpRequest = {...this.state.tmpRequest};
                                        updatedTmpRequest.dateValue = '';
                                        updatedTmpRequest.date = '';
                                        this.setState({tmpRequest: updatedTmpRequest})
                                    }}>
                                        ریست
                                    </button>
                                </DatePicker>
                                <label className={'placeholder'}
                                       style={{right: this.state.validation.date_requiredReg === false ? '40px' : '20px'}}>
                                    تاریخ
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.validation.date_requiredReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }
                            </div>
                        </div>

                        <div className={'d-flex flex-wrap row'}>
                            <div className={'col-12 input-group-register'}>

                                <input
                                    className={`input form-control mb-2 ${this.state.validation.assignee_requireReg === false ? "is-invalid" : ""}`}
                                    placeholder={' '}
                                    onChange={(e) =>
                                        this.handleInitializingTmpRequestFields(e, 'assignee')}
                                />

                                <label className={'placeholder'}
                                       style={{right: this.state.validation.assignee_requireReg === false ? '40px' : '20px'}}>
                                    نام درخواست کننده
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.validation.assignee_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>

                            <div className={'col-12 input-group-register'}>
                                <input
                                    className={`input form-control mb-2 ${this.state.validation.unit_requireReg === false || this.state.validation.unit_numberReg === false ? "is-invalid" : ""}`}
                                    placeholder={' '}
                                    onChange={(e) =>
                                        this.handleInitializingTmpRequestFields(e, 'unit')}
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.validation.unit_requireReg === false || this.state.validation.unit_numberReg === false ? '40px' : '20px'}}>
                                    شماره واحد
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.validation.unit_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                                {
                                    this.state.validation.unit_numberReg === false
                                        ? <small
                                            className="text-danger">عدد وارد کنید!</small>
                                        : <div/>
                                }
                            </div>
                        </div>

                        <div className={'input-group-register'}>
                            <input
                                className={'input form-control'}
                                placeholder={' '}
                                onChange={(e) =>
                                    this.handleInitializingTmpRequestFields(e, 'description')}
                            />
                            <label className={'placeholder'} style={{right: '20px'}}>
                                توضیحات
                            </label>
                        </div>

                    </Modal.Body>

                    <Modal.Footer className="d-flex justify-content-start">
                        <button className="btn-done" onClick={() => {
                            if (this.handleIsValid()) {
                                this.handleSubmit();
                            }
                        }}>ثبت
                        </button>

                        <button className="btn btn-light" onClick={() => {
                            this.handleCloseModal()
                        }}>بستن

                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleOpenModal = () => {
        this.setState({showModal: true});

    }

    handleCloseModal = () => {
        this.setState({showModal: false});
    }

    handleSubmit = async () => {

        const rawResponse = await fetch('http://localhost:8089/api/v1/cameraHistory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(this.state.tmpRequest)
        });

        const response = await fetch('http://localhost:8089/api/v1/cameraHistory').then((response) => response.json())
            .then((data) => this.setState({data: data}));

        let tmpRequest = {
            title: '',
            description: '',
            unit: '',
            date: '',
            supervisor: '1111111',
            assignee: '',
        }

        let resetValidations = {...this.state.validation};
        resetValidations.assignee_requireReg = '';
        resetValidations.date_requiredReg = '';
        resetValidations.unit_requireReg = '';
        resetValidations.title_requireReg = '';

        this.setState({validation: resetValidations,tmpRequest:tmpRequest});
    }

    handleIsValid = () => {
        let regCheck = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;

        let updatedData = [...this.state.data];

        let title_requireReg = !regCheck.test(this.state.tmpRequest.title);
        let date_requiredReg = !regCheck.test(this.state.tmpRequest.date);
        let unit_requireReg = !regCheck.test(this.state.tmpRequest.unit);
        let unit_numberReg = numberReg.test(this.state.tmpRequest.unit);
        let assignee_requireReg = !regCheck.test(this.state.tmpRequest.assignee);

        if (title_requireReg && date_requiredReg && unit_requireReg && assignee_requireReg && unit_numberReg) {
            updatedData.push(this.state.tmpRequest);
            this.setState({data: updatedData});
        }


        this.handleValidations([title_requireReg, date_requiredReg, unit_requireReg, assignee_requireReg, unit_numberReg],
            ['title_requireReg', 'date_requiredReg', 'unit_requireReg', 'assignee_requireReg', 'unit_numberReg']);

        return title_requireReg && date_requiredReg && unit_requireReg && assignee_requireReg && unit_numberReg; // checking validations
    }

    handleValidations = (valueOfField, nameOfField) => {

        let updatedValidations = {...this.state.validation};

        for (let i = 0; i < valueOfField.length; i++) {
            updatedValidations[nameOfField[i]] = valueOfField[i];
        }

        this.setState({validation: updatedValidations});
    }

    handleDateValue=(value)=>{
        this.setState({dateValue : value});
        console.log(value)
        let date = new Date(value);
        let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()+" 00:00:00";

        let updateTmpRequest = {...this.state.tmpRequest};
        updateTmpRequest.date = convertDate;
        this.setState({tmpRequest: updateTmpRequest});

    }
    handleInitializingTmpRequestFields = (e, nameOfField) => {
        let updatedTmpRequest = {...this.state.tmpRequest};
        updatedTmpRequest[nameOfField] = e.target.value;
        this.setState({tmpRequest: updatedTmpRequest});
    }
}

export default CameraHistoryPage;