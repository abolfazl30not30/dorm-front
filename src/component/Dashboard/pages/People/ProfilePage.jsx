import React, {Component, createRef} from 'react'
import '../../../../style/profilePage.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Modal} from 'react-bootstrap'
import {AiOutlineClose} from 'react-icons/ai'
import {AiFillCloseCircle} from 'react-icons/ai'
import {RiDownloadCloud2Fill} from 'react-icons/ri'
import {Accordion} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import BuildingContext from "../../../../contexts/Building";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Box, Button, CircularProgress} from "@mui/material";
import {green} from "@mui/material/colors";
import axios from "axios";

class ProfilePage extends Component {

    static contextType = BuildingContext;

    state = {
        dateValues: {
            cleaningDate: '',
            delayInArrivalDate: '',
            delayInArriveTime: '',
            exitStartDate: '',
            exitEndDate: '',
            violationDate: '',
            violationTime: '',
            dischargeDateAnnounce: '',
            dischargeDate: '',
            depositReturnDate: '',
            cancelContractDate: '',
        },
        person: {},
        show: false,
        reportType: 'cleaning',
        personObject: {},
        report: [],
        showDeleteModalReport: false,
        reportTemp: {},
        docFile: {},
        fileDetails: [],
        profileImgUrl: null,
        hasBirthPage1: false,
        hasBirthPage2: false,
        hasBirthPage3: false,
        hasBirthPage4: false,
        hasBirthAllPage: false,
        hasCartPage1: false,
        hasCartPage2: false,
        hasCartAllPage: false,
        hasPersonnelImg: false,
        hasRegister: false,
        hasRegisterUni: false,
        registerLoading: false,
        printLoading: false
    }
    date = createRef();
    description = createRef();
    time = createRef();
    startDate = createRef();
    endDate = createRef();
    destinationAddress = createRef();
    destinationPhoneNumber = createRef();
    relation = createRef();
    typePenalty = createRef();
    dischargeDateAnnounce = createRef();
    dischargeDate = createRef();
    depositReturnDate = createRef();
    deductionOfLosses = createRef();
    deductionOfLossesReason = createRef();
    refundableAmount = createRef();
    reason = createRef();
    penaltyAmount = createRef();

