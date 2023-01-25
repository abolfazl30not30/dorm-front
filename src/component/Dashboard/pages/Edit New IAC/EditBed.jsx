import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AiOutlinePlus, AiFillCloseCircle} from 'react-icons/ai';
import {FaPencilAlt} from 'react-icons/fa';
import {EditText, EditTextarea} from 'react-edit-text';
import {BiBed} from 'react-icons/bi';
import CounterInput from "react-counter-input";
import {Button, Modal} from 'react-bootstrap';
import "../../../../style/editBuilding.css";
import {Padding} from '@syncfusion/ej2-react-charts';
import {TbBuilding} from "react-icons/tb"
import BuildingContext from '../../../../contexts/Building';
import {MdAddCircle} from "react-icons/md";
import {Box, CircularProgress} from "@mui/material";
import {red} from "@mui/material/colors";
import axios from "axios";

class EditBed extends Component {

    static contextType = BuildingContext;

    state = {
        loading: false,
        beds: [],
        room: {},
        showDeleteModalBed: false,
        bedTemp: {},
    }

    async componentDidMount() {
        const roomId = window.location.href.slice(-32)
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/room/getBeds/${roomId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({beds: data, loading: false}))
            .catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/room/getBeds/${roomId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({beds: data, loading: false}))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/room/getBeds/${roomId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({beds: data, loading: false}))
                        } else {
                            window.location = '/'
                        }
                    })
            }
        })


        axios.get(`https://api.saadatportal.com/api/v1/supervisor/room/${roomId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({room: data}))
            .catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/room/${roomId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({room: data}))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/room/${roomId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({room: data}))
                        } else {
                            window.location = '/'
                        }
                    })
            }
        })

    }

    render() {
        return (
            <>
                <div className="RoomAndBed">

                    <div className="back-btn">
                        <Link to={`/dashboard/floor/unit/room/${this.state.room.id}`}>
                            بازگشت
                            <i class="bi bi-caret-left-fill"></i>
                        </Link>
                    </div>

                    <div className="text">
                        <h4>ثبت و ویرایش تخت</h4>
                        <p>
                            در این بخش ابتدا تمام طبقات به همراه واحد های موجود در هر طبقه را با نام مدنظر خود وارد
                            نمایید و پس از اتمام
                            این مرحله در بخش بعدی اتاق ها و تخت های واقع در هر واحد را وارد می نمایید.
                        </p>
                    </div>

                    <h2 className='unit-name d-flex align-items-center'>
                        <TbBuilding className="mt-2" color='#555' fontSize="1.8rem"/>
                        <span className="unit-title">اتاق {this.state.room.number}</span>
                    </h2>
                    {/*<div className="mt-4 d-flex flex-wrap row justify-content-center">*/}
                    {/*    {*/}
                    {/*        this.state.beds.map(*/}
                    {/*            (bed) => (*/}
                    {/*                <div className="col-md-3 col-sm-4 col-xs-12">*/}
                    {/*                    <div className={`bed-box ${bed.empty ? "empty" : "full"}`}>*/}
                    {/*                        <Button onClick={() => {*/}
                    {/*                            this.handleShow(bed)*/}
                    {/*                        }}>*/}
                    {/*                            <BiBed fontSize="2rem"/>*/}
                    {/*                            <div className="title">{bed.name}</div>*/}
                    {/*                        </Button>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            )*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*</div>*/}
                    <div className="mt-4 d-flex flex-wrap row justify-content-center">
                        {this.state.beds.map((bed, i) => (
                            <div className='col-md-3 col-sm-4 col-xs-12'>
                                <div className='room-box'>
                                    <button className="close-btn" onClick={() => {
                                        this.handleDeleteShowBed(bed)
                                    }}><AiFillCloseCircle color="#F1416C"/></button>
                                    <div className="title-container d-flex flex-column justify-content-center align-items-center">
                                        <BiBed fontSize="2rem"/>
                                        <div className="firstTitle d-flex">تخت <EditText
                                            showEditButton defaultValue={bed.name}
                                            onSave={this.editBedTitle}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='col-md-3 col-sm-4 col-xs-12'>
                            <button className='bed-add-btn' onClick={() => {
                                this.addBed()
                            }}><div className={"d-flex align-items-center"} style={{color: "#296d9a", fontSize: "1rem"}}>افزودن تخت<AiOutlinePlus size={20} className={"mx-2"}/></div></button>
                        </div>
                    </div>
                    <div className="register">
                        <Link to={`/dashboard/booking/floor/unit/room/${this.state.room.id}`} className="register-btn-room">ثـبـت</Link>
                    </div>
                </div>

                <Modal centered show={this.state.showDeleteModalBed} onHide={() => {
                    this.setState({showDeleteModalBed: false})
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف تخت</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين تخت مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDelete"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={this.handleDeleteBed}
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
                        <button className="btn btn-light" onClick={() => this.setState({showDeleteModalBed: false})}>بستن</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleDeleteShowBed = (bed) => {
        this.setState({showDeleteModalBed: true});
        this.setState({bedTemp: bed});
    }

    handleDeleteBed = () => {
        this.deleteBed(this.state.bedTemp);
    }

    //bed
    addBed = async () => {
        const count = (this.state.floor.units.length + 1).toString()
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/bed', {name:count, empty: "true", roomId: this.state.room.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/bed', {name: count, empty: "true", roomId: this.state.room.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }})
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/bed', {name:count, empty: "true", roomId: this.state.room.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.componentDidMount()
    }

    editBedTitle = async ({value, previousValue}) => {
        let indexOfBed = -1;

        indexOfBed = this.state.beds.findIndex(({name}) => name === previousValue);

        const updatedState = [...this.state.beds];
        const roomId = this.state.room.id;
        const bedId = updatedState[indexOfBed].id;
        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${bedId}`, {roomId: roomId, name: value, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${bedId}`, {roomId: roomId, name: value, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${bedId}`, {roomId: roomId, name: value, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        updatedState[indexOfBed].name = value;
        this.setState({beds: updatedState});
    }

    deleteBed = async (bed) => {
        this.setState({loading: true})
        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/bed/${bed.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({loading: false, showDeleteModalBed: false})
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/bed/${bed.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalBed: false})
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
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/bed/${bed.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalBed: false})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        let updatedBed = [...this.state.beds];
        updatedBed = updatedBed.filter(b => b !== bed);
        this.setState({beds: updatedBed});
    }
}

export default EditBed;