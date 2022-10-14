import React, { Component } from 'react';
import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';
import FloorAndUnit from './pages/Inventory and capacity/FloorAndUnit';
import RoomAndBed from './pages/Inventory and capacity/RoomAndBed';
import BuildingContext from '../../contexts/Building';
import EditFloorAndUnit from './pages/edit building/EditFloorAndUnit';
import EditRoomAndBed from './pages/edit building/EditRoomAndBed';
import MainRegister from './pages/Register/MainRegister';
import ProfilePage from './pages/People/ProfilePage';
import SearchAccount from './pages/People/SearchAccount';
import PaymentPage from './pages/paymentPage/PaymentPage';
class MainPage extends Component {
    state = {

        typeofResident: '',
        unitNumber: "",
        unitId: "",
        personId:"",
        charId:"",
        fields: {

            //############################################################################## first page
            // ----------------------- <CInformationPage /> information
            constantInformationPage: {
                firstName: '',
                lastName: '',
                nickName: '',
                nationalCode: '',
                certificateNumber: '',
                placeOfIssue: '',
                birthDate: '',
                nationality: '',
                fatherName: '',
                religion: 'islam',
                subReligion: '',
                university: '',
                studentNumber: '',
                fatherJob: '',
                maritalStatus: 'single', // default value (first option)
                spouseFullName: '',
                spouseJob: '',
                health: 'false', // default value (first option)
                healthyStatus: '',
            },

            // ----------------------- <FGInformationPage /> information
            familyGuestInformation : { // مهمان بستگان درجه یک -- صفحه مشخصات اولیه
                fullName: '',
                nationalCode: '',
                certificateNumber: '',
                placeOfIssue: '',
                birthDate: '',
                admissionStartDate: '',
                admissionEndDate: '',
                paymentDate: '',
                rentPaymentAmount: '',
                depositPaymentAmount: '',
                discountPaymentAmount: '',
                relationshipWithResident: 'father', // default value (first option)
                address: '',
                phoneNumber: '',
            },

            // ----------------------- <OGInformationPage /> information
            otherGuestInformation: {
                fullName: '',
                nationalCode: '',
                certificateNumber: '',
                placeOfIssue: '',
                admissionStartDate: '',
                admissionEndDate: '',
                paymentDate: '',
                rentPaymentAmount: '',
                depositPaymentAmount: '',
                discountPaymentAmount: '',
                birthDate: '',
            },

            //##############################################################################

            //############################################################################## second page
            // ----------------------- <CInformationFurtherPage /> information
            constantInformationFurther: {
                address: '',
                telephoneNumber: '',
                phoneNumber: '',
                reservationDate: '',
                admissionEndDate: '',
            },

            // ----------------------- <FGInformationFurtherPage /> information
            familyGuestInformationFurther: {
                address: '',
                telephoneNumber: '',
                phoneNumber: '',
            },
            // ----------------------- <OGInformationFurtherPage /> information
            otherGuestInformationFurther: {
                address: '',
                telephoneNumber: '',
                phoneNumber: '',
            },
            //##############################################################################


            //############################################################################## third page
            // ----------------------- <CInformationFamilyPage /> information
            constantInformationFamily: {
                firstPersonFullName : '',
                firstPersonPhoneNumber : '',
                firstPersonFatherName : '',
                firstPersonRelationshipWithResident : 'father', // default value (first option)

                secondPersonFullName : '',
                secondPersonPhoneNumber : '',
                secondPersonFatherName : '',
                secondPersonRelationshipWithResident : 'father', // default value (first option)
            },
            // ----------------------- <FGIInformationFamilyPage /> information
            familyGuestInformationFamily: {
                firstPerson_FullName : '',
                firstPerson_PhoneNumber : '',
                firstPerson_FatherName : '',
                firstPerson_relationshipWithResident : 'father', // default value (first option)

                secondPerson_FullName : '',
                secondPerson_PhoneNumber : '',
                secondPerson_FatherName : '',
                secondPerson_relationshipWithResident : 'father', // default value (first option)
            },
            // ----------------------- <OGIInformationFamilyPage /> information
            otherGuestInformationFamily: {
                firstPerson_FullName : '',
                firstPerson_PhoneNumber : '',
                firstPerson_FatherName : '',
                firstPerson_relationshipWithResident : 'father', // default value (first option)

                secondPerson_FullName : '',
                secondPerson_PhoneNumber : '',
                secondPerson_FatherName : '',
                secondPerson_relationshipWithResident : 'father', // default value (first option)
            },
            //##############################################################################

            //############################################################################## fourth page
            constantUploadPage:[

            ],

            familyGuestUploadPage: [

            ],

            otherGuestUploadPage: [

            ],
            //##############################################################################

        },
        errors : {
            required: 'این فیلد الزامی است!',
            numberRequired: 'عدد وارد کنید!',
            homeTelephoneReg: 'شماره تلفن ثابت با کد وارد کنید (۳۴۵۶۷۸۹۰-۰۱۲) ',
            telephoneRegex: 'شماره تلفن همراه وارد کنید! (۰۹۱۲۳۴۵۶۷۸۹)',
            emailRegex: 'ایمیل وارد کنید!',
        },

        specificValidations : {
            //############################################################################## first page

            // ----------------------- <CInformationPage /> information validations
            constantInformationPageValidation : {
                firstName_requiredReg: '',
                lastName_requiredReg: '',
                nationalCode_requiredReg: '',
                nationalCode_numberReg: '',
                certificateNumber_requiredReg: '',
                certificateNumber_numberReg: '',
                placeOfIssue_requiredReg: '',
                // placeOfIssue_dateReg: '',
                birthDate_requiredReg: '',
                nationality_requiredReg: '',
                fatherName_requiredReg: '',
                studentNumber_numberReg: '',
                spouseFullName_requiredReg: '',
                healthDescription_requiredReg: '',
            },

            // ----------------------- <FGInformationPage /> information validation
            familyGuestInformationValidation : {
                fullName_requiredReg: '',
                nationalCode_requiredReg: '',
                nationalCode_numberReg: '',
                certificateNumber_requiredReg: '',
                certificateNumber_numberReg: '',
                admissionStartDate_requiredReg: '',
                admissionEndDate_requiredReg: '',
                paymentDate_requiredReg: '',
                rentPaymentAmount_numberReg: '',
                depositPaymentAmount_numberReg: '',
                discountPaymentAmount_numberReg: '',
                phoneNumber_telephoneReg: '',
            },

            // ----------------------- <OGInformationPage /> information validations
            otherGuestInformationValidation: {
                fullName_requiredReg: '',
                nationalCode_requiredReg: '',
                nationalCode_numberReg: '',
                certificateNumber_requiredReg: '',
                certificateNumber_numberReg: '',
                admissionStartDate_requiredReg: '',
                // admissionStartDate_dateReg: '',
                admissionEndDate_requiredReg: '',
                // admissionStartDate_dateReg: '',
                // paymentDate_dateReg: '',
                rentPaymentAmount_numberReg: '',
                depositPaymentAmount_numberReg: '',
                discountPaymentAmount_numberReg: '',
                // birthDate_dateReg: '',
            },

            //##############################################################################

            //############################################################################## second page
            // ----------------------- <CInformationFurtherPage /> information validations
            constantInformationFurtherValidation: {
                address_requiredReg: '',
                home_tel_requiredReg: '',
                home_tel_homeTelephoneReg: '',
                resident_tel_requiredReg: '',
                resident_tel_telephoneReg: '',
                admissionStartDate_requiredReg: '',
                admissionEndDate_requiredReg: '',
            },

            // ----------------------- <FGInformationFurtherPage /> information validations
            familyGuestInformationFurtherValidation: {
                address_requiredReg: '',
                home_tel_requiredReg: '',
                home_tel_homeTelephoneReg: '',
                resident_tel_requiredReg: '',
                resident_tel_telephoneReg: '',
            },
            // ----------------------- <OGInformationFurtherPage /> information validations
            otherGuestInformationFurtherValidation: {
                address_requiredReg: '',
                home_tel_requiredReg: '',
                home_tel_homeTelephoneReg: '',
                resident_tel_requiredReg: '',
                resident_tel_telephoneReg: '',
            },
            //##############################################################################


            //############################################################################## third page
            // ----------------------- <CInformationFamilyPage /> information validations
            constantInformationFamilyValidation: {
                firstPerson_FullName_requiredReg : '',
                firstPerson_PhoneNumber_requiredReg : '',
                firstPerson_PhoneNumber_telephoneReg : '',

                secondPerson_FullName_requiredReg : '',
                secondPerson_PhoneNumber_requiredReg : '',
                secondPerson_PhoneNumber_telephoneReg : '',
            },
            // ----------------------- <FGIInformationFamilyPage /> information validations
            familyGuestInformationFamilyValidation: {
                firstPerson_FullName_requiredReg : '',
                firstPerson_PhoneNumber_requiredReg : '',
                firstPerson_PhoneNumber_telephoneReg : '',

                secondPerson_FullName_requiredReg : '',
                secondPerson_PhoneNumber_requiredReg : '',
                secondPerson_PhoneNumber_telephoneReg : '',
            },
            // ----------------------- <OGIInformationFamilyPage /> information validations
            otherGuestInformationFamilyValidation: {
                firstPerson_FullName_requiredReg : '',
                firstPerson_PhoneNumber_requiredReg : '',
                firstPerson_PhoneNumber_telephoneReg : '',

                secondPerson_FullName_requiredReg : '',
                secondPerson_PhoneNumber_requiredReg : '',
                secondPerson_PhoneNumber_telephoneReg : '',
            },
            //##############################################################################
        },
    }
    render() {
        return (
            <>
                <div className='d-flex flex-column pt-4 px-5'>
                    <BuildingContext.Provider value={{ unitId: this.state.unitId,
                        personId:this.state.personId,
                        charId:this.state.charId,
                        typeofResident: this.state.typeofResident,
                        unitNumber: this.state.unitNumber,
                        fields: this.state.fields,
                        errors: this.state.errors,
                        constantInformationPage: this.state.fields.constantInformationPage,
                        constantInformationPageValidation: this.state.specificValidations.constantInformationPageValidation,

                        familyGuestInformation: this.state.fields.familyGuestInformation,
                        familyGuestInformationValidation: this.state.specificValidations.familyGuestInformationValidation,

                        otherGuestInformation: this.state.fields.otherGuestInformation,
                        otherGuestInformationValidation: this.state.specificValidations.otherGuestInformationValidation,

                        constantInformationFurther: this.state.fields.constantInformationFurther,
                        constantInformationFurtherValidation: this.state.specificValidations.constantInformationFurtherValidation,

                        familyGuestInformationFurther: this.state.fields.familyGuestInformationFurther,
                        familyGuestInformationFurtherValidation: this.state.specificValidations.familyGuestInformationFurtherValidation,

                        otherGuestInformationFurther: this.state.fields.otherGuestInformationFurther,
                        otherGuestInformationFurtherValidation: this.state.specificValidations.otherGuestInformationFurtherValidation,

                        constantInformationFamily: this.state.fields.constantInformationFamily,
                        constantInformationFamilyValidation: this.state.specificValidations.constantInformationFamilyValidation,

                        familyGuestInformationFamily: this.state.fields.familyGuestInformationFamily,
                        familyGuestInformationFamilyValidation: this.state.specificValidations.familyGuestInformationFamilyValidation,

                        otherGuestInformationFamily: this.state.fields.otherGuestInformationFamily,
                        otherGuestInformationFamilyValidation: this.state.specificValidations.otherGuestInformationFamilyValidation,

                        specificValidations : this.state.specificValidations,

                        constantUploadPage: this.state.fields.constantUploadPage, // UploadPage
                        familyGuestUploadPage: this.state.fields.familyGuestUploadPage, // UploadPage
                        otherGuestUploadPage: this.state.fields.otherGuestUploadPage, // UploadPage

                        handleTypeofResident: this.handleTypeofResident,
                        handleUnitNumber: this.handleUnitNumber,
                        handlePersonId : this.handlePersonId,
                        handleFields: this.handleFields,
                        handleDates: this.handleDates,
                        handleValidations: this.handleValidations,
                        handleSpecificValidations: this.handleSpecificValidations,
                        handleUploadedFile : this.handleUploadedFile,
                        handleDeleteUploadedFile: this.handleDeleteUploadedFile
                    }}
                    >

                        <Routes>
                            <Route path="/" element={(<Home />)} />
                            <Route path="/booking" element={(<FloorAndUnit />)} />
                            <Route path="/booking/edit-floor-and-unit" element={(<EditFloorAndUnit />)} />
                            <Route path="/RoomAndBed" element={(<RoomAndBed />)} />
                            <Route path='/RoomAndBed/edit-room-and-bed' element={(<EditRoomAndBed />)} />
                            <Route path="/people" element={(<SearchAccount />)} />
                            <Route path="/people/profile" element={(<ProfilePage />)} />
                            <Route path='/payment' element={(<PaymentPage />)} />
                            <Route path="/Register" element={(<MainRegister />)} />
                            <Route path="/edit" element={(<EditFloorAndUnit />)} />
                        </Routes>
                    </BuildingContext.Provider>
                </div>
            </>
        );
    }

