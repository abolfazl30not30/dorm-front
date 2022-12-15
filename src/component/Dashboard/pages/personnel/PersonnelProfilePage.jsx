import React, {Component, createRef} from 'react'
import '../../../../style/profilePage.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {AiFillCloseCircle, AiOutlineClose} from "react-icons/ai";
import {Accordion, Modal, Table} from 'react-bootstrap'
import {RiDownloadCloud2Fill} from 'react-icons/ri'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import BuildingContext from "../../../../contexts/Building";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Button} from "@mui/material";

class PersonnelProfilePage extends Component {

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
        personnel: {},
        show: false,
        reportType: 'cleaning',
        personnelObject: {},
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
        const personnelId = window.location.href.slice(-32)
        const response = await fetch(`https://api.saadatportal.com/api/v1/characteristic/${personnelId}`).then((response) => response.json())
            .then((data) => {this.setState({personnel: data})
                parentId = data.parentId;
                profileId = data.profileId
            })
        const response2 = await fetch(`https://api.saadatportal.com/api/v1/personnel/${parentId}`).then((response) => response.json())
            .then((data) => this.setState({personneelObject: data}));

        if (this.state.personnel.profileId !== null) {
            const response3 = await fetch(`https://api.saadatportal.com/api/v1/file/${profileId}`).then((response) => response.blob())
                .then((data) => {
                    const objectUrl = URL.createObjectURL(data);
                    this.setState({profileImgUrl: objectUrl})
                });
        }

        const fileRespond = await fetch(`https://api.saadatportal.com/api/v1/responseFile/search?parentType=Personnel&parentId=${parentId}`).then((response) => response.json())
            .then((data) => this.setState({fileDetails: data}, () => {
                this.setState({docFile: this.state.personnelObject.files});
                this.setState({report: this.state.personnelObject.record}, () => {
                });
                this.existDocFile(this.state.personnelObject.files);
            }));

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
                                                    {this.state.personnel.birthDate.split(" ")[0]}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> محل تولد :</label>
                                                    {this.state.personnel.birthPlace.split(" ")[0]}
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
                                                    {this.state.personnel.subReligion != "" ? this.state.personnel.subReligion : 'ثبت نشده'}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تحصیلات :</label>
                                                    {this.state.personnel.education != "" ? this.state.personnel.university : 'ثبت نشده'}
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
                                                                    {this.state.personnel.spouseFullName != "" ? this.state.personnel.spouseFullName : 'ثبت نشده'}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4'>
                                                                <div className="more-info-item">
                                                                    <i className="bi bi-caret-left ms-1"></i>
                                                                    <label> شغل همسر :</label>
                                                                    {this.state.personnel.spouseJob != "" ? this.state.personnel.spouseJob : 'ثبت نشده'}
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
                                                                    {this.state.personnel.healthyStatus != "" ? this.state.personnel.healthyStatus : 'ثبت نشده'}
                                                                </div>
                                                            </div>
                                                        </>;
                                                }
                                            })()}
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> شماره همراه :</label>
                                                    {this.state.personnel.phoneNumber}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> شماره تلفن منزل :</label>
                                                    {this.state.personnel.telephoneNumber}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تاریخ شروع کار :</label>
                                                    {this.state.personnel.timePeriod.startDate}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> تاریخ اتمام کار :</label>
                                                    {this.state.personnel.timePeriod.endDate.split(" ")[0]}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> آدرس محل سکونت :</label>
                                                    {this.state.personnel.address}
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
                                                <Accordion.Header>پرینت ثبت نام </Accordion.Header>
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
                                                                    <div className='ms-2'>پرینت ثبت نام</div>
                                                                    <RiDownloadCloud2Fill/>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4">
                                                <Accordion.Header>پرینت ثبت نام دانشگاه</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.state.hasRegisterUni && (
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip className="deleteTooltip">
                                                                        دانلود
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className="record-item"
                                                                     onClick={() => this.downloadFile(this.state.docFile.registerUni)}>
                                                                    <div className='ms-2'> ثبت نام دانشگاه</div>
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

                    const rawResponse = await fetch('https://api.saadatportal.com/api/v1/record', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result)
                    }).then((response) => response.json())
                        .then((result) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result);
                            this.setState({report: newReports});
                            this.setState({show: false});
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        });
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

                    const rawResponse = await fetch('https://api.saadatportal.com/api/v1/record', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result)
                    }).then((response) => response.json())
                        .then((result) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result)
                            this.setState({report: newReports})
                            this.setState({show: false})
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        });
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

                    const rawResponse = await fetch('https://api.saadatportal.com/api/v1/record', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result)
                    }).then((response) => response.json())
                        .then((result) => {
                            this.setState({registerLoading: false})
                            const newReports = this.state.report.concat(result)
                            this.setState({report: newReports})
                            this.setState({show: false})
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        });

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

                    const rawResponse = await fetch('https://api.saadatportal.com/api/v1/record', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result)
                    }).then((response) => response.json())
                        .then((result) => {
                            this.setState({registerLoading: false})
                            const newReports = this.state.report.concat(result)
                            this.setState({report: newReports})
                            this.setState({show: false})
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        });

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

                    const rawResponse = await fetch('https://api.saadatportal.com/api/v1/record', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result)
                    }).then((response) => response.json())
                        .then((res) => {
                            this.setState({registerLoading: false})
                            const newReports = this.state.report.concat(result)
                            this.setState({report: newReports})
                            this.setState({show: false})
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        });

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

                    const rawResponse = await fetch('https://api.saadatportal.com/api/v1/record', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result)
                    }).then((response) => response.json())
                        .then((res) => {
                            this.setState({registerLoading: false});
                            const newReports = this.state.report.concat(result)
                            this.setState({report: newReports})
                            this.setState({show: false})

                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        });
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

                    const rawResponse = await fetch('https://api.saadatportal.com/api/v1/record', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result)
                    }).then((response) => response.json())
                        .then((res) => {
                            this.setState({registerLoading: false})
                            const newReports = this.state.report.concat(result)
                            this.setState({report: newReports})
                            this.setState({show: false})
                        })
                        .catch((error) => {
                            this.setState({registerLoading: false})
                        });
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
        await fetch(`https://api.saadatportal.com/api/v1/record/${this.state.reportTemp.id}`, {
            method: 'DELETE',
        }).then(res => res.text())
            .then((res) => {
                let index = this.state.report.indexOf(this.state.reportTemp)
                let updatedReport = [...this.state.report];
                updatedReport.splice(index, 1);
                this.setState({report: updatedReport});
                this.setState({showDeleteModalReport: false})
            }).catch((error) => {
                console.log(error);
                this.setState({showDeleteModalReport: false})
            })
    }

    downloadFile = async (fileId) => {
        const file = this.state.fileDetails.find(({fileId}) => fileId === fileId);
        var filename = file.originalName;

        const response = await fetch(`https://api.saadatportal.com/api/v1/file/${fileId}`).then((result) => {
            return result.blob();
        })
            .then((blob) => {
                if (blob != null) {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            });
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