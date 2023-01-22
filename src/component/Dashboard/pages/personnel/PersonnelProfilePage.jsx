import React, {Component, createRef} from 'react'
import '../../../../style/profilePage.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BuildingContext from "../../../../contexts/Building";
import Accordion from 'react-bootstrap/Accordion';
import {RiDownloadCloud2Fill} from "react-icons/ri";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from "axios";

class PersonnelProfilePage extends Component {

    static contextType = BuildingContext;

    state = {
        personnel: {},
        show: false,
        reportType: 'cleaning',
        personnelObject: {},
        showDeleteModalReport: false,
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
        hasContract: false,
        registerLoading: false,
    }
    date = createRef();
    description = createRef();
    time = createRef();
    startDate = createRef();
    endDate = createRef();
    destinationAddress = createRef();
    destinationPhoneNumber = createRef();
    relation = createRef();

    reason = createRef();
    penaltyAmount = createRef();

    async componentDidMount() {
        let parentId = ""
        let profileId = ""
        const personnelId = window.location.href.slice(-32)
        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${personnelId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({
                    personnel: data,
                })
                parentId = data.parentId;
                profileId = data.profileId
            }).catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${personnelId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({
                                            personnel: data,
                                        })
                                        parentId = data.parentId;
                                        profileId = data.profileId
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
                                await axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${personnelId}`,
                                    {
                                        headers: {
                                            'Authorization': localStorage.getItem('accessToken'),
                                            'Access-Control-Allow-Origin': '*'
                                        }
                                    }).then(response => response.data)
                                    .then((data) => {
                                        this.setState({
                                            personnel: data,
                                        })
                                        parentId = data.parentId;
                                        profileId = data.profileId
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/personnel/${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                personnelObject: data,
            })).catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.get(`https://api.saadatportal.com/api/v1/supervisor/personnel/${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        personnelObject: data,
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
                                await axios.get(`https://api.saadatportal.com/api/v1/supervisor/personnel/${parentId}`,
                                    {
                                        headers: {
                                            'Authorization': localStorage.getItem('accessToken'),
                                            'Access-Control-Allow-Origin': '*'
                                        }
                                    }).then(response => response.data)
                                    .then((data) => this.setState({
                                        personnelObject: data,
                                    }))
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        if (this.state.personnel.profileId !== null) {
            await axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${profileId}`, {responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => {
                const objectUrl = URL.createObjectURL(data);
                this.setState({profileImgUrl: objectUrl})
            }).catch(async () => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then(async (response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    await axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${profileId}`, {
                                        responseType: 'blob',
                                        headers: {'Authorization': localStorage.getItem('accessToken')}
                                    }).then(response => response.data)
                                        .then((data) => {
                                            const objectUrl = URL.createObjectURL(data);
                                            this.setState({profileImgUrl: objectUrl})
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
                                    await axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${profileId}`, {
                                        responseType: 'blob',
                                        headers: {'Authorization': localStorage.getItem('accessToken')}
                                    }).then(response => response.data)
                                        .then((data) => {
                                            const objectUrl = URL.createObjectURL(data);
                                            this.setState({profileImgUrl: objectUrl})
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                    }
                })
        }


        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/responseFile/search?parentType=Personnel&parentId=${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({fileDetails: data}, () => {
                this.setState({docFile: this.state.personnelObject.files, report: this.state.personnelObject.record}, () => {
                    this.existDocFile(this.state.personnelObject.files);
                });
            }))
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.get(`https://api.saadatportal.com/api/v1/supervisor/responseFile/search?parentType=Personnel&parentId=${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({fileDetails: data}, () => {
                                        this.setState({
                                            docFile: this.state.personnelObject.files,
                                            report: this.state.personnelObject.record
                                        }, () => {
                                            console.log(123, this.state.personnelObject, this.state.personnel)
                                            this.existDocFile(this.state.personnelObject.files);
                                        });
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
                                await axios.get(`https://api.saadatportal.com/api/v1/supervisor/responseFile/search?parentType=Personnel&parentId=${parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({fileDetails: data}, () => {
                                        this.setState({
                                            docFile: this.state.personnelObject.files,
                                            report: this.state.personnelObject.record
                                        }, () => {
                                            console.log(123, this.state.personnelObject, this.state.personnel)
                                            this.existDocFile(this.state.personnelObject.files);
                                        });
                                    }))
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })
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
                                        className="people-name mb-3">{this.state.personnel.firstName} {this.state.personnel.lastName}</div>
                                    <div className="d-flex flex-md-row flex-column flex-wrap">
                                        <div className="people-item"><i className="bi bi-upc-scan ms-2"></i>کد
                                            ملی: {this.state.personnel.nationalCode}</div>
                                        <div className="people-item"><i className="bi bi-telephone ms-2"></i>شماره
                                            تماس: {this.state.personnel.phoneNumber}</div>
                                        <div className="people-item"><i className="bi bi-personnel ms-2"></i>نام
                                            پدر: {this.state.personnel.fatherName}</div>
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
                                <Tab eventKey="more-information" title="اطلاعات بیشتر"
                                     style={{backgroundColor: "transparent"}}>
                                    <div className="tabs-content">
                                        <div className="information d-flex flex-row flex-wrap">
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> نام :</label>
                                                    {this.state.personnel.firstName}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> نام خانوادگی :</label>
                                                    {this.state.personnel.lastName}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> کد ملی :</label>
                                                    {this.state.personnel.nationalCode}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> شماره شناسنامه :</label>
                                                    {this.state.personnel.certificateNumber}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> محل صدور :</label>
                                                    {this.state.personnel.placeOfIssue}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تاریخ تولد :</label>
                                                    {this.state.personnel.birthDate}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> محل تولد :</label>
                                                    {this.state.personnel.birthPlace}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> ملیت :</label>
                                                    {this.state.personnel.nationality}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> دین :</label>
                                                    {(() => {
                                                        switch (this.state.personnel.religion) {
                                                            case 'islam':
                                                                return 'اسلام';
                                                            case 'christianity':
                                                                return 'مسیحیت';
                                                            case 'hinduism':
                                                                return 'هندوئیسم';
                                                            case 'buddhism':
                                                                return 'آیین بودایی';
                                                            case 'other':
                                                                return 'سایر';
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> مذهب :</label>
                                                    {this.state.personnel.subReligion !== "" ? this.state.personnel.subReligion : 'ثبت نشده'}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> وضعیت تاهل :</label>
                                                    {(() => {
                                                        switch (this.state.personnel.maritalStatus) {
                                                            case 'single':
                                                                return 'مجرد';
                                                            case 'married':
                                                                return 'متاهل';
                                                            case 'divorced':
                                                                return 'متارکه';
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                            {(() => {
                                                switch (this.state.personnel.maritalStatus) {
                                                    case 'married':
                                                        return (
                                                        <>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> نام و نام خانوادگی همسر
                                                                        :</label>
                                                                    {this.state.personnel.spouseFullName !== "" ? this.state.personnel.spouseFullName : 'ثبت نشده'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> شغل همسر :</label>
                                                                    {this.state.personnel.spouseJob !== "" ? this.state.personnel.spouseJob : 'ثبت نشده'}
                                                                </div>
                                                            </div>
                                                        </>);
                                                }
                                            })()}
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> بیماری خاص :</label>
                                                    {(() => {
                                                        switch (this.state.personnel.health) {
                                                            case true:
                                                                return 'بله';
                                                            case false:
                                                                return 'خیر';
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                            {(() => {
                                                switch (this.state.personnel.health) {
                                                    case true:
                                                        return <>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> توضیحات بیماری :</label>
                                                                    {this.state.personnel.healthyStatus !== "" ? this.state.personnel.healthyStatus : 'ثبت نشده'}
                                                                </div>
                                                            </div>
                                                        </>;
                                                }
                                            })()}
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تلفن ثابت :</label>
                                                    {this.state.personnel.telephoneNumber}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تلفن اضطراری :</label>
                                                    {this.state.personnel.emergencyNumber}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تاریخ عقد قرارداد :</label>
                                                    {this.state.personnel.timePeriod?.startDate}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تاریخ اتمام قرارداد :</label>
                                                    {this.state.personnel.timePeriod?.endDate}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> آدرس محل سکونت :</label>
                                                    {this.state.personnel.address}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تحصیلات :</label>
                                                    {this.state.personnel.education !== "" ? this.state.personnel.education : 'ثبت نشده'}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> دانشگاه :</label>
                                                    {this.state.personnel.university !== "" ? this.state.personnel.university : 'ثبت نشده'}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> رشته :</label>
                                                    {this.state.personnel.major !== "" ? this.state.personnel.major : 'ثبت نشده'}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> نوع :</label>
                                                    {this.state.personnel.type}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="documents" title="مدارک" className='records'
                                     style={{backgroundColor: "transparent"}}>
                                    <div className="tabs-content">
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>شناسنامه</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="d-flex flex-column">
                                                        {
                                                            this.state.hasBirthPage1 && (
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip className="deleteTooltip">
                                                                            دانلود
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthPage1)}>
                                                                        <div className='ms-2'>صفحه اول</div>
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
                                                                            دانلود
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthPage2)}>
                                                                        <div className='ms-2'>صفحه دوم</div>
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
                                                                            دانلود
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthPage3)}>
                                                                        <div className='ms-2'>صفحه سوم</div>
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
                                                                            دانلود
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthPage4)}>
                                                                        <div className='ms-2'>صفحه چهارم</div>
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
                                                                            دانلود
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <div className="record-item"
                                                                         onClick={() => this.downloadFile(this.state.docFile.birthAllPage)}>
                                                                        <div className='ms-2'>کل صفحات</div>
                                                                        <RiDownloadCloud2Fill/>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            )
                                                        }
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>کارت ملی</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.state.hasCartPage1 && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        دانلود
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.cardPage1)}>
                                                                    <div className='ms-2'>صفحه اول</div>
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
                                                                        دانلود
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.cardPage2)}>
                                                                    <div className='ms-2'>صفحه دوم</div>
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
                                                                        دانلود
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.cardAllPage)}>
                                                                    <div className='ms-2'>کل صفحات</div>
                                                                    <RiDownloadCloud2Fill/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>عکس پرسنلی</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.state.hasPersonnelImg && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        دانلود
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.personnelImg)}>
                                                                    <div className='ms-2'>عکس پرسنلی</div>
                                                                    <RiDownloadCloud2Fill/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header>فرم قرارداد</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.state.hasRegister && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        دانلود
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.register)}>
                                                                    <div className='ms-2'>فرم قرارداد</div>
                                                                    <RiDownloadCloud2Fill/>
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
            </>
        );
    }

    downloadFile = async (fileId) => {
        console.log(fileId)
        const file = this.state.fileDetails.find(({fileId}) => fileId === fileId);
        var filename = file.originalName;

        axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${fileId}`, {responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((blob) => {

                console.log('blob')
                console.log(blob)

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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${fileId}`, {responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                });
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/file/${fileId}`, {responseType: 'blob', headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                });
                        } else {
                            window.location = '/'
                        }
                    })
            }
        })
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


export default PersonnelProfilePage
