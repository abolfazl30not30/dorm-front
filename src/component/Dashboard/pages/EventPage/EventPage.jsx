import React, {Component} from "react";
import {Calendar} from "react-multi-date-picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import '../../../../style/EventPageStyle.css';
import {Modal} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {Box, Button, CircularProgress} from "@mui/material";
import {green} from "@mui/material/colors";
import axios from "axios";

class EventPage extends Component {

    state = {
        loading: false,
        year: 'default', // number format
        month: 'default', // number format
        day: 'default', // number format

        tempEventName: '',
        tempEventDescription: '',
        showType: false, // for Modal

        value: 'default',
        dayOfYear: 'default',

        isHoliday: '',
        holidaysOfMonth: [],

        eventsFromAPI: [],
        customEvents: []
    }

    render() {
        return (
            <>
                <div className='d-flex flex-column'>
                    <div className="d-flex flex-row-reverse justify-content-between align-content-center w-100">
                        <div className="back-btn">
                            <Link to="/dashboard">
                                بازگشت
                                <i className="bi bi-caret-left-fill"/>
                            </Link>
                        </div>
                        <div>
                            <h4>
                                تقویم
                            </h4>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-1">
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={true}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />


                        <div className="d-flex flex-md-row flex-column">
                            <div className="col-md-6 col-12 p-2 text-center">
                                <div className='d-flex justify-content-center'>
                                    <Calendar
                                        value={this.state.value}
                                        onChange={(value) => this.handleCalendarVar(value)}

                                        mapDays={({date}) => {
                                            // console.log(1)
                                            // this.handleHolidaysFromAPI(date.year, date.month.number, date.day, date);
                                            let props = {}

                                            let isWeekend = [6].includes(date.weekDay.index);

                                            for (let i = 0; i < this.state.customEvents.length; i++) {
                                                let day = parseInt(date.day) < 10 ? ('0' + parseInt(date.day)) : parseInt(date.day);
                                                let month = (parseInt(date.month) < 10 ? ('0' + parseInt(date.month)) : parseInt(date.month));

                                                let tmpFormatDate = date.year + '/' + month + '/' + day;

                                                // console.log(tmpFormatDate)

                                                if (this.state.customEvents[i].date === tmpFormatDate) {
                                                    // props.className = "highlight highlight-green";
                                                    props.className += " border border-success border-1";
                                                }
                                            }

                                            // console.log(date.month.number)

                                            for (let i = 0; i < this.state.holidaysOfMonth.length; i++) {
                                                if (this.state.holidaysOfMonth[i].year === date.year && this.state.holidaysOfMonth[i].month === date.month.number && this.state.holidaysOfMonth[i].day === date.day) {
                                                    props.className += " highlight highlight-red";
                                                }
                                            }

                                            // console.log(this.state.holidaysOfMonth)

                                            if (isWeekend)
                                                props.className += " highlight highlight-red";

                                            return props
                                        }}

                                        plugins={[
                                            <DatePickerHeader position="left"/>
                                        ]}

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
                                        months={[
                                            ["فروردین", "فروردین"],
                                            ["اردیبهشت", "اردیبهشت"],
                                            ["خرداد", "خرداد"],
                                            ["تیر", "تیر"],
                                            ["مرداد", "مرداد"],
                                            ["شهریور", "شهریور"],
                                            ["مهر", "مهر"],
                                            ["آبان", "آبان"],
                                            ["آذر", "آذر"],
                                            ["دی", "دی"],
                                            ["بهمن", "بهمن"],
                                            ["اسفند", "اسفند"]
                                        ]}
                                        calendar={persian}
                                        locale={persian_fa}
                                    >
                                        <button
                                            className={' btn btn-lg'}
                                            onClick={() => {
                                                this.setState({value: new Date()});
                                                console.log(this.state.value)
                                            }}
                                        >
                                            برو به امروز
                                        </button>

                                    </Calendar>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 p-2">
                                <div className='d-flex justify-content-center h-100'>
                                    <div className={'eventDay'}>
                                        <div style={{textAlign: 'center'}}>
                                            <h6 className={'mt-3'}>
                                                مناسبت های روز
                                            </h6>
                                        </div>
                                        <ul className="p-2">
                                            {
                                                this.state.eventsFromAPI.map((event, key) => (
                                                    <li key={key} className={'p-1'}
                                                        style={{fontSize: "10px"}}>{event.description}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="event-list">
                                <div className="d-flex flex-row justify-content-between">
                                    <div className='title'>رویداد های من</div>
                                    <button className={'btn-done'}
                                            onClick={() => {
                                                this.handleOpenType();
                                                this.setState({tempInputForModal: ''})
                                            }}>
                                        اضافه کردن رویداد
                                    </button>
                                </div>
                                <div className="table-box">
                                    <table className='table mt-4'>
                                        <thead>
                                        <tr>

                                            <th>نام</th>
                                            <th>تاریخ</th>
                                            <th>توضیحات</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.customEvents.map((event, key) => {
                                                let day = parseInt(this.state.day) < 10 ? ('0' + parseInt(this.state.day)) : parseInt(this.state.day);
                                                let month = (parseInt(this.state.month) < 10 ? ('0' + parseInt(this.state.month)) : parseInt(this.state.month));
                                                let tmpFormatDate = this.state.year + '/' + month + '/' + day;


                                                return (event.date === tmpFormatDate) ?
                                                    <>
                                                        <tr key={key}>
                                                            <td>{event.eventName}</td>
                                                            <td>{event.date}</td>
                                                            <td>{event.eventDescription}</td>
                                                        </tr>
                                                    </> :
                                                    null
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <Modal centered show={this.state.showType} onHide={() => {
                    if (!this.state.loading) {
                        this.handleCloseType()
                    }
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن رویداد جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <div className="input-group-register col-12">
                            <input type='text'
                                   className='form-control input'
                                   onChange={(e) => this.handleEventName(e)}
                                   placeholder=" "/>
                            <label className="placeholder">نام رویداد</label>
                        </div>
                        <div className="input-group-register col-12">
                                <textarea
                                    className="input form-control"
                                    onChange={(e) => this.handleEventDescription(e)}
                                    placeholder=" "
                                >
                                </textarea>
                            <label className="placeholder">توضیحات</label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone"}
                                variant="contained"
                                // sx={{
                                //     backgroundColor: "#20d489",
                                //     color: "black",
                                //     ":hover": {backgroundColor: "#198754", color: "white"}
                                // }}
                                disabled={this.state.loading}
                                onClick={(event) => {
                                    this.handleSubmitType(event)
                                }}>
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
                        <button className="btn btn-light" disabled={this.state.loading} onClick={() => {
                            this.handleCloseType()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleOpenType = () => {
        this.setState({showType: true});
    }

    handleCloseType = () => {
        this.setState({showType: false});
    }

    handleEventName = (e) => {
        this.setState({tempEventName: e.target.value});
    }

    handleEventDescription = (e) => {
        this.setState({tempEventDescription: e.target.value});
    }

    handleSubmitType = async (e) => {
        e.preventDefault();
        let regCheck = /^\s*$/;
        if (!regCheck.test(this.state.tempEventName) && !regCheck.test(this.state.tempEventDescription)) {
            let updatedCustomEvents = [...this.state.customEvents];

            let newCustomEvent = {
                date: parseInt(this.state.year) + '/' + parseInt(this.state.month) + '/' + parseInt(this.state.day),
                eventName: this.state.tempEventName,
                eventDescription: this.state.tempEventDescription
            }
            updatedCustomEvents.push({newCustomEvent});

            this.setState({customEvents: updatedCustomEvents});
            this.setState({loading: true})

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/notification', newCustomEvent, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => this.setState({
                    loading: false
                })).catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.post('https://api.saadatportal.com/api/v1/supervisor/notification', newCustomEvent, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        loading: false
                                    }))
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.post('https://api.saadatportal.com/api/v1/supervisor/notification', newCustomEvent, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        loading: false
                                    }))
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        }

        this.componentDidMount();
        this.setState({showType: false});

    }

    handleCalendarVar = (value) => {
        this.setState({value: value});
        this.setState({dayOfYear: value.dayOfYear});

        this.setState({year: value.year});
        this.setState({month: value.month.number})
        this.setState({day: value.day});

        this.handleAPI(value.year, value.month.number, value.day, value);

    }

    handleAPI = async (year, month, day) => {

        console.log(year, month, day)

        await fetch(`https://persiancalapi.ir/jalali/${year}/${month}/${day}`).then((response) => response.json())
            .then((data) => {
                this.setState({eventsFromAPI: data.events});
                this.setState({isHoliday: data.is_holiday});
                // console.log(data);
            });
    }

    handleNotif = () => {
        let today = new Date().toLocaleDateString('fa-IR-u-nu-latn', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        for (let i = 0; i < this.state.customEvents.length; i++) {
            if (this.state.customEvents[i].date === today) {
                toast(<div>
                        <h4>{this.state.customEvents[i].eventName}</h4>
                        <p>{this.state.customEvents[i].eventDescription}</p>
                    </div>, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    }
                )
            }
        }
    }

    componentDidMount = async () => {

        axios.get('https://api.saadatportal.com/api/v1/supervisor/notification', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({customEvents: data}, () => this.handleNotif())).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/notification', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({customEvents: data}, () => this.handleNotif()))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/notification', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({customEvents: data}, () => this.handleNotif()))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    handleHolidaysFromAPI = async (year, month, day) => {
        await fetch(`https://persiancalapi.ir/jalali/${year}/${month}/${day}`).then((response) => response.json())
            .then((data) => {
                // console.log(1)
                if (data.is_holiday) {
                    let updatedHolidaysOfMonth = [...this.state.holidaysOfMonth];
                    let t = {
                        day: day,
                        month: month,
                        year: year
                    }

                    let dateExist = false;

                    for (let i = 0; i < updatedHolidaysOfMonth.length; i++) {
                        if (updatedHolidaysOfMonth[i].day === day && updatedHolidaysOfMonth[i].month === month && updatedHolidaysOfMonth[i].year === year) {
                            dateExist = true;
                        }
                    }

                    if (!dateExist) {
                        updatedHolidaysOfMonth.push(t)
                        this.setState({holidaysOfMonth: updatedHolidaysOfMonth})
                    }
                }
            });

    }
}

export default EventPage;