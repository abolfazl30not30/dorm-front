import React, {Component, createRef} from "react";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../../../../style/profilePage.css'
import '../../../../style/registerPage.css';
import '../../../../style/paymentPage.css';
import '../../../../style/searchAccount.css';
import "../../../../style/registerPage.css";
import {Box, CircularProgress, MenuItem, Select} from "@mui/material";
import {green} from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

class RequestPage extends Component {

    constructor(props) {
        super(props);
        if (localStorage.getItem('role') !== 'MANAGER') {window.location = "/dashboard"}
        this.refForAdd = createRef();
        this.inputRef = createRef();
    }

    state = {
        cardsLoading: true,
        loading: false,
        failureModalShow: false,

        tmpRadioValue: '',
        tmpRequest: '',

        tmpRequestForSubmit: {
            topic: 'test',
            type: 'test',
            name: 'test',
            reason: 'test',
            checked: 'null', // default
            failureReasonId: '',
        },


        showStatusModal: false,

        searchBase: 'name',
        searchContent: '',

        showOverlay: false,

        choices: [
            'محصولات بهداشتی',
            'بیمه',
        ],
        addInputContentInModal: '',
        addButtonDisabled: false,

        selectedType: null,
        tempFields: {
            topic: '',
            type: null,
            name: '',
            reason: '',
            checked: false, // default
        },

        Validations: {
            selectedTypeBoolean: true,
            topic_requireReg: '',
            name_requireReg: '',
            typeForStatus_requiredReg: '',
        },

        requests : [],

        failure : {
            name: '',
            reason: '',
            type: '',
        }

    }

