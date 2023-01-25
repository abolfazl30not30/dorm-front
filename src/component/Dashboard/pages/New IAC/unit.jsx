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
import {MdOutlineMeetingRoom} from "react-icons/md";
import floor from "./floor";

class Unit extends Component {

    static contextType = BuildingContext;

    state = {
        isLoading: true,
        isFullUnit: false,
        floor: {
            units: []
        },
        showUnitAccessory: false,
        tempUnit: {
            accessories: []
        },
    }

    async componentDidMount() {
        const floorId = window.location.href.slice(-32)
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/floor/${floorId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({floor: data, isLoading: false},()=>{
                    if (data.length === 0) {
                        this.setState({isFullUnit: false})
                    } else {
                        this.setState({isFullUnit: true})
                    }
                })
            }).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/floor/${floorId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({floor: data, isLoading: false},()=>{
                                        if (data.length === 0) {
                                            this.setState({isFullUnit: false})
                                        } else {
                                            this.setState({isFullUnit: true})
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/floor/${floorId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({floor: data, isLoading: false},()=>{
                                        if (data.length === 0) {
                                            this.setState({isFullUnit: false})
                                        } else {
                                            this.setState({isFullUnit: true})
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
                        <h4>طبقه {this.state.floor.name}</h4>
                        <p>
                            برای انتخاب تخت ابتدا می بایست طبقه و سپس واحد مورد نظر خود را انتخاب نمایید و در مراحل بعدی
                            می توانید
                            جایگاه تخت خود را برگزینید
                        </p>
                    </div>

                    <div>
                        <div className={`d-flex justify-content-between ${this.state.isFullUnit ? "edit-btn-container" : "register-btn-container"}`}>
                            <div>
                                <Link to="room_log">
                                    <button className={'btn btn-success'}>
                                        گزارش گیری
                                    </button>
                                    {/*<Button variant="contained">*/}
                                    {/*    گزارش گیری*/}
                                    {/*</Button>*/}
                                </Link>
                            </div>
                            <Link to={`/dashboard/booking/edit-unit/${this.state.floor.id}`}
                                  className={this.state.isFullUnit ? "edit-btn" : "register-btn"}>
                                {this.state.isFullUnit ? (<h6><FiEdit2 className='ms-1' />ویرایش</h6>) : (<h6>ثبت واحد</h6>)}
                            </Link>
                        </div>
                        <div className="floor-container row">
                            {this.state.floor.units.map((unit) => (
                                <div className="mb-4 col-md-3 col-sm-4 col-xs-12">
                                    <div className="floor-box d-flex flex-column justify-content-center">
                                        <Link to={`/dashboard/booking/room/${unit.id}`} style={{textDecoration: "none"}}>
                                            <div className="icon mt-3 mb-3 d-flex justify-content-center">
                                                <MdOutlineMeetingRoom fontSize="30px" color="green"/>
                                            </div>
                                            <div className="title mt-1 text-success">واحد {unit.number}</div>
                                        </Link>
                                        <div className="mt-4 d-flex justify-content-center">
                                            <button className="btn show-acc-btn" onClick={() => {
                                                this.handleShowUnitAcc(unit)
                                            }}><IoMdMore/> امکانات واحد
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Modal onHide={this.handleCloseUnitAcc} centered show={this.state.showUnitAccessory}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>امکانات واحد</Modal.Title>
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
                                    this.state.tempUnit.accessories.map((acc) => (
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
                </Modal>            </>
        );
    }

    handleCloseUnitAcc = () => {
        this.setState({showUnitAccessory: false});
    }

    handleShowUnitAcc = (unit) => {
        this.setState({showUnitAccessory: true});
        this.setState({tempUnit: unit});
    }

}

export default Unit;