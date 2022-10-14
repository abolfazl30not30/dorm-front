import React, { Component } from 'react';
import "../../../../style/registerPage.css";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

import CInformationPage from "./ConstantResident/CInformationPage";
import CInformationFurtherPage from "./ConstantResident/CInformationFurtherPage";
import CInformationFamilyPage from "./ConstantResident/CInformationFamilyPage";
import CUploadPage from "./ConstantResident/CUploadPage";

import FGInformationPage from "./FamilyGuest/FGInformationPage";
import FGInformationFurtherPage from "./FamilyGuest/FGInformationFurtherPage";
import FGInformationFamilyPage from "./FamilyGuest/FGInformationFamilyPage";
import FGUploadPage from "./FamilyGuest/FGUploadPage";

import OGInformationPage from "./OtherGuest/OGInformationPage";
import OGInformationFurtherPage from "./OtherGuest/OGInformationFurtherPage";
import OGInformationFamilyPage from "./OtherGuest/OGInformationFamilyPage";
import OGUploadPage from "./OtherGuest/OGUploadPage";

import BuildingContext from '../../../../contexts/Building'
import typeofResident from "./TypeofResident";

class MainRegister extends Component {

    constructor(props) {
        super(props);
        this.constantCheck = React.createRef();
        this.familyGuestCheck = React.createRef();
        this.otherGuestCheck = React.createRef();
    }

    static contextType = BuildingContext;

    //######################################################## first pages
    constantInformationPageValidation = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;

        let firstName_requiredReg = !requiredReg.test(this.context.constantInformationPage.firstName);
        let lastName_requiredReg = !requiredReg.test(this.context.constantInformationPage.lastName);
        let nationalCode_requiredReg = !requiredReg.test(this.context.constantInformationPage.nationalCode);
        let certificateNumber_requiredReg = !requiredReg.test(this.context.constantInformationPage.certificateNumber);
        let placeOfIssue_requiredReg = !requiredReg.test(this.context.constantInformationPage.placeOfIssue);
        let birthDate_requiredReg = !requiredReg.test(this.context.constantInformationPage.birthDate);
        let nationality_requiredReg = !requiredReg.test(this.context.constantInformationPage.nationality);
        let fatherName_requiredReg = !requiredReg.test(this.context.constantInformationPage.fatherName);
        let spouseFullName_requiredReg = !requiredReg.test(this.context.constantInformationPage.spouseFullName);
        let healthDescription_requiredReg = !requiredReg.test(this.context.constantInformationPage.healthDescription);

        let nationalCode_numberReg = numberReg.test(this.context.constantInformationPage.nationalCode);
        let certificateNumber_numberReg = numberReg.test(this.context.constantInformationPage.certificateNumber);
        let studentNumber_numberReg = numberReg.test(this.context.constantInformationPage.studentNumber);

        if (this.context.constantInformationPage.maritalStatus !== 'married') {
            spouseFullName_requiredReg = true;
        }

        if (this.context.constantInformationPage.health === 'false') {
            healthDescription_requiredReg = true;
        }

        this.context.handleSpecificValidations([firstName_requiredReg, lastName_requiredReg, nationalCode_requiredReg, certificateNumber_requiredReg,
                placeOfIssue_requiredReg, birthDate_requiredReg, nationality_requiredReg, fatherName_requiredReg, spouseFullName_requiredReg,
                healthDescription_requiredReg, nationalCode_numberReg, certificateNumber_numberReg, studentNumber_numberReg],
            ['firstName_requiredReg', 'lastName_requiredReg', 'nationalCode_requiredReg', 'certificateNumber_requiredReg',
                'placeOfIssue_requiredReg', 'birthDate_requiredReg', 'nationality_requiredReg', 'fatherName_requiredReg', 'spouseFullName_requiredReg',
                'healthDescription_requiredReg', 'nationalCode_numberReg', 'certificateNumber_numberReg', 'studentNumber_numberReg'], 'constantInformationPageValidation');

