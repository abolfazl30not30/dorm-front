import React, {Component} from 'react';
import './../../../../style/roomAndBed.css'
import {BiBed} from 'react-icons/bi'
import {TbBuilding} from 'react-icons/tb'
import {MdDateRange} from 'react-icons/md'
import {AiOutlineNumber} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {IoMdMore} from "react-icons/io";
import {BsPersonCircle} from "react-icons/bs"
import {Link} from "react-router-dom";
import BuildingContext from '../../../../contexts/Building';
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import {Button, Modal} from 'react-bootstrap'
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import axios from "axios";
import  {BsFillDoorOpenFill} from  "react-icons/bs"
class Room extends Component {
    static contextType = BuildingContext;
    state = {
        isLoading: false,
        isFull: false,
        rooms: [],
        show: false,
        showAccessory: false,
        showRoomAccessory: false,
        roomAccessory: {
            accessories: [
                {name: 'یخچال', count: 1},
                {name: 'چوب لباسی', count: 4}
            ]
        },
        tempRoom: {
            accessories: []
        }
    }

    async componentDidMount() {
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/db41434c138f4dfdb54b608791ce2a76`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({rooms: data, isLoading: false}, () => {
                if (data.length === 0) {
                    this.setState({isFull: false})
                } else {
                    this.setState({isFull: true})
                }
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/db41434c138f4dfdb54b608791ce2a76`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({rooms: data, isLoading: false}, () => {
                                    if (data.length === 0) {
                                        this.setState({isFull: false})
                                    } else {
                                        this.setState({isFull: true})
                                    }
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({rooms: data, isLoading: false}, () => {
                                    if (data.length === 0) {
                                        this.setState({isFull: false})
                                    } else {
                                        this.setState({isFull: true})
                                    }
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }
        })

        // axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
        //     .then((data) => this.setState({unit: data, isLoading: false}))
        //     .catch(() => {
        //         if (localStorage.getItem('role') === 'MANAGER') {
        //             axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
        //                 .then((response) => {
        //                     if (response.headers["accesstoken"]) {
        //                         localStorage.setItem("accessToken", response.headers["accesstoken"]);
        //                         axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
        //                             .then((data) => this.setState({unit: data, isLoading: false}))
        //                     } else {
        //                         window.location = '/'
        //                     }
        //                 })
        //         } else if (localStorage.getItem('role') === 'SUPERVISOR') {
        //             axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
        //                 .then((response) => {
        //                     if (response.headers["accesstoken"]) {
        //                         localStorage.setItem("accessToken", response.headers["accesstoken"]);
        //                         axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
        //                             .then((data) => this.setState({unit: data, isLoading: false}))
        //                     } else {
        //                         window.location = '/'
        //                     }
        //                 })
        //         }})
    }


    handleCloseAccessory = () => {
        this.setState({showAccessory: false})
    };

    handleShowAccessory = () => {
        this.setState({showAccessory: true})
    };
    handleCloseRoomAcc = () => {
        this.setState({showRoomAccessory: false})
    }
    handleShowRoomAcc = (room) => {
        this.setState({showRoomAccessory: true})
        this.setState({tempRoom: room})
    }

    render() {
        return (
            <>
                <div className='unitContainer'>
                    <div className="back-btn">
                        <Link to="/dashboard/booking">
                            بازگشت
                            <i class="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="text">
                        <h4>انتخاب اتاق</h4>
                        <p>
                            در این قسمت تخت مدنظر خود را انتخاب نمایید تا وارد مرحله ی نهایی ثبت نام شوید.
                        </p>
                    </div>
                    <h2 className='unit-name'>
                        <TbBuilding className="mt-2" color='#555' fontSize="1.8rem"/>
                        <span className="unit-title">واحد {}</span>
                    </h2>
                    {
                        this.state.isLoading ? (
                            <div className='row' style={{marginTop: "60px"}}>
                                <FloorAndBedLoading/>
                            </div>
                        ) : (
                            <div>
                                <div className={this.state.isFull ? "edit-btn-container" : "register-btn-container"}>
                                    <Link to="edit-room-and-bed"
                                          className={this.state.isFull ? "edit-btn" : "register-btn"}>
                                        {this.state.isFull ? (<h6>ویرایش</h6>) : (<h6> ثبت اتاق</h6>)}
                                    </Link>
                                </div>
                                <div className="d-flex flex-wrap row">
                                    {
                                        this.state.rooms.map(
                                            (room) => (
                                                <div className="col-md-3 col-sm-4 col-xs-12">
                                                    <div className="room-box d-flex flex-column justify-content-center">
                                                        <div className="icon mt-3 mb-3 d-flex justify-content-center">
                                                            <BsFillDoorOpenFill fontSize="30px" color=""/>
                                                        </div>
                                                        <div className="title mt-1">اتاق {room.number}</div>
                                                        <div className="mt-2 mb-3 d-flex justify-content-center">
                                                            <button className="btn show-acc-btn" onClick={() => {
                                                                this.handleShowRoomAcc(room)
                                                            }}><IoMdMore/> امکانات
                                                                اتاق
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

                <Modal centered show={this.state.showRoomAccessory} onClick={() => {
                    this.handleCloseRoomAcc()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>امکانات اتاق</Modal.Title>
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
                                    this.state.tempRoom.accessories.map((acc) => (
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

}

export default Room;