import React, {Component} from "react";
import '../../../../style/contacts.css'
import {AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import DatePicker from "react-multi-date-picker";
import './../../../../style/requestPage.css'
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Box, Button, CircularProgress, MenuItem, Select} from "@mui/material";
import {green} from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

class callHistory extends Component {
    state = {
        searchLoading: true,
        loading: false,
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
        axios.get('https://api.saadatportal.com/api/v1/supervisor/telephoneHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                callHistory: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/telephoneHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    callHistory: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/telephoneHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    callHistory: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
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
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#f9f9f9"}}
                                    id="select-field"
                                    value={this.state.searchType}
                                    onChange={(value) => this.setState({searchType: value.target.value})}>
                                    <MenuItem value={"title"}> عنوان</MenuItem>
                                    <MenuItem value={"callerName"}>نام تماس گیرنده</MenuItem>
                                    <MenuItem value={"phoneNumber"}>شماره تماس</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0',
                                    padding: '0 .4rem -0.4rem',
                                    opacity: '1',
                                }}>براساس</label>
                            </FormControl>
                        </div>
                        <div className="d-flex flex-row input-search">
                            <input type="text"
                                   id="inputSearch"
                                   placeholder="جسـتجـو..."
                                   onChange={(e) => {
                                       this.handleSearchInput(e)
                                   }}/>
                            <div className="search-icon"><i className="bi bi-search"/></div>
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
                                this.state.searchLoading ?
                                    [...Array(5)].map((x, i) =>
                                        <tr>
                                            <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                         </tr>
                                        )
                                    :
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
                            <label className="placeholder" style={{
                                top: '-5px',
                                fontSize: "0.9rem",
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                padding: '0 .4rem',
                                opacity: '1',

                            }}>
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
                            <label className="placeholder" style={{
                                top: '-5px',
                                fontSize: "0.9rem",
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                padding: '0 .4rem',
                                opacity: '1',

                            }}>
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
                            <label className="placeholder" style={{
                                top: '-5px',
                                fontSize: "0.9rem",
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                padding: '0 .4rem',
                                opacity: '1',

                            }}>
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
                            <label className="placeholder" style={{
                                top: '-5px',
                                fontSize: "0.9rem",
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                padding: '0 .4rem',
                                opacity: '1',
                            }}>تاریخ <span style={{color: 'red'}}>*</span></label>
                        </div>
                        <div className='input-group-register mb-3'>
                            <textarea value={this.state.description} className='input form-control' onChange={(e) => {
                                this.getValueInputDescription(e.target.value)
                            }}/>
                            <label className="placeholder" style={{
                                top: '-5px',
                                fontSize: "0.9rem",
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                padding: '0 .4rem',
                                opacity: '1',

                            }}>توضیحات</label>
                        </div>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone w-100"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={() => {
                                    if (this.handleValidations()) {
                                        this.handleRecordContact();
                                    }
                                }}
                            >
                                ثبت
                            </Button>
                            {this.state.loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
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

        this.setState({loading: true})
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/telephoneHistory', newCall, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                loading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/telephoneHistory', newCall, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/telephoneHistory', newCall, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})

        this.setState({title:"", callerName:"", phoneNumber:"", date:"", description:""})
        this.handleClose();
        this.componentDidMount()
    }

    handleSearchInput = async (e) =>{
        const value = e.target.value;
        this.setState({searchInput: value, searchLoading: true});
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/telephoneHistory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                callHistory: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/telephoneHistory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    callHistory: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/telephoneHistory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    callHistory: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }
}

export default callHistory;