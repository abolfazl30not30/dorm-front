import React, { Component } from 'react'
import '../../../../style/profilePage.css'
import default_photo from '../../../../img/default_photo.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import pdf_icon from '../../../../img/pdf_icon.png'
import png_icon from '../../../../img/png_icon.png'
import { FiUser } from "react-icons/fi";

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
        ]
    }
    render() {
        return (
            <>
                <div className='profile-container row'> {/*given photo*/}
                    <div className='image-container'>
                        {/*<img src={default_photo} className='profile-image mt-5'/>*/}
                        <FiUser size={80} className='image'/>
                        {this.state.people.map(p => (
                            <div className='information'>
                                <div className='col p-2'>
                                    <label> نام :</label>
                                    {p.firstName}
                                </div>
                                <div className='col p-2'>
                                    <label> نام خانوادگی :</label>
                                    {p.lastName}
                                </div>
                                <div className='col p-2'>
                                    <label> کد ملی :</label>
                                    {p.nationalCode}
                                </div>
                                <div className='col p-2'>
                                    <label> شماره تلفن :</label>
                                    {p.phoneNumber}
                                </div>
                                <div className='col p-2'>
                                    <label> ایمیل :</label>
                                    {p.email}
                                </div>
                            </div>
                        ))}
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
                                    <div className='information'>
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
                                    </div>
                                ))}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </>
        );
    }
}

export default ProfilePage