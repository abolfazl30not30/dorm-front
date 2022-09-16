import React, { Component } from 'react'
import '../../../../style/profilePage.css'
import default_photo from '../../../../img/default_photo.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import pdf_icon from '../../../../img/pdf_icon.png'
import png_icon from '../../../../img/png_icon.png'
import { FiUser } from "react-icons/fi";
import { AiOutlineLeft } from "react-icons/ai";
import {HiOutlineMailOpen} from 'react-icons/hi';
import {BsTelephone} from 'react-icons/bs';
import {AiOutlineBarcode} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import { Modal } from 'react-bootstrap'

class ProfilePage extends Component {
    state = {
        people : [
            {
                "id": "bf767aa7ebfd47e79183c99f82ac9c85",
                "firstName": "Fazel",
                "lastName": "Gheibi",
                "nationalCode": "2500533395",
                "certificateNumber": "12345",
                "phoneNumber": "09170080635",
                "address": "Fars, Lar",
                "telephoneNumber": "52336889",
                "fatherName": "Masoud",
                "emergencyNumber": "09924664362",
                "birthPlace": "Lar",
                "birthDate": "2001-07-06T06:00:00Z",
                "job": "student",
                "education": "Bachelor's degree",
                "postalCode": "74319-36864",
                "email": "fazelgheibi2001@gmail.com",
                "nationality": "Irainian",
                "maritalStatus": "single",
                "religion": "Muslims",
                "subReligion": "shia",
                "healthyStatus": "good",
                "health": true,
                "alias": "FAZ",
                "reservationDate": null,
                "university": null,
                "studentNumber": null,
                "major": null,
                "spouseFullName": null,
                "spouseFatherName": null,
                "spouseJob": null,
                "fatherJob": null,
                "parentAddress": null,
                "homeNumber": null,
                "motherPhoneNumber": null,
                "fatherPhoneNumber": null,
                "bankName": null,
                "cardNumber": null,
                "bankAccountNumber": null,
                "bankAccountOwnerName": null,
                "bankAccountShabaNumber": null,
                "bankAccountExpirationDate": null,
                "cvv2": null,
                "placeOfIssue": null
            },
        ],
        show: false,
        reportType:'cleaning'
    }

    handleClose = () => {
        this.setState({ show: true })
    };

    handleShow = () => {
        this.setState({ show: true })
    };
    reportType = (e) => {
        const type = e.target.value
        this.setState({reportType: type})
    }
    recordReport = () => {
        console.log('done')
    }

