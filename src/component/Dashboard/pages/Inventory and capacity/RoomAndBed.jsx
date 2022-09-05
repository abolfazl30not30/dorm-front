import React, { Component } from 'react';
import BuildingContext from '../../../../contexts/Building';


class RoomAndBed extends Component {
    static contextType = BuildingContext;

    state = {
    }
    render() {
        return (
            <>
                <div>
                    RoomAndBed
                    {console.log(this.context.unitNumber)}
                    <h1>{this.context.unitNumber}</h1>
                </div>
            </>
        );
    }

}

export default RoomAndBed;