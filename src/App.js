import React, { Component } from 'react';
import Login from './component/Login';
import HamburgerMenu from './component/Dashboard/HamburgerMenu'
import Header from './component/Dashboard/Header';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective } from '@syncfusion/ej2-react-charts';
import MainDashboard from './component/MainDashboard';
import Error404 from "./component/errors/error404";

class App extends Component {
    state = {}

    render() {
        return (
            <>
                <Error404 />
            </>
        );
    }
}

export default App;