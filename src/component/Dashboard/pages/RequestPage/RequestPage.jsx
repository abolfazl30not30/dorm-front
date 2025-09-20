import React, {Component, createRef} from "react";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "@mui/material/ToggleButton";
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {IoIosAddCircleOutline} from "react-icons/io";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../../../../style/registerPage.css';
import '../../../../style/paymentPage.css';
import '../../../../style/searchAccount.css';
import {MdDone} from "react-icons/md";
import {Box, CircularProgress, FormControl, IconButton, MenuItem, Select} from "@mui/material";
import {green} from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {IoAddOutline} from "react-icons/io5";

class RequestPage extends Component {

    constructor(props) {
        super(props);
        if (localStorage.getItem('role') === 'MANAGER') {window.location = "/dashboard"}
        this.refForAdd = createRef();
        this.inputRef = createRef();
    }

    state = {
        tempDescription: "",
        tempIsDone: "todo",
        showEditDoneModal: false,
        cardsLoading: true,
        loading: false,
        showModalForAddingType: false,
        tempRequest: {},
        searchBase: 'name',

        failureModalShow: false,

        showOverlay: false,
        showType: false,

        choices: [],
        tempChoices: [],

        addInputContentInModal: '',
        addButtonDisabled: false,

        selectedType: null,

        tempFields: {
            topic: "",
            type: null,
            name: "",
            reason: "",
            checked: null, // default
            description: ""
        },

        Validations: {
            selectedTypeBoolean: true,
            topic_requireReg: '',
            name_requireReg: '',
            description_requireReg: '',
            reason_requireReg: '',
            addInputContentInModal_requiredReg: ''
        },

        requests: [],

        failure: {
            name: 'asd1',
            type: 'asd2',
            reason: 'asd3',
        }
    }

