import React, { Component } from 'react';
import Building from './Building/Building';
import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';
import FloorAndUnit from './pages/Inventory and capacity/FloorAndUnit';
import RoomAndBed from './pages/Inventory and capacity/RoomAndBed';
import FullViewOfBed from './pages/Inventory and capacity/FullViewOfBed';
import EditFloorAndUnit from './pages/edit building/edit floor and unit';
class MainPage extends Component {
    state = {}
    render() {
        return (
            <>
                <div className='d-flex flex-column '>
                    <Routes>
                        <Route path="/" element={(<Home />)} />
                        <Route path="/booking" element={(<FloorAndUnit />)} />
                        <Route path="/edit" element={(<EditFloorAndUnit />)} />
                        <Route path="/RoomAndBed" element={(<RoomAndBed />)} />
                        <Route path="/FullViewOfBed" element={(<FullViewOfBed />)} />
                    </Routes>
                </div>
            </>
        );
    }
}

export default MainPage;