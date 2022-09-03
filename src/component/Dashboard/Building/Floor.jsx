import React, { Component } from 'react';
import Unit from './Unit';
import BuildingContext from '../../../contexts/Building';

class Floor extends Component {
    static contextType = BuildingContext;

    render() {

        return (
            <>
                <div className="col-4 p-5">
                    <div className="floor">
                        <div className="title">{this.props.Name}</div>
                        <div className='d-flex flex-wrap justify-content-around text-center mt-3'>
                            {this.props.Unit.map(
                                (u) =>
                                    (<Unit Name={u.unitName} />)
                            )}
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default Floor;