    async componentDidMount() {
        let parentId = ""
        let profileId = ""
        const personId = window.location.href.slice(-32)

        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${personId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                    this.setState({
                        person: data
                    })
                parentId = data.parentId;
                profileId = data.profileId
                }
            ).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${personId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({
                                        person: data
                                    })
                                    parentId = data.parentId;
                                    profileId = data.profileId
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${personId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({
                                        person: data
                                    })
                                    parentId = data.parentId;
                                    profileId = data.profileId
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        // await fetch(`https://api.saadatportal.com/api/v1/person/${parentId}`).then((response) => response.json())
        //     .then((data) => this.setState({personObject: data}));

        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/person/${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                    this.setState({
                        personObject: data
                    })
                }
            ).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${personId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({
                                        personObject: data
                                    })
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${personId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({
                                        personObject: data
                                    })
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})

        if (this.state.person.profileId !== null) {
            // await fetch(`https://api.saadatportal.com/api/v1/file/${profileId}`).then((response) => response.blob())
            //     .then((data) => {
            //         const objectUrl = URL.createObjectURL(data);
            //         this.setState({profileImgUrl: objectUrl})
            //     });

            await axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${profileId}`, { responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => {
                        const objectUrl = URL.createObjectURL(data);
                        this.setState({profileImgUrl: objectUrl})
                    }
                ).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${profileId}`, { responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        const objectUrl = URL.createObjectURL(data);
                                        this.setState({profileImgUrl: objectUrl})
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
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${profileId}`, { responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        const objectUrl = URL.createObjectURL(data);
                                        this.setState({profileImgUrl: objectUrl})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        }

        // await fetch(`https://api.saadatportal.com/api/v1/responseFile/search?parentType=Person&parentId=${parentId}`).then((response) => response.json())
        //     .then((data) => this.setState({fileDetails: data}, () => {
        //         this.setState({docFile: this.state.personObject.files});
        //         this.setState({report: this.state.personObject.record}, () => {
        //         });
        //         this.existDocFile(this.state.personObject.files);
        //     }));

        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/responseFile/search?parentType=Person&parentId=${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                    this.setState({
                        fileDetails: data
                    })
                    this.setState({docFile: this.state.personObject.files});
                    this.setState({report: this.state.personObject.record}, () => {
                    });
                    this.existDocFile(this.state.personObject.files);
                }
            ).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/responseFile/search?parentType=Person&parentId=${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({
                                        fileDetails: data
                                    })
                                    this.setState({docFile: this.state.personObject.files});
                                    this.setState({report: this.state.personObject.record}, () => {
                                    });
                                    this.existDocFile(this.state.personObject.files);
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/responseFile/search?parentType=Person&parentId=${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({
                                        fileDetails: data
                                    })
                                    this.setState({docFile: this.state.personObject.files});
                                    this.setState({report: this.state.personObject.record}, () => {
                                    });
                                    this.existDocFile(this.state.personObject.files);
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})

    }

    render() {
        return (
            <>
                <div className="px-3 mb-5">
                    <div className="d-flex flex-column container">
                        <div className="d-flex flex-row justify-content-center profile-card">
                            <div className={'d-flex flex-md-row flex-column align-items-center'}>
                                <img
                                    src={this.state.profileImgUrl !== null ? (this.state.profileImgUrl) : ("https://cdn-icons-png.flaticon.com/512/149/149071.png")}
                                    alt="profile"/>
                                <div className={'me-3 d-flex flex-column justify-content-center'}>
                                    <div
                                        className="people-name mb-3">{this.state.person.firstName} {this.state.person.lastName}</div>
                                    <div className="d-flex flex-md-row flex-column flex-wrap">
                                        <div className="people-item"><i className="bi bi-upc-scan ms-2"></i>????
                                            ??????: {this.state.person.nationalCode}</div>
                                        <div className="people-item"><i className="bi bi-telephone ms-2"></i>??????????
                                            ????????: {this.state.person.phoneNumber}</div>
                                        <div className="people-item"><i className="bi bi-person ms-2"></i>??????
                                            ??????: {this.state.person.fatherName}</div>
                                        <div className="people-item">
                                            <i className="bi bi-person ms-2"></i>
                                            ?????? ??????????????:
                                            {(() => {
                                                switch (this.state.person.personType) {
                                                    case 'constant':
                                                        return '?????????????? ????????';
                                                    case 'familyGuest':
                                                        return '???????????? ???????? ????';
                                                    case 'otherGuest':
                                                        return '????????????';
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab">
                            <Tabs
                                defaultActiveKey="more-information"
                                id="uncontrolled-tab-example"
                                className="border-0 w-100"
                            >
                                <Tab eventKey="more-information" title="?????????????? ??????????"
                                     style={{backgroundColor: "transparent"}}>
                                    <div className="tabs-content">
                                        <div className={"d-flex justify-content-end"}>
                                            <Box sx={{ m: 1, position: 'relative' }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: "#DB9B31",
                                                        color: "white",
                                                        ":hover": {backgroundColor: "#DB9B31", color: "black"}
                                                    }}
                                                    disabled={this.state.printLoading}
                                                    onClick={this.printInformation}
                                                >
                                                    ?????? ??????????????
                                                </Button>
                                                {this.state.printLoading && (
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
                                        </div>
                                        {(() => {
                                            switch (this.state.person.personType) {
                                                case 'constant':
                                                    return <>
                                                        <div className="information d-flex flex-row flex-wrap">
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? :</label>
                                                                    {this.state.person.firstName}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ???????????????? :</label>
                                                                    {this.state.person.lastName}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???? ?????? :</label>
                                                                    {this.state.person.nationalCode}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????????????? :</label>
                                                                    {this.state.person.certificateNumber}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ???????? :</label>
                                                                    {this.state.person.placeOfIssue}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? :</label>
                                                                    {this.state.person.birthDate.split(" ")[0]}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? :</label>
                                                                    {this.state.person.nationality}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ?????? :</label>
                                                                    {this.state.person.fatherName}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? :</label>
                                                                    {(() => {
                                                                        switch (this.state.person.religion) {
                                                                            case 'islam':
                                                                                return '??????????';
                                                                            case 'christianity':
                                                                                return '????????????';
                                                                            case 'hinduism':
                                                                                return '????????????????';
                                                                            case 'buddhism':
                                                                                return '???????? ????????????';
                                                                            case 'other':
                                                                                return '????????';
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? :</label>
                                                                    {this.state.person.subReligion !== "" ? this.state.person.subReligion : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????????? ?????? ?????????? :</label>
                                                                    {this.state.person.university !== "" ? this.state.person.university : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????????????? :</label>
                                                                    {this.state.person.studentNumber !== "" ? this.state.person.studentNumber : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ?????? :</label>
                                                                    {this.state.person.fatherJob !== "" ? this.state.person.fatherJob : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? :</label>
                                                                    {(() => {
                                                                        switch (this.state.person.maritalStatus) {
                                                                            case 'single':
                                                                                return '????????';
                                                                            case 'married':
                                                                                return '??????????';
                                                                            case 'divorced':
                                                                                return '????????????';
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                            {(() => {
                                                                switch (this.state.person.maritalStatus) {
                                                                    case 'married':
                                                                        return <>
                                                                            <div className='col-12 col-md-4'>
                                                                                <div className="more-info-item">
                                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                                    <label> ?????? ?? ?????? ???????????????? ????????
                                                                                        :</label>
                                                                                    {this.state.person.spouseFullName !== "" ? this.state.person.spouseFullName : '?????? ????????'}
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-12 col-md-4'>
                                                                                <div className="more-info-item">
                                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                                    <label> ?????? ???????? :</label>
                                                                                    {this.state.person.spouseJob !== "" ? this.state.person.spouseJob : '?????? ????????'}
                                                                                </div>
                                                                            </div>
                                                                        </>;
                                                                }
                                                            })()}
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????????? ?????? :</label>
                                                                    {(() => {
                                                                        switch (this.state.person.health) {
                                                                            case true:
                                                                                return '??????';
                                                                            case false:
                                                                                return '??????';
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                            {(() => {
                                                                switch (this.state.person.health) {
                                                                    case true:
                                                                        return <>
                                                                            <div className='col-12 col-md-4'>
                                                                                <div className="more-info-item">
                                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                                    <label> ?????????????? ???????????? :</label>
                                                                                    {this.state.person.healthyStatus !== "" ? this.state.person.healthyStatus : '?????? ????????'}
                                                                                </div>
                                                                            </div>
                                                                        </>;
                                                                }
                                                            })()}
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ?????????? ?????????????? :</label>
                                                                    {this.state.person.phoneNumber}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? ???????? :</label>
                                                                    {this.state.person.telephoneNumber}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? ?????????? :</label>
                                                                    {this.state.person.timePeriod.startDate}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ?????????? ?????????? :</label>
                                                                    {this.state.person.timePeriod.endDate.split(" ")[0]}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? ?????? ?????????? :</label>
                                                                    {this.state.person.address}
                                                                </div>
                                                            </div>
                                                            <div className="col-12 my-2 me-3"
                                                                 style={{fontSize: '.9rem', fontWeight: '600'}}>????????????
                                                                ????????????(?????? ??????)
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ?? ?????? ???????????????? :</label>
                                                                    {this.state.person.firstPersonFullName}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? :</label>
                                                                    {this.state.person.firstPersonPhoneNumber}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ?????? :</label>
                                                                    {this.state.person.firstPersonFatherName !== "" ? this.state.person.firstPersonFatherName : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? ???? ?????????????? :</label>
                                                                    {(() => {
                                                                        switch (this.state.person.firstPersonRelationshipWithResident) {
                                                                            case 'father':
                                                                                return '??????';
                                                                            case 'mother':
                                                                                return '????????';
                                                                            case 'sister':
                                                                                return '??????????';
                                                                            case 'brother':
                                                                                return '??????????';
                                                                            case 'other':
                                                                                return '????????';
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                            <div className="col-12 my-2 me-3"
                                                                 style={{fontSize: '.9rem', fontWeight: '600'}}>????????????
                                                                ????????????(?????? ??????)
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ?? ?????? ???????????????? :</label>
                                                                    {this.state.person.secondPersonFullName}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? :</label>
                                                                    {this.state.person.secondPersonPhoneNumber}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ?????? :</label>
                                                                    {this.state.person.secondPersonFatherName !== "" ? this.state.person.secondPersonFatherName : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? ???? ?????????????? :</label>
                                                                    {(() => {
                                                                        switch (this.state.person.secondPersonRelationshipWithResident) {
                                                                            case 'father':
                                                                                return '??????';
                                                                            case 'mother':
                                                                                return '????????';
                                                                            case 'sister':
                                                                                return '??????????';
                                                                            case 'brother':
                                                                                return '??????????';
                                                                            case 'other':
                                                                                return '????????';
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>;
                                                case 'familyGuest':
                                                    return <>
                                                        <div className="information d-flex flex-row flex-wrap">
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? :</label>
                                                                    {this.state.person.firstName}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ???????????????? :</label>
                                                                    {this.state.person.lastName}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? ???? ?????????????? :</label>
                                                                    {(() => {
                                                                        switch (this.state.person.relationshipWithResident) {
                                                                            case 'father':
                                                                                return '??????';
                                                                            case 'mother':
                                                                                return '????????';
                                                                            case 'sister':
                                                                                return '??????????';
                                                                            case 'brother':
                                                                                return '??????????';
                                                                            case 'other':
                                                                                return '????????';
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???? ?????? :</label>
                                                                    {this.state.person.nationalCode}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????????????? :</label>
                                                                    {this.state.person.certificateNumber}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????? ???????? :</label>
                                                                    {this.state.person.placeOfIssue !== "" ? this.state.person.placeOfIssue : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? :</label>
                                                                    {this.state.person.birthDate !== "" ? this.state.person.birthDate.split(" ")[0] : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? ?????????? :</label>
                                                                    {this.state.person.timePeriod.startDate.split(" ")[0]}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ?????????? ?????????? :</label>
                                                                    {this.state.person.timePeriod.endDate.split(" ")[0]}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????????? :</label>
                                                                    {this.state.person.paymentDate}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? ???????????? ?????????? :</label>
                                                                    {this.state.person.depositPaymentAmount !== "" ? this.state.person.depositPaymentAmount : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? ???????????? ?????????? :</label>
                                                                    {this.state.person.rentPaymentAmount !== "" ? this.state.person.rentPaymentAmount : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? ???????????? ?????????? :</label>
                                                                    {this.state.person.discountPaymentAmount !== "" ? this.state.person.discountPaymentAmount : '?????? ????????'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ???????? ?????? ?????????? :</label>
                                                                    {this.state.person.address}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ?????????? ?????????????? :</label>
                                                                    {this.state.person.phoneNumber}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> ?????????? ???????? ???????? :</label>
                                                                    {this.state.person.telephoneNumber}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>;
                                                case 'otherGuest':
                                                    return <>
                                                        <div>otherGuest</div>
                                                    </>;
                                            }
                                        })()}
                                    </div>
                                </Tab>
                                <Tab eventKey="records" title="??????????" style={{backgroundColor: "transparent"}}>
                                    <div className="tabs-content">
                                        <button className='btn-done mx-3' onClick={() => {
                                            this.handleShow()
                                            this.handleResetFields();
                                        }}>?????? ??????????
                                        </button>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>???????? ?????????? ??????????</Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <thead>
                                                        <tr>
                                                            {/*<th>??????????</th>*/}
                                                            <th>??????????</th>
                                                            <th>??????????????</th>
                                                            <th>????????????</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.report.map((c, i) => (
                                                                c.title === 'cleaning' ? (
                                                                    <tr>
                                                                        {/*<td>{a+1}</td>*/}
                                                                        <td>{c.date}</td>
                                                                        <td>{c.description}</td>
                                                                        <td>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip className="deleteTooltip">
                                                                                        ??????
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <button className='btn floor-close-btn'
                                                                                        onClick={() => this.handleOpenModalReport(c)}>
                                                                                    <AiFillCloseCircle color="#F1416C"/>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </td>
                                                                    </tr>
                                                                ) : null
                                                            ))
                                                        }
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>?????????? ???? ????????</Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <thead>
                                                        <tr>
                                                            {/*<th>??????????</th>*/}
                                                            <th>??????????</th>
                                                            <th>????????</th>
                                                            <th>????????????</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.report.map((d, i) => (

                                                                d.title === 'delayInArrival' ? (
                                                                    <tr>
                                                                        {/*<td>{i+1}</td>*/}
                                                                        <td>{d.date}</td>
                                                                        <td>{d.hour}</td>
                                                                        <td>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip className="deleteTooltip">
                                                                                        ??????
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <button className='btn floor-close-btn'
                                                                                        onClick={() => this.handleOpenModalReport(d)}>
                                                                                    <AiFillCloseCircle color="#F1416C"/>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    console.log()
                                                                )
                                                            ))
                                                        }
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>????????</Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <thead>
                                                        <tr>
                                                            {/*<th>??????????</th>*/}
                                                            <th>???? ??????????</th>
                                                            <th>???? ??????????</th>
                                                            <th>???????? ????????</th>
                                                            <th>?????????? ???????? ????????</th>
                                                            <th>????????</th>
                                                            <th>????????????</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.report.map((e, i) => (

                                                                e.title === 'exit' ? (
                                                                    <tr>
                                                                        {/*<td>{i+1}</td>*/}
                                                                        <td>{e.startDate}</td>
                                                                        <td>{e.endDate}</td>
                                                                        <td>{e.destinationAddress}</td>
                                                                        <td>{e.destinationPhoneNumber}</td>
                                                                        <td>{e.relation}</td>
                                                                        <td>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip className="deleteTooltip">
                                                                                        ??????
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <button className='btn floor-close-btn'
                                                                                        onClick={() => this.handleOpenModalReport(e)}>
                                                                                    <AiFillCloseCircle color="#F1416C"/>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    console.log()
                                                                )
                                                            ))
                                                        }
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header>?????? ????????</Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <thead>
                                                        <tr>
                                                            {/*<th>??????????</th>*/}
                                                            <th>?????????? ????????</th>
                                                            <th>??????????</th>
                                                            <th>????????</th>
                                                            <th>????????????</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.report.map((v, i) => (

                                                                v.title === 'violation' ? (
                                                                    <tr>
                                                                        {/*<td>{i+1}</td>*/}
                                                                        <td>{v.description}</td>
                                                                        <td>{v.date}</td>
                                                                        <td>{v.hour}</td>
                                                                        <td>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip className="deleteTooltip">
                                                                                        ??????
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <button className='btn floor-close-btn'
                                                                                        onClick={() => this.handleOpenModalReport(v)}>
                                                                                    <AiFillCloseCircle color="#F1416C"/>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    console.log()
                                                                )
                                                            ))
                                                        }
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4">
                                                <Accordion.Header>?????? ??????????</Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <thead>
                                                        <tr>
                                                            {/*<th>??????????</th>*/}
                                                            <th>?????? ??????????</th>
                                                            <th>?????????? ??????????</th>
                                                            <th>???????? ??????????</th>
                                                            <th>????????????</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.report.map((p, i) => (

                                                                p.title === 'penalty' ? (
                                                                    <tr>
                                                                        <td>{p.penaltyType === "financial" ? ("????????") : ("????????????")}</td>
                                                                        <td>{p.penaltyAmount}</td>
                                                                        <td>{p.description}</td>
                                                                        <td>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip className="deleteTooltip">
                                                                                        ??????
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <button className='btn floor-close-btn'
                                                                                        onClick={() => this.handleOpenModalReport(p)}>
                                                                                    <AiFillCloseCircle color="#F1416C"/>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    console.log()
                                                                )
                                                            ))
                                                        }
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="5">
                                                <Accordion.Header>?????????? ??????????</Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <thead>
                                                        <tr>
                                                            {/*<th>??????????</th>*/}
                                                            <th>?????????? ?????????? ??????????</th>
                                                            <th>?????????? ??????????</th>
                                                            <th>?????????? ???????? ??????????</th>
                                                            <th>?????? ?????? ?? ????????</th>
                                                            <th>?????? ?????? ???? ?? ????????</th>
                                                            <th>???????? ???????? ????????</th>
                                                            <th>????????????</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.report.map((d, i) => (

                                                                d.title === 'discharge' ? (
                                                                    <tr>
                                                                        {/*<td>{i+1}</td>*/}
                                                                        <td>{d.startDate}</td>
                                                                        <td>{d.endDate}</td>
                                                                        <td>{d.date}</td>
                                                                        <td>{d.penaltyAmount}</td>
                                                                        <td>{d.description}</td>
                                                                        <td>{d.returnedAmount}</td>
                                                                        <td>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip className="deleteTooltip">
                                                                                        ??????
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <button className='btn floor-close-btn'
                                                                                        onClick={() => this.handleOpenModalReport(d)}>
                                                                                    <AiFillCloseCircle color="#F1416C"/>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    console.log()
                                                                )
                                                            ))
                                                        }
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="6">
                                                <Accordion.Header>?????? ??????????????</Accordion.Header>
                                                <Accordion.Body>
                                                    <Table>
                                                        <thead>
                                                        <tr>
                                                            {/*<th>??????????</th>*/}
                                                            <th>??????????</th>
                                                            <th>??????</th>
                                                            <th>?????? ?????? ?? ????????</th>
                                                            <th>???????? ???????? ????????</th>
                                                            <th>????????????</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.report.map((cc, i) => (

                                                                cc.title === 'cancelContract' ? (
                                                                    <tr>
                                                                        {/*<td>{i+1}</td>*/}
                                                                        <td>{cc.date}</td>
                                                                        <td>{cc.description}</td>
                                                                        <td>{cc.penaltyAmount}</td>
                                                                        <td>{cc.returnedAmount}</td>
                                                                        <td>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip className="deleteTooltip">
                                                                                        ??????
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <button className='btn floor-close-btn'
                                                                                        onClick={() => this.handleOpenModalReport(cc)}>
                                                                                    <AiFillCloseCircle color="#F1416C"/>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </td>
                                                                    </tr>
                                                                ) : (
                                                                    console.log()
                                                                )
                                                            ))
                                                        }
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Tab>
                                <Tab eventKey="documents" title="??????????" className='records'
                                     style={{backgroundColor: "transparent"}}>
                                    <div className="tabs-content">
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>????????????????</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="d-flex flex-column">
                                                        {
                                                            this.state.hasBirthPage1 && (
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip className="deleteTooltip">
                                                                            ????????????
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthPage1)}>
                                                                        <div className='ms-2'>???????? ??????</div>
                                                                        <RiDownloadCloud2Fill/>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            )
                                                        }

                                                        {
                                                            this.state.hasBirthPage2 && (
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip className="deleteTooltip">
                                                                            ????????????
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthPage2)}>
                                                                        <div className='ms-2'>???????? ??????</div>
                                                                        <RiDownloadCloud2Fill/>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            )
                                                        }
                                                        {
                                                            this.state.hasBirthPage3 && (
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip className="deleteTooltip">
                                                                            ????????????
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthPage3)}>
                                                                        <div className='ms-2'>???????? ??????</div>
                                                                        <RiDownloadCloud2Fill/>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            )
                                                        }
                                                        {
                                                            this.state.hasBirthPage4 && (
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip className="deleteTooltip">
                                                                            ????????????
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthPage4)}>
                                                                        <div className='ms-2'>???????? ??????????</div>
                                                                        <RiDownloadCloud2Fill/>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            )
                                                        }
                                                        {
                                                            this.state.hasBirthAllPage && (
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip className="deleteTooltip">
                                                                            ????????????
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthAllPage)}>
                                                                        <div className='ms-2'>???? ??????????</div>
                                                                        <RiDownloadCloud2Fill/>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            )
                                                        }
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>???????? ??????</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.state.hasCartPage1 && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        ????????????
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.cardPage1)}>
                                                                    <div className='ms-2'>???????? ??????</div>
                                                                    <RiDownloadCloud2Fill/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                    {
                                                        this.state.hasCartPage2 && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        ????????????
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.cardPage2)}>
                                                                    <div className='ms-2'>???????? ??????</div>
                                                                    <RiDownloadCloud2Fill/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                    {
                                                        this.state.hasCartAllPage && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        ????????????
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.cardAllPage)}>
                                                                    <div className='ms-2'>???? ??????????</div>
                                                                    <RiDownloadCloud2Fill/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>?????? ????????????</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.state.hasPersonnelImg && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        ????????????
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.personnelImg)}>
                                                                    <div className='ms-2'>?????? ????????????</div>
                                                                    <RiDownloadCloud2Fill/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header>?????????? ?????? ?????? </Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.state.hasRegister && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        ????????????
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.register)}>
                                                                    <div className='ms-2'>?????????? ?????? ??????</div>
                                                                    <RiDownloadCloud2Fill/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4">
                                                <Accordion.Header>?????????? ?????? ?????? ??????????????</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.state.hasRegisterUni && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        ????????????
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.registerUni)}>
                                                                    <div className='ms-2'> ?????? ?????? ??????????????</div>
                                                                    <RiDownloadCloud2Fill color="#000"/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <Modal className='report-modal' centered show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title><span>?????? ??????????</span></Modal.Title>
                        <button className='btn' onClick={() => {
                            this.handleClose()
                        }}><AiOutlineClose/></button>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="my-3 mx-2" onSubmit={this.handleSubmit}>
                            <div className='input-report-box'>
                                <select className='input' onChange={(e) => {
                                    this.reportType(e);
                                    this.handleResetFields();
                                }}>
                                    <option value='cleaning'>???????? ?????????? ??????????</option>
                                    <option value='delayInArrival'>?????????? ???? ????????</option>
                                    <option value='exit'>????????</option>
                                    <option value='violation'>?????? ????????</option>
                                    <option value='penalty'>?????? ??????????</option>
                                    <option value='discharge'>?????????? ??????????</option>
                                    <option value='cancelContract'>?????? ??????????????</option>
                                </select>
                                <label className="placeholder">?????? ??????????</label>
                            </div>
                            {(() => {
                                switch (this.state.reportType) {
                                    case 'cleaning':
                                        return <>
                                            <div className='input-report-box'>
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    inputClass={"input form-control date-picker"}
                                                    ref={this.date}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.cleaningDate}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.cleaningDate = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.cleaningDate = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                {/*<input type="text" ref={this.date} className="input" placeholder=" "/>*/}
                                                <label className="placeholder">??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.description} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">??????????????</label>
                                            </div>
                                        </>;
                                    case 'delayInArrival':
                                        return <>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.date} className="input" placeholder=" "/>*/}
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    ref={this.date}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}
                                                    inputClass={`input form-control date-picker`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.delayInArrivalDate}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.delayInArrivalDate = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.delayInArrivalDate = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.time} className="input" placeholder=" "/>*/}
                                                <DatePicker
                                                    ref={this.time}
                                                    disableDayPicker
                                                    format="HH:mm:ss"
                                                    inputClass={`input form-control date-picker`}
                                                    containerStyle={{
                                                        width: "100%"
                                                    }}
                                                    value={this.state.dateValues.delayInArriveTime}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.delayInArriveTime = value;
                                                        this.setState({updatedDateValues})
                                                    }}
                                                    plugins={[
                                                        <TimePicker/>
                                                    ]}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.delayInArriveTime = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">????????</label>
                                            </div>
                                        </>;
                                    case 'exit':
                                        return <>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.startDate} className="input"*/}
                                                {/*       placeholder=" "/>*/}
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    ref={this.startDate}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}
                                                    inputClass={`input form-control date-picker`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.exitStartDate}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.exitStartDate = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.exitStartDate = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">???? ??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.endDate} className="input"*/}
                                                {/*       placeholder=" "/>*/}
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    ref={this.endDate}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}
                                                    inputClass={`input form-control date-picker`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.exitEndDate}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.exitEndDate = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.exitEndDate = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">???? ??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.destinationAddress} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">???????? ????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.destinationPhoneNumber} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">?????????? ???????? ????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.relation} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">????????</label>
                                            </div>
                                        </>;
                                    case 'violation':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.description} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">?????????? ????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.date} className="input" placeholder=" "/>*/}
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    ref={this.date}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}
                                                    inputClass={`input form-control date-picker`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.violationDate}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.violationDate = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.violationDate = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.time} className="input" placeholder=" "/>*/}
                                                <DatePicker
                                                    ref={this.time}
                                                    disableDayPicker
                                                    format="HH:mm:ss"
                                                    inputClass={`input form-control date-picker`}
                                                    containerStyle={{
                                                        width: "100%"
                                                    }}
                                                    value={this.state.dateValues.violationTime}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.violationTime = value;
                                                        this.setState({updatedDateValues})
                                                    }}
                                                    plugins={[
                                                        <TimePicker/>
                                                    ]}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.violationTime = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">????????</label>
                                            </div>
                                        </>;
                                    case 'penalty':
                                        return (<>
                                            <div className='input-report-box'>
                                                <select ref={this.typePenalty} className='input'>
                                                    <option value='financial'>????????</option>
                                                    <option value='nonFinancial'>????????????</option>
                                                </select>
                                                <label className="placeholder">?????? ??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.penaltyAmount} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">?????????? ??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.description} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">???????? ??????????</label>
                                            </div>

