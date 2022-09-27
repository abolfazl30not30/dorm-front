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
        },
        errors : {
            required: 'این فیلد را پر کنید!',
            numberRequired: 'عدد وارد کنید!',
            homeTelephoneReg: 'شماره تلفن همراه با کد وارد کنید (۳۴۵۶۷۸۹۰-۰۱۲) ',
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

            // InformationFurtherPage
            ifp_address_requiredReg: '',
            ifp_home_tel_requiredReg: '',
            ifp_home_tel_telephoneReg: '',
            ifp_father_tel_telephoneReg: '',
            ifp_mother_tel_telephoneReg: '',
            ifp_resident_tel_requiredReg: '',
            ifp_resident_tel_telephoneReg: '',

            // InformationFamilyPage
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

        // console.log(newSpecificValidations)
    }
}

export default MainPage;