    handleUploadedFile = (residentTypeString, name, fileId) => {
        let updatedFiles = {...this.state.fields};
        let tmp = {
            name : name,
            fileId : fileId,
        }
        updatedFiles[residentTypeString].push(tmp);
        this.setState({fields:updatedFiles});
    }

    handleDeleteUploadedFile = (residentTypeString,fileId) =>{
        let updatedFiles = {...this.state.fields};
        updatedFiles[residentTypeString] = updatedFiles[residentTypeString].filter(f => f.fileId !== fileId);
        this.setState({fields:updatedFiles});
    }

    handleTypeofResident = (type) => {
        this.setState({typeofResident: type});
        // console.log(this.state.typeofResident)
    }

    handleUnitNumber = (unitNumber, unitId) => {
        this.setState({ unitNumber: unitNumber });
        this.setState({ unitId: unitId });
    }
    handlePersonId = (personId,charId) =>{
        this.setState({personId : personId,charId:charId});
    }

    handleFields = (e, residentType, field) => {
        let newFields = {...this.state.fields};
        newFields[residentType][field] = e.target.value
        this.setState({ fields: newFields });
    }

    handleDates = (value, residentType, field) => {
        let newFields = {...this.state.fields};
        let date = new Date(value._d);
        let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + "00:" + "00:" + "00";
        newFields[residentType][field] = convertDate
        this.setState({ fields: newFields });
    }

    handleValidations = (fields, names) => {
        let newValidations = {...this.state.validations};
        for (let i = 0; i < names.length; i++) {
            newValidations[names[i]] = fields[i];
        }
        // newValidations[name] = field;
        this.setState({validations : newValidations});

        // console.log(newValidations)
    }

    handleSpecificValidations = (fields, names, residentType) => {
        let newSpecificValidations = {...this.state.specificValidations};
        for (let i = 0; i < names.length; i++) {
            newSpecificValidations[residentType][names[i]] = fields[i];
        }
        // newValidations[name] = field;

        this.setState({specificValidations : newSpecificValidations});
        console.log(this.state.fields)
        // console.log(this.state.fields.otherGuestInformationFurther)
    }
}

export default MainPage;