import React, {Component} from 'react';
import Home from './pages/Home';

import {Routes, Route} from 'react-router-dom';
import FloorAndUnit from './pages/Inventory and capacity/FloorAndUnit';
import RoomAndBed from './pages/Inventory and capacity/RoomAndBed';
import BuildingContext from '../../contexts/Building';
import EditFloorAndUnit from './pages/edit building/EditFloorAndUnit';
import EditRoomAndBed from './pages/edit building/EditRoomAndBed';
import MainRegister from './pages/Register/MainRegister';
import ProfilePage from './pages/People/ProfilePage';
import SearchAccount from './pages/People/SearchAccount';
import PaymentPage from './pages/paymentPage/PaymentPage';
import EventPage from './pages/EventPage/EventPage'
import RequestPage from './pages/RequestPage/RequestPage'
import Contacts from './pages/contacts/contacts';
import PaymentHistory from './pages/PaymentHistory/PaymentHistory'
import RequestPageManager from "./pages/RequestPage/RequestPageManager";
import CameraHistoryPage from "./pages/CameraHistoryPage/CameraHistoryPage";
import CallHistory from './pages/callHistory/callHistory';
import TrelloPage from "./pages/TrelloPage/TrelloPage";
import Inventory from './pages/inventory/inventory';
import PersonnelRegister from "./pages/PersonnelRegister/PersonnelRegister";
import PresenceAbsence from "./pages/PresenceAbsence/presenceAbsence";
import PresenceAbsenceRoomPerson from './pages/PresenceAbsence/PresenceAbsenceRoomPerson'
import RoomLog from "./pages/Inventory and capacity/RoomLog";
import Setting from "./pages/Setting/Setting";
import Log from "./pages/log/log"


