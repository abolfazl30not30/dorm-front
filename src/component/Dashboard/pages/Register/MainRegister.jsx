import React, {Component} from 'react';
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

class MainRegister extends Component {

    constructor(props) {
        super(props);
        this.constantCheck = React.createRef();
        this.familyGuestCheck = React.createRef();
        this.otherGuestCheck = React.createRef();
    }

    goHome = () => {
        this.props.history.push('/Register')
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
        let healthyStatus_requiredReg = !requiredReg.test(this.context.constantInformationPage.healthyStatus);

        let nationalCode_numberReg = numberReg.test(this.context.constantInformationPage.nationalCode);
        let certificateNumber_numberReg = numberReg.test(this.context.constantInformationPage.certificateNumber);
        let studentNumber_numberReg = numberReg.test(this.context.constantInformationPage.studentNumber);

        if (this.context.constantInformationPage.maritalStatus !== 'married') {
            spouseFullName_requiredReg = true;
        }

        if (this.context.constantInformationPage.health === 'false') {
            healthyStatus_requiredReg = true;
        }

        this.context.handleSpecificValidations([firstName_requiredReg, lastName_requiredReg, nationalCode_requiredReg, certificateNumber_requiredReg,
                placeOfIssue_requiredReg, birthDate_requiredReg, nationality_requiredReg, fatherName_requiredReg, spouseFullName_requiredReg,
                healthyStatus_requiredReg, nationalCode_numberReg, certificateNumber_numberReg, studentNumber_numberReg],
            ['firstName_requiredReg', 'lastName_requiredReg', 'nationalCode_requiredReg', 'certificateNumber_requiredReg',
                'placeOfIssue_requiredReg', 'birthDate_requiredReg', 'nationality_requiredReg', 'fatherName_requiredReg', 'spouseFullName_requiredReg',
                'healthyStatus_requiredReg', 'nationalCode_numberReg', 'certificateNumber_numberReg', 'studentNumber_numberReg'], 'constantInformationPageValidation');

        return firstName_requiredReg && lastName_requiredReg && nationalCode_requiredReg && certificateNumber_requiredReg &&
            placeOfIssue_requiredReg && birthDate_requiredReg && nationality_requiredReg && fatherName_requiredReg && spouseFullName_requiredReg &&
            healthyStatus_requiredReg && nationalCode_numberReg && certificateNumber_numberReg && studentNumber_numberReg;
    }

