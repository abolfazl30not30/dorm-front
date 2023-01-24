import React, {Component} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import "../../../../style/floorAndUnit.css";
import BuildingContext from "../../../../contexts/Building";
import {TbBuilding} from 'react-icons/tb';
import {IoMdMore} from "react-icons/io";
import 'react-edit-text/dist/index.css';
import { FiEdit2 } from 'react-icons/fi'
import "../../../../style/paymentHistory.css"
import axios from "axios";

class Floor extends Component {

    static contextType = BuildingContext;

    state = {
        isLoading: true,
        isFullUnit: false,
        floor: [],
        showFloorAccessory: false,
        tempFloor: {
            accessories: []
        },
    }

    async componentDidMount() {
        axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                console.log(data)
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                        <h4>طبقه</h4>
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
                            <Link to="edit-floor"
                                  className={this.state.isFullUnit ? "edit-btn" : "register-btn"}>
                                {this.state.isFullUnit ? (<h6><FiEdit2 className='ms-1' />ویرایش</h6>) : (<h6> ثبت طبقه</h6>)}
                            </Link>
                        </div>
                        <div className="floor-container row">
                            {this.state.floor.map((f) => (
                                <Link to={`/dashboard/floor/${f.id}`}>
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
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/*<Modal centered show={this.state.showFloorAccessory} onClick={() => {*/}
                {/*    this.handleCloseFloorAcc()*/}
                {/*}}>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>امکانات طبقه</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}
                {/*        <div className="table-box">*/}
                {/*            <table className="table">*/}
                {/*                <thead>*/}
                {/*                <tr>*/}
                {/*                    <th>نام</th>*/}
                {/*                    <th>تعداد</th>*/}
                {/*                </tr>*/}
                {/*                </thead>*/}
                {/*                <tbody>*/}
                {/*                {*/}
                {/*                    this.state.tempFloor.accessories.map((acc) => (*/}
                {/*                        <tr>*/}
                {/*                            <td>{acc.name}</td>*/}
                {/*                            <td>{acc.count}</td>*/}
                {/*                        </tr>*/}
                {/*                    ))*/}
                {/*                }*/}
                {/*                </tbody>*/}
                {/*            </table>*/}
                {/*        </div>*/}
                {/*    </Modal.Body>*/}
                {/*</Modal>*/}
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