        return firstName_requiredReg && lastName_requiredReg && nationalCode_requiredReg && certificateNumber_requiredReg &&
            placeOfIssue_requiredReg && birthDate_requiredReg && nationality_requiredReg && fatherName_requiredReg && spouseFullName_requiredReg &&
            healthDescription_requiredReg && nationalCode_numberReg && certificateNumber_numberReg && studentNumber_numberReg;
    }

    familyGuestValidation = () => {

        let requiredReg = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;
        let telephoneReg = /^(\s*09\d{9}\s*|\s*)$/; // iranian telephone number '09---------'
        // let emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        let fullName_requiredReg = !requiredReg.test(this.context.familyGuestInformation.fullName);
        let nationalCode_requiredReg = !requiredReg.test(this.context.familyGuestInformation.nationalCode);
        let certificateNumber_requiredReg = !requiredReg.test(this.context.familyGuestInformation.certificateNumber);
        let admissionStartDate_requiredReg = !requiredReg.test(this.context.familyGuestInformation.admissionStartDate);
        let admissionEndDate_requiredReg = !requiredReg.test(this.context.familyGuestInformation.admissionEndDate);
        let paymentDate_requiredReg = !requiredReg.test(this.context.familyGuestInformation.paymentDate);

        let rentPaymentAmount_numberReg = numberReg.test(this.context.familyGuestInformation.rentPaymentAmount)
        let depositPaymentAmount_numberReg = numberReg.test(this.context.familyGuestInformation.depositPaymentAmount)
        let discountPaymentAmount_numberReg = numberReg.test(this.context.familyGuestInformation.discountPaymentAmount)
        let nationalCode_numberReg = numberReg.test(this.context.familyGuestInformation.nationalCode);
        let certificateNumber_numberReg = numberReg.test(this.context.familyGuestInformation.certificateNumber);

        let phoneNumber_telephoneReg = telephoneReg.test(this.context.familyGuestInformation.phoneNumber);

        this.context.handleSpecificValidations([fullName_requiredReg, nationalCode_requiredReg, certificateNumber_requiredReg,
                admissionStartDate_requiredReg, admissionEndDate_requiredReg, paymentDate_requiredReg, rentPaymentAmount_numberReg,
                depositPaymentAmount_numberReg, discountPaymentAmount_numberReg, nationalCode_numberReg, certificateNumber_numberReg,
                phoneNumber_telephoneReg],
            ['fullName_requiredReg', 'nationalCode_requiredReg', 'certificateNumber_requiredReg',
                'admissionStartDate_requiredReg', 'admissionEndDate_requiredReg', 'paymentDate_requiredReg',
            'rentPaymentAmount_numberReg', 'depositPaymentAmount_numberReg', 'discountPaymentAmount_numberReg',
                'nationalCode_numberReg', 'certificateNumber_numberReg', 'phoneNumber_telephoneReg'], 'familyGuestInformationValidation');

        return fullName_requiredReg && nationalCode_requiredReg && certificateNumber_requiredReg &&
            admissionStartDate_requiredReg && admissionEndDate_requiredReg && paymentDate_requiredReg &&
            nationalCode_numberReg && certificateNumber_numberReg && phoneNumber_telephoneReg;
    }
    componentDidMount() {
        let typeOfResident = <div className='typeofResident'>
            <div className="mt-2">
                <h5 className="mb-5">نوع اقامتگر</h5>
                <div className="constant-container">
                    <label className="radio-container">
                        اقامتگر ثابت
                        <input type="radio"  name="register-radio" value="constant"
                               checked={this.state.constantCheck}
                               onChange={(e) => { this.checked(e); this.context.handleTypeofResident('constant')}}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="guest-container mt-4">
                    <label className="guest-text mb-3">مهمان : </label>
                    <div className="mx-4 my-1">
                        <label className="radio-container">
                            بستگان درجه یک
                            <input type="radio"  name="register-radio" value="familyGuest"
                                   checked={this.state.familyGuestCheck}
                                   onChange={(e) => { this.checked(e); this.context.handleTypeofResident('familyGuest')}}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="mx-4 my-1">
                        <label className="radio-container">
                            متفرقه
                            <input type="radio"  name="register-radio" value="otherGuest"
                                   checked={this.state.otherGuestCheck}
                                   onChange={(e) => { this.checked(e); this.context.handleTypeofResident('otherGuest')}}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        let updatedState = [...this.state.steps];
        updatedState[0].content = typeOfResident;
        this.setState({step:updatedState})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.constantCheck != this.state.constantCheck || prevState.otherGuestCheck != this.state.otherGuestCheck || prevState.familyGuestCheck != this.state.familyGuestCheck){
            let typeOfResident = <div className='typeofResident'>
                <div className="mt-2">
                    <h5 className="mb-5">نوع اقامتگر</h5>
                    <div className="constant-container">
                        <label className="radio-container">
                            اقامتگر ثابت
                            <input type="radio"  name="register-radio" value="constant"
                                   checked={this.state.constantCheck}
                                   onChange={(e) => { this.checked(e); this.context.handleTypeofResident('constant')}}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="guest-container mt-4">
                        <label className="guest-text mb-3">مهمان : </label>
                        <div className="mx-4 my-1">
                            <label className="radio-container">
                                بستگان درجه یک
                                <input type="radio"  name="register-radio" value="familyGuest"
                                       checked={this.state.familyGuestCheck}
                                       onChange={(e) => { this.checked(e); this.context.handleTypeofResident('familyGuest')}}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="mx-4 my-1">
                            <label className="radio-container">
                                متفرقه
                                <input type="radio"  name="register-radio" value="otherGuest"
                                       checked={this.state.otherGuestCheck}
                                       onChange={(e) => { this.checked(e); this.context.handleTypeofResident('otherGuest')}}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            let updatedState = [...this.state.steps];
            updatedState[0].content = typeOfResident;
            this.setState({step:updatedState})
        }
    }

    otherGuestValidation = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;

        let fullName_requiredReg = !requiredReg.test(this.context.otherGuestInformation.fullName);
        let nationalCode_requiredReg = !requiredReg.test(this.context.otherGuestInformation.nationalCode);
        let certificateNumber_requiredReg = !requiredReg.test(this.context.otherGuestInformation.certificateNumber);
        let admissionStartDate_requiredReg = !requiredReg.test(this.context.otherGuestInformation.admissionStartDate);
        let admissionEndDate_requiredReg = !requiredReg.test(this.context.otherGuestInformation.admissionEndDate);

        let nationalCode_numberReg = numberReg.test(this.context.otherGuestInformation.nationalCode);
        let certificateNumber_numberReg = numberReg.test(this.context.otherGuestInformation.certificateNumber);
        let rentPaymentAmount_numberReg = numberReg.test(this.context.otherGuestInformation.rentPaymentAmount);
        let depositPaymentAmount_numberReg = numberReg.test(this.context.otherGuestInformation.depositPaymentAmount);
        let discountPaymentAmount_numberReg = numberReg.test(this.context.otherGuestInformation.discountPaymentAmount);

        this.context.handleSpecificValidations([fullName_requiredReg, nationalCode_requiredReg, certificateNumber_requiredReg,
                admissionStartDate_requiredReg, admissionEndDate_requiredReg, nationalCode_numberReg, certificateNumber_numberReg,
                rentPaymentAmount_numberReg, depositPaymentAmount_numberReg, discountPaymentAmount_numberReg],
            ['fullName_requiredReg', 'nationalCode_requiredReg', 'certificateNumber_requiredReg',
                'admissionStartDate_requiredReg', 'admissionEndDate_requiredReg', 'nationalCode_numberReg', 'certificateNumber_numberReg',
                'rentPaymentAmount_numberReg', 'depositPaymentAmount_numberReg', 'discountPaymentAmount_numberReg'], 'otherGuestInformationValidation');

        return fullName_requiredReg && nationalCode_requiredReg && certificateNumber_requiredReg &&
            admissionStartDate_requiredReg && admissionEndDate_requiredReg && nationalCode_numberReg && certificateNumber_numberReg &&
            rentPaymentAmount_numberReg && depositPaymentAmount_numberReg && discountPaymentAmount_numberReg;
    }



    //######################################################## second pages
    cInformationFurtherPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^\d{3}-\d{8}$/;
        let telephoneOrEmptyReg = /^(\s*09\d{9}\s*|\s*)$/;

        let address_requiredReg = !requiredReg.test(this.context.constantInformationFurther.address);

        let home_tel_requiredReg = !requiredReg.test(this.context.constantInformationFurther.home_tel);
        let home_tel_homeTelephoneReg = homeTelephoneReg.test(this.context.constantInformationFurther.home_tel);

        let resident_tel_requiredReg = !requiredReg.test(this.context.constantInformationFurther.resident_tel);
        let resident_tel_telephoneReg = telephoneReg.test(this.context.constantInformationFurther.resident_tel);

        let admissionStartDate_requiredReg = !requiredReg.test(this.context.constantInformationFurther.admissionStartDate);
        let admissionEndDate_requiredReg = !requiredReg.test(this.context.constantInformationFurther.admissionEndDate);

        this.context.handleSpecificValidations([address_requiredReg, home_tel_requiredReg, home_tel_homeTelephoneReg,
                 resident_tel_requiredReg, resident_tel_telephoneReg, admissionStartDate_requiredReg, admissionEndDate_requiredReg],
            ['address_requiredReg', 'home_tel_requiredReg', 'home_tel_homeTelephoneReg', 'resident_tel_requiredReg',
                'resident_tel_telephoneReg', 'admissionStartDate_requiredReg', 'admissionEndDate_requiredReg'], 'constantInformationFurtherValidation');

        return address_requiredReg &&
            home_tel_requiredReg &&
            home_tel_homeTelephoneReg &&
            resident_tel_requiredReg &&
            resident_tel_telephoneReg &&
            admissionStartDate_requiredReg &&
            admissionEndDate_requiredReg;
    }

    fgInformationFurtherPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^\d{3}-\d{8}$/;
        let telephoneOrEmptyReg = /^(\s*09\d{9}\s*|\s*)$/;

        let address_requiredReg = !requiredReg.test(this.context.familyGuestInformationFurther.address);

        let home_tel_requiredReg = !requiredReg.test(this.context.familyGuestInformationFurther.home_tel);
        let home_tel_homeTelephoneReg = homeTelephoneReg.test(this.context.familyGuestInformationFurther.home_tel);

        let resident_tel_requiredReg = !requiredReg.test(this.context.familyGuestInformationFurther.resident_tel);
        let resident_tel_telephoneReg = telephoneReg.test(this.context.familyGuestInformationFurther.resident_tel);

        this.context.handleSpecificValidations([address_requiredReg, home_tel_requiredReg, home_tel_homeTelephoneReg,
                resident_tel_requiredReg, resident_tel_telephoneReg],
            ['address_requiredReg', 'home_tel_requiredReg', 'home_tel_homeTelephoneReg', 'resident_tel_requiredReg',
                'resident_tel_telephoneReg'], 'familyGuestInformationFurtherValidation');

        return address_requiredReg &&
            home_tel_requiredReg &&
            home_tel_homeTelephoneReg &&
            resident_tel_requiredReg &&
            resident_tel_telephoneReg;
    }

    ogInformationFurtherPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^\d{3}-\d{8}$/;
        let telephoneOrEmptyReg = /^(\s*09\d{9}\s*|\s*)$/;

        let address_requiredReg = !requiredReg.test(this.context.otherGuestInformationFurther.address);

        let home_tel_requiredReg = !requiredReg.test(this.context.otherGuestInformationFurther.home_tel);
        let home_tel_homeTelephoneReg = homeTelephoneReg.test(this.context.otherGuestInformationFurther.home_tel);

        let resident_tel_requiredReg = !requiredReg.test(this.context.otherGuestInformationFurther.resident_tel);
        let resident_tel_telephoneReg = telephoneReg.test(this.context.otherGuestInformationFurther.resident_tel);

        this.context.handleSpecificValidations([address_requiredReg, home_tel_requiredReg, home_tel_homeTelephoneReg,
                resident_tel_requiredReg, resident_tel_telephoneReg],
            ['address_requiredReg', 'home_tel_requiredReg', 'home_tel_homeTelephoneReg', 'resident_tel_requiredReg',
                'resident_tel_telephoneReg'], 'otherGuestInformationFurtherValidation');

        return address_requiredReg &&
            home_tel_requiredReg &&
            home_tel_homeTelephoneReg &&
            resident_tel_requiredReg &&
            resident_tel_telephoneReg;
    }


    //######################################################## third pages
    cInformationFamilyPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/;

        let firstPerson_FullName_requiredReg = !requiredReg.test(this.context.constantInformationFamily.firstPerson_FullName);
        let firstPerson_PhoneNumber_requiredReg = !requiredReg.test(this.context.constantInformationFamily.firstPerson_PhoneNumber);
        let secondPerson_FullName_requiredReg = !requiredReg.test(this.context.constantInformationFamily.secondPerson_FullName);
        let secondPerson_PhoneNumber_requiredReg = !requiredReg.test(this.context.constantInformationFamily.secondPerson_PhoneNumber);

        let firstPerson_PhoneNumber_telephoneReg = telephoneReg.test(this.context.constantInformationFamily.firstPerson_PhoneNumber);
        let secondPerson_PhoneNumber_telephoneReg = telephoneReg.test(this.context.constantInformationFamily.secondPerson_PhoneNumber);

        this.context.handleSpecificValidations([firstPerson_FullName_requiredReg, firstPerson_PhoneNumber_requiredReg,
            secondPerson_FullName_requiredReg, secondPerson_PhoneNumber_requiredReg, firstPerson_PhoneNumber_telephoneReg,
            secondPerson_PhoneNumber_telephoneReg], ['firstPerson_FullName_requiredReg', 'firstPerson_PhoneNumber_requiredReg',
            'secondPerson_FullName_requiredReg', 'secondPerson_PhoneNumber_requiredReg', 'firstPerson_PhoneNumber_telephoneReg',
            'secondPerson_PhoneNumber_telephoneReg'], 'constantInformationFamilyValidation');

        return firstPerson_FullName_requiredReg && firstPerson_PhoneNumber_requiredReg &&
            secondPerson_FullName_requiredReg && secondPerson_PhoneNumber_requiredReg && firstPerson_PhoneNumber_telephoneReg &&
            secondPerson_PhoneNumber_telephoneReg;
    }

    fgInformationFamilyPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/;

        let firstPerson_FullName_requiredReg = !requiredReg.test(this.context.familyGuestInformationFamily.firstPerson_FullName);
        let firstPerson_PhoneNumber_requiredReg = !requiredReg.test(this.context.familyGuestInformationFamily.firstPerson_PhoneNumber);
        let secondPerson_FullName_requiredReg = !requiredReg.test(this.context.familyGuestInformationFamily.secondPerson_FullName);
        let secondPerson_PhoneNumber_requiredReg = !requiredReg.test(this.context.familyGuestInformationFamily.secondPerson_PhoneNumber);

        let firstPerson_PhoneNumber_telephoneReg = telephoneReg.test(this.context.familyGuestInformationFamily.firstPerson_PhoneNumber);
        let secondPerson_PhoneNumber_telephoneReg = telephoneReg.test(this.context.familyGuestInformationFamily.secondPerson_PhoneNumber);

        this.context.handleSpecificValidations([firstPerson_FullName_requiredReg, firstPerson_PhoneNumber_requiredReg,
            secondPerson_FullName_requiredReg, secondPerson_PhoneNumber_requiredReg, firstPerson_PhoneNumber_telephoneReg,
            secondPerson_PhoneNumber_telephoneReg], ['firstPerson_FullName_requiredReg', 'firstPerson_PhoneNumber_requiredReg',
            'secondPerson_FullName_requiredReg', 'secondPerson_PhoneNumber_requiredReg', 'firstPerson_PhoneNumber_telephoneReg',
            'secondPerson_PhoneNumber_telephoneReg'], 'familyGuestInformationFamilyValidation');

        return firstPerson_FullName_requiredReg && firstPerson_PhoneNumber_requiredReg &&
            secondPerson_FullName_requiredReg && secondPerson_PhoneNumber_requiredReg && firstPerson_PhoneNumber_telephoneReg &&
            secondPerson_PhoneNumber_telephoneReg;
    }

    ogInformationFamilyPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/;

        let firstPerson_FullName_requiredReg = !requiredReg.test(this.context.otherGuestInformationFamily.firstPerson_FullName);
        let firstPerson_PhoneNumber_requiredReg = !requiredReg.test(this.context.otherGuestInformationFamily.firstPerson_PhoneNumber);
        let secondPerson_FullName_requiredReg = !requiredReg.test(this.context.otherGuestInformationFamily.secondPerson_FullName);
        let secondPerson_PhoneNumber_requiredReg = !requiredReg.test(this.context.otherGuestInformationFamily.secondPerson_PhoneNumber);

        let firstPerson_PhoneNumber_telephoneReg = telephoneReg.test(this.context.otherGuestInformationFamily.firstPerson_PhoneNumber);
        let secondPerson_PhoneNumber_telephoneReg = telephoneReg.test(this.context.otherGuestInformationFamily.secondPerson_PhoneNumber);

        this.context.handleSpecificValidations([firstPerson_FullName_requiredReg, firstPerson_PhoneNumber_requiredReg,
            secondPerson_FullName_requiredReg, secondPerson_PhoneNumber_requiredReg, firstPerson_PhoneNumber_telephoneReg,
            secondPerson_PhoneNumber_telephoneReg], ['firstPerson_FullName_requiredReg', 'firstPerson_PhoneNumber_requiredReg',
            'secondPerson_FullName_requiredReg', 'secondPerson_PhoneNumber_requiredReg', 'firstPerson_PhoneNumber_telephoneReg',
            'secondPerson_PhoneNumber_telephoneReg'], 'otherGuestInformationFamilyValidation');

        return firstPerson_FullName_requiredReg && firstPerson_PhoneNumber_requiredReg &&
            secondPerson_FullName_requiredReg && secondPerson_PhoneNumber_requiredReg && firstPerson_PhoneNumber_telephoneReg &&
            secondPerson_PhoneNumber_telephoneReg;
    }

    state = {

        steps: [
            {
                label: 'نوع اقامتگر',
                name: 'step 1',
                content: "",
            },
            {
                label: 'مشخصات اولیه',
                name: 'step 1',
                content: <CInformationPage />,
            },
            {
                label: 'مشخصات تکمیلی',
                name: 'step 2',
                content: <CInformationFurtherPage />,
            },
            {
                label: 'مشخصات بستگان',
                name: 'step 3',
                content: <CInformationFamilyPage />,
            },
            {
                label: 'آپلود مدارک',
                name: 'step 4',
                content: <CUploadPage />,
            }
        ],
        constantCheck : true,
        otherGuestCheck: false,
        familyGuestCheck : false,

    }

    checked = (e) => {
        const type = e.target.value
        this.setState({ typeofResident: type })

        switch (type) {
            case 'constant': {
                let updatedState = [...this.state.steps];
                this.setState({constantCheck:true,otherGuestCheck:false,familyGuestCheck:false});
                console.log(this.constantCheck.current)

                updatedState[3].label = "مشخصات بستگان"
                updatedState[1].content = <CInformationPage />;
                updatedState[2].content = <CInformationFurtherPage />;
                updatedState[3].content = <CInformationFamilyPage />;
                updatedState[4].content = <CUploadPage />;

                // updatedState[1].validator = this.constantInformationPageValidation;
                // updatedState[2].validator = this.cInformationFurtherPageValidation;
                // updatedState[3].validator = this.cInformationFamilyPageValidation;

                this.setState({ steps: updatedState })
                break;
            }

            case 'otherGuest': {

                let updatedState = [...this.state.steps];

                this.setState({constantCheck:false,otherGuestCheck:true,familyGuestCheck:false});

                console.log(this.otherGuestCheck.current);

                updatedState[3].label = "انتخاب میزبان"
                updatedState[1].content = <OGInformationPage />;
                updatedState[2].content = <OGInformationFurtherPage />;
                updatedState[3].content = <OGInformationFamilyPage />;
                updatedState[4].content = <OGUploadPage />;

                // updatedState[1].validator = this.otherGuestValidation;
                // updatedState[2].validator = this.ogInformationFurtherPageValidation;
                // updatedState[3].validator = this.ogInformationFamilyPageValidation;

                this.setState({ steps: updatedState })
                break;
            }

            case 'familyGuest': {
                let updatedState = [...this.state.steps];
                this.setState({constantCheck:false,otherGuestCheck:false,familyGuestCheck:true});
                console.log(this.familyGuestCheck.current)

                updatedState[3].label = "انتخاب میزبان"

                updatedState[1].content = <FGInformationPage />;
                updatedState[2].content = <FGInformationFurtherPage />;
                updatedState[3].content = <FGInformationFamilyPage />;
                updatedState[4].content = <FGUploadPage />;

                // updatedState[1].validator = this.familyGuestValidation;
                // updatedState[2].validator = this.fgInformationFurtherPageValidation;
                // updatedState[3].validator = this.fgInformationFamilyPageValidation;

                this.setState({ steps: updatedState })
                break;
            }
        }
    }
    render() {
        return (
            <>
                <div style={{ direction: "ltr" }}>
                    <StepProgressBar
                        startingStep={0}
                        contentClass={"register-container"}
                        previousBtnName={"قبلی"}
                        nextBtnName={"بعدی"}
                        submitBtnName={"ارسال"}
                        primaryBtnClass="next-btn"
                        secondaryBtnClass="previous-btn"
                        steps={this.state.steps}
                        onSubmit={this.handleSubmit}
                    />
                </div>
            </>
        );
    }

    handleSubmit = ()=>{
        this.props.history.push("/");
        this.props.history.push("/Register");
    }
}

export default MainRegister;