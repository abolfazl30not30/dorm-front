import {Component} from "react";
// import { DatePicker } from "jalali-react-datepicker";
import {Calendar} from "react-multi-date-picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import '../../../../style/EventPageStyle.css';
import {Modal} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class EventPage extends Component {

    state = {
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

        eventsFromAPI: [
            // {
            //     year: 1401,
            //     dayOfYear: 196,
            //     description: 'test1',
            // },
            // {
            //     year: '',
            //     dayOfYear: '',
            //     description: 'test2',
            // },
            // {
            //     year: '',
            //     dayOfYear: 'asd',
            //     description: '',
            // },
            // {
            //     year: '',
            //     dayOfYear: 'asd',
            //     description: '',
            // },
        ],
        customEvents: [
            // {
            //     date: '1401/9/9 00:00:00',
            //     eventName: 'test',
            //     eventDescription: 'test'
            // }
            // {
            //     year: '',
            //     dayOfYear: '',
            //     description: 'test2',
            // },
            // {
            //     year: '',
            //     dayOfYear: 'asd',
            //     description: '',
            // },
            // {
            //     year: '',
            //     dayOfYear: 'asd',
            //     description: '',
            // },
        ]
    }

    render() {
        return (
            <>
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
                        <div className="col-md-6 col-12 p-2">
                            <div className='d-flex justify-content-center'>
                                <Calendar
                                    value={this.state.value}
                                    onChange={(value) => this.handleCalendarVar(value)}

                                    mapDays={({date}) => {
                                        this.handleHolidaysFromAPI(date.year, date.month.number, date.day, date);
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
                                    {/*<button*/}
                                    {/*    className={' btn btn-lg'}*/}
                                    {/*    onClick={() => {*/}
                                    {/*        console.log(this.state.value)*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    print*/}
                                    {/*</button>*/}

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

                                            // let day = parseInt(today.getDay()) < 10 ? ('0' + parseInt(today.getDay())) : parseInt(today.getDay());
                                            // let month = (parseInt(today.getMonth()) < 10 ? ('0' + parseInt(today.getMonth())) : parseInt(today.getMonth()));

                                            // console.log(today.getYear() + '/' + month + '/' + day + ' 00:00:00')

                                            // console.log(parseInt("09"))
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


                    {/*<div className={'col-md-6 col-12 my-3'} style={{
                        backgroundColor: "#fff",
                        textAlign: 'center',
                        boxShadow: '0 0 5px #8798ad',
                        borderRadius: "10px"
                    }}>
                        <button className={'btn btn-success m-4'}
                                onClick={() => {
                                    this.handleOpenType();
                                    this.setState({tempInputForModal: ''})

                                    // let day = parseInt(today.getDay()) < 10 ? ('0' + parseInt(today.getDay())) : parseInt(today.getDay());
                                    // let month = (parseInt(today.getMonth()) < 10 ? ('0' + parseInt(today.getMonth())) : parseInt(today.getMonth()));

                                    // console.log(today.getYear() + '/' + month + '/' + day + ' 00:00:00')

                                    // console.log(parseInt("09"))
                                }}>
                            اضافه کردن رویداد
                        </button>
                        <h5 className={'mb-3'}>
                            رویداد های من
                        </h5>
                        <ul className="list-group">
                            {
                                this.state.customEvents.map((event, key) => {
                                    let day = parseInt(this.state.day) < 10 ? ('0' + parseInt(this.state.day)) : parseInt(this.state.day);
                                    let month = (parseInt(this.state.month) < 10 ? ('0' + parseInt(this.state.month)) : parseInt(this.state.month));

                                    let tmpFormatDate = this.state.year + '/' + month + '/' + day;

                                    return <li className={'p-3 list-group-item'} key={key}>{event.eventName}</li>

                                    return (event.date === tmpFormatDate) ?
                                        <li className={'p-3 list-group-item'} key={key}>{event.eventName}</li> :
                                        null
                                })

                            }
                        </ul>
                    </div>*/}

                </div>

                <Modal centered show={this.state.showType} onHide={() => {
                    this.handleCloseType()
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
                        {/*<div className="input-group-register col-12">
                            <textarea type='text'
                                      className='form-control mt-3 mb-3 input'
                                      onChange={(e) => this.handleEventDescription(e)}
                                      placeholder=" "/>
                            <label className="placeholder">توضیحات</label>
                        </div>*/}
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
                        <button className="btn btn-success" onClick={(event) => {
                            this.handleSubmitType(event)
                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
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

            // let day = parseInt(this.state.day) < 10 ? ('0' + parseInt(this.state.day)) : parseInt(this.state.day);
            // let month = (parseInt(this.state.month) < 10 ? ('0' + parseInt(this.state.month)) : parseInt(this.state.month));

            let newCustomEvent = {
                date: parseInt(this.state.year) + '/' + parseInt(this.state.month) + '/' + parseInt(this.state.day),
                eventName: this.state.tempEventName,
                eventDescription: this.state.tempEventDescription
            }
            updatedCustomEvents.push({newCustomEvent});

            this.setState({customEvents: updatedCustomEvents});

            const postEvent = await fetch('https://api.saadatportal.com/api/v1/notification', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCustomEvent)
            });

            // console.log(updatedCustomEvents)
        }

        await this.componentDidMount();
        this.setState({showType: false});

    }

    handleCalendarVar = (value) => {
        this.setState({value: value});
        this.setState({dayOfYear: value.dayOfYear});

        this.setState({year: value.year});
        this.setState({month: value.month.number})
        this.setState({day: value.day});

        this.handleAPI(value.year, value.month.number, value.day, value);

        // console.log(this.state)

        // console.log(res)

        // console.log(value.dayOfYear);
        // console.log(value.year , '-------');
        // console.log(value.year, value.month.number,value.day)
    }

    handleAPI = async (year, month, day, value) => {

        console.log(year, month, day)

        const response = await fetch(`https://persiancalapi.ir/jalali/${year}/${month}/${day}`).then((response) => response.json())
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
        console.log(today)

        for (let i = 0; i < this.state.customEvents.length; i++) {
            console.log(2)
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
        const response = await fetch('https://api.saadatportal.com/api/v1/notification').then((response) => response.json())
            .then((data) => this.setState({customEvents: data}, () => this.handleNotif()));

        // let today = new Date()
        // let day = parseInt(this.state.day) < 10 ? ('0' + parseInt(this.state.day)) : parseInt(this.state.day);
        // let month = (parseInt(this.state.month) < 10 ? ('0' + parseInt(this.state.month)) : parseInt(this.state.month));

        // let today = new Date().toLocaleDateString('fa-IR-u-nu-latn', {year:'numeric',month:'2-digit',day:'2-digit'}) + ' 00:00:00';
        // console.log(today)
        //
        // for (let i = 0; i < this.state.customEvents.length; i++) {
        //     console.log(2)
        //     if (this.state.customEvents[i].date === today) {
        //         toast(<div>
        //                 <h4>{this.state.customEvents[i].eventName}</h4>
        //                 <p>{this.state.customEvents[i].eventDescription}</p>
        //             </div>, {
        //                 position: "top-right",
        //                 autoClose: 5000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "light",
        //             }
        //         )
        //     }
        // }
    }

    handleHolidaysFromAPI = async (year, month, day) => {
        const setHolidaysOfMonth = await fetch(`https://persiancalapi.ir/jalali/${year}/${month}/${day}`).then((response) => response.json())
            .then((data) => {
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
                // console.log(this.state.holidaysOfMonth)
            });

    }
}

export default EventPage;