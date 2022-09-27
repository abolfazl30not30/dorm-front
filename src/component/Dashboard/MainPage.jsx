import React, { Component } from 'react';
import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';
import FloorAndUnit from './pages/Inventory and capacity/FloorAndUnit';
import RoomAndBed from './pages/Inventory and capacity/RoomAndBed';
import BuildingContext from '../../contexts/Building';
import FullViewOfBed from './pages/Inventory and capacity/FullViewOfBed';
import EditFloorAndUnit from './pages/edit building/EditFloorAndUnit';
import EditRoomAndBed from './pages/edit building/EditRoomAndBed';
import MainRegister from './pages/Register/MainRegister';
import ProfilePage from './pages/People/ProfilePage'
import SearchAccount from './pages/People/SearchAccount'

class MainPage extends Component {
    state = {
        typeofResident: '',
        unitNumber: "",
        unitId: "",
        fields: {
            admission_start_date: '',
            admission_end_date: '',
            payment_date: '',

            // InformationFurtherPage

            ifp_address: '',
            ifp_home_tel: '',
            ifp_father_tel: '',
            ifp_mother_tel: '',
            ifp_resident_tel: '',

            // constant resident information
            c_firstName: '',
            c_lastName: '',
            c_nickName: '',
            c_nationalCode: '',
            c_certificateNumber: '',
            c_placeOfIssue: '',
            c_birthDate: '',
            c_nationality: '',
            c_fatherName: '',
            c_religion: '',
            c_subReligion: '',
            c_university: '',
            c_studentNumber: '',
            c_fatherJob: '',
            c_maritalStatus: '',
            c_spouseFullName: '',
            c_spouseJob: '',
            c_health: 'false',
            c_healthDescription: '',

            // other guest information
            o_fullName: '',
            o_nationalCode: '',
            o_certificateNumber: '',
            o_placeOfIssue: '',
            o_admissionStartDate: '',
            o_admissionEndDate: '',
            o_paymentDate: '',
            o_rentPaymentAmount: '',
            o_depositPaymentAmount: '',
            o_discountPaymentAmount: '',
            o_birthDate: '',
        },
        errors : {
            required: 'این فیلد را پر کنید!',
            numberRequired: 'عدد وارد کنید!',
            homeTelephoneReg: 'شماره تلفن ثابت با کد وارد کنید (۳۴۵۶۷۸۹۰-۰۱۲) ',
            telephoneRegex: 'شماره تلفن همراه وارد کنید! (۰۹۱۲۳۴۵۶۷۸۹)',
            emailRegex: 'ایمیل وارد کنید!',
        },
        specificValidations : {
            asd_requiredReg : '',
            asd_numberReg : '',
            aed_requiredReg : '',
            aed_numberReg : '',
            pd_requiredReg : '',
            pd_numberReg : '',

            // InformationFurtherPage validations
            ifp_address_requiredReg: '',
            ifp_home_tel_requiredReg: '',
            ifp_home_tel_telephoneReg: '',
            ifp_father_tel_telephoneReg: '',
            ifp_mother_tel_telephoneReg: '',
            ifp_resident_tel_requiredReg: '',
            ifp_resident_tel_telephoneReg: '',

            // -----------------------constant resident information validations
            c_firstName_requiredReg: '',
            c_lastName_requiredReg: '',
            c_nationalCode_requiredReg: '',
            c_nationalCode_numberReg: '',
            c_certificateNumber_requiredReg: '',
            c_certificateNumber_numberReg: '',
            c_placeOfIssue_requiredReg: '',
            // c_placeOfIssue_dateReg: '',
            c_birthDate_requiredReg: '',
            c_nationality_requiredReg: '',
            c_fatherName_requiredReg: '',
            c_studentNumber_numberReg: '',
            c_spouseFullName_requiredReg: '',
            c_healthDescription_requiredReg: '',

            // -----------------------other guest information validations
            o_fullName_requiredReg: '',
            o_nationalCode_requiredReg: '',
            o_nationalCode_numberReg: '',
            o_certificateNumber_requiredReg: '',
            o_certificateNumber_numberReg: '',
            o_admissionStartDate_requiredReg: '',
            // o_admissionStartDate_dateReg: '',
            o_admissionEndDate_requiredReg: '',
            // o_admissionStartDate_dateReg: '',
            // o_paymentDate_dateReg: '',
            o_rentPaymentAmount_numberReg: '',
            o_depositPaymentAmount_numberReg: '',
            o_discountPaymentAmount_numberReg: '',
            // o_birthDate_dateReg: '',
        },
    }
    render() {
        return (
            <>
                <div className='d-flex flex-column pt-4 px-5'>
                    <BuildingContext.Provider value={{ unitId: this.state.unitId,
                        typeofResident: this.state.typeofResident,
                        unitNumber: this.state.unitNumber,
                        fields: this.state.fields,
                        errors: this.state.errors,
                        specificValidations : this.state.specificValidations,
                        handleTypeofResident: this.handleTypeofResident,
                        handleUnitNumber: this.handleUnitNumber,
                        handleFields: this.handleFields,
                        handleValidations: this.handleValidations,
                        handleSpecificValidations: this.handleSpecificValidations,}}
                    >
                        <Routes>
                            <Route path="/" element={(<Home />)} />
                            <Route path="/people" element={(<SearchAccount />)} />
                            <Route path="/people/profile" element={(<ProfilePage />)} />
                            <Route path="/booking/edit-floor-and-unit" element={(<EditFloorAndUnit />)} />
                            <Route path='/editRoomAndBed' element={(<EditRoomAndBed />)} />
                            <Route path="/Register" element={(<MainRegister />)} />
                            <Route path="/edit" element={(<EditFloorAndUnit />)} />
                            <Route path="/booking" element={(<FloorAndUnit />)} />
                            <Route path="/RoomAndBed" element={(<RoomAndBed />)} />
                            <Route path="/FullViewOfBed" element={(<FullViewOfBed />)} />
                        </Routes>
                    </BuildingContext.Provider>
                </div>
            </>
        );
    }

    handleTypeofResident = (type) => {
        this.setState({typeofResident: type});
        // console.log(this.state.typeofResident)
    }

    handleUnitNumber = (unitNumber, unitId) => {
        this.setState({ unitNumber: unitNumber });
        this.setState({ unitId: unitId });
    }

    handleFields = (e, field) => {
        let newFields = {...this.state.fields};
        newFields[field] = e.target.value
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

    handleSpecificValidations = (fields, names) => {
        let newSpecificValidations = {...this.state.specificValidations};
        for (let i = 0; i < names.length; i++) {
            newSpecificValidations[names[i]] = fields[i];
        }
        // newValidations[name] = field;
        this.setState({specificValidations : newSpecificValidations});

        console.log(newSpecificValidations)
    }

    getStatusConstantResident = (e) => {
        let newFields = {...this.state.fields};
        newFields['c_maritalStatus'] = e.target.value
        this.setState({ fields: newFields });
    }
}

export default MainPage;