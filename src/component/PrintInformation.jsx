import React, {Component} from "react";
import headerLogo from "../img/sadat logo-png.png";

class PrintInformation extends Component {
    render() {
        return (
            <div className="tabs-content" style={{direction: "rtl"}}>
                <div className={"text-center"}><img src={headerLogo} width={200} height={200} style={{marginTop: "-50px", marginBottom: "-50px"}}/></div>
                <div className={"mb-2"} style={{fontSize: '1.1rem', fontWeight: '600'}}>اطلاعات فردی</div>
                {
                    this.props.person.personType === 'constant' ?
                        <>
                            <div className="information d-flex flex-row flex-wrap">
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نام :</label>
                                        {this.props.person.firstName}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نام خانوادگی :</label>
                                        {this.props.person.lastName}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> کد ملی :</label>
                                        {this.props.person.nationalCode}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> شماره شناسنامه :</label>
                                        {this.props.person.certificateNumber}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> محل صدور :</label>
                                        {this.props.person.placeOfIssue}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> تاریخ تولد :</label>
                                        {this.props.person.birthDate.split(" ")[0]}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> ملیت :</label>
                                        {this.props.person.nationality}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نام پدر :</label>
                                        {this.props.person.fatherName}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> دین :</label>
                                        {
                                            this.props.person.religion === 'islam' ?
                                                 'اسلام' :
                                                this.props.person.religion === 'christianity' ?
                                                 'مسیحیت' :
                                                this.props.person.religion === 'hinduism' ?
                                                 'هندوئیسم' :
                                                this.props.person.religion === 'buddhism' ?
                                                 'آیین بودایی' :
                                                this.props.person.religion === 'other' ?
                                                 'سایر':
                                                null
                                            }
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> مذهب :</label>
                                        {this.props.person.subReligion !== "" ? this.props.person.subReligion : 'ثبت نشده'}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> دانشگاه محل تحصیل :</label>
                                        {this.props.person.university !== "" ? this.props.person.university : 'ثبت نشده'}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> شماره دانشجویی :</label>
                                        {this.props.person.studentNumber !== "" ? this.props.person.studentNumber : 'ثبت نشده'}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> شغل پدر :</label>
                                        {this.props.person.fatherJob !== "" ? this.props.person.fatherJob : 'ثبت نشده'}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> وضعیت تاهل :</label>
                                        {
                                            this.props.person.maritalStatus === 'single' ?
                                                 'مجرد' :
                                                this.props.person.maritalStatus === 'married' ?
                                                 'متاهل' :
                                                this.props.person.maritalStatus === 'divorced' ?
                                                 'متارکه' :
                                                null
                                        }
                                    </div>
                                </div>
                                {
                                    this.props.person.maritalStatus === 'married' ?
                                         <>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> نام و نام خانوادگی همسر
                                                        :</label>
                                                    {this.props.person.spouseFullName !== "" ? this.props.person.spouseFullName : 'ثبت نشده'}
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> شغل همسر :</label>
                                                    {this.props.person.spouseJob !== "" ? this.props.person.spouseJob : 'ثبت نشده'}
                                                </div>
                                            </div>
                                        </> : null
                                    }
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> بیماری خاص :</label>
                                        {
                                            this.props.person.health ? 'بله' : 'خیر'
                                        }
                                    </div>
                                </div>
                                {
                                    this.props.person.health ?
                                        <>
                                            <div className='col-12 col-md-4'>33
                                                <div className="more-info-item">
                                                    <i className="bi bi-caret-left ms-1"></i>
                                                    <label> توضیحات بیماری :</label>
                                                    {this.props.person.healthyStatus !== "" ? this.props.person.healthyStatus : 'ثبت نشده'}
                                                </div>
                                            </div>
                                        </> : null
                                }
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> شماره همراه اقامتگر :</label>
                                        {this.props.person.phoneNumber}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> شماره تلفن منزل :</label>
                                        {this.props.person.telephoneNumber}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> تاریخ شروع پذیرش :</label>
                                        {this.props.person.timePeriod.startDate}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> تاریخ اتمام پذیرش :</label>
                                        {this.props.person.timePeriod.endDate.split(" ")[0]}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> آدرس محل سکونت :</label>
                                        {this.props.person.address}
                                    </div>
                                </div>
                                <div className="col-12 my-2 me-3"
                                     style={{fontSize: '.9rem', fontWeight: '600'}}>مشخصات
                                    بستگان(شخص اول)
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نام و نام خانوادگی :</label>
                                        {this.props.person.firstPersonFullName}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> شماره تماس :</label>
                                        {this.props.person.firstPersonPhoneNumber}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نام پدر :</label>
                                        {this.props.person.firstPersonFatherName !== "" ? this.props.person.firstPersonFatherName : 'ثبت نشده'}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نسبت با اقامتگر :</label>
                                        {
                                            this.props.person.firstPersonRelationshipWithResident === 'father' ?
                                                 'پدر' :
                                                this.props.person.firstPersonRelationshipWithResident === 'mother' ?
                                                 'مادر' :
                                                this.props.person.firstPersonRelationshipWithResident === 'sister' ?
                                                 'خواهر' :
                                                this.props.person.firstPersonRelationshipWithResident === 'brother' ?
                                                 'برادر' :
                                                this.props.person.firstPersonRelationshipWithResident === 'other' ?
                                                 'غیره' : null
                                            }
                                    </div>
                                </div>
                                <div className="col-12 my-2 me-3"
                                     style={{fontSize: '.9rem', fontWeight: '600'}}>مشخصات
                                    بستگان(شخص دوم)
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نام و نام خانوادگی :</label>
                                        {this.props.person.secondPersonFullName}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> شماره تماس :</label>
                                        {this.props.person.secondPersonPhoneNumber}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نام پدر :</label>
                                        {this.props.person.secondPersonFatherName !== "" ? this.props.person.secondPersonFatherName : 'ثبت نشده'}
                                    </div>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <div className="more-info-item">
                                        <i className="bi bi-caret-left ms-1"></i>
                                        <label> نسبت با اقامتگر :</label>
                                        {
                                            this.props.person.thirdPersonRelationshipWithResident === 'father' ?
                                                'پدر' :
                                                this.props.person.thirdPersonRelationshipWithResident === 'mother' ?
                                                    'مادر' :
                                                    this.props.person.thirdPersonRelationshipWithResident === 'sister' ?
                                                        'خواهر' :
                                                        this.props.person.thirdPersonRelationshipWithResident === 'brother' ?
                                                            'برادر' :
                                                            this.props.person.thirdPersonRelationshipWithResident === 'other' ?
                                                                'غیره' : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </> :
                        this.props.person.personType === 'familyGuest' ?
                            <>
                                <div className="information d-flex flex-row flex-wrap">
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> نام :</label>
                                            {this.props.person.firstName}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> نام خانوادگی :</label>
                                            {this.props.person.lastName}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> نسبت با اقامتگر :</label>
                                            {
                                                this.props.person.relationshipWithResident === 'father' ?
                                                'پدر' :
                                                this.props.person.relationshipWithResident === 'mother' ?
                                                'مادر' :
                                                this.props.person.relationshipWithResident === 'sister' ?
                                                'خواهر' :
                                                this.props.person.relationshipWithResident === 'brother' ?
                                                'برادر' :
                                                this.props.person.relationshipWithResident === 'other' ?
                                                'غیره' : null
                                            }
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> کد ملی :</label>
                                            {this.props.person.nationalCode}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> شماره شناسنامه :</label>
                                            {this.props.person.certificateNumber}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> محل صدور :</label>
                                            {this.props.person.placeOfIssue !== "" ? this.props.person.placeOfIssue : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> تاریخ تولد :</label>
                                            {this.props.person.birthDate !== "" ? this.props.person.birthDate.split(" ")[0] : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> تاریخ شروع پذیرش :</label>
                                            {this.props.person.timePeriod.startDate.split(" ")[0]}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> تاریخ اتمام پذیرش :</label>
                                            {this.props.person.timePeriod.endDate.split(" ")[0]}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> تاریخ پرداخت :</label>
                                            {this.props.person.paymentDate}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> مبلغ پرداخت اجاره :</label>
                                            {this.props.person.depositPaymentAmount !== "" ? this.props.person.depositPaymentAmount : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> مبلغ پرداخت ودیعه :</label>
                                            {this.props.person.rentPaymentAmount !== "" ? this.props.person.rentPaymentAmount : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> مبلغ پرداخت اجاره :</label>
                                            {this.props.person.discountPaymentAmount !== "" ? this.props.person.discountPaymentAmount : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> آدرس محل سکونت :</label>
                                            {this.props.person.address}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> شماره همراه اقامتگر :</label>
                                            {this.props.person.phoneNumber}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> شماره تلفن منزل :</label>
                                            {this.props.person.telephoneNumber}
                                        </div>
                                    </div>
                                </div>
                            </> :
                        this.props.person.personType === 'otherGuest' ?
                            <>
                                <div className="information d-flex flex-row flex-wrap">
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> نام :</label>
                                            {this.props.person.firstName}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> نام خانوادگی :</label>
                                            {this.props.person.lastName}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> نسبت با اقامتگر :</label>
                                            {
                                                this.props.person.relationshipWithResident === 'father' ?
                                                    'پدر' :
                                                    this.props.person.relationshipWithResident === 'mother' ?
                                                        'مادر' :
                                                        this.props.person.relationshipWithResident === 'sister' ?
                                                            'خواهر' :
                                                            this.props.person.relationshipWithResident === 'brother' ?
                                                                'برادر' :
                                                                this.props.person.relationshipWithResident === 'other' ?
                                                                    'غیره' : null
                                            }
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> کد ملی :</label>
                                            {this.props.person.nationalCode}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> شماره شناسنامه :</label>
                                            {this.props.person.certificateNumber}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> محل صدور :</label>
                                            {this.props.person.placeOfIssue !== "" ? this.props.person.placeOfIssue : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> تاریخ تولد :</label>
                                            {this.props.person.birthDate !== "" ? this.props.person.birthDate.split(" ")[0] : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> تاریخ شروع پذیرش :</label>
                                            {this.props.person.timePeriod.startDate.split(" ")[0]}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> تاریخ اتمام پذیرش :</label>
                                            {this.props.person.timePeriod.endDate.split(" ")[0]}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> تاریخ پرداخت :</label>
                                            {this.props.person.paymentDate}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> مبلغ پرداخت اجاره :</label>
                                            {this.props.person.depositPaymentAmount !== "" ? this.props.person.depositPaymentAmount : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> مبلغ پرداخت ودیعه :</label>
                                            {this.props.person.rentPaymentAmount !== "" ? this.props.person.rentPaymentAmount : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> مبلغ پرداخت اجاره :</label>
                                            {this.props.person.discountPaymentAmount !== "" ? this.props.person.discountPaymentAmount : 'ثبت نشده'}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> آدرس محل سکونت :</label>
                                            {this.props.person.address}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> شماره همراه اقامتگر :</label>
                                            {this.props.person.phoneNumber}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="more-info-item">
                                            <i className="bi bi-caret-left ms-1"></i>
                                            <label> شماره تلفن منزل :</label>
                                            {this.props.person.telephoneNumber}
                                        </div>
                                    </div>
                                </div>
                            </> : null
                    }
            </div>
        );
    }
}

export default PrintInformation