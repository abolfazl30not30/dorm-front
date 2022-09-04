import React, { Component } from 'react';
import { Category, ChartComponent, ColumnSeries, DataLabel, Inject, Legend, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective } from '@syncfusion/ej2-react-charts';
class Home extends Component {
    state = {
    }
    constructor() {
        this.data2 = [
            { x: 'Jan', y: 3, text: 'Jan: 3' }, { x: 'Feb', y: 3.5, text: 'Feb: 3.5' },
            { x: 'Mar', y: 7, text: 'Mar: 7' }, { x: 'Apr', y: 13.5, text: 'Apr: 13.5' },
            { x: 'May', y: 19, text: 'May: 19' }, { x: 'Jun', y: 23.5, text: 'Jun: 23.5' },
            { x: 'Jul', y: 26, text: 'Jul: 26' }, { x: 'Aug', y: 25, text: 'Aug: 25' },
            { x: 'Sep', y: 21, text: 'Sep: 21' }, { x: 'Oct', y: 15, text: 'Oct: 15' }
        ];
    }
    render() {
        return (
            <div >
                <AccumulationChartComponent id="charts">
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={this.data2} xName='x' yName='y' radius='90%' />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
        );
    }
}

export default Home;