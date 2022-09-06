import React, { Component } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import RoomAndBed from './RoomAndBed';
import "../../../../style/floorAndUnit.css";
import BuildingContext from "../../../../contexts/Building";
import doorEmpty from "../../../../img/door-empty.png";
import doorFull from "../../../../img/doot-full.png";
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import { TbBuilding } from 'react-icons/tb';
class FloorAndUnit extends Component {
    static contextType = BuildingContext;
    state = {
        floor1: [
            {
                id: 1, floorName: "طبقه اول",
                unit: [
                    { id: 111, unitName: "111", empty: false },
                    { id: 112, unitName: "112", empty: true },
                    { id: 113, unitName: "113", empty: false },
                    { id: 114, unitName: "114", empty: false },
                    { id: 115, unitName: "115", empty: true },
                    { id: 116, unitName: "116", empty: false }
                ]
            },
            {
                id: 2, floorName: "طبقه دوم",
                unit: [
                    { id: 211, unitName: "211", empty: false },
                    { id: 212, unitName: "212", empty: true },
                    { id: 213, unitName: "213", empty: false },
                    { id: 214, unitName: "214", empty: false },
                    { id: 215, unitName: "215", empty: false },
                    { id: 216, unitName: "216", empty: false }
                ]
            },
            {
                id: 3, floorName: "طبقه سوم",
                unit: [
                    { id: 311, unitName: "311", empty: false },
                    { id: 312, unitName: "312", empty: false },
                    { id: 313, unitName: "313", empty: false },
                    { id: 314, unitName: "314", empty: true },
                    { id: 315, unitName: "315", empty: false },
                    { id: 316, unitName: "316", empty: false }
                ]
            },
            {
                id: 3, floorName: "طبقه چهارم",
                unit: [
                    { id: 311, unitName: "411", empty: false },
                    { id: 312, unitName: "412", empty: false },
                    { id: 313, unitName: "413", empty: false },
                    { id: 314, unitName: "414", empty: false },
                    { id: 315, unitName: "415", empty: false },
                    { id: 316, unitName: "416", empty: false }
                ]
            },
        ],
        isLoading: true,
        floor: []
    }
    async componentDidMount() {
        const response = await fetch('http://localhost:8089/api/v1/floor').then((response) => response.json())
            .then((data) => this.setState({ floor: data, isLoading: false }));

        console.log(this.state.floor)

    }
    render() {
        return (
            <>
                <div className='floorAndUnit'>
                    <div className="back-btn">
                        <Link to="/">
                            بازگشت
                            <i class="bi bi-caret-left-fill"></i>
                        </Link>
                    </div>
                    <div className="text">
                        <h4>انتخاب طبقه و واحد</h4>
                        <p>
                            برای انتخاب تخت ابتدا می بایست طبقه و سپس واحد مورد نظر خود را انتخاب نمایید و در مراحل بعدی می توانید
                            جایگاه تخت خود را برگزینید
                        </p>
                    </div>
                    {this.state.isLoading ? (
                        <div className='row' style={{ marginTop: "60px" }}>
                            <FloorAndBedLoading />
                        </div>
                    ) : (
                        <div className="floor-container row">
                            {this.state.floor.map((f) => (
                                <div className="col-md-4 col-sm-6 col-xs-12 p-0">
                                    <div className='floor'>
                                        <h3 className='floor-name'>{f.name}</h3>
                                        <div className="unit-container row">
                                            {f.units.map((unit) => (
                                                <div className={`unit col-4`}>
                                                    <Link className={`${unit.empty ? "full-link" : "empty-link"}`} to="/RoomAndBed" onClick={() => { this.context.handleUnitNumber(unit.number) }}>
                                                        <TbBuilding fontSize="2rem" />
                                                        <h5 className='unit-name'>واحد {unit.number}</h5>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default FloorAndUnit;