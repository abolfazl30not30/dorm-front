import React, {Component} from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Login from './component/Login';
import HamburgerMenu from './component/Dashboard/HamburgerMenu'
import Header from './component/Dashboard/Header';
import {
    AccumulationChartComponent,
    AccumulationSeriesCollectionDirective,
    AccumulationSeriesDirective
} from '@syncfusion/ej2-react-charts';
import MainDashboard from './component/MainDashboard';
import Home from "./component/Dashboard/pages/Home";
import FloorAndUnit from "./component/Dashboard/pages/Inventory and capacity/FloorAndUnit";
import EditFloorAndUnit from "./component/Dashboard/pages/edit building/EditFloorAndUnit";
import RoomAndBed from "./component/Dashboard/pages/Inventory and capacity/RoomAndBed";
import ForgotPassword from "./component/ForgotPassword";

class App extends Component {
    state = {}

    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={(<Login/>)}/>
                        <Route exact path="/forgot-password" element={(<ForgotPassword/>)}/>
                        <Route path="/dashboard/*" element={(<MainDashboard/>)}/>
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default App;