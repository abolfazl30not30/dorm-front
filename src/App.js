import React, { Component } from 'react';
import Login from './component/Login';
import HamburgerMenu from './component/Dashboard/HamburgerMenu'
import Header from './component/Dashboard/Header';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective } from '@syncfusion/ej2-react-charts';
import MainDashboard from './component/MainDashboard';

class App extends Component {
    state = {}

    render() {
        return (
            <>
                <MainDashboard />
            </>
        );
    }
}

export default App;