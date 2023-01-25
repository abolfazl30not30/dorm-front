import React, { Component } from "react";
import './../../../../style/editBuilding.css';
import { BsDoorClosed } from 'react-icons/bs'
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import { TbBuilding } from 'react-icons/tb';
import { EditText, EditTextarea } from 'react-edit-text';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import CounterInput from "react-counter-input";
import { FaPencilAlt } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md"
import {MdDone} from 'react-icons/md'
import 'react-edit-text/dist/index.css';
import {Box, CircularProgress} from "@mui/material";
import {green, red} from "@mui/material/colors";
import axios from "axios";
import {IoMdMore} from "react-icons/io";
import floor from "../New IAC/floor";


class EditFloor extends Component {
    state = {
        loading: false,
        floor: [],
        indexOfFloor: null,
        showDeleteModalFloor: false,
        showFloorAccessory: false,
        floorTemp: {
            accessories:[]
        },
        floorIndex: 0,
        accIndex: -1
    }

    async componentDidMount() {
        await axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({floor: data, isLoading: false})
            }).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get('https://api.saadatportal.com/api/v1/supervisor/floor/search?sort=name', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ floor: data, isLoading: false })
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
                                        this.setState({ floor: data, isLoading: false })
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
                <div className="p5">

                    <div className="back-btn">
                        <Link to="/dashboard/booking/floor">
                            بازگشت
                            <i class="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="text">
                        <h4>ویرایش و ثبت طبقه</h4>
                        <p>
                            در این بخش ابتدا تمام طبقات به همراه واحد های موجود در هر طبقه را با نام مدنظر خود وارد نمایید و پس از اتمام
                            این مرحله در بخش بعدی اتاق ها و تخت های واقع در هر واحد را وارد می نمایید.
                        </p>
                    </div>
                    <div className="floor-container row">
                        {this.state.floor.map((f, i) => (
                            <div className="mt-2 mb-2 col-md-3 col-sm-4 col-xs-12">
                                <div className="floor-box d-flex flex-column justify-content-center">
                                    <button className="floor-close-btn mt-0" onClick={() => { this.handleDeleteShowFloor(f) }}><AiFillCloseCircle color="#F1416C" /></button>
                                    <div className="icon mt-3 mb-3 d-flex justify-content-center">
                                        <TbBuilding fontSize="30px" color="green"/>
                                    </div>
                                    <div className="title mt-1 text-success d-flex align-items-center justify-content-center">
                                        طبقه <EditText ref="floorTitle" showEditButton defaultValue={f.name} onSave={this.editFloorTitle} />
                                    </div>
                                    <div className="mt-4 d-flex justify-content-center">
                                        <button className="btn show-acc-btn"  onClick={() => { this.handleFloorAccShow(f) }}>امکانات طبقه <MdAddCircle fontSize="15px" /> </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="mt-2 mb-2 col-md-3 col-sm-4 col-xs-12">
                            <div className="floor-box add">
                                <button onClick={this.addFloor} className="btn"><div className={"d-flex align-items-center"} style={{color: "#296d9a", fontSize: "1.5rem"}}>افزودن طبقه<AiOutlinePlus size={25} className={"mx-2 mb-1"}/></div></button>
                            </div>
                        </div>
                    </div>
                    <div className="register">
                        <Link to="/dashboard/booking/floor" className="register-btn"><MdDone className='ms-1' />ثـبـت</Link>
                    </div>
                </div>

                <Modal centered show={this.state.showDeleteModalFloor} onHide={() => this.setState({showDeleteModalFloor: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف طبقه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين طبقه مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDelete"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={() => this.handleDeleteFloor()}
                            >
                                حذف
                            </Button>
                            {this.state.loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: red[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                        <button className="btn btn-light" onClick={() => this.setState({showDeleteModalFloor: false})}>بستن</button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showَFloorAccessory} onHide={() => { this.handleFloorAccClose() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>اضافه کردن امکانات طبقه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="accessoryModal justify-content-center">
                        <div className="accessory-box-title d-flex"><h5>تجهیزات</h5><h5>تعداد</h5></div>
                        {this.state.floorTemp.accessories.map((accessory, i) => (
                            <div className="accessory row">
                                <div><button className="close-btn" onClick={() => { this.deleteAccessory(accessory, this.state.floorTemp) }}><AiFillCloseCircle color="#F1416C" /></button></div>
                                <div className="accessory-title col-7">
                                    <EditText style={{ backgroundColor: "#f9f9f9" }} className="editable" showEditButton defaultValue={accessory.name} onSave={this.editAccTitle} onEditMode={()=>{this.setState({accIndex : i})}} editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px" />} />
                                </div>
                                <div className="accessory-count col-5">
                                    <CounterInput min={0} max={10} count={accessory.count} onCountChange={count => {this.handleCount(count,accessory,this.state.floorTemp)}} />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => { this.addAccessory(this.state.floorTemp) }} className="accessory-add-btn"><AiOutlinePlus /></button>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={() => {this.handleSubmitAcc(this.state.floorTemp)}}>ثبت</button>
                        <button className="btn btn-light" onClick={() => { this.handleFloorAccClose()}}>بستن</button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

    addFloor = async () => {
        const count = (this.state.floor.length + 1).toString()
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/floor', { name: `${count}`, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/floor', { name: `${count}`, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/floor', { name: `${count}`, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.componentDidMount()
    }

    editFloorTitle = async ({ value, previousValue }) => {
        const floor = this.state.floor.find(({ name }) => name === previousValue);
        const index = this.state.floor.findIndex(({ name }) => name === previousValue);
        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, { name: value, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, { name: value, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, { name: value, empty: "true" }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const updatedState = [...this.state.floor];
        updatedState[index].name = value;
        this.setState({ floor: updatedState });

    };
    deleteFloor = async (floor) => {
        this.setState({ showDeleteModal: true, loading: true});
        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({loading: false, showDeleteModalFloor: false})
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalFloor: false})
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
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalFloor: false})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const updatedFloors = this.state.floor.filter(f => f !== floor);
        this.setState({ floor: updatedFloors });
    }

    addAccessory = async (r) => {
        const index = this.state.floor.indexOf(r);
        const newAccessory = this.state.floor[index].accessories.concat(
            { name: "", count: 0 }
        )
        const updateState = [...this.state.floor]
        updateState[index].accessories = newAccessory
        this.setState({ floor: updateState })
    }

    editAccTitle = async ({value}) =>{
        const index = this.state.floor.indexOf(this.state.floorTemp);
        const updateState = [...this.state.floor];
        updateState[index].accessories[this.state.accIndex].name = value;
        this.setState({floor : updateState});
    }
    handleCount = (count,acc,floor) =>{

        const floorIndex = this.state.floor.indexOf(floor);
        const accIndex = this.state.floorTemp.accessories.indexOf(acc)

        const updatedState = [...this.state.floor];
        updatedState[floorIndex].accessories[accIndex].count = count;
        this.setState({floor : updatedState});

    }

    deleteAccessory = (accessory, floor) => {
        let updatedState = [...this.state.floor];
        let index = this.state.floor.indexOf(floor);
        let updatedAccessory = this.state.floor[index].accessories;

        updatedAccessory = updatedAccessory.filter(a => a !== accessory);
        updatedState[index].accessories = updatedAccessory;
        this.setState({ floor: updatedState });
    }

    handleSubmitAcc = async (floor) =>{
        const index = this.state.floor.indexOf(floor);
        const assessories = this.state.floor[index].accessories;
        console.log(assessories);
        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/floor/${floor.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.setState({showَFloorAccessory:false});
    }

    handleDeleteShowFloor = (floor) => {
        this.setState({ showDeleteModalFloor: true });
        this.setState({ floorTemp: floor });
    }

    handleDeleteFloor = () => {
        this.deleteFloor(this.state.floorTemp);
    }

    handleFloorAccShow = (floor) => {
        this.setState({ showَFloorAccessory: true });
        this.setState({floorTemp:floor})
    }
    handleFloorAccClose = async () => {

        await axios.get('https://api.saadatportal.com/api/v1/supervisor/floor', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({ floor: data})
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get('https://api.saadatportal.com/api/v1/supervisor/floor', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ floor: data})
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
                                axios.get('https://api.saadatportal.com/api/v1/supervisor/floor', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ floor: data})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.setState({ showَFloorAccessory: false })

    }
}

export default EditFloor;