import {Component} from "react";
// import { DatePicker } from "jalali-react-datepicker";
import {Calendar} from "react-multi-date-picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import '../../../../style/EventPageStyle.css';
import {Modal} from "react-bootstrap";


class EventPage extends Component {

    state = {
        year: 'default', // number format
        month: 'default', // number format
        day: 'default', // number format

        tempInputForModal: '',
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
            //     year: 1401,
            //     dayOfYear: 197,
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
        ]
    }

    render() {
        return (
            <>
                <div className="d-flex flex-md-row flex-column p-1">
                    <div className="col-md-6 col-12 p-3">
                        <div className='d-flex justify-content-center'>
                            <Calendar
                                value={this.state.value}
                                onChange={(value) => this.handleCalendarVar(value)}

                                mapDays={({date}) => {
                                    this.handleHolidaysFromAPI(date.year, date.month.number, date.day, date);
                                    let props = {}

                                    let isWeekend = [6].includes(date.weekDay.index);

                                    for (let i = 0; i < this.state.customEvents.length; i++) {
                                        if (this.state.customEvents[i].year === date.year && this.state.customEvents[i].dayOfYear === date.dayOfYear) {
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
                        <div className={'d-flex justify-content-center'}>
                            <div className={'mt-3 eventDay'}>
                                <div style={{textAlign: 'center'}}>
                                    <h6 className={'p-2'}>
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
                    <div className={'col-md-6 col-12 my-3'} style={{
                        backgroundColor: "#fff",
                        textAlign: 'center',
                        boxShadow: '0 0 5px #8798ad',
                        borderRadius: "10px"
                    }}>
                        <button className={'btn btn-success m-4'}
                                onClick={() => {
                                    this.handleOpenType();
                                    this.setState({tempInputForModal: ''})
                                }}>
                            اضافه کردن رویداد
                        </button>
                        <h5 className={'mb-3'}>
                            رویداد های من
                        </h5>
                        <ul className="list-group" style={{alignItems: 'center'}}>
                            {
                                this.state.customEvents.map((event, key) => {
                                    return (event.dayOfYear === this.state.dayOfYear) && (event.year === this.state.year) ?
                                        <li className={'p-3 list-group-item'} key={key}
                                            style={{width: '50%'}}>{event.description}</li> :
                                        null
                                })
                            }
                        </ul>
                    </div>
                </div>

                <Modal centered show={this.state.showType} onHide={() => {
                    this.handleCloseType()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن رویداد جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <input type='text'
                               className='form-control mt-3 mb-3 input'
                               onChange={(e) => this.handleInputChange(e)}
                               placeholder="رویداد جدید"/>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
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

    handleInputChange = (e) => {
        this.setState({tempInputForModal: e.target.value});
    }

    handleSubmitType = (e) => {

        e.preventDefault();
        let regCheck = /^\s*$/;
        if (!regCheck.test(this.state.tempInputForModal)) {
            let updatedCustomEvents = [...this.state.customEvents];
            updatedCustomEvents.push({
                year: this.state.year,
                dayOfYear: this.state.dayOfYear,
                description: this.state.tempInputForModal
            });
            this.setState({customEvents: updatedCustomEvents});
            // console.log(updatedCustomEvents)
        }
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