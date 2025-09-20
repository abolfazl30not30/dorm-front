import React, {Component, createRef} from "react";
import "../../../../style/paymentHistory.css"
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Box, Button, CircularProgress, MenuItem, Select} from "@mui/material";
import {RiDownloadCloud2Fill} from "react-icons/ri";
import {green} from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

class PaymentHistory extends Component {

    constructor(props) {
        super(props);
        if (localStorage.getItem('role') !== 'MANAGER') {window.location = "/dashboard"}
    }

    state = {
        searchLoading: true,
        loading: false,
        payment: [],
        paymentFilter: [],
        typeTransaction: 'all',
        dataPickerStart: null,
        dataPickerEnd: null,
        dateStart: '',
        dateEnd: '',
        totalPayment: "",
        totalReceive: "",
    }

    async componentDidMount() {
        this.setState({searchLoading: true})
        axios.get('https://api.saadatportal.com/api/v1/supervisor/account', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({
                    totalPayment: data.totalPayment,
                    totalReceive: data.totalReceived})
            }).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/account', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({
                                        totalPayment: data.totalPayment,
                                        totalReceive: data.totalReceived})
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/account', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({
                                        totalPayment: data.totalPayment,
                                        totalReceive: data.totalReceived})
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        axios.get('https://api.saadatportal.com/api/v1/supervisor/paymentHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({payment : data, searchLoading: false})
            }).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/paymentHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({payment : data, searchLoading: false})})
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/paymentHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({payment : data, searchLoading: false})})
                        } else {
                            window.location = '/'
                        }
                    })
            }})

    }

    render() {
        return (
            <>
                <div className="payment-history">
                    <div className='title'>صورتحساب</div>
                    <div className="d-flex flex-row mt-4">
                        <div className='d-flex flex-row ms-3'>
                            <span className="mx-2">هزینه کل: </span>
                            <span>{this.state.totalPayment} ريال </span>
                        </div>
                        <div className='d-flex flex-row'>
                            <span className="mx-2">درآمد کل:  </span>
                            <span>{this.state.totalReceive} ريال </span>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap my-2 align-items-center">
                        <div className='input-group-filter col-12 col-md-6 my-2 px-2'>
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: ".5rem", minWidth: '10rem'}}
                                    id="select-field"
                                    value={this.state.typeTransaction}
                                    onChange={(value) => this.setState({typeTransaction: value.target.value})}>
                                    <MenuItem value={"all"}> همه تراکنش ها</MenuItem>
                                    <MenuItem value={"expend"}>پرداخت</MenuItem>
                                    <MenuItem value={"receive"}>دریافت</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0',
                                    padding: '0 .4rem -0.4rem',
                                    opacity: '1',
                                }}>نوع تراکنش</label>
                            </FormControl>
                        </div>
                        <div className='input-group-filter col-12 col-md-6 my-2 px-2'>

                            <DatePicker
                                // fixMainPosition={false}
                                calendarPosition={`top`}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                format={`YYYY/MM/DD`}


                                containerStyle={{
                                    width: "100%"
                                }}

                                inputClass={`input form-control`}
                                value={this.state.dateStart}
                                onChange={(value) => {
                                    this.handleDateStartInput(value)
                                }}

                                mapDays={({ date }) => {
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
                                <Button
                                    onClick={() => {
                                        this.setState({dateStart: {}})
                                    }
                                    }
                                >
                                    ریست
                                </Button>
                            </DatePicker>
                            <label className="placeholder" style={{
                                fontSize: "0.8rem",
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                margin: "0 0.6rem",
                                padding: '0 .4rem',
                                opacity: '1',
                            }}>از تاریخ</label>
                        </div>
                        <div className='input-group-filter col-12 col-md-6 my-2 px-2'>
                            {/*<DatePicker calendarStyles={this.state.calStyles}*/}
                            {/*            inputFormat="jYYYY/jM/jD"*/}
                            {/*            className='input form-control'*/}
                            {/*            ref={this.endDate}*/}
                            {/*            onChange={value => {*/}
                            {/*                this.handleDateEndInput(value)*/}
                            {/*            }}*/}
                            {/*/>*/}
                            {/*<label className='placeholder'>تا تاریخ</label>*/}

                            <DatePicker
                                // fixMainPosition={false}
                                calendarPosition={`top`}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                format={`YYYY/MM/DD`}

                                containerStyle={{
                                    width: "100%"
                                }}

                                inputClass={`input form-control`}
                                value={this.state.dateEnd}
                                onChange={(value) => {
                                    this.handleDateEndInput(value)
                                }}

                                mapDays={({ date }) => {
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
                                <Button
                                    onClick={() => {
                                        this.setState({dateEnd: {}})
                                    }
                                    }
                                >
                                    ریست
                                </Button>
                            </DatePicker>
                            <label className="placeholder" style={{
                                fontSize: "0.8rem",
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                margin: "0 0.6rem",
                                padding: '0 .4rem',
                                opacity: '1',
                            }}>تا تاریخ</label>
                        </div>
                        <div className='input-group-filter col-12 col-md-6 my-2 px-2'>
                            <input type="text" className='input' ref={this.count}/>
                            <label className="placeholder" style={{
                                fontSize: "0.8rem",
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                margin: '0.3rem 0.7rem',
                                padding: '0 0.4rem',
                                opacity: '1',
                            }}>تعداد تراکنش</label>
                        </div>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone col-12 col-md my-2 px-2"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={this.handleSubmit}
                            >
                                مشاهده
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
                        {/*<button className='' onClick={this.handleSubmit}>مشاهده*/}
                        {/*</button>*/}
                    </div>
                    <div className='mx-3' style={{borderBottom: '1px solid #ddd'}}></div>
                    <div className="table-box">
                        <table className='table mt-4'>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>نوع تراکنش</th>
                                <th>نوع</th>
                                <th>تاریخ</th>
                                <th>مقدار</th>
                                <th>پرداخت کننده</th>
                                <th>توضیحات</th>
                                <th>فايل فاكتور</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.searchLoading ?
                                    [...Array(5)].map((x, i) =>
                                        <tr key={i}>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                        </tr>
                                    )
                                    :
                                    this.state.payment.map((peyment, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{peyment.paymentType === "expend" ? ("پرداخت"):("دریافت")}</td>
                                        <td>{peyment.type}</td>
                                        <td>{peyment.date}</td>
                                        <td>{peyment.amount.value}</td>
                                        <td>{peyment.parentId}</td>
                                        <td>{peyment.description}</td>
                                        <td>{Object.keys(peyment.file).length !== 0 &&(
                                            <div className="record-item"
                                                 onClick={() => this.downloadFile(peyment.file)}>
                                                <div className='ms-2'>دانلود</div>
                                                <RiDownloadCloud2Fill/>
                                            </div>
                                        )}
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }

    type = createRef();
    startDate = createRef();
    endDate = createRef();
    count = createRef();


    handleDateStartInput = (value) => {
        // this.setState({dataPickerStart: value})
        // let date = new Date(value._d);
        // let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " 00:00:00";
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year  + '/' + month + '/' + day;
        this.setState({dateStart: convertDate})
    }
    handleDateEndInput = (value) => {
        // this.setState({dataPickerEnd: value})
        // let date = new Date(value._d);
        // let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " 00:00:00";
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year  + '/' + month + '/' + day;
        this.setState({dateEnd: convertDate})
    }
    handleSubmit = async () => {
        let type;
        switch (this.state.typeTransaction) {
            case 'all': {
                type = ["receive", "expend"];
                break;
            }
            case 'receive': {
                type = ["receive"];
                break;
            }
            case 'expend': {
                type = ["expend"];
                break;
            }
        }

        let startDate = this.state.dateStart;
        if(Object.keys(startDate).length === 0){
             startDate = "";
        }

        let endDate = this.state.dateEnd;
        if(Object.keys(endDate).length === 0){
             endDate = "";
        }

        const count = parseInt(this.count.current.value);
        const result = {
            paymentType: type,
            count: count,
            startDate: startDate,
            endDate: endDate
        }
        this.setState({loading: true, searchLoading: true})
        axios.post('https://api.saadatportal.com/api/v1/supervisor/paymentHistory/filter', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({payment: data, loading: false, searchLoading: false})).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/paymentHistory/filter', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({payment: data, loading: false, searchLoading: false}))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/paymentHistory/filter', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({payment: data, loading: false, searchLoading: false}))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        this.setState({loading: false, searchLoading: false})
    }

    downloadFile = async (file) => {

        var filename = Object.keys(file)[0];

        axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${Object.values(file)[0]}`, {responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((blob) => {
                if (blob !== null) {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            }).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${Object.values(file)[0]}`, {responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((blob) => {
                                    if (blob !== null) {
                                        var url = window.URL.createObjectURL(blob);
                                        var a = document.createElement('a');
                                        a.href = url;
                                        a.download = filename;
                                        document.body.appendChild(a);
                                        a.click();
                                        a.remove();
                                    }

                                })
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${Object.values(file)[0]}`, {responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((blob) => {
                                    if (blob !== null) {
                                        var url = window.URL.createObjectURL(blob);
                                        var a = document.createElement('a');
                                        a.href = url;
                                        a.download = filename;
                                        document.body.appendChild(a);
                                        a.click();
                                        a.remove();
                                    }

                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }
        })
    }
}

export default PaymentHistory;