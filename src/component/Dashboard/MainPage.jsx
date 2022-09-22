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
import PaymentPage from './pages/paymentPage/PaymentPage';

class MainPage extends Component {
    state = {
        unitNumber: "",
        unitId: ""
    }
    render() {
        return (
            <>
                <div className='d-flex flex-column pt-4 px-5'>
                    <BuildingContext.Provider value={{ unitId: this.state.unitId, unitNumber: this.state.unitNumber, handleUnitNumber: this.handleUnitNumber }}>
                        <Routes>
                            <Route path="/" element={(<Home />)} />
                            <Route path="/booking/edit-floor-and-unit" element={(<EditFloorAndUnit />)} />
                            <Route path='/editRoomAndBed' element={(<EditRoomAndBed />)} />
                            <Route path='/payment' element={(<PaymentPage />)} />
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

    handleUnitNumber = (unitNumber, unitId) => {
        this.setState({ unitNumber: unitNumber });
        this.setState({ unitId: unitId });
    }
}

export default MainPage;