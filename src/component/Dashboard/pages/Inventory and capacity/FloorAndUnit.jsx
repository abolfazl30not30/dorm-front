import React, {Component} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import RoomAndBed from './RoomAndBed';
import "../../../../style/floorAndUnit.css";
import BuildingContext from "../../../../contexts/Building";
import doorEmpty from "../../../../img/door-empty.png";
import doorFull from "../../../../img/doot-full.png";
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import {TbBuilding} from 'react-icons/tb';
import {IoMdMore} from "react-icons/io";
import {EditText, EditTextarea} from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import {Button, Modal} from 'react-bootstrap'
import {BiChevronLeft} from 'react-icons/bi'


class FloorAndUnit extends Component {

    static contextType = BuildingContext;

    state = {
        floor1: [
            {
                id: 1, name: "طبقه اول",
                units: [
                    {id: 111, number: "111", empty: false},
                    {id: 112, number: "112", empty: true},
                    {id: 113, number: "113", empty: false},
                    {id: 114, number: "114", empty: false},
                    {id: 115, number: "115", empty: true},
                    {id: 116, number: "116", empty: false}
                ]
            },
            {
                id: 2, name: "طبقه دوم",
                units: [
                    {id: 211, number: "211", empty: true},
                    {id: 212, number: "212", empty: true},
                    {id: 213, number: "213", empty: true},
                    {id: 214, number: "214", empty: true},
                    {id: 215, number: "215", empty: true},
                    {id: 216, number: "216", empty: true}
                ]
            },
            {
                id: 3, name: "طبقه سوم",
                units: [
                    {id: 311, number: "311", empty: false},
                    {id: 312, number: "312", empty: false},
                    {id: 313, number: "313", empty: true},
                    {id: 314, number: "314", empty: true},
                    {id: 315, number: "315", empty: true},
                    {id: 316, number: "316", empty: true}
                ]
            },
            {
                id: 3, name: "طبقه چهارم",
                units: [
                    {id: 311, number: "411", empty: false},
                    {id: 312, number: "412", empty: true},
                    {id: 313, number: "413", empty: false},
                    {id: 314, number: "414", empty: true},
                    {id: 315, number: "415", empty: true},
                    {id: 316, number: "416", empty: true}
                ]
            },
        ],
        isLoading: true,
        isFullUnit: false,
        floor: [],
        showFloorAccessory: false,
        tempFloor: {
            accessories: []
        },
    }

    async componentDidMount() {
        let data;
        const response = await fetch('https://api.saadatportal.com/api/v1/floor').then((response) => response.json())
            .then((data) => this.setState({floor: data, isLoading: false},()=>{
                if (data.length == 0) {
                    this.setState({isFullUnit: false})
                } else {
                    this.setState({isFullUnit: true})
                }
            }));
        console.log(this.state.floor)

    }


    render() {
        return (
            <>
                <div className='floorAndUnit'>
                    <div className="back-btn">
                        <Link to="/">
                            بازگشت
                            <i class="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="text">
                        <h4>انتخاب طبقه و واحد</h4>
                        <p>
                            برای انتخاب تخت ابتدا می بایست طبقه و سپس واحد مورد نظر خود را انتخاب نمایید و در مراحل بعدی
                            می توانید
                            جایگاه تخت خود را برگزینید
                        </p>
                    </div>

                    {this.state.isLoading ? (
                        <div className='row' style={{marginTop: "60px"}}>
                            <FloorAndBedLoading/>
                        </div>
                    ) : (
                        <div>
                            <div className={this.state.isFullUnit ? "edit-btn-container" : "register-btn-container"}>
                                <Link to="edit-floor-and-unit"
                                      className={this.state.isFullUnit ? "edit-btn" : "register-btn"}>
                                    {this.state.isFullUnit ? (<h6>ویرایش</h6>) : (<h6> ثبت طبقه و واحد</h6>)}
                                </Link>
                            </div>
                            <div className="floor-container row">
                                {this.state.floor.map((f) => (
                                    <div className="col-md-4 col-sm-6 col-xs-12 p-0">
                                        <div className='floor'>
                                            <div className="floor-title row ">
                                                <div className="col-7"><h3 className='floor-name'>{f.name}</h3></div>
                                                <div className="col-5 ">
                                                    <button className="btn show-acc-btn" onClick={() => {
                                                        this.handleShowFloorAcc(f)
                                                    }}><IoMdMore/> امکانات طبقه
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="unit-container row justify-content-around">
                                                {f.units.map((unit) => (
                                                    <div className={`unit col-4`}>
                                                        <Link className={`${unit.empty ? "empty-link" : "full-link"}`}
                                                              to="/RoomAndBed" onClick={() => {
                                                            this.context.handlez(unit.number, unit.id)
                                                        }}>
                                                            <TbBuilding fontSize="2rem"/>
                                                            <h5 className='unit-name'>واحد {unit.number}</h5>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Modal centered show={this.state.showFloorAccessory} onClick={() => {
                    this.handleCloseFloorAcc()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>امکانات طبقه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.tempFloor.accessories.map((acc) => (
                                <div className='d-flex flex-row my-2 w-50'>
                                    <div className='ms-3'><BiChevronLeft/>{acc.name}</div>
                                    <div className='me-auto'>{acc.count} عدد</div>
                                </div>
                            ))
                        }
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    handleCloseFloorAcc = () => {
        this.setState({showFloorAccessory: false});
    }

    handleShowFloorAcc = (floor) => {
        this.setState({showFloorAccessory: true});
        this.setState({tempFloor: floor});
    }

}

export default FloorAndUnit;