    familyGuestValidation = () => {

        let requiredReg = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;
        let telephoneReg = /^(\s*09\d{9}\s*|\s*)$/; // iranian telephone number '09---------'
        // let emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        let firstName_requiredReg = !requiredReg.test(this.context.familyGuestInformation.firstName);
        let lastName_requiredReg = !requiredReg.test(this.context.familyGuestInformation.lastName);
        let nationalCode_requiredReg = !requiredReg.test(this.context.familyGuestInformation.nationalCode);
        let certificateNumber_requiredReg = !requiredReg.test(this.context.familyGuestInformation.certificateNumber);
        let startDate_requiredReg = !requiredReg.test(this.context.familyGuestInformation.startDate);
        let endDate_requiredReg = !requiredReg.test(this.context.familyGuestInformation.endDate);
        let paymentDate_requiredReg = !requiredReg.test(this.context.familyGuestInformation.paymentDate);

        let rentPaymentAmount_numberReg = numberReg.test(this.context.familyGuestInformation.rentPaymentAmount)
        let depositPaymentAmount_numberReg = numberReg.test(this.context.familyGuestInformation.depositPaymentAmount)
        let discountPaymentAmount_numberReg = numberReg.test(this.context.familyGuestInformation.discountPaymentAmount)
        let nationalCode_numberReg = numberReg.test(this.context.familyGuestInformation.nationalCode);
        let certificateNumber_numberReg = numberReg.test(this.context.familyGuestInformation.certificateNumber);


        this.context.handleSpecificValidations([firstName_requiredReg, lastName_requiredReg, nationalCode_requiredReg, certificateNumber_requiredReg,
                startDate_requiredReg, endDate_requiredReg, paymentDate_requiredReg, rentPaymentAmount_numberReg,
                depositPaymentAmount_numberReg, discountPaymentAmount_numberReg, nationalCode_numberReg, certificateNumber_numberReg,],
            ['firstName_requiredReg', 'lastName_requiredReg', 'nationalCode_requiredReg', 'certificateNumber_requiredReg',
                'startDate_requiredReg', 'endDate_requiredReg', 'paymentDate_requiredReg',
            'rentPaymentAmount_numberReg', 'depositPaymentAmount_numberReg', 'discountPaymentAmount_numberReg',
                'nationalCode_numberReg', 'certificateNumber_numberReg'], 'familyGuestInformationValidation');

        return firstName_requiredReg && lastName_requiredReg && nationalCode_requiredReg && certificateNumber_requiredReg &&
            startDate_requiredReg && endDate_requiredReg && paymentDate_requiredReg &&
            nationalCode_numberReg && certificateNumber_numberReg;
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

        let firstName_requiredReg = !requiredReg.test(this.context.otherGuestInformation.firstName);
        let lastName_requiredReg = !requiredReg.test(this.context.otherGuestInformation.lastName);
        let nationalCode_requiredReg = !requiredReg.test(this.context.otherGuestInformation.nationalCode);
        let certificateNumber_requiredReg = !requiredReg.test(this.context.otherGuestInformation.certificateNumber);
        let startDate_requiredReg = !requiredReg.test(this.context.otherGuestInformation.startDate);
        let endDate_requiredReg = !requiredReg.test(this.context.otherGuestInformation.endDate);

        let nationalCode_numberReg = numberReg.test(this.context.otherGuestInformation.nationalCode);
        let certificateNumber_numberReg = numberReg.test(this.context.otherGuestInformation.certificateNumber);
        let rentPaymentAmount_numberReg = numberReg.test(this.context.otherGuestInformation.rentPaymentAmount);
        let depositPaymentAmount_numberReg = numberReg.test(this.context.otherGuestInformation.depositPaymentAmount);
        let discountPaymentAmount_numberReg = numberReg.test(this.context.otherGuestInformation.discountPaymentAmount);

        this.context.handleSpecificValidations([firstName_requiredReg, lastName_requiredReg, nationalCode_requiredReg, certificateNumber_requiredReg,
                startDate_requiredReg, endDate_requiredReg, nationalCode_numberReg, certificateNumber_numberReg,
                rentPaymentAmount_numberReg, depositPaymentAmount_numberReg, discountPaymentAmount_numberReg],
            ['firstName_requiredReg', 'lastName_requiredReg', 'nationalCode_requiredReg', 'certificateNumber_requiredReg',
                'startDate_requiredReg', 'endDate_requiredReg', 'nationalCode_numberReg', 'certificateNumber_numberReg',
                'rentPaymentAmount_numberReg', 'depositPaymentAmount_numberReg', 'discountPaymentAmount_numberReg'], 'otherGuestInformationValidation');

        return firstName_requiredReg && lastName_requiredReg && nationalCode_requiredReg && certificateNumber_requiredReg &&
            startDate_requiredReg && endDate_requiredReg && nationalCode_numberReg && certificateNumber_numberReg &&
            rentPaymentAmount_numberReg && depositPaymentAmount_numberReg && discountPaymentAmount_numberReg;
    }



    //######################################################## second pages
    cInformationFurtherPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^[0]\d{10}$/;
        let telephoneOrEmptyReg = /^(\s*09\d{9}\s*|\s*)$/;

        let address_requiredReg = !requiredReg.test(this.context.constantInformationFurther.address);

        let telephoneNumber_requiredReg = !requiredReg.test(this.context.constantInformationFurther.telephoneNumber);
        let telephoneNumber_homeTelephoneReg = homeTelephoneReg.test(this.context.constantInformationFurther.telephoneNumber);

        let phoneNumber_requiredReg = !requiredReg.test(this.context.constantInformationFurther.phoneNumber);
        let phoneNumber_telephoneReg = telephoneReg.test(this.context.constantInformationFurther.phoneNumber);

        let startDate_requiredReg = !requiredReg.test(this.context.constantInformationFurther.reservationDate);
        let endDate_requiredReg = !requiredReg.test(this.context.constantInformationFurther.endDate);

        this.context.handleSpecificValidations([address_requiredReg, telephoneNumber_requiredReg, telephoneNumber_homeTelephoneReg,
                 phoneNumber_requiredReg, phoneNumber_telephoneReg, startDate_requiredReg, endDate_requiredReg],
            ['address_requiredReg', 'telephoneNumber_requiredReg', 'telephoneNumber_homeTelephoneReg', 'phoneNumber_requiredReg',
                'phoneNumber_telephoneReg', 'startDate_requiredReg', 'endDate_requiredReg'], 'constantInformationFurtherValidation');