    render() {
        return (
            <>
                <div className="px-2">
                    <div className="back-btn">
                        <Link to="/">
                            بازگشت
                            <i className="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex flex-row justify-content-between">
                            <div className={'mb-3'}><h4>درخواست (مدیریت)</h4></div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="search-box">
                                <div className="form-floating">
                                    <FormControl className={"w-100"} style={{border: "none"}}>
                                        <Select
                                            sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                            id="select-field"
                                            value={this.state.searchBase}
                                            onChange={(value) => this.setState({searchBase: value.target.value})}>
                                            <MenuItem value={"name"}>عنوان</MenuItem>
                                            <MenuItem value={"assignee"}>نام درخواست کننده</MenuItem>
                                            <MenuItem value={"type"}>نوع</MenuItem>
                                        </Select>
                                        <label className="placeholder" style={{
                                            top: '-10px',
                                            backgroundColor: '#f9f9f9',
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
                                <div className="search-icon"><i className="bi bi-search"></i></div>
                            </div>
                        </div>
                        <div className="d-flex flex-row flex-wrap">
                            {
                                this.state.cardsLoading ?
                                    [...Array(9)].map((x, i) => (
                                        <div className="col-12 col-md-4 p-2">
                                            <div className={'request-item d-flex flex-column'}>
                                                <Skeleton className={"mt-2"} animation="wave" width={"50%"} height={30}/>
                                                <Skeleton className={"mt-2"} animation="wave" width={"60%"} height={30}/>
                                                <Skeleton className={"mt-2"} animation="wave" width={"80%"} height={30}/>
                                                <Skeleton className={"mt-2"} animation="wave" width={"70%"} height={30}/>
                                                <Skeleton className={"mt-2"} animation="wave" width={"40%"} height={30}/>
                                                <Skeleton className={"mt-2"} animation="wave" width={"80%"} height={30}/>
                                            </div>
                                        </div>
                                    ))
                                    :
                                this.state.requests.map((request, index, curr) => (
                                    <>
                                        <div className="col-12 col-md-4 p-2">
                                            <div className={'request-item d-flex flex-column'}>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">عنوان:</div>
                                                    <div>{request.name}</div>
                                                </div>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">نوع:</div>
                                                    <div>{request.type}</div>
                                                </div>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">درخواست کننده:</div>
                                                    <div>{request.assignee}</div>
                                                </div>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">دلیل:</div>
                                                    <div>{request.reason}</div>
                                                </div>
                                                <div className='d-flex flex-row justify-content-between align-items-baseline mb-2'>
                                                    <div className="d-flex flex-row align-items-baseline">
                                                        <i className="bi bi-chevron-left ms-1"/>
                                                        <div className="request-item-title">وضعیت:</div>
                                                        {
                                                            request.checked !== null
                                                                ? (request.checked === true
                                                                    ? <Button className={'request-accept'} disabled={true}>قبول شده</Button>
                                                                    : <OverlayTrigger
                                                                        placement="bottom"
                                                                        delay={{ show: 250, hide: 400 }}
                                                                        overlay={<Tooltip id="button-tooltip">
                                                                            نمایش جرئیات
                                                                        </Tooltip>
                                                                        }
                                                                    >
                                                                        <Button className={'request-reject'} onClick={() => {
                                                                        this.handleOpenFailureModal(request);
                                                                    }}>رد شده</Button>
                                                                        </OverlayTrigger>
                                                                        )
                                                                : <Button className={'request-unknown'} disabled={true}>تعیین نشده</Button>
                                                        }
                                                    </div>
                                                    <div>
                                                        <Button
                                                            disabled={request.checked !== null}
                                                            className={'request-edit'}
                                                            onClick={() => {
                                                                let resetFailure = {
                                                                    name: '',
                                                                    reason: '',
                                                                    type: '',
                                                                }
                                                                this.setState({failure: resetFailure})
                                                                this.handleEditButton(request);
                                                            }}
                                                        >
                                                            <i className="bi bi-pencil ms-1"/>
                                                            ویرایش
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">توضیحات:</div>
                                                    <div>{request.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <Modal centered show={this.state.failureModalShow} onHide={() => {
                    this.handleCloseFailureModal();

                    // console.log(this.state.failureModalShow);
                }}> {/* for failure reason*/}
                    <Modal.Header closeButton>
                        <div style={{color: 'red', fontSize: '2rem'}}>
                            رد شده
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="information">
                            <p>
                                {this.state.loading
                                    ?
                                    <Skeleton animation="wave" height={20} width={"50%"}/>
                                    :
                                    <>
                                        <label style={{marginLeft: '5%'}}>
                                            عنوان:
                                        </label>
                                        {this.state.failure.type}
                                    </>}
                            </p>
                        </div>
                        <div className="information">
                            <p>
                                {this.state.loading
                                    ?
                                    <Skeleton animation="wave" height={20} width={"50%"}/>
                                    :
                                    <>
                                        <label style={{marginLeft: '5%'}}>
                                            اسم:
                                        </label>
                                        {this.state.failure.name}
                                    </>}
                            </p>
                        </div>
                        <div className="information">
                            <p>
                                {this.state.loading
                                    ?
                                    <Skeleton animation="wave" height={20} width={"50%"}/>
                                    :
                                    <>
                                        <label style={{marginLeft: '5%'}}>
                                            دلیل:
                                        </label>
                                        {this.state.failure.reason}
                                    </>}
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal centered show={this.state.showStatusModal} onHide={() => {
                    if (!this.state.loading) {this.handleCloseType()}
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>تغییر وضعیت</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={this.state.tmpRequestForSubmit.checked}
                                // onClick={() => console.log(request.checked)}
                                onChange={(value) => {
                                    this.handleEditRadioGroup(value);
                                }}
                            >
                                <FormControlLabel disabled={this.state.loading} labelPlacement="top" value="null" control={<Radio />} label="تعیین نشده" />
                                <FormControlLabel disabled={this.state.loading} labelPlacement="top" value="true" control={<Radio />} label="تایید شده" />
                                <FormControlLabel disabled={this.state.loading} labelPlacement="top" value="false" control={<Radio />} label="تایید نشده" />
                            </RadioGroup>
                        </FormControl>
                        <div style={{display: this.state.tmpRequestForSubmit.checked !== false ? 'none' : 'block'}}>
                            <div className={'input-group-register'}>
                                <input
                                    className={'input form-control'}
                                    placeholder={' '}
                                    value={this.state.failure.name}
                                    onChange={(value) => {
                                        let updatedFailure = {...this.state.failure};
                                        updatedFailure.name = value.target.value;
                                        this.setState({failure : updatedFailure});
                                    }}
                                />
                                <label className={'placeholder'}>
                                    عنوان
                                </label>
                            </div>
                            <div className={'input-group-register'}>
                                <input
                                    className={'input form-control'}
                                    placeholder={' '}
                                    value={this.state.failure.reason}
                                    onChange={(value) => {
                                        let updatedFailure = {...this.state.failure};
                                        updatedFailure.reason = value.target.value;
                                        this.setState({failure : updatedFailure});
                                    }}
                                />
                                <label className={'placeholder'}>
                                    دلیل
                                </label>
                            </div>
                            <div className={'input-group-register'}>
                                <input
                                    className={'input form-control'}
                                    placeholder={' '}
                                    value={this.state.failure.type}
                                    onChange={(value) => {
                                        let updatedFailure = {...this.state.failure};
                                        updatedFailure.type = value.target.value;
                                        this.setState({failure : updatedFailure});
                                    }}
                                />
                                <label className={'placeholder'}>
                                    نوع
                                </label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={(event) => {
                                    if (this.handleIsValidStatus()) {
                                        this.handleSubmitStatus();
                                    }
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

    componentDidMount = async () => {
        axios.get('https://api.saadatportal.com/api/v1/supervisor/request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                requests: data,
                cardsLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    requests: data,
                                    cardsLoading: false
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    requests: data,
                                    cardsLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    handleEditButton = async (request) => {
        this.setState({showStatusModal: true});
        this.setState({tmpRequest: request})
        this.setState({tmpRadioValue: request.checked});
        this.setState({tmpRequestForSubmit: request})
    }

    handleCloseFailureModal = () => {
        this.setState({failureModalShow: false});
    }

    handleOpenFailureModal = async (request) => {
        this.setState({
            failure : {
                name: '',
                reason: '',
                type: '',
            }})
        this.setState({failureModalShow: true, loading: true});

        axios.get(`https://api.saadatportal.com/api/v1/supervisor/failureReason/${request.failureReason}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                failure: data, loading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/failureReason/${request.failureReason}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    failure: data, loading: false
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/failureReason/${request.failureReason}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    failure: data, loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    handleCloseType = () => {
        this.setState({showType: false});
        this.setState({showStatusModal: false});
    }

    handleIsValidStatus = () => {
        // tmpRequestForSubmit
        let regCheck = /^\s*$/;

        // this.state.failure.type =
        let typeForStatus_requiredReg = !regCheck.test(this.state.failure.type);
        if (this.state.tmpRequestForSubmit.checked === null || this.state.tmpRequestForSubmit.checked === true) {
            typeForStatus_requiredReg = true;
        }
        this.handleValidations([typeForStatus_requiredReg], ['typeForStatus_requiredReg']);

        return typeForStatus_requiredReg;
    }

    handleSubmitStatus = async () => {

        const updatedRequests = [...this.state.requests];
        const index = updatedRequests.indexOf(this.state.tmpRequest)
        if (this.state.tmpRequestForSubmit.checked === false) {
            this.setState({loading: true})


            // const getFailureReasonId = await fetch('https://api.saadatportal.com/api/v1/failureReason', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         name: this.state.failure.name,
            //         type: this.state.failure.type,
            //         reason: this.state.failure.reason
            //     })
            // })

            const getFailureReasonId = await axios.post('https://api.saadatportal.com/api/v1/supervisor/failureReason', {
                name: this.state.failure.name,
                type: this.state.failure.type,
                reason: this.state.failure.reason
            }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => {
                    return data
                }).catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/failureReason', {
                                        name: this.state.failure.name,
                                        type: this.state.failure.type,
                                        reason: this.state.failure.reason
                                    }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => {
                                            return data
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
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/failureReason', {
                                        name: this.state.failure.name,
                                        type: this.state.failure.type,
                                        reason: this.state.failure.reason
                                    }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => {
                                            return data
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                    }})

            var content = await getFailureReasonId;

            // await fetch(`https://api.saadatportal.com/api/v1/request/${updatedRequests[index].id}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         checked: false,
            //         failureReasonId: content.id
            //     })
            // }).then(() => {
            //     updatedRequests[index].checked = false
            //     this.setState({
            //         loading: false,
            //         showStatusModal: false,
            //         requests: updatedRequests
            //     })});

            await axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${updatedRequests[index].id}`, {checked: false,
                failureReasonId: content.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                .then(response => response.data).then((data) => {
                    updatedRequests[index].checked = false
                    this.setState({
                        loading: false,
                        showStatusModal: false,
                        requests: updatedRequests
                    })})
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${updatedRequests[index].id}`, {checked: false,
                                        failureReasonId: content.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => {
                                            updatedRequests[index].checked = false
                                            this.setState({
                                                loading: false,
                                                showStatusModal: false,
                                                requests: updatedRequests
                                            })})
                                } else {
                                    window.location = '/'
                                }
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${updatedRequests[index].id}`, {checked: false,
                                        failureReasonId: content.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => {
                                            updatedRequests[index].checked = false
                                            this.setState({
                                                loading: false,
                                                showStatusModal: false,
                                                requests: updatedRequests
                                            })})
                                } else {
                                    window.location = '/'
                                }
                            })
                    }})
        } else if (this.state.tmpRequestForSubmit.checked === true) {
            this.setState({loading: true})

            // await fetch(`https://api.saadatportal.com/api/v1/request/${updatedRequests[index].id}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         checked: this.state.tmpRequestForSubmit.checked
            //     })
            // }).then(() => {
            //     updatedRequests[index].checked = true
            //     this.setState({
            //         loading: false,
            //         showStatusModal: false,
            //         requests: updatedRequests
            //     })});

            await axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${updatedRequests[index].id}`, {checked: this.state.tmpRequestForSubmit.checked}, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                .then(response => response.data).then((data) => {
                    updatedRequests[index].checked = true
                    this.setState({
                        loading: false,
                        showStatusModal: false,
                        requests: updatedRequests
                    })})
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${updatedRequests[index].id}`, {checked: this.state.tmpRequestForSubmit.checked}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => {
                                            updatedRequests[index].checked = true
                                            this.setState({
                                                loading: false,
                                                showStatusModal: false,
                                                requests: updatedRequests
                                            })})
                                } else {
                                    window.location = '/'
                                }
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${updatedRequests[index].id}`, {checked: this.state.tmpRequestForSubmit.checked}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => {
                                            updatedRequests[index].checked = true
                                            this.setState({
                                                loading: false,
                                                showStatusModal: false,
                                                requests: updatedRequests
                                            })})
                                } else {
                                    window.location = '/'
                                }
                            })
                    }})
        } else if (this.state.tmpRequestForSubmit.checked === null) {
            this.setState({
                showStatusModal: false
            })
        }
        await this.componentDidMount();
    }

    handleValidations = (valueOfField, nameOfField) => {
        let updatedValidations = {...this.state.Validations};

        for (let i = 0; i < valueOfField.length; i++) {
            updatedValidations[nameOfField[i]] = valueOfField[i];
        }
        this.setState({Validations : updatedValidations});
    }
    handleEditRadioGroup = (value) => {
        let formattedValue = value.target.value === "null" ? null : (value.target.value === "true")
        this.setState({tmpRadioValue : formattedValue})
        let updatedTmpRequestForSubmit = {...this.state.tmpRequestForSubmit};
        updatedTmpRequestForSubmit.checked = formattedValue;
        this.setState({tmpRequestForSubmit : updatedTmpRequestForSubmit});
    }
    handleSearchInput = async (e) =>{
        const value = e.target.value;
        this.setState({cardsLoading: true})
        // await fetch(`https://api.saadatportal.com/api/v1/supervisor/request/search?${this.state.searchBase}=${value}`).then((response) => response.json())
        //     .then((data) => {
        //         this.setState({
        //             requests: data,
        //             cardsLoading: false
        //         })
        //     });

        axios.get(`https://api.saadatportal.com/api/v1/supervisor/request/search?${this.state.searchBase}=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                requests: data,
                cardsLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/request/search?${this.state.searchBase}=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    requests: data,
                                    cardsLoading: false
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/request/search?${this.state.searchBase}=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    requests: data,
                                    cardsLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }
}

export default RequestPage;