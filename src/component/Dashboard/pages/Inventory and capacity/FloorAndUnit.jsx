import React, { Component } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import RoomAndBed from './RoomAndBed';
import "../../../../style/floorAndUnit.css";
import BuildingContext from "../../../../contexts/Building";
import doorEmpty from "../../../../img/door-empty.png";
import doorFull from "../../../../img/doot-full.png";
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import { TbBuilding } from 'react-icons/tb';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

class FloorAndUnit extends Component {
    static contextType = BuildingContext;
    state = {
        floor1: [
            {
                id: 1, name: "طبقه اول",
                units: [
                    { id: 111, number: "111", empty: false },
                    { id: 112, number: "112", empty: true },
                    { id: 113, number: "113", empty: false },
                    { id: 114, number: "114", empty: false },
                    { id: 115, number: "115", empty: true },
                    { id: 116, number: "116", empty: false }
                ]
            },
            {
                id: 2, name: "طبقه دوم",
                units: [
                    { id: 211, number: "211", empty: false },
                    { id: 212, number: "212", empty: true },
                    { id: 213, number: "213", empty: false },
                    { id: 214, number: "214", empty: false },
                    { id: 215, number: "215", empty: false },
                    { id: 216, number: "216", empty: false }
                ]
            },
            {
                id: 3, name: "طبقه سوم",
                units: [
                    { id: 311, number: "311", empty: false },
                    { id: 312, number: "312", empty: false },
                    { id: 313, number: "313", empty: false },
                    { id: 314, number: "314", empty: true },
                    { id: 315, number: "315", empty: false },
                    { id: 316, number: "316", empty: false }
                ]
            },
            {
                id: 3, name: "طبقه چهارم",
                units: [
                    { id: 311, number: "411", empty: false },
                    { id: 312, number: "412", empty: false },
                    { id: 313, number: "413", empty: false },
                    { id: 314, number: "414", empty: false },
                    { id: 315, number: "415", empty: false },
                    { id: 316, number: "416", empty: false }
                ]
            },
        ],
        isLoading: false,
        floor: []
    }
    // async componentDidMount() {
    //     // const response = await fetch('http://localhost:8089/api/v1/floor').then((response) => response.json())
    //     //     .then((data) => this.setState({ floor: data, isLoading: false }));
    //     // console.log(this.state.floor)
    // }
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
                            {this.state.floor1.map((f) => (
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