    componentDidMount = async () => {

        await axios.get('https://api.saadatportal.com/api/v1/supervisor/request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({requests: data});
                this.setState({cardsLoading: false});
            }).catch(async () => {
            if (localStorage.getItem('role') === 'MANAGER') {
                await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then(async (response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            await axios.get('https://api.saadatportal.com/api/v1/supervisor/request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({requests: data});
                                    this.setState({cardsLoading: false});
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then(async (response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            await axios.get('https://api.saadatportal.com/api/v1/supervisor/request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({requests: data});
                                    this.setState({cardsLoading: false});
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})

        axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                choices: data,
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    choices: data,
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Request', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    choices: data,
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
                <div className="px-2">
                    <div className="back-btn">
                        <Link to="/dashboard">
                            بازگشت
                            <i className="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h4>
                                    درخواست
                                </h4>
                            </div>
                            <div className={'d-flex'} style={{justifyContent: 'center'}}>
                                <button className={'btn-done'} onClick={() => {
                                    this.handleOpenType();
                                    this.handleResetFields();
                                }}>
                                    <MdDone className='ms-1'/>ثبت درخواست
                                </button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="search-box">
                                <div className="form-floating">
                                    <FormControl className={"w-100"}>
                                        <Select
                                            sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                            // aria-label={"Floating label select example"}
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
                                    this.state.requests.map(request => (
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
                                                    {
                                                        request.checked === true ? (
                                                            <>
                                                                <div className='d-flex flex-row justify-content-between align-items-baseline mb-2'>
                                                                    <div className="d-flex flex-row align-items-baseline">
                                                                        <i className="bi bi-chevron-left ms-1"/>
                                                                        <div className="request-item-title">پیگیری:</div>
                                                                    {
                                                                        request.status === "todo"
                                                                            ? (
                                                                                <Button className={'request-todo'} onClick={() => this.setState({showEditDoneModal: true, tempRequest: request})}>برای انجام</Button>
                                                                            )
                                                                            : request.status === "inProgress" ?
                                                                                (
                                                                                    <Button className={'request-inProgress'} onClick={() => this.setState({showEditDoneModal: true, tempRequest: request})}>در حال انجام</Button>
                                                                                ) :
                                                                                <OverlayTrigger
                                                                                    placement="bottom"
                                                                                    delay={{ show: 250, hide: 400 }}
                                                                                    overlay={<Tooltip id="button-tooltip">
                                                                                        {request.statusDescription}
                                                                                    </Tooltip>
                                                                                    }
                                                                                >
                                                                                    <Button className={'request-done'}>انجام شده</Button>
                                                                                </OverlayTrigger>
                                                                    }
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) :
                                                        null
                                                    }
                                                    <div className='d-flex flex-row align-items-baseline mb-2'>
                                                        <i className="bi bi-chevron-left ms-1"/>
                                                        <div className="request-item-title">وضعیت:</div>

                                                        {
                                                            request.checked !== null
                                                                ? (request.checked === true
                                                                    ? <Button className={'request-accept'}>قبول شده</Button>
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
                                                                    </OverlayTrigger>)
                                                                : <Button className={'request-unknown'}>تعیین نشده</Button>
                                                        }


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
                <Modal centered show={this.state.showType} onHide={() => {
                    if (!this.state.loading) {this.handleCloseType()}
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن درخواست جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">

                        <div className={'d-flex flex-column'}>
                            <div className={'input-group-register'}>
                                <input type='text'
                                       className={`input form-control col 
                                       ${this.state.Validations.topic_requireReg === false ? "is-invalid" : ""}
                                       `}
                                       onChange={(e) =>
                                           this.handleInputChange(e, 'topic')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.topic_requireReg === false ? '35px' : '12px'}}>
                                    &nbsp;عنوان
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.topic_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>
                            <div className={'d-flex my-3 mx-2'}>
                                <FormControl className={"w-100"} style={{border: "none"}}>
                                    <Select
                                        sx={{ height: 50, borderRadius: "0.5rem", minWidth: '8rem', backgroundColor: "#fff",
                                            border: this.state.Validations.selectedTypeBoolean === false ? '1px solid red' : ''
                                        }}
                                        id="select-field"
                                        defaultValue={''}
                                        onChange={(e) => this.handleInputChange(e, 'type')}>
                                        <MenuItem value={''}/>
                                        {
                                            this.state.choices.map((c) => (
                                                <MenuItem value={c.name}>{c.name}</MenuItem>
                                            ))
                                        }
                                        {
                                            this.state.tempChoices.map((c) => (
                                                <MenuItem value={c}>{c}</MenuItem>
                                            ))
                                        }

                                        {/*<MenuItem value={"needs"}>نیازمندی</MenuItem>*/}
                                        {/*<MenuItem value={"deficiency"}>کاستی</MenuItem>*/}
                                        {/*<MenuItem value={"onHand"}>دارایی</MenuItem>*/}
                                    </Select>
                                    <label className="placeholder" style={{
                                        top: '-10px',
                                        fontSize: "0.9rem",
                                        backgroundColor: '#fff',
                                        color: '#2a2e32b3',
                                        margin: '-0.2rem 0',
                                        padding: '0 .4rem -0.4rem',
                                        opacity: '1',
                                    }}>دسته بندی</label>
                                </FormControl>
                                <div className="col-md-1 col-2 d-flex align-item-center">
                                    <IconButton color="primary" onClick={() => {
                                        this.setState({showModalForAddingType: true, showType: false})
                                        this.setState({addInputContentInModal: ''});

                                        // console.log(this.state.names);
                                        // this.handleAddType();
                                    }}>
                                        <IoAddOutline size={30} width={'50%'} height={'50%'}/>
                                    </IconButton>
                                </div>
                            </div>

                            {
                                this.state.Validations.selectedTypeBoolean === false
                                ? <small className="text-danger mx-2">یکی از گزینه ها را
                                        انتخاب
                                        کنید!</small>
                                    : null
                            }

                            {/*<div>*/}
                            {/*    <Accordion defaultActiveKey="0"*/}
                            {/*               style={{backgroundColor: this.state.Validations.selectedTypeBoolean ? '' : 'rgba(255, 0, 0, 0.4)'}}*/}
                            {/*               className={'p-1'}*/}
                            {/*    >*/}
                            {/*        <Accordion.Item eventKey="0">*/}
                            {/*            <Accordion.Header>*/}
                            {/*                {this.state.tempFields.type}&nbsp;*/}
                            {/*            </Accordion.Header>*/}
                            {/*            <Accordion.Body>*/}
                            {/*                <div>*/}
                            {/*                    <div className=' row flex-wrap'>*/}
                            {/*                        {*/}
                            {/*                            this.state.Validations.selectedTypeBoolean // ifSelected condition*/}
                            {/*                                ? null*/}
                            {/*                                : <div className="d-flex justify-content-center mb-3">*/}
                            {/*                                    <small className="text-danger">یکی از گزینه های زیر را*/}
                            {/*                                        انتخاب*/}
                            {/*                                        کنید!</small>*/}
                            {/*                                </div>*/}
                            {/*                        }*/}
                            {/*                        <ToggleButtonGroup*/}
                            {/*                            orientation="vertical"*/}
                            {/*                            value={this.state.tempFields.type}*/}
                            {/*                            exclusive*/}
                            {/*                            onChange={this.handleAlignment}*/}
                            {/*                            aria-label="text alignment"*/}
                            {/*                        >*/}

                            {/*                            {*/}
                            {/*                                this.state.choices.map((c, key) =>*/}
                            {/*                                    <ToggleButton value={c} className='col' key={key}>*/}
                            {/*                                        {c}*/}
                            {/*                                    </ToggleButton>*/}
                            {/*                                )*/}
                            {/*                            }*/}

                            {/*                            <button value="add"*/}
                            {/*                                    onClick={() => {*/}
                            {/*                                        this.setState({showModalForAddingType: true, showType: false})*/}
                            {/*                                        this.setState({addInputContentInModal: ''});*/}
                            {/*                                    }}*/}
                            {/*                                    className='col addTypeBtn'*/}
                            {/*                            >*/}
                            {/*                                <IoIosAddCircleOutline size={25}/>*/}
                            {/*                            </button>*/}
                            {/*                        </ToggleButtonGroup>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </Accordion.Body>*/}
                            {/*        </Accordion.Item>*/}
                            {/*    </Accordion>*/}
                            {/*</div>*/}
                            <div className="input-group-register">
                                <input type='text'
                                       className={`input form-control mb-2 ${this.state.Validations.name_requireReg === false ? "is-invalid" : ""}`}
                                       onChange={(e) => this.handleInputChange(e, 'name')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.name_requireReg === false ? '35px' : '12px'}}>
                                    درخواست کننده
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.name_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>
                            <div className="input-group-register">
                                <input type='text'
                                       className={`input form-control mb-2 ${this.state.Validations.description_requireReg === false ? "is-invalid" : ""}`}
                                       onChange={(e) => this.handleInputChange(e, 'description')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.description_requireReg === false ? '35px' : '12px'}}>
                                    توضیحات
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.description_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>
                            <div className="input-group-register ">
                                <textarea
                                    className={`input form-control mb-2 ${this.state.Validations.reason_requireReg === false ? "is-invalid" : ""}`}
                                    onChange={(e) => this.handleInputChange(e, 'reason')}
                                    placeholder=" "
                                    rows='5'
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.reason_requireReg === false ? '35px' : '12px'}}>
                                    دلیل
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.reason_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Box sx={{m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={() => {
                                    if (this.handleIsValid()){
                                        this.handleSubmit()
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
                        <button className="btn btn-light" disabled={this.state.loading} onClick={() => {
                            this.handleCloseType()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

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
                                <label style={{marginLeft: '5%'}}>
                                    عنوان:
                                </label>
                                {this.state.failure.type}
                            </p>
                        </div>
                        <div className="information">
                            <p>
                                <label style={{marginLeft: '5%'}}>
                                    اسم:
                                </label>
                                {this.state.failure.name}
                            </p>
                        </div>
                        <div className="information">
                            <p>
                                <label style={{marginLeft: '5%'}}>
                                    دلیل:
                                </label>
                                {this.state.failure.reason}
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal centered show={this.state.showModalForAddingType} onHide={() => this.setState({showModalForAddingType: false, showType: true})}> {/* for adding new type */}
                    <Modal.Header closeButton>
                        افزودن نوع جدید
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group-register col-md-4 col-12 w-100">
                            <input type='text'
                                   value={this.state.addInputContentInModal}
                                   className={`input form-control col
                                           ${this.state.Validations.addInputContentInModal_requiredReg === false ? "is-invalid" : ""}
                                           `}
                                   onChange={(value) => this.setState({addInputContentInModal: value.target.value})}
                                   placeholder=" "
                            />
                            <label className={'placeholder'}
                                   style={{right: this.state.Validations.addInputContentInModal_requiredReg === false ? '35px' : '12px'}}>
                                &nbsp;نوع جدید
                                <span style={{color: 'red'}}>*</span>
                            </label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn-done" onClick={this.handleSubmitNewType}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={this.handleCloseAddingType}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showEditDoneModal} onHide={() => {
                    if (!this.state.loading) {this.setState({showEditDoneModal: false})}
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>وضعیت پیگیری</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={this.state.tempIsDone}
                                onChange={(value) => {
                                    this.setState({tempIsDone: value.target.value})
                                }}
                            >
                                <FormControlLabel disabled={this.state.loading} labelPlacement="top" value="todo" control={<Radio />} label="برای انجام" />
                                <FormControlLabel disabled={this.state.loading} labelPlacement="top" value="inProgress" control={<Radio />} label="در حال انجام" />
                                <FormControlLabel disabled={this.state.loading} labelPlacement="top" value="done" control={<Radio />} label="انجام شده" />
                            </RadioGroup>
                        </FormControl>
                        <div style={{display: this.state.tempIsDone !== "done" ? 'none' : 'block'}}>
                            <div className={'input-group-register'}>
                                <input
                                    className={'input form-control'}
                                    placeholder={' '}
                                    value={this.state.tempDescription}
                                    onChange={(value) => {
                                        this.setState({tempDescription : value.target.value});
                                    }}
                                />
                                <label className={'placeholder'}>
                                    توضیحات
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
                                    this.handleSubmitDone()
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
                            if (!this.state.loading) {this.setState({showEditDoneModal: false})}
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleCloseAddingType = () => {
        let updatedValidation = {...this.state.Validations};
        updatedValidation.addInputContentInModal_requiredReg = '';

        this.setState({addInputContentInModal: '', showType: true})
        this.setState({showModalForAddingType: false})
        this.setState({Validations: updatedValidation});
    }

    handleSubmitNewType = () => {
        let required = /^\s*$/;
        let updatedValidation = {...this.state.Validations};
        updatedValidation.addInputContentInModal_requiredReg = !required.test(this.state.addInputContentInModal);
        this.setState({Validations: updatedValidation});

        if (!required.test(this.state.addInputContentInModal)) {

            let updatedChoices = [...this.state.tempChoices];
            if (!updatedChoices.includes(this.state.addInputContentInModal)) {
                updatedChoices.push(this.state.addInputContentInModal);
                this.setState({tempChoices: updatedChoices});
            }

            this.setState({showModalForAddingType: false})

            let updatedValidation = {...this.state.Validations};
            updatedValidation.addInputContentInModal_requiredReg = '';
            this.setState({Validations: updatedValidation});

            this.setState({addInputContentInModal: '', showType: true})
        }
    }

    handleOpenFailureModal = async (request) => {
        this.setState({failureModalShow: true});
        // await fetch(`https://api.saadatportal.com/api/v1/supervisor/failureReason/${request.failureReason}`).then((response) => response.json())
        //     .then((data) => this.setState({failure: data}));

        axios.get(`https://api.saadatportal.com/api/v1/supervisor/failureReason/${request.failureReason}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                failure: data
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/failureReason/${request.failureReason}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    failure: data
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
                                    failure: data
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    handleResetFields = () => {
        let resetTypeOfTempFields = {...this.state.tempFields};
        resetTypeOfTempFields['type'] = null;
        resetTypeOfTempFields['name'] = '';
        resetTypeOfTempFields['description'] = '';
        resetTypeOfTempFields['reason'] = '';
        resetTypeOfTempFields['topic'] = '';
        resetTypeOfTempFields['checked'] = null;

        let resetValidations = {...this.state.Validations};
        resetValidations['selectedTypeBoolean'] = true;
        resetValidations['topic_requireReg'] = '';
        resetValidations['name_requireReg'] = '';
        resetValidations['description_requireReg'] = '';
        resetValidations['reason_requireReg'] = '';
        resetValidations['addInputContentInModal_requiredReg'] = '';

        this.setState({tempFields: resetTypeOfTempFields})
        this.setState({Validations: resetValidations})
    }

    handleOpenType = () => {
        this.setState({showType: true});
    }

    handleCloseType = () => {
        this.setState({showType: false});
    }

    handleAlignment = (event, newAlignment) => {
        let updatedTempFields = {...this.state.tempFields};
        updatedTempFields['type'] = newAlignment;
        this.setState({tempFields: updatedTempFields});
    }

    handleInputChange = (e, fieldName) => {
        let updatedTempFields = {...this.state.tempFields};
        updatedTempFields[fieldName] = e.target.value;
        this.setState({tempFields: updatedTempFields});
    }

    handleIsValid = () => {
        // e.preventDefault();
        let regCheck = /^\s*$/;

        let topic_requireReg = !regCheck.test(this.state.tempFields.topic);
        // let selectedTypeBoolean = this.state.tempFields.type !== undefined && this.state.tempFields.type !== null;
        let selectedTypeBoolean = this.state.tempFields.type !== null;
        let name_requireReg = !regCheck.test(this.state.tempFields.name);
        let description_requireReg = !regCheck.test(this.state.tempFields.description);
        let reason_requireReg = !regCheck.test(this.state.tempFields.reason);

        this.handleValidations([topic_requireReg, selectedTypeBoolean, name_requireReg, description_requireReg, reason_requireReg],
            ['topic_requireReg', 'selectedTypeBoolean', 'name_requireReg', 'description_requireReg', 'reason_requireReg'])

        return topic_requireReg && selectedTypeBoolean && name_requireReg && description_requireReg && reason_requireReg;

    }

    handleSubmit = async () => {
        const date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0')
        let year = date.getFullYear();
        let date2 = year + "/" + month + "/" + day + " " + "00:" + "00:" + "00";

        this.setState({loading: true})

        axios.post('https://api.saadatportal.com/api/v1/supervisor/request', {
            dateOfRegistration: date2,
            name: this.state.tempFields.topic,
            type: this.state.tempFields.type,
            reason: this.state.tempFields.reason,
            status: "todo",
            checked: null,
            supervisorId: "6666666",
            description: this.state.tempFields.description,
            assignee: this.state.tempFields.name
        }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then(async (data) => {
                this.setState({loading: false})
                const newRequest = data;
                const updatedRequests = [...this.state.requests]
                updatedRequests.push(newRequest)
                this.setState({requests: updatedRequests})
            }).catch(() => {
            if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/request', {
                                dateOfRegistration: date2,
                                name: this.state.tempFields.topic,
                                type: this.state.tempFields.type,
                                reason: this.state.tempFields.reason,
                                status: "todo",
                                checked: null,
                                supervisorId: "6666666",
                                description: this.state.tempFields.description,
                                assignee: this.state.tempFields.name
                            }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then(async (data) => {
                                    this.setState({loading: false})
                                    const newRequest = data
                                    const updatedRequests = [...this.state.requests]
                                    updatedRequests.push(newRequest)
                                    this.setState({requests: updatedRequests})
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})

        this.setState({showType: false})
        await this.componentDidMount()
    }

    handleValidations = (valueOfField, nameOfField) => {
        let updatedValidations = {...this.state.Validations};

        for (let i = 0; i < valueOfField.length; i++) {
            updatedValidations[nameOfField[i]] = valueOfField[i];
        }

        this.setState({Validations: updatedValidations});

    }

    handleSearchInput = async (e) =>{
        const value = e.target.value;
        this.setState({cardsLoading: true})
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/request/search?${this.state.searchBase}=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({requests: data});
                this.setState({cardsLoading: false})
            }).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/request/search?${this.state.searchBase}=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({requests: data});
                                    this.setState({cardsLoading: false})
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/request/search?${this.state.searchBase}=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({requests: data});
                                    this.setState({cardsLoading: false})
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    handleCloseFailureModal = () => {
        this.setState({failureModalShow: false})
    }

    handleSubmitDone = () => {
        if (this.state.tempIsDone === "done") {
            axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${this.state.tempRequest.id}`, {
                status: "done",
                statusDescription: this.state.tempDescription
            }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then(async (data) => {
                    this.setState({loading: false})
                }).catch(() => {
                if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${this.state.tempRequest.id}`, {
                                    status: "done",
                                    statusDescription: this.state.tempDescription
                                }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then(async (data) => {
                                        this.setState({loading: false})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
            this.setState({showEditDoneModal: false, tempDescription: ""})
        } else if (this.state.tempIsDone === "todo" || this.state.tempIsDone === "inProgress") {
            axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${this.state.tempRequest.id}`, {
                status: this.state.tempIsDone,
            }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then(async (data) => {
                    this.setState({loading: false})
                }).catch(() => {
                if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/request/${this.state.tempRequest.id}`, {
                                    status: this.state.tempIsDone,
                                }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then(async (data) => {
                                        this.setState({loading: false})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
            this.setState({showEditDoneModal: false, tempDescription: ""})
        }
        this.setState({showEditDoneModal: false, tempDescription: ""})
        this.componentDidMount()
    }
}

export default RequestPage;