    render() {
        return (
            <>
                <div className='profile-container row'> {/*given photo*/}
                    <div className='image-container'>
                        <button className='btn-add-report' onClick={() => {this.handleShow()}}>ثبت گزارش</button>
                        <div className="d-flex flex-row justify-content-around align-items-center w-100">
                            <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="profile" />
                            {this.state.people.map(p => (
                                <div className='information d-flex flex-row'>
                                    <div className='ms-5'>
                                        <div className='col p-2'>
                                            <AiOutlineUser className='ms-2' />
                                            <label> نام :</label>
                                            {p.firstName}
                                        </div>
                                        <div className='col p-2'>
                                            <AiOutlineUser className='ms-2' />
                                            <label> نام خانوادگی :</label>
                                            {p.lastName}
                                        </div>
                                        <div className='col p-2'>
                                            <AiOutlineBarcode className='ms-2' />
                                            <label> کد ملی :</label>
                                            {p.nationalCode}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='col p-2'>
                                            <BsTelephone className='ms-2' />
                                            <label> شماره تلفن :</label>
                                            {p.phoneNumber}
                                        </div>
                                        <div className='col p-2'>
                                            <HiOutlineMailOpen className='ms-2' />
                                            <label> ایمیل :</label>
                                            {p.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='tab-container'>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="records" title="سوابق">
                                <p>records</p>
                            </Tab>
                            <Tab eventKey="documents" title="مدارک">
                                <img className='test' src={pdf_icon}/> {/*test*/}
                                <img className='test' src={pdf_icon}/>
                                <img className='test' src={pdf_icon}/>
                                <img className='test' src={png_icon}/>
                                <img className='test' src={png_icon}/>
                                <img className='test' src={png_icon}/>
                            </Tab>
                            <Tab eventKey="more-information" title="اطلاعات بیشتر">
                                {this.state.people.map(p => (
                                    <div className='information d-flex flex-row'>
                                        <div className='ms-5'>
                                            <p>
                                                <label> نام :</label>
                                                {p.firstName}
                                            </p>
                                            <p>
                                                <label> نام خانوادگی :</label>
                                                {p.lastName}
                                            </p>
                                            <p>
                                                <label> کد ملی :</label>
                                                {p.nationalCode}
                                            </p>
                                            <p>
                                                <label> تاریخ شروع پذیرش :</label>
                                                11/22/3333
                                            </p>
                                            <p>
                                                <label> تاریخ اتمام پذیرش :</label>
                                                11/22/3333
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <label> دانشگاه محل تحصیل :</label>
                                                {p.firstName}
                                            </p>
                                            <p>
                                                <label>  شماره دانشجویی :</label>
                                                {p.lastName}
                                            </p>
                                            <p>
                                                <label> نام پدر :</label>
                                                {p.nationalCode}
                                            </p>
                                            <p>
                                                <label> شغل پدر   :</label>
                                                11/22/3333
                                            </p>
                                            <p>
                                                <label> وضعیت تاهل :</label>
                                                مجرد
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <Modal className='report-modal' centered show={this.state.show} onClick={() => {this.handleClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title><span>ثبت گزارش</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="my-3 mx-2">
                            <div className='input-report-box'>
                                <select className='input' onChange={this.reportType}>
                                    <option value='cleaning'>نوبت نظافت شبانه</option>
                                    <option value='delayInArrival'>تأخیر در ورود</option>
                                    <option value='exit'>خروج</option>
                                    <option value='violation'>ثبت تخلف</option>
                                    <option value='penalty'>ثبت جریمه</option>
                                    <option value='discharge'>اعلام تخلیه</option>
                                    <option value='cancelContract'>لغو قرارداد</option>
                                </select>
                                <label className="placeholder">نوع گزارش</label>
                            </div>
                            {(() => {
                                switch(this.state.reportType) {
                                    case 'cleaning':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">روز</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">توضیحات</label>
                                            </div>
                                        </>;
                                    case 'delayInArrival':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">ساعت</label>
                                            </div>
                                        </>;
                                    case 'exit':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">از تاريخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">تا تاريخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">آدرس مقصد</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">شماره تماس مقصد</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">نسبت</label>
                                            </div>
                                        </>;
                                    case 'violation':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">گزارش تخلف</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">ساعت</label>
                                            </div>
                                        </>;
                                    case 'penalty':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">دلیل جریمه</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <select className='input'>
                                                    <option>نقدی</option>
                                                    <option>تنبیهی</option>
                                                </select>
                                                <label className="placeholder">نوع جریمه</label>
                                            </div>
                                        </>;
                                    case 'discharge':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ اعلام تخلیه</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ تخلیه</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ عودت ودیعه</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">کسر ضرر و زیان</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">علت کسر ضر و زیان</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">مبلغ قابل عودت</label>
                                            </div>
                                        </>;
                                    case 'cancelContract':
                                        return <>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">روز</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">تاریخ</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">علت</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">کسر ضرر و زیان</label>
                                            </div>
                                            <div className='input-report-box'>
                                                <input type="text" className="input" placeholder=" "/>
                                                <label className="placeholder">مبلغ قابل عودت</label>
                                            </div>
                                        </>
                                }
                            })()}
                            <div className="input-report-box">
                                <button className='btn btn-record-report' onClick={this.recordReport()}>ثبت</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>

        );
    }
}

export default ProfilePage