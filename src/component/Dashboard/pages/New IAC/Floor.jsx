import React, {Component} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import "../../../../style/floorAndUnit.css";
import BuildingContext from "../../../../contexts/Building";
import {TbBuilding} from 'react-icons/tb';
import {IoMdMore} from "react-icons/io";
import 'react-edit-text/dist/index.css';
import { FiEdit2 } from 'react-icons/fi'
import "../../../../style/paymentHistory.css"
import Modal from "react-bootstrap/Modal"
import axios from "axios";

class Floor extends Component {

    static contextType = BuildingContext;

    state = {
        isLoading: true,
        isFullFloor: false,
        floor: [],
        showFloorAccessory: false,
        tempFloor: {
            accessories: []
        },
    }

    async componentDidMount() {
        axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({floor: data, isLoading: false},()=>{
                    if (data.length === 0) {
                        this.setState({isFullFloor: false})
                    } else {
                        this.setState({isFullFloor: true})
                    }
                })
            }).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({floor: data, isLoading: false},()=>{
                                        if (data.length === 0) {
                                            this.setState({isFullFloor: false})
                                        } else {
                                            this.setState({isFullFloor: true})
                                        }
                                    })
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({floor: data, isLoading: false},()=>{
                                        if (data.length === 0) {
                                            this.setState({isFullFloor: false})
                                        } else {
                                            this.setState({isFullFloor: true})
                                        }
                                    })
                                })
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }


    render() {
        return (
            <>
                <div className='floorAndUnit'>
                    <div className="back-btn">
                        <Link to="/dashboard">
                            بازگشت
                            <i class="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="text">
                        <h4>طبقه ها</h4>
                        <p>
                            برای انتخاب تخت ابتدا می بایست طبقه و سپس واحد مورد نظر خود را انتخاب نمایید و در مراحل بعدی
                            می توانید
                            جایگاه تخت خود را برگزینید
                        </p>
                    </div>

                    <div>
                        <div className={`d-flex justify-content-between ${this.state.isFullFloor ? "edit-btn-container" : "register-btn-container"}`}>
                            <div>
                                <Link to="/dashboard/booking/room_log">
                                    <button className={'btn btn-success'}>
                                        گزارش گیری
                                    </button>
                                </Link>
                            </div>
                            <Link to="/dashboard/booking/edit-floor"
                                  className={this.state.isFullFloor ? "edit-btn" : "btn btn-success"}>
                                {this.state.isFullFloor ? (<h6><FiEdit2 className='ms-1' />ویرایش</h6>) : (<h6> ثبت طبقه</h6>)}
                            </Link>
                        </div>
                        <div className="floor-container row">
                            {this.state.floor.map((f) => (
                                <div className="mt-3 col-md-3 col-sm-4 col-xs-12">
                                    <div className="floor-box d-flex flex-column justify-content-center">
                                        <Link to={`/dashboard/booking/floor/${f.id}`} style={{textDecoration: "none"}}>
                                            <div className="icon mt-3 mb-3 d-flex justify-content-center">
                                                <TbBuilding fontSize="30px" color="green"/>
                                            </div>
                                            <div className="title mt-1 text-success">طبقه {f.name}</div>
                                        </Link>
                                        <div className="mt-4 d-flex justify-content-center">
                                            <button className="btn show-acc-btn" onClick={() => {
                                                this.handleShowFloorAcc(f)
                                            }}><IoMdMore/> امکانات طبقه
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Modal centered show={this.state.showFloorAccessory} onClick={() => {
                    this.handleCloseFloorAcc()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>امکانات طبقه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="table-box">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>نام</th>
                                    <th>تعداد</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.tempFloor.accessories.map((acc) => (
                                        <tr>
                                            <td>{acc.name}</td>
                                            <td>{acc.count}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
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

export default Floor;