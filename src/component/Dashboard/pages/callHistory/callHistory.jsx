import React, {Component} from "react";
import '../../../../style/contacts.css'
import {BsSearch} from "react-icons/bs";
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
// import {DatePicker} from "react-persian-datepicker";
import DatePicker from "react-multi-date-picker";
import './../../../../style/requestPage.css'
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Button} from "@mui/material";

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
        dateValue: "",
        date: "",
        description: "",
        validations: {
            title_requiredReg: '',
            callerName_requiredReg: '',
            date_requiredReg: '',
            phoneNumber_requiredReg: '',
        },
        searchType:"title",
    }

    async componentDidMount() {
        const response = await fetch('https://api.saadatportal.com/api/v1/telephoneHistory').then((response) => response.json())
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
                    <div className="search-box">
                        <div className="form-floating">
                            <select className="form-select" id="floatingSelect"
                                    aria-label="Floating label select example"
                                    value={this.state.searchType}
                                    onChange={(value) => this.setState({searchType: value.target.value})}>
                                <option value="title">عنوان</option>
                                <option value="callerName">نام تماس گیرنده </option>
                                <option value="phoneNumber"> شماره تماس</option>
                            </select>
                            <label htmlFor="floatingSelect">براساس</label>
                        </div>
                        <input type="text"
                               id="inputSearch"
                               placeholder="جسـتجـو..."
                               onChange={(e) => {
                                   this.handleSearchInput(e)
                               }}/>
                        <div className="search-icon"><i className="bi bi-search"/></div>
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
                                   value={this.state.title}
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
                                   value={this.state.callerName}
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
                                   value={this.state.phoneNumber}
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

                            {/*<DatePicker calendarStyles={this.state.calStyles}*/}
                            {/*            inputFormat="jYYYY/jM/jD"*/}
                            {/*            className={`input form-control date-picker ${this.state.validations.date_requiredReg === false ? "is-invalid" : ""}`}*/}
                            {/*            onChange={(e) => {*/}
                            {/*                this.getValueInputDate(e)*/}
                            {/*            }}*/}
                            {/*/>*/}

                            <DatePicker
                                // fixMainPosition={false}
                                calendarPosition={`top`}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                format={`YYYY/MM/DD`}


                                containerStyle={{
                                    width: "100%"
                                }}

                                inputClass={`input form-control ${this.state.validations.date_requiredReg === false ? "is-invalid" : ""}`}
                                value={this.state.dateValue}
                                onChange={(value) => {
                                    this.getValueInputDate(value)
                                    this.setState({dateValue: value})
                                }}

                                mapDays={({ date }) => {
                                    let props = {}
                                    let isWeekend = [6].includes(date.weekDay.index)

                                    if (isWeekend)
                                        props.className = "highlight highlight-red";

                                    return props
                                }}

                                // placeholder={' '}

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
                                <Button
                                    onClick={() => this.setState({dateValue: '', date: ''})}
                                >
                                    ریست
                                </Button>
                            </DatePicker>

                            <label className='placeholder' style={{right: this.state.validations.date_requiredReg === false ? '35px' : '12px'}}>
                                تاریخ
                                <span style={{color: 'red'}}>*</span>
                            </label>
                        </div>
                        <div className='input-group-register mb-3'>
                            <textarea value={this.state.description} className='input form-control' onChange={(e) => {
                                this.getValueInputDescription(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>توضیحات</label>
                        </div>

                        <button className='btn-done w-100' onClick={() => {
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

        this.setState({
            title: "",
            callerName: "",
            phoneNumber: "",
            dateValue: "",
            date: "",
            description: "",
        })
        this.setState({validations: {
                title_requiredReg: '',
                callerName_requiredReg: '',
                date_requiredReg: '',
                phoneNumber_requiredReg: '',
            }})
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
        let day = e.day < 10 ? ('0' + e.day) : e.day;
        let month = e.month < 10 ? ('0' + e.month) : e.month;

        let date = e.year + '/' + month + '/' + day;
        // let date = new Date(e._d);
        // let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()+" 00:00:00";
        this.setState({date: date})
    }
    getValueInputDescription = (e) => {
        this.setState({description: e})
    }

    handleValidations = () => {
        let requiredReg = /^\s*$/;

        let title_requiredReg = !requiredReg.test(this.state.title);
        let callerName_requiredReg = !requiredReg.test(this.state.callerName);
        let date_requiredReg = !requiredReg.test(this.state.dateValue);
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

        const rawResponse = await fetch('https://api.saadatportal.com/api/v1/telephoneHistory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCall)
        });

        const response = await fetch('https://api.saadatportal.com/api/v1/telephoneHistory').then((response) => response.json())
            .then((data) => this.setState({callHistory : data}));

        // this.setState({show: false})
        this.setState({title:"",callerName:"",phoneNumber:"",date:"",description:""})
    }

    handleSearchInput = async (e) =>{
        const value = e.target.value;
        this.setState({searchInput:value});
        const response = await fetch(`https://api.saadatportal.com/api/v1/telephoneHistory/search?${this.state.searchType}=${e.target.value}`).then((response) => response.json())
            .then((data) => this.setState({callHistory: data}));
    }
}

export default callHistory;