        return address_requiredReg &&
            telephoneNumber_requiredReg &&
            telephoneNumber_homeTelephoneReg &&
            phoneNumber_requiredReg &&
            phoneNumber_telephoneReg &&
            startDate_requiredReg &&
            endDate_requiredReg;
    }

    fgInformationFurtherPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^[0]\d{10}$/;
        let telephoneOrEmptyReg = /^(\s*09\d{9}\s*|\s*)$/;

        let address_requiredReg = !requiredReg.test(this.context.familyGuestInformationFurther.address);

        let telephoneNumber_requiredReg = !requiredReg.test(this.context.familyGuestInformationFurther.telephoneNumber);
        let telephoneNumber_homeTelephoneReg = homeTelephoneReg.test(this.context.familyGuestInformationFurther.telephoneNumber);

        let phoneNumber_requiredReg = !requiredReg.test(this.context.familyGuestInformationFurther.phoneNumber);
        let phoneNumber_telephoneReg = telephoneReg.test(this.context.familyGuestInformationFurther.phoneNumber);

        this.context.handleSpecificValidations([address_requiredReg, telephoneNumber_requiredReg, telephoneNumber_homeTelephoneReg,
                phoneNumber_requiredReg, phoneNumber_telephoneReg],
            ['address_requiredReg', 'telephoneNumber_requiredReg', 'telephoneNumber_homeTelephoneReg', 'phoneNumber_requiredReg',
                'phoneNumber_telephoneReg'], 'familyGuestInformationFurtherValidation');

        return address_requiredReg &&
            telephoneNumber_requiredReg &&
            telephoneNumber_homeTelephoneReg &&
            phoneNumber_requiredReg &&
            phoneNumber_telephoneReg;
    }

    ogInformationFurtherPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^[0]\d{10}$/;
        let telephoneOrEmptyReg = /^(\s*09\d{9}\s*|\s*)$/;

        let address_requiredReg = !requiredReg.test(this.context.otherGuestInformationFurther.address);

        let telephoneNumber_requiredReg = !requiredReg.test(this.context.otherGuestInformationFurther.telephoneNumber);
        let telephoneNumber_homeTelephoneReg = homeTelephoneReg.test(this.context.otherGuestInformationFurther.telephoneNumber);

        let phoneNumber_requiredReg = !requiredReg.test(this.context.otherGuestInformationFurther.phoneNumber);
        let phoneNumber_telephoneReg = telephoneReg.test(this.context.otherGuestInformationFurther.phoneNumber);

        this.context.handleSpecificValidations([address_requiredReg, telephoneNumber_requiredReg, telephoneNumber_homeTelephoneReg,
                phoneNumber_requiredReg, phoneNumber_telephoneReg],
            ['address_requiredReg', 'telephoneNumber_requiredReg', 'telephoneNumber_homeTelephoneReg', 'phoneNumber_requiredReg',
                'phoneNumber_telephoneReg'], 'otherGuestInformationFurtherValidation');

        return address_requiredReg &&
            telephoneNumber_requiredReg &&
            telephoneNumber_homeTelephoneReg &&
            phoneNumber_requiredReg &&
            phoneNumber_telephoneReg;
    }


    //######################################################## third pages
    cInformationFamilyPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/;

        let firstPersonFullName_requiredReg = !requiredReg.test(this.context.constantInformationFamily.firstPersonFullName);
        let firstPersonPhoneNumber_requiredReg = !requiredReg.test(this.context.constantInformationFamily.firstPersonPhoneNumber);
        let secondPersonFullName_requiredReg = !requiredReg.test(this.context.constantInformationFamily.secondPersonFullName);
        let secondPersonPhoneNumber_requiredReg = !requiredReg.test(this.context.constantInformationFamily.secondPersonPhoneNumber);

        let firstPersonPhoneNumber_telephoneReg = telephoneReg.test(this.context.constantInformationFamily.firstPersonPhoneNumber);
        let secondPersonPhoneNumber_telephoneReg = telephoneReg.test(this.context.constantInformationFamily.secondPersonPhoneNumber);

        this.context.handleSpecificValidations([firstPersonFullName_requiredReg, firstPersonPhoneNumber_requiredReg,
            secondPersonFullName_requiredReg, secondPersonPhoneNumber_requiredReg, firstPersonPhoneNumber_telephoneReg,
            secondPersonPhoneNumber_telephoneReg], ['firstPersonFullName_requiredReg', 'firstPersonPhoneNumber_requiredReg',
            'secondPersonFullName_requiredReg', 'secondPersonPhoneNumber_requiredReg', 'firstPersonPhoneNumber_telephoneReg',
            'secondPersonPhoneNumber_telephoneReg'], 'constantInformationFamilyValidation');

        return firstPersonFullName_requiredReg && firstPersonPhoneNumber_requiredReg &&
            secondPersonFullName_requiredReg && secondPersonPhoneNumber_requiredReg && firstPersonPhoneNumber_telephoneReg &&
            secondPersonPhoneNumber_telephoneReg;
    }

    fgThirdPage = () => {
        return this.context.familyGuestInformationFamily.hostId !== '' &&
            this.context.familyGuestInformationFamily.hostId !== null;
    }

    ogThirdPage = () => {
        return this.context.otherGuestInformationFamily.hostId !== '' &&
            this.context.otherGuestInformationFamily.hostId !== null;
    }

    fgInformationFamilyPageValidation = () => {

    }

    ogInformationFamilyPageValidation = () => {

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
        typeofResident : "constant",

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

                updatedState[1].validator = this.constantInformationPageValidation;
                updatedState[2].validator = this.cInformationFurtherPageValidation;
                updatedState[3].validator = this.cInformationFamilyPageValidation;

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

                updatedState[1].validator = this.otherGuestValidation;
                updatedState[2].validator = this.ogInformationFurtherPageValidation;
                updatedState[3].validator = this.fgThirdPage();

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

                updatedState[1].validator = this.familyGuestValidation;
                updatedState[2].validator = this.fgInformationFurtherPageValidation;
                updatedState[3].validator = this.ogThirdPage();

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

    handleSubmit = async()=>{
        switch (this.state.typeofResident){
            case "constant" : {
                let newCharacteristic = {...this.context.constantInformationPage,...this.context.constantInformationFurther,...this.context.constantInformationFamily};
                let birthDate1 = newCharacteristic.birthDate
                newCharacteristic.birthDate = birthDate1+" 00:00:00";



                console.log(newCharacteristic)
                const rawResponse = await fetch('http://localhost:8089/api/v1/characteristic', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCharacteristic)
                });

                var content = await rawResponse.json();
                console.log(content)

                let person = {
                    residenceType:"resident",
                    accommodationType:"permanent",
                    characteristicId:content.id,
                    files: this.context.constantUploadPage
                }

                const rawResponse1 = await fetch('http://localhost:8089/api/v1/person', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(person)
                });
                break;
            }

            case "familyGuest" : {
                let newCharacteristic = {...this.context.familyGuestInformation,...this.context.familyGuestInformationFurther};
                console.log(newCharacteristic);

                let birthDate1 = newCharacteristic.birthDate
                newCharacteristic.birthDate = birthDate1+" 00:00:00"

                let paymentDate1 = newCharacteristic.paymentDate
                newCharacteristic.paymentDate = paymentDate1+" 00:00:00";

                console.log(newCharacteristic)
                const createdChar = await fetch('http://localhost:8089/api/v1/characteristic', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCharacteristic)
                });

                let respondChar = await createdChar.json();

                console.log(respondChar)

                let person = {
                    residenceType:"resident",
                    accommodationType:"permanent",
                    characteristicId: respondChar.id,
                    files: this.context.otherGuestUploadPage
                }

                const createdPerson = await fetch('http://localhost:8089/api/v1/person', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(person)
                });

                let respondPerson = await createdPerson.json();

                console.log(this.context.familyGuestInformationFamily.hostId)

                let guest = {
                    name: respondChar.fullName,
                    childId: respondPerson.id
                }

                const createGuest = await fetch(`http://localhost:8089/api/v1/person/guest/${this.context.familyGuestInformationFamily.hostId}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(guest)
                });

                break;
            }

            case  "otherGuest" : {
                let newCharacteristic = {...this.context.otherGuestInformation,...this.context.constantInformationFurther};
                console.log(newCharacteristic);

                let birthDate1 = newCharacteristic.birthDate
                newCharacteristic.birthDate = birthDate1+" 00:00:00"

                let paymentDate1 = newCharacteristic.paymentDate
                newCharacteristic.paymentDate = paymentDate1+" 00:00:00";

                console.log(newCharacteristic)
                const createdChar = await fetch('http://localhost:8089/api/v1/characteristic', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCharacteristic)
                });

                let respondChar = await createdChar.json();


                let person = {
                    residenceType:"resident",
                    accommodationType:"permanent",
                    characteristicId:respondChar.id,
                    files: this.context.otherGuestUploadPage
                }

                const createdPerson = await fetch('http://localhost:8089/api/v1/person', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(person)
                });
                let respondPerson = await createdPerson.json();

                console.log(this.context.otherGuestInformationFamily.hostId)

                const editPersonRespond = await fetch(`http://localhost:8089/api/v1/characteristic/${respondChar.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({parentId:respondPerson.id})
                });

                let guest = {
                    name: respondChar.fullName,
                    childId: respondPerson.id
                }

                const createGuest = await fetch(`http://localhost:8089/api/v1/person/guest/${this.context.otherGuestInformationFamily.hostId}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(guest)
                });
                break;
            }
        }

        this.goHome();
        this.context.handleReset();

    }
}

export default MainRegister;