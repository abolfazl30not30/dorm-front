import React, {Component} from "react";
import '../../../../style/log.css';
import '../../../../style/logPagination.css';
import {Link} from "react-router-dom";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import axios from "axios";
import {Button, FormControl, MenuItem, Select} from "@mui/material";
import LogPagination from "../../../CustomInputs/LogPagination";


class log extends Component {
    state = {
        currentPageNumber: 0,
        logs: [],
        totalPages: null,
        searchBase: "all",
        searchContent: "",
        dataPicker: '',
    }
    constructor(props) {
        super(props);
        if (localStorage.getItem('role') !== 'MANAGER') {window.location = "/dashboard"}
    }

    async componentDidMount() {
        this.setState({searchLoading: true})
        axios.get('https://api.saadatportal.com/api/v1/logHistory?page=0&size=20', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                logs: data.content,
                searchLoading: false,
                totalPages: data.totalPages
            })).catch(() => {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/logHistory?page=0&size=20', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    logs: data.content,
                                    searchLoading: false,
                                    totalPages: data.totalPages
                                }))
                        } else {
                            window.location = '/'
                        }
                    })})
    }

    render() {
        return (
            <>
                <div className="back-btn mb-2">
                    <Link to="/dashboard">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>
                <div className="log-box" style={{minHeight: window.innerHeight*0.5}}>
                    <div className="title">
                        <h4>مدیریت کارها</h4>
                    </div>
                    <div style={{backgroundColor: "#fff"}} className="search-box justify-content-center align-items-center mt-4">
                        <div className="form-floating">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                    id="select-field"
                                    value={this.state.searchBase}
                                    onChange={(value) => {
                                        this.setState({searchBase: value.target.value})
                                        if (value.target.value === "all") {
                                            this.componentDidMount()
                                        }
                                    }}>
                                    <MenuItem value={"all"}>همه</MenuItem>
                                    <MenuItem value={"doer"}>انجام دهنده</MenuItem>
                                    <MenuItem value={"date"}>تاریخ</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0',
                                    padding: '0 .4rem -0.4rem',
                                    opacity: '1',
                                }}>بر اساس</label>
                            </FormControl>
                        </div>
                        <div hidden={this.state.searchBase !== "date"} className="input-group-register date-container" style={{marginLeft: "-.4rem", marginRight: "-.4rem"}}>
                            <DatePicker
                                containerClassName={"trello-date-container"}
                                calendarPosition={`top`}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                format={`YYYY/MM/DD`}
                                inputClass={`input`}
                                value={this.state.dataPicker}
                                onChange={this.handleDateInput}
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
                                        this.setState({dataPicker: {}})
                                    }
                                    }
                                >
                                    ریست
                                </Button>
                            </DatePicker>
                            <label className="placeholder" style={{
                                top: '-8px',
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                margin: '0.3rem 0.4rem',
                                padding: '0 0.4rem',
                                opacity: '1',
                            }}>تاریخ</label>
                        </div>
                        <input type="text"
                               hidden={this.state.searchBase === "date" || this.state.searchBase === "all"}
                               id="inputSearch"
                               placeholder="جسـتجـو..."
                               onChange={this.handleSearchInput}
                               style={{height: 50}}/>
                        <div style={this.state.searchBase === "all" ? {height: 50, backgroundColor: "#f6f6f6"} : {height: 50}} hidden={this.state.searchBase === "date" || this.state.searchBase === "all"} className="search-icon"><i className="bi bi-search"></i></div>
                    </div>

                    <div className="table-box">
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>صفحه</th>
                                <th>انجام دهنده</th>
                                <th>عمل</th>
                                <th>تاریخ</th>
                                <th>ساعت</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.logs.map((log) => (
                                    <tr>
                                        <td>{log.category}</td>
                                        <td>{log.doer}</td>
                                        <td>
                                            {(() => {
                                                switch(log.action) {
                                                    case 'POST':
                                                        return 'ذخیره';
                                                    case 'PATCH':
                                                        return 'ویرایش';
                                                    case 'DELETE':
                                                        return 'حذف';
                                                    case 'GET':
                                                        return 'خواندن';
                                                }
                                            })()}
                                        </td>
                                        <td>{log.date}</td>
                                        <td>{log.hour}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className={"d-flex justify-content-center align-items-center"}>
                        <LogPagination totalPages={this.state.totalPages} onNewPage={this.handleNewPage}/>
                    </div>
                </div>
            </>
        );
    }

    handleDateInput = (value) => {
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year  + '/' + month + '/' + day;
        this.setState({searchContent: convertDate})
        this.handleSearch(convertDate)
    }
    handleSearch = async (e) => {
        this.setState({currentPageNumber: 0})
        axios.get(`https://api.saadatportal.com/api/v1/logHistory/search?${this.state.searchBase}=${e}&page=0&size=20`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                logs: data.content,
                searchLoading: false,
                totalPages: data.totalPages
            })).catch(() => {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response
                    ) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/logHistory/search?${this.state.searchBase}=${e}&page=0&size=20`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    logs: data.content,
                                    searchLoading: false,
                                    totalPages: data.totalPages
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            })
    }
    handleSearchInput = (value) => {
        this.setState({searchContent: value.target.value, datePicker: value.target.value})
        this.handleSearch(value.target.value)
    }

    handleNewPage = (pageNumber) => {
        this.setState({searchLoading: true, currentPageNumber: pageNumber - 1})
        if (this.state.searchBase === "all") {
            axios.get(`https://api.saadatportal.com/api/v1/logHistory?page=${pageNumber - 1}&size=20`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => this.setState({
                    logs: data.content,
                    searchLoading: false,
                    totalPages: data.totalPages
                })).catch(() => {
                axios.get(`https://api.saadatportal.com/api/v1/manager/token/refresh`, {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/logHistory?page=${pageNumber - 1}&size=20`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    logs: data.content,
                                    searchLoading: false,
                                    totalPages: data.totalPages
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            })
        } else {
            axios.get(`https://api.saadatportal.com/api/v1/logHistory/search?${this.state.searchBase}=${this.state.searchContent}&page=${pageNumber - 1}&size=20`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => this.setState({
                    logs: data.content,
                    searchLoading: false,
                    totalPages: data.totalPages
                })).catch(() => {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response
                    ) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/logHistory/search?${this.state.searchBase}=${this.state.searchContent}&page=${pageNumber - 1}&size=20`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    logs: data.content,
                                    searchLoading: false,
                                    totalPages: data.totalPages
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            })

        }

    }
}

export default log;