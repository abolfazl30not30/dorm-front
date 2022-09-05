import React, { Component } from 'react';
import "./../../../style/Building.css"
import Floor from './Floor';
import BuildingContext from '../../../contexts/Building';

class Building extends Component {
    state = {
        floor1: [{
            name: "طبقه اول",
            empty: true,
            id: "1"
        }
        ]

    };
    render() {

        return (
            <>
                <BuildingContext.Provider
                    Name={this.state.floor.floorName}
                >
                    <div className="d-flex flex-wrap">
                        {this.state.floor.map(
                            (f) =>
                                (<Floor Name={f.floorName} Unit={f.unit} />)
                        )}
                    </div>
                </BuildingContext.Provider>

            </>
        );
    }
}

export default Building;