class MainPage extends Component {
    state = {

        typeofResident: 'constant',
        unitNumber: "",
        unitIdPA: "",
        unitNumberPA: "",
        unitId: "",
        personId: "",
        charId: "",

        valueOfDates: {
            constantResident: {
                birthDate: '',
                startDate: '',
                endDate: '',

            },
            familyGuest: {
                birthDate: '',
                startDate: '',
                endDate: '',
                paymentDate: '',

            },
            otherGuest: {
                birthDate: '',
                startDate: '',
                endDate: '',
                paymentDate: '',
            },

            personnel: {
                birthDate: '',
                bankAccountExpirationDate: '',

            }
        },

        fields: {

            personnelFields: {
                id: '',
                firstName: '',
                lastName: '',
                nationalCode: '',
                placeOfIssue: '',
                certificateNumber: '',
                phoneNumber: '',
                address: '',
                telephoneNumber: '',
                emergencyNumber: '',
                birthPlace: '',
                birthDate: '', //
                education: '',
                postalCode: '',
                email: '',
                nationality: '',
                maritalStatus: 'single', // default value
                religion: 'islam', // default value
                subReligion: '',
                healthyStatus: '',
                health: 'false',
                alias: '',
                university: '', //
                major: '',
                spouseFullName: '',
                spouseJob: '', //
                homeNumber: '', // ????????
                bankName: '',
                cardNumber: '',
                bankAccountNumber: '',
                bankAccountOwnerName: '',
                bankAccountShabaNumber: '',
                bankAccountExpirationDate: '',
                cvv2: '', //
                fullName: '',//
                parentType: 'Personnel',
                gender: 'male',
                startDate: '',
                endDate: '',
                type: '',
                profileId: '',
            },

            personnelUploadPage: [],

            //MAIN REGISTER
            //############################################################################## first page
            // ----------------------- <CInformationPage /> information
            constantInformationPage: {
                firstName: '',
                lastName: '',
                alias: '',
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
            familyGuestInformation: { // مهمان بستگان درجه یک -- صفحه مشخصات اولیه
                firstName: '',
                lastName: '',
                nationalCode: '',
                certificateNumber: '',
                placeOfIssue: '',
                birthDate: '',
                startDate: '',
                endDate: '',
                paymentDate: '',
                rentPaymentAmount: '',
                depositPaymentAmount: '',
                discountPaymentAmount: '',
                relationshipWithResident: 'father', // default value (first option)
            },

            // ----------------------- <OGInformationPage /> information
            otherGuestInformation: {
                firstName: '',
                lastName: '',
                nationalCode: '',
                certificateNumber: '',
                placeOfIssue: '',
                startDate: '',
                endDate: '',
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
                endDate: '',
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
                firstPersonFullName: '',
                firstPersonPhoneNumber: '',
                firstPersonFatherName: '',
                firstPersonRelationshipWithResident: 'father', // default value (first option)

                secondPersonFullName: '',
                secondPersonPhoneNumber: '',
                secondPersonFatherName: '',
                secondPersonRelationshipWithResident: 'father', // default value (first option)
            },
            // ----------------------- <FGIInformationFamilyPage /> information
            familyGuestInformationFamily: {
                hostId:''
            },
            // ----------------------- <OGIInformationFamilyPage /> information
            otherGuestInformationFamily: {
                hostId:''
            },
            //##############################################################################

            //############################################################################## fourth page
            constantUploadPage: [],

            familyGuestUploadPage: [],

            otherGuestUploadPage: [],
            //##############################################################################

        },
        errors: {
            required: 'این فیلد الزامی است!',
            numberRequired: 'عدد وارد کنید!',
            homeTelephoneReg: 'شماره تلفن ثابت ۱۱ رقمی با کد وارد شود! ',
            telephoneRegex: 'شماره تلفن همراه وارد کنید! (۰۹۱۲۳۴۵۶۷۸۹)',
            emailRegex: 'ایمیل وارد کنید!',
        },

        specificValidations: {

            personnelFieldsValidation: {
                //first page
                firstName_requiredReg: '',
                lastName_requiredReg: '',
                nationalCode_requiredReg: '',
                placeOfIssue_requiredReg: '',
                certificateNumber_requiredReg: '',
                phoneNumber_requiredReg: '',
                address_requiredReg: '',
                telephoneNumber_requiredReg: '',
                emergencyNumber_requiredReg: '',
                birthPlace_requiredReg: '',
                birthDate_requiredReg: '',
                education_requiredReg: '',
                postalCode_requiredReg: '',
                email_requiredReg: '',
                nationality_requiredReg: '',
                maritalStatus_requiredReg: '',
                religion_requiredReg: '',
                nationalCode_numberReg: '',
                certificateNumber_numberReg: '',
                postalCode_numberReg: '',
                phoneNumber_phoneNumberReg: '',
                telephoneNumber_homeTelephoneReg: '',
                emergencyNumber_MobileOrHomeTelephoneReg: '',
                email_emailReg: '',
                healthyStatus_requiredReg: '',
                type_requiredReg: '',

                //second page
                major_requiredReg: '',
                spouseFullName_requiredReg: '',
                bankName_requiredReg: '',
                cardNumber_requiredReg: '',
                bankAccountNumber_requiredReg: '',
                bankAccountOwnerName_requiredReg: '',
                bankAccountShabaNumber_requiredReg: '',
                bankAccountExpirationDate_requiredReg: '',
                fullName_requiredReg: '',
                parentType_requiredReg: '',
                parentId_requiredReg: '',
                gender_requiredReg: '',

                homeNumber_homeTelephoneReg: '',

                cardNumber_numberReg: '',
                bankAccountNumber_numberReg: '',
                bankAccountShabaNumber_numberReg: '',
                cvv2_numberReg: '',
            },

            //MAIN REGISTER

            //############################################################################## first page

            // ----------------------- <CInformationPage /> information validations
            constantInformationPageValidation: {
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
                healthyStatus_requiredReg: '',
            },

            // ----------------------- <FGInformationPage /> information validation
            familyGuestInformationValidation: {
                firstName_requiredReg: '',
                lastName_requiredReg: '',
                nationalCode_requiredReg: '',
                nationalCode_numberReg: '',
                certificateNumber_requiredReg: '',
                certificateNumber_numberReg: '',
                startDate_requiredReg: '',
                endDate_requiredReg: '',
                paymentDate_requiredReg: '',
                rentPaymentAmount_numberReg: '',
                depositPaymentAmount_numberReg: '',
                discountPaymentAmount_numberReg: '',
                phoneNumber_telephoneReg: '',
            },

            // ----------------------- <OGInformationPage /> information validations
            otherGuestInformationValidation: {
                firstName_requiredReg: '',
                lastName_requiredReg: '',
                nationalCode_requiredReg: '',
                nationalCode_numberReg: '',
                certificateNumber_requiredReg: '',
                certificateNumber_numberReg: '',
                startDate_requiredReg: '',
                // startDate_dateReg: '',
                endDate_requiredReg: '',
                // startDate_dateReg: '',
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
                telephoneNumber_requiredReg: '',
                telephoneNumber_homeTelephoneReg: '',
                phoneNumber_requiredReg: '',
                phoneNumber_telephoneReg: '',
                startDate_requiredReg: '',
                endDate_requiredReg: '',
            },

            // ----------------------- <FGInformationFurtherPage /> information validations
            familyGuestInformationFurtherValidation: {
                address_requiredReg: '',
                telephoneNumber_requiredReg: '',
                telephoneNumber_homeTelephoneReg: '',
                phoneNumber_requiredReg: '',
                phoneNumber_telephoneReg: '',
            },
            // ----------------------- <OGInformationFurtherPage /> information validations
            otherGuestInformationFurtherValidation: {
                address_requiredReg: '',
                telephoneNumber_requiredReg: '',
                telephoneNumber_homeTelephoneReg: '',
                phoneNumber_requiredReg: '',
                phoneNumber_telephoneReg: '',
            },
            //##############################################################################


            //############################################################################## third page
            // ----------------------- <CInformationFamilyPage /> information validations
            constantInformationFamilyValidation: {
                firstPersonFullName_requiredReg: '',
                firstPersonPhoneNumber_requiredReg: '',
                firstPersonPhoneNumber_telephoneReg: '',

                secondPersonFullName_requiredReg: '',
                secondPersonPhoneNumber_requiredReg: '',
                secondPersonPhoneNumber_telephoneReg: '',
            },
            // ----------------------- <FGIInformationFamilyPage /> information validations
            familyGuestInformationFamilyValidation: {

            },
            // ----------------------- <OGIInformationFamilyPage /> information validations
            otherGuestInformationFamilyValidation: {

            },
            //##############################################################################
        },
    }

    render() {
        return (
            <>
                <div className='d-flex flex-column pt-4 px-3'>
                    <BuildingContext.Provider value={{
                        personnelFields: this.state.fields.personnelFields,
                        personnelFieldsValidation: this.state.specificValidations.personnelFieldsValidation,
                        unitId: this.state.unitId,
                        unitIdPA: this.state.unitIdPA,
                        personId: this.state.personId,
                        charId: this.state.charId,
                        typeofResident: this.state.typeofResident,
                        unitNumber: this.state.unitNumber,
                        unitNumberPA: this.state.unitNumberPA,
                        fields: this.state.fields,
                        errors: this.state.errors,
                        valueOfDates: this.state.valueOfDates,
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

                        specificValidations: this.state.specificValidations,

                        constantUploadPage: this.state.fields.constantUploadPage, // UploadPage
                        familyGuestUploadPage: this.state.fields.familyGuestUploadPage, // UploadPage
                        otherGuestUploadPage: this.state.fields.otherGuestUploadPage, // UploadPage
                        personnelUploadPage: this.state.fields.personnelUploadPage,

                        handleTypeofResident: this.handleTypeofResident,
                        handleUnitNumber: this.handleUnitNumber,
                        handleUnitNumberPA: this.handleUnitNumberPA,
                        handlePersonId: this.handlePersonId,
                        handleFields: this.handleFields,
                        handleDates: this.handleDates,
                        handleValueOfDate: this.handleValueOfDate,
                        handleValidations: this.handleValidations,
                        handleSpecificValidations: this.handleSpecificValidations,
                        handleUploadedFile: this.handleUploadedFile,
                        handleDeleteUploadedFile: this.handleDeleteUploadedFile,
                        handleReset: this.handleReset,
                    }}
                    >
                        <Routes>
                            <Route path="/" element={(<Home/>)}/>
                            <Route path="/booking" element={(<FloorAndUnit/>)}/>
                            <Route path="/booking/edit-floor-and-unit" element={(<EditFloorAndUnit/>)}/>
                            <Route path="/RoomAndBed" element={(<RoomAndBed/>)}/>
                            <Route path='/RoomAndBed/edit-room-and-bed' element={(<EditRoomAndBed/>)}/>
                            <Route path="/people" element={(<SearchAccount/>)}/>
                            <Route path="/people/profile" element={(<ProfilePage/>)}/>
                            <Route path='/payment' element={(<PaymentPage/>)}/>
                            <Route path='/contacts' element={(<Contacts/>)}/>
                            <Route path='/CallHistory' element={(<CallHistory/>)}/>
                            <Route path='/Inventory' element={(<Inventory/>)}/>
                            <Route path="/Register" element={(<MainRegister/>)}/>
                            <Route path="/edit" element={(<EditFloorAndUnit/>)}/>
                            <Route path="/Calender" element={(<EventPage/>)}/>
                            <Route path="/Request" element={(<RequestPage/>)}/>
                            <Route path="/PersonnelRegister" element={(<PersonnelRegister/>)}/>
                            <Route path="/Request-manager" element={(<RequestPageManager/>)}/>
                            <Route path="/Request" element={(<RequestPage/>)}/>
                            <Route path="/camera-history" element={(<CameraHistoryPage/>)}/>
                            <Route path="/PaymentHistory" element={(<PaymentHistory/>)}/>
                            <Route path="/taskManagement" element={(<TrelloPage/>)}/>
                            <Route path="/PresenceAbsence" element={(<PresenceAbsence/>)}/>
                            <Route path="/PresenceAbsencePage2" element={(<PresenceAbsenceRoomPerson/>)}/>
                            <Route path="/setting" element={(<Setting/>)}/>
                            <Route path="booking/room_log" element={(<RoomLog/>)}/>
                            <Route path="/log" element={(<Log/>)}/>
                        </Routes>
                    </BuildingContext.Provider>
                </div>
            </>
        );
    }

    handleReset = () => {
        let resetDateValues = {
            constantResident: {
                birthDate: '',
                startDate: '',
                endDate: '',

            },
            familyGuest: {
                birthDate: '',
                startDate: '',
                endDate: '',
                paymentDate: '',

            },
            otherGuest: {
                birthDate: '',
                startDate: '',
                endDate: '',
                paymentDate: '',
            },

            ...this.state.valueOfDates.personnel,
        };

        let resetFields = {
            ...this.state.fields.personnelFields,

            //MAIN REGISTER
            //############################################################################## first page
            // ----------------------- <CInformationPage /> information
            constantInformationPage: {
                firstName: '',
                lastName: '',
                alias: '',
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
            familyGuestInformation: { // مهمان بستگان درجه یک -- صفحه مشخصات اولیه
                firstName: '',
                lastName: '',
                nationalCode: '',
                certificateNumber: '',
                placeOfIssue: '',
                birthDate: '',
                startDate: '',
                endDate: '',
                paymentDate: '',
                rentPaymentAmount: '',
                depositPaymentAmount: '',
                discountPaymentAmount: '',
                relationshipWithResident: 'father', // default value (first option)
            },

            // ----------------------- <OGInformationPage /> information
            otherGuestInformation: {
                firstName: '',
                lastName: '',
                nationalCode: '',
                certificateNumber: '',
                placeOfIssue: '',
                startDate: '',
                endDate: '',
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
                endDate: '',
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
                firstPersonFullName: '',
                firstPersonPhoneNumber: '',
                firstPersonFatherName: '',
                firstPersonRelationshipWithResident: 'father', // default value (first option)

                secondPersonFullName: '',
                secondPersonPhoneNumber: '',
                secondPersonFatherName: '',
                secondPersonRelationshipWithResident: 'father', // default value (first option)
            },
            // ----------------------- <FGIInformationFamilyPage /> information
            familyGuestInformationFamily: {
                hostId:''
            },
            // ----------------------- <OGIInformationFamilyPage /> information
            otherGuestInformationFamily: {
                hostId:''
            },
            //##############################################################################

            //############################################################################## fourth page
            constantUploadPage: [],

            familyGuestUploadPage: [],

            otherGuestUploadPage: [],
            //##############################################################################

        };

        this.setState({valueOfDates : resetDateValues});

        this.setState({fields : resetFields});
    }

    handleUploadedFile = (residentTypeString, name, fileId) => {
        let updatedFiles = {...this.state.fields};
        let tmp = {
            name: name,
            fileId: fileId,
        }
        updatedFiles[residentTypeString].push(tmp);
        this.setState({fields: updatedFiles});
    }

    handleDeleteUploadedFile = (residentTypeString, fileId) => {
        let updatedFiles = {...this.state.fields};
        updatedFiles[residentTypeString] = updatedFiles[residentTypeString].filter(f => f.fileId !== fileId);
        this.setState({fields: updatedFiles});
    }

    handleTypeofResident = (type) => {
        this.setState({typeofResident: type});
        // console.log(this.state.typeofResident)
    }

    handleUnitNumber = (unitNumber, unitId) => {
        this.setState({unitNumber: unitNumber});
        this.setState({unitId: unitId});
    }
    handleUnitNumberPA = (unitNumber, unitId) => {
        this.setState({unitNumberPA: unitNumber});
        this.setState({unitIdPA: unitId});
    }
    handlePersonId = (personId, charId) => {
        this.setState({personId: personId, charId: charId});
    }

    handleFields = (value, residentType, field) => {
        let newFields = {...this.state.fields};
        newFields[residentType][field] = value
        this.setState({fields: newFields});
    }

    handleDates = (value, residentType, field) => {
        let newFields = {...this.state.fields};
        newFields[residentType][field] = value;
        this.setState({fields: newFields});
    }

    handleValueOfDate = (value, residentType, field) => {
        let newFields = {...this.state.valueOfDates};
        newFields[residentType][field] = value
        this.setState({valueOfDates: newFields});
    }

    handleValidations = (fields, names) => {
        let newValidations = {...this.state.validations};
        for (let i = 0; i < names.length; i++) {
            newValidations[names[i]] = fields[i];
        }
        // newValidations[name] = field;
        this.setState({validations: newValidations});

        // console.log(newValidations)
    }

    handleSpecificValidations = (fields, names, residentType) => {
        let newSpecificValidations = {...this.state.specificValidations};
        for (let i = 0; i < names.length; i++) {
            newSpecificValidations[residentType][names[i]] = fields[i];
        }
        // newValidations[name] = field;

        this.setState({specificValidations: newSpecificValidations});
        console.log(this.state.fields)
        // console.log(this.state.fields.otherGuestInformationFurther)
    }
}

export default MainPage;