                                        </>);
                                    case 'discharge':
                                        return <>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.dischargeDateAnnounce} className="input"*/}
                                                {/*       placeholder=" "/>*/}
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    ref={this.dischargeDateAnnounce}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}
                                                    inputClass={`input form-control date-picker`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.dischargeDateAnnounce}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.dischargeDateAnnounce = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.dischargeDateAnnounce = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">?????????? ?????????? ??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.dischargeDate} className="input"*/}
                                                {/*       placeholder=" "/>*/}
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    ref={this.dischargeDate}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}
                                                    inputClass={`input form-control date-picker`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.dischargeDate}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.dischargeDate = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.dischargeDate = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">?????????? ??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.depositReturnDate} className="input"*/}
                                                {/*       placeholder=" "/>*/}
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    ref={this.depositReturnDate}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}
                                                    inputClass={`input form-control date-picker`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.depositReturnDate}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.depositReturnDate = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.depositReturnDate = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">?????????? ???????? ??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.deductionOfLosses} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">?????? ?????? ?? ????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.deductionOfLossesReason} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">?????? ?????? ???? ?? ????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.refundableAmount} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">???????? ???????? ????????</label>
                                            </div>
                                        </>;
                                    case 'cancelContract':
                                        return <>
                                            {/*<div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">??????</label>
                                            </div>*/}
                                            <div className='input-report-box'>
                                                {/*<input type="text" ref={this.date} className="input" placeholder=" "/>*/}
                                                <DatePicker
                                                    // fixMainPosition={false}
                                                    ref={this.date}
                                                    calendarPosition={`top`}
                                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                    format={`YYYY/MM/DD`}
                                                    inputClass={`input form-control date-picker`}


                                                    containerStyle={{
                                                        width: "100%"
                                                    }}

                                                    value={this.state.dateValues.cancelContractDate}
                                                    onChange={(value) => {
                                                        let updatedDateValues = {...this.state};
                                                        updatedDateValues.dateValues.cancelContractDate = value;
                                                        this.setState({updatedDateValues})
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
                                                            ["????????", "Sat"],
                                                            ["????????????", "Sun"],
                                                            ["????????????", "Mon"],
                                                            ["???? ????????", "Tue"],
                                                            ["????????????????", "Wed"],
                                                            ["??????????????", "Thu"],
                                                            ["????????", "Fri"],
                                                        ]
                                                    }

                                                    calendar={persian}
                                                    locale={persian_fa}

                                                >
                                                    <Button
                                                        onClick={() => {
                                                            let updatedDateValues = {...this.state};
                                                            updatedDateValues.dateValues.cancelContractDate = {};
                                                            this.setState({updatedDateValues})
                                                        }
                                                        }
                                                    >
                                                        ????????
                                                    </Button>
                                                </DatePicker>
                                                <label className="placeholder">??????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.reason} className="input" placeholder=" "/>
                                                <label className="placeholder">??????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.deductionOfLosses} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">?????? ?????? ?? ????????</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" ref={this.refundableAmount} className="input"
                                                       placeholder=" "/>
                                                <label className="placeholder">???????? ???????? ????????</label>
                                            </div>
                                        </>
                                }
                            })()}
                            <div className="input-report-box">
                                <button className='btn-done w-100' disabled={this.state.registerLoading}>??????</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal centered show={this.state.showDeleteModalReport}>
                    <Modal.Header>
                        <Modal.Title>?????? ??????????</Modal.Title>
                        <button className='btn' onClick={() => {
                            this.handleCloseModalReport()
                        }}><AiOutlineClose/></button>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>?????? ???? ?????? ?????? ?????????? ?????????? ????????????</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-danger" onClick={() => this.handleDeleteReport()}>??????</button>
                        <button className="btn btn-light" onClick={() => this.handleCloseModalReport()}>????????</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleResetFields = () => {
        let resetFields = {...this.state.dateValues};
        resetFields = {
            cleaningDate: '',
            delayInArrivalDate: '',
            exitStartDate: '',
            exitEndDate: '',
            violationDate: '',
            dischargeDateAnnounce: '',
            dischargeDate: '',
            depositReturnDate: '',
            cancelContractDate: '',
        }
        this.setState({dateValues: resetFields})

        console.log(this.state.dateValues)
    }
    handleClose = () => {
        this.setState({show: false})
    };
    handleShow = () => {
        this.setState({show: true})
    };
    reportType = (e) => {
        const type = e.target.value
        this.setState({reportType: type})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.dateValues.cleaningDate)
        const type = this.state.reportType;

        this.setState({reports: type});
        switch (type) {
            case 'cleaning':
                return (async () => {
                    this.setState({registerLoading: true});
                    const date = this.state.dateValues.cleaningDate;
                    const formattedDate = date.year + '/' + date.month + '/' + date.day
                    const description = this.description.current.value;
                    const result = {
                        'title': "cleaning",
                        'date': formattedDate,
                        'checkCleaning': true,
                        'description': description,
                        'personId': this.state.personObject.id
                    }

                    await axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        .then((data) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result);
                            this.setState({report: newReports});
                            this.setState({show: false});
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        })
                        .catch(() => {
                        if (localStorage.getItem('role') === 'MANAGER') {
                            axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                .then((response) => {
                                    if (response.headers["accesstoken"]) {
                                        localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                        axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                            .then((data) => {
                                                this.setState({registerLoading: false});
                                                const newReports = this.state.report.concat(result);
                                                this.setState({report: newReports});
                                                this.setState({show: false});
                                            })
                                            .catch((error) => {
                                                this.setState({registerLoading: false})
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
                                        axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                            .then((data) => {
                                                this.setState({registerLoading: false});
                                                const newReports = this.state.report.concat(result);
                                                this.setState({report: newReports});
                                                this.setState({show: false});
                                            })
                                            .catch((error) => {
                                                this.setState({registerLoading: false})
                                            })
                                    } else {
                                        window.location = '/'
                                    }
                                })
                        }})
                })();
            case 'delayInArrival':
                return (async () => {
                    this.setState({registerLoading: true});
                    const date = this.state.dateValues.delayInArrivalDate;
                    const formattedDate = date.year + '/' + date.month + '/' + date.day
                    const time = this.state.dateValues.delayInArriveTime;
                    const formattedTime = time.hour + ':' + time.minute;

                    const result = {
                        'title': "delayInArrival",
                        'date': formattedDate,
                        'hour': formattedTime,
                        'personId': this.state.personObject.id
                    }

                    await axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        .then((data) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result);
                            this.setState({report: newReports});
                            this.setState({show: false});
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        })
                        .catch(() => {
                            if (localStorage.getItem('role') === 'MANAGER') {
                                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                    .then((response) => {
                                        if (response.headers["accesstoken"]) {
                                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
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
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
                                                })
                                        } else {
                                            window.location = '/'
                                        }
                                    })
                            }})
                })();

            case 'exit':
                return (async () => {
                    this.setState({registerLoading: true});
                    const startDate = this.state.dateValues.exitStartDate;
                    const endDate = this.state.dateValues.exitEndDate;
                    const formattedStartDate = startDate.year + '/' + startDate.month + '/' + startDate.day;
                    const formattedEndDate = endDate.year + '/' + endDate.month + '/' + endDate.day;
                    const destinationAddress = this.destinationAddress.current.value;
                    const destinationPhoneNumber = this.destinationPhoneNumber.current.value;
                    const relation = this.relation.current.value;
                    const result = {
                        'title': "exit",
                        "startDate": formattedStartDate,
                        "endDate": formattedEndDate,
                        'destinationAddress': destinationAddress,
                        'destinationPhoneNumber': destinationPhoneNumber,
                        'relation': relation,
                        'personId': this.state.personObject.id
                    }

                    await axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        .then((data) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result);
                            this.setState({report: newReports});
                            this.setState({show: false});
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        })
                        .catch(() => {
                            if (localStorage.getItem('role') === 'MANAGER') {
                                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                    .then((response) => {
                                        if (response.headers["accesstoken"]) {
                                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
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
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
                                                })
                                        } else {
                                            window.location = '/'
                                        }
                                    })
                            }})

                })();

            case 'violation':
                return (async () => {

                    this.setState({registerLoading: true});

                    const date = this.state.dateValues.violationDate;
                    const formattedDate = date.year + '/' + date.month + '/' + date.day
                    const time = this.state.dateValues.violationTime;
                    const formattedTime = time.hour + ':' + time.minute
                    const description = this.description.current.value;
                    const result = {
                        'title': "violation",
                        'date': formattedDate,
                        'hour': formattedTime,
                        'description': description,
                        'personId': this.state.personObject.id
                    }

                    await axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        .then((data) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result);
                            this.setState({report: newReports});
                            this.setState({show: false});
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        })
                        .catch(() => {
                            if (localStorage.getItem('role') === 'MANAGER') {
                                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                    .then((response) => {
                                        if (response.headers["accesstoken"]) {
                                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
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
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
                                                })
                                        } else {
                                            window.location = '/'
                                        }
                                    })
                            }})

                })();
            case 'penalty':
                return (async () => {
                    this.setState({registerLoading: true});
                    const description = this.description.current.value;
                    const typePenalty = this.typePenalty.current.value;
                    const penaltyAmount = this.penaltyAmount.current.value;
                    const result = {
                        'title': "penalty",
                        'penaltyType': typePenalty,
                        'description': description,
                        'penaltyAmount': penaltyAmount,
                        'personId': this.state.personObject.id
                    }

                    await axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        .then((data) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result);
                            this.setState({report: newReports});
                            this.setState({show: false});
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        })
                        .catch(() => {
                            if (localStorage.getItem('role') === 'MANAGER') {
                                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                    .then((response) => {
                                        if (response.headers["accesstoken"]) {
                                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
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
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
                                                })
                                        } else {
                                            window.location = '/'
                                        }
                                    })
                            }})

                })();
            case 'discharge':
                return (async () => {
                    this.setState({registerLoading: true});
                    const dischargeDateAnnounce = this.state.dateValues.dischargeDateAnnounce;
                    const dischargeDate = this.state.dateValues.dischargeDate;
                    const depositReturnDate = this.state.dateValues.depositReturnDate;

                    let formattedDischargeDateAnnounce = dischargeDateAnnounce.year + '/' + dischargeDateAnnounce.month + '/' + dischargeDateAnnounce.day;
                    let formattedDischargeDate = dischargeDate.year + '/' + dischargeDate.month + '/' + dischargeDate.day;
                    let formattedDepositReturnDate = depositReturnDate.year + '/' + depositReturnDate.month + '/' + depositReturnDate.day;

                    const deductionOfLosses = this.deductionOfLosses.current.value;
                    const deductionOfLossesReason = this.deductionOfLossesReason.current.value;
                    const refundableAmount = this.refundableAmount.current.value;
                    const result = {
                        'title': "discharge",
                        'startDate': formattedDischargeDateAnnounce,
                        'endDate': formattedDischargeDate,
                        'date': formattedDepositReturnDate,
                        'penaltyAmount': deductionOfLosses,
                        'description': deductionOfLossesReason,
                        'returnedAmount': refundableAmount,
                        'personId': this.state.personObject.id
                    }

                   await axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        .then((data) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result);
                            this.setState({report: newReports});
                            this.setState({show: false});
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        })
                        .catch(() => {
                            if (localStorage.getItem('role') === 'MANAGER') {
                                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                    .then((response) => {
                                        if (response.headers["accesstoken"]) {
                                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
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
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
                                                })
                                        } else {
                                            window.location = '/'
                                        }
                                    })
                            }})
                })();

            case 'cancelContract':
                return (async () => {
                    this.setState({registerLoading: true});
                    const date = this.state.dateValues.cancelContractDate;
                    const formattedDate = date.year + '/' + date.month + '/' + date.day;
                    const reason = this.reason.current.value;
                    const deductionOfLosses = this.deductionOfLosses.current.value;
                    const refundableAmount = this.refundableAmount.current.value;
                    const result = {
                        'title': "cancelContract",
                        'date': formattedDate,
                        'description': reason,
                        'penaltyAmount': deductionOfLosses,
                        'returnedAmount': refundableAmount,
                        'personId': this.state.personObject.id
                    }

                    await axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        .then((data) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result);
                            this.setState({report: newReports});
                            this.setState({show: false});
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        })
                        .catch(() => {
                            if (localStorage.getItem('role') === 'MANAGER') {
                                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                    .then((response) => {
                                        if (response.headers["accesstoken"]) {
                                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
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
                                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', result, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                                .then((data) => {
                                                    this.setState({registerLoading: false});
                                                    const newReports = this.state.report.concat(result);
                                                    this.setState({report: newReports});
                                                    this.setState({show: false});
                                                })
                                                .catch((error) => {
                                                    this.setState({registerLoading: false})
                                                })
                                        } else {
                                            window.location = '/'
                                        }
                                    })
                            }})
                })();
        }
    }
    handleOpenModalReport = (c) => {
        this.setState({showDeleteModalReport: true});
        this.setState({reportTemp: c});

    }
    handleCloseModalReport = () => {
        this.setState({showDeleteModalReport: false});
    }

    handleDeleteReport = async () => {
        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/record/${this.state.reportTemp.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                let index = this.state.report.indexOf(this.state.reportTemp)
                let updatedReport = [...this.state.report];
                updatedReport.splice(index, 1);
                this.setState({report: updatedReport});
                this.setState({showDeleteModalReport: false})
            })
            .catch((error) => {
                console.log(error);
                this.setState({showDeleteModalReport: false})
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/record/${this.state.reportTemp.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        let index = this.state.report.indexOf(this.state.reportTemp)
                                        let updatedReport = [...this.state.report];
                                        updatedReport.splice(index, 1);
                                        this.setState({report: updatedReport});
                                        this.setState({showDeleteModalReport: false})
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        this.setState({showDeleteModalReport: false})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"])
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/record/${this.state.reportTemp.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        let index = this.state.report.indexOf(this.state.reportTemp)
                                        let updatedReport = [...this.state.report];
                                        updatedReport.splice(index, 1);
                                        this.setState({report: updatedReport});
                                        this.setState({showDeleteModalReport: false})
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        this.setState({showDeleteModalReport: false})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
    }

    downloadFile = async (fileId) => {
        const file = this.state.fileDetails.find(({id}) => id === fileId);
        const filename = file.originalName;
        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${fileId}`, { responseType: 'blob' , headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((blob) => {
                if (blob !== null) {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${fileId}`, { responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((blob) => {
                                    if (blob !== null) {
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${fileId}`, { responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((blob) => {
                                    if (blob !== null) {
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
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
            }})
    }

    printInformation = async () => {
        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/report/${window.location.href.slice(-32)}`, { responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((blob) => {
                if (blob !== null) {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = this.state.person.fullName;
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/report/${window.location.href.slice(-32)}`, { responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((blob) => {
                                    if (blob !== null) {
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = this.state.person.fullName;
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/report/${window.location.href.slice(-32)}`, { responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((blob) => {
                                    if (blob !== null) {
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = this.state.person.fullName;
                                        document.body.appendChild(a);
                                        a.click();
                                        a.remove();
                                    }
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})

    }

    existDocFile = (docFile) => {
        if (docFile.hasOwnProperty('birthPage1')) {
            this.setState({hasBirthPage1: true});
        }
        if (docFile.hasOwnProperty('birthPage2')) {
            this.setState({hasBirthPage2: true});
        }
        if (docFile.hasOwnProperty('birthPage3')) {
            this.setState({hasBirthPage3: true});
        }
        if (docFile.hasOwnProperty('birthPage4')) {
            this.setState({hasBirthPage4: true});
        }
        if (docFile.hasOwnProperty('birthAllPage')) {
            this.setState({hasBirthAllPage: true});
        }
        if (docFile.hasOwnProperty('cardPage1')) {
            this.setState({hasCartPage1: true});
        }
        if (docFile.hasOwnProperty('cardPage2')) {
            this.setState({hasCartPage2: true});
        }
        if (docFile.hasOwnProperty('cardAllPage')) {
            this.setState({hasCartAllPage: true});
        }
        if (docFile.hasOwnProperty('personnelImg')) {
            this.setState({hasPersonnelImg: true});
        }
        if (docFile.hasOwnProperty('register')) {
            this.setState({hasRegister: true});
        }
        if (docFile.hasOwnProperty('registerUni')) {
            this.setState({hasRegisterUni: true});
        }
    }
}

export default ProfilePage