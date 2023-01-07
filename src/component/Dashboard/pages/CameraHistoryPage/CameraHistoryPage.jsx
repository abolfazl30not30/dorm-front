import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import {MdDone} from "react-icons/md";
import "../../../../style/cameraHistory.css"
import '../../../../style/registerPage.css';
import '../../../../style/paymentHistory.css';
import {Box, Button, CircularProgress, MenuItem, Select} from "@mui/material";
import {green} from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

class CameraHistoryPage extends Component {

    state = {
        searchLoading: true,
        loading: false,
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
        data: [],
        searchType : "name",
    }

    async componentDidMount() {
        axios.get('https://api.saadatportal.com/api/v1/supervisor/cameraHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                data: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/cameraHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    data: data,
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/cameraHistory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    data: data,
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

                <div className="back-btn">
                    <Link to="/dashboard">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>

                <div className="payment-history camera-history">
                    <div className={'d-flex flex-row justify-content-between aligns-item-center'}>

                        <h4>
                            تاریخچه عکس
                        </h4>

                        <div className={'d-flex'} style={{justifyContent: 'center'}}>
                            <button className={'btn-done'} onClick={() => {
                                this.handleOpenModal();
                            }}>
                                <MdDone className='ms-1'/>ثبت درخواست
                            </button>
                        </div>
                    </div>
                    <div className="search-box d-flex justify-content-center">
                        <div className="form-floating">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#f9f9f9"}}
                                    id="select-field"
                                    value={this.state.searchType}
                                    onChange={(value) => this.setState({searchType: value.target.value})}>
                                    <MenuItem value={"name"}>عنوان</MenuItem>
                                    <MenuItem value={"assignee"}>نام درخواست کننده</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0',
                                    padding: '0 .4rem -0.4rem',
                                    opacity: '1',
                                }}>بر اساس</label>
                            </FormControl>
                        </div>
                        <input type="text"
                               id="inputSearch"
                               placeholder="جسـتجـو..."
                               onChange={(e) => {
                                   this.handleSearchInput(e)
                               }}/>
                        <div className="search-icon"><i className="bi bi-search"/></div>
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
                                this.state.searchLoading ?
                                    [...Array(5)].map((x, i) =>
                                        <tr>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                        </tr>
                                    )

                                        :
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
                                    value={this.state.tmpRequest.title}
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
                                    editable={false}
                                    format="YYYY/MM/DD"
                                    inputClass={`input form-control mb-2 ${this.state.validation.date_requiredReg === false ? "is-invalid" : ""}`}
                                    value={this.state.dateValue}
                                    onChange={(value) => {this.handleDateValue(value)}}

                                    containerStyle={{
                                        width: "100%"
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
                                        updatedTmpRequest.date = '';
                                        this.setState({tmpRequest: updatedTmpRequest, dateValue: ''})
                                    }}>
                                        ریست
                                    </button>
                                </DatePicker>
                                <label className="placeholder" style={{
                                    top: '-5px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
                                    color: 'rgba(42,46,50,0.49)',
                                    margin: '0 0.4rem',
                                    padding: '0 .4rem',
                                    opacity: '1',
                                }}>تاریخ<span style={{color: 'red'}}>*</span></label>

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

                    <Modal.Footer className="d-flex justify-content-center">
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                variant="contained"
                                className={"buttonDone"}
                                disabled={this.state.loading}
                                onClick={() => {
                                    if (this.handleIsValid()) {
                                        this.handleSubmit();
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

                        <button className="btn btn-light" onClick={() => {
                            this.handleCloseModal();
                        }}>بستن

                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleOpenModal = () => {
        this.setState({showModal: true});
        this.setState({
            dateValue: '',
            tmpRequest: {
                title: '',
                description: '',
                unit: '',
                date: '',
                supervisor: '1111111',
                assignee: '',
            }})
        this.setState({validation: {
                title_requireReg: '',
                date_requiredReg: '',
                unit_requireReg: '',
                assignee_requireReg: '',
                unit_numberReg: '',
            }})
    }

    handleCloseModal = () => {
        this.setState({showModal: false});
    }

    handleSubmit = async () => {

        this.setState({loading: true})
        axios.post('https://api.saadatportal.com/api/v1/supervisor/cameraHistory', this.state.tmpRequest, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                loading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/cameraHistory', this.state.tmpRequest, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/cameraHistory', this.state.tmpRequest, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})

        this.handleCloseModal()
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
        this.setState({validation: resetValidations,tmpRequest:tmpRequest, dateValue: ''});

        this.componentDidMount()
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

    handleSearchInput = async (e) =>{
        this.setState({searchLoading: true})
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/cameraHistory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                data: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/cameraHistory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    data: data,
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/cameraHistory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    data: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }
}

export default CameraHistoryPage;