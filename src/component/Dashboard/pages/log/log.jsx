import React, {Component} from "react";
import '../../../../style/log.css';
import {Link} from "react-router-dom";
import {DatePicker} from 'react-persian-datepicker';
import axios from "axios";


class log extends Component {
    state = {
        logs: [],
        logsTest: [
            {
                "id": "bvjhsdbvdvjksdbvkjdsbvs",
                "url": "/api/v1/floor",
                "doer": "Fazel Gheibi",
                "action": "POST",
                "date": "2022/09/04",
                "hour": "12:10:05"
            },
            {
                "id": "bvjhsdbvdvjksdbvkjdsbvs",
                "url": "/api/v1/floor",
                "doer": "Fazel Gheibi",
                "action": "POST",
                "date": "2022/09/04",
                "hour": "12:10:05"
            },
            {
                "id": "bvjhsdbvdvjksdbvkjdsbvs",
                "url": "/api/v1/floor",
                "doer": "Fazel Gheibi",
                "action": "POST",
                "date": "2022/09/04",
                "hour": "12:10:05"
            },
            {
                "id": "bvjhsdbvdvjksdbvkjdsbvs",
                "url": "/api/v1/floor",
                "doer": "Fazel Gheibi",
                "action": "POST",
                "date": "2022/09/04",
                "hour": "12:10:05"
            },
            {
                "id": "bvjhsdbvdvjksdbvkjdsbvs",
                "url": "/api/v1/floor",
                "doer": "Fazel Gheibi",
                "action": "POST",
                "date": "2022/09/04",
                "hour": "12:10:05"
            },
        ],
        styles: {
            searchLoading: true,
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
        dataPicker: null,
    }

    async componentDidMount() {
        this.setState({searchLoading: true})
        axios.get('https://api.saadatportal.com/api/v1/logHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                logs: data,
                searchLoading: false
            })).catch(() => {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/logHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    logs: data,
                                    searchLoading: false
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
                <div className="log-box">
                    <div className="title">
                        <h4>مدیریت کارها</h4>
                    </div>
                    <div className="input-group-register col-md-4 col-12 date-container">
                        <DatePicker calendarStyles={this.state.styles}
                                    value={this.state.dataPicker}
                                    className='input form-control'
                                    onChange={value => {
                                        this.valueInputDate(value)
                                    }}
                        />
                        <label className="placeholder"
                               style={{
                                   top: '-8px',
                                   backgroundColor: '#fff',
                                   color: '#2a2e32b3',
                                   padding: '0 0.4rem',
                                   opacity: '1',
                               }}>جستجو بر اساس تاریخ</label>
                    </div>
                    <div className="table-box">
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>آدرس</th>
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
                                        <td>{log.url}</td>
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
                                        <td>{new Date(log.date).toLocaleDateString('fa-IR')}</td>
                                        <td>{log.hour}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

    valueInputDate = (value) => {
        this.setState({dataPicker: value});
        let date = new Date(value._d);
        let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + "00:" + "00:" + "00";
        this.setState({date: convertDate})
    }
}

export default log;