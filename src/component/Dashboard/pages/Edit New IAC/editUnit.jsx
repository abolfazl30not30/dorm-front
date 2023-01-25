import React, {Component} from "react";
import './../../../../style/editBuilding.css';
import {BsDoorClosed} from 'react-icons/bs'
import {AiOutlinePlus, AiFillCloseCircle} from 'react-icons/ai'
import {TbBuilding} from 'react-icons/tb';
import {EditText, EditTextarea} from 'react-edit-text';
import {Link} from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';
import CounterInput from "react-counter-input";
import {FaPencilAlt} from "react-icons/fa";
import {MdAddCircle, MdOutlineMeetingRoom} from "react-icons/md"
import {MdDone} from 'react-icons/md'
import 'react-edit-text/dist/index.css';
import {Box, CircularProgress} from "@mui/material";
import {green, red} from "@mui/material/colors";
import axios from "axios";
import {IoMdMore} from "react-icons/io";


class EditUnit extends Component {
    state = {
        loading: false,
        floor: {
            units: []
        },
        showDeleteModalUnit: false,
        showUnitAccessory: false,
        unitTemp: {
            accessories: []
        },
        floorIndex: 0,
        accIndex: -1
    }

    async componentDidMount() {
        const floorId = window.location.href.slice(-32)
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/floor/${floorId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({floor: data, isLoading: false})
            }).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/floor/${floorId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => {
                                    this.setState({floor: data, isLoading: false})
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
                                    this.setState({floor: data, isLoading: false})
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
                        <h4>ویرایش و ثبت واحد</h4>
                        <p>
                            در این بخش ابتدا تمام طبقات به همراه واحد های موجود در هر طبقه را با نام مدنظر خود وارد
                            نمایید و پس از اتمام
                            این مرحله در بخش بعدی اتاق ها و تخت های واقع در هر واحد را وارد می نمایید.
                        </p>
                    </div>
                    <div className="floor-container row">
                        {this.state.floor.units.map((unit) => (
                            <div className="mb-4 col-md-3 col-sm-4 col-xs-12">
                                <div className="floor-box d-flex flex-column justify-content-center">
                                    <button className="unit-close-btn" onClick={() => {
                                        this.handleDeleteShowUnit(unit)
                                    }}><AiFillCloseCircle color="#F1416C"/></button>
                                    <div className="icon mt-3 mb-3 d-flex justify-content-center">
                                        <MdOutlineMeetingRoom fontSize="30px" color="green"/>
                                    </div>
                                    <div className="title mt-1 text-success d-flex align-items-center justify-content-center">
                                        واحد <EditText ref="floorTitle" showEditButton defaultValue={unit.number} onSave={this.editUnitTitle} />
                                    </div>
                                    <div className="mt-4 d-flex justify-content-center">
                                        <button className="btn show-acc-btn"  onClick={() => {this.handleUnitAccShow(unit)}}>امکانات واحد <MdAddCircle fontSize="15px"/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="mb-4 col-md-3 col-sm-4 col-xs-12">
                            <div className="floor-box add">
                                <button onClick={this.addUnit} className="btn"><div className={"d-flex align-items-center"} style={{color: "#296d9a", fontSize: "1.5rem"}}>افزودن واحد<AiOutlinePlus size={25} className={"mx-2 mb-1"}/></div></button>
                            </div>
                        </div>
                    </div>
                    <div className="register">
                        <Link to={`/dashboard/booking/floor/${this.state.floor.id}`} className="register-btn"><MdDone className='ms-1'/>ثـبـت</Link>
                    </div>
                </div>

                <Modal centered show={this.state.showDeleteModalUnit}
                       onHide={() => this.setState({showDeleteModalUnit: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف واحد</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين واحد مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <Box sx={{m: 1, position: 'relative'}}>
                            <Button
                                className={"buttonDelete"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={() => this.handleDeleteUnit()}
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
                        <button className="btn btn-light"
                                onClick={() => this.setState({showDeleteModalUnit: false})}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showUnitAccessory} onHide={() => {
                    this.handleUnitAccClose()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>اضافه کردن امکانات واحد</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="accessoryModal justify-content-center">
                        <div className="accessory-box-title d-flex"><h5>تجهیزات</h5><h5>تعداد</h5></div>
                        {this.state.unitTemp.accessories.map((accessory, i) => (
                            <div className="accessory row">
                                <div>
                                    <button className="close-btn" onClick={() => {
                                        this.deleteAccessory(accessory, this.state.unitTemp)
                                    }}><AiFillCloseCircle color="#F1416C"/></button>
                                </div>
                                <div className="accessory-title col-7">
                                    <EditText style={{backgroundColor: "#f9f9f9"}} className="editable" showEditButton
                                              defaultValue={accessory.name} onSave={this.editAccTitle}
                                              onEditMode={() => {
                                                  this.setState({accIndex: i})
                                              }} editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px"/>}/>
                                </div>
                                <div className="accessory-count col-5">
                                    <CounterInput min={0} max={10} count={accessory.count} onCountChange={count => {
                                        this.handleCount(count, accessory, this.state.unitTemp)
                                    }}/>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => {
                            this.addAccessory(this.state.unitTemp)
                        }} className="accessory-add-btn"><AiOutlinePlus/></button>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={() => {
                            this.handleSubmitAcc(this.state.unitTemp)
                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
                            this.handleUnitAccClose()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

    addUnit = async () => {
        const count = this.state.floor.units.length + 1
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/unit', {
            number: count,
            empty: "true",
            floorId: this.state.floor.id
        }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/unit', {
                                    number: count,
                                    empty: "true",
                                    floorId: this.state.floor.id
                                }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/unit', {
                                    number: count,
                                    empty: "true",
                                    floorId: this.state.floor.id
                                }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })
        this.componentDidMount()
    }

    editUnitTitle = async ({value, previousValue}) => {
        const indexOfUnit = this.state.floor.units.findIndex(({number}) => number === previousValue);

        const updatedState = {...this.state.floor}

        const floorId = this.state.floor.id;
        const unitId = this.state.floor.units[indexOfUnit].id;
        const number = parseInt(value)

        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, {
            floorId: floorId,
            number: number,
            empty: "true"
        }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, {
                                    floorId: floorId,
                                    number: number,
                                    empty: "true"
                                }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, {
                                    floorId: floorId,
                                    number: number,
                                    empty: "true"
                                }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })


        updatedState.units[indexOfUnit].number = value;
        this.setState({floor: updatedState});
    }

    deleteUnit = async (unit) => {
        this.setState({loading: true})

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({loading: false, showDeleteModalUnit: false});
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalUnit: false});
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
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalUnit: false});
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        let updatedState = {...this.state.floor};
        let updatedUnit = [...this.state.floor.units];
        updatedUnit = updatedUnit.filter(u => u !== unit);
        updatedState.units = updatedUnit;
        this.setState({floor: updatedState});
    }

    addAccessory = async (unit) => {
        const index = this.state.floor.units.indexOf(unit);
        const newAccessory = this.state.floor.units[index].accessories.concat(
            {name: "", count: 0}
        )
        const updateState = {...this.state.floor}
        updateState.units[index].accessories = newAccessory
        this.setState({floor: updateState})
    }

    editAccTitle = async ({value}) => {
        const index = this.state.floor.units.indexOf(this.state.unitTemp);
        const updateState = {...this.state.floor}
        updateState.units[index].accessories[this.state.accIndex].name = value;
        this.setState({floor: updateState});
    }

    handleCount = (count, acc, unit) => {
        const unitIndex = this.state.floor.units.indexOf(unit);
        const accIndex = this.state.unitTemp.accessories.indexOf(acc)

        const updatedState = {...this.state.floor};
        updatedState.units[unitIndex].accessories[accIndex].count = count;
        this.setState({floor: updatedState});
    }

    deleteAccessory = (accessory, unit) => {
        let updatedState = {...this.state.floor};
        let index = this.state.floor.units.indexOf(unit);
        let updatedAccessory = this.state.floor.units[index].accessories;

        updatedAccessory = updatedAccessory.filter(a => a !== accessory);
        updatedState.units[index].accessories = updatedAccessory;
        this.setState({floor: updatedState});
    }

    handleSubmitAcc = async (unit) => {
        const index = this.state.floor.units.indexOf(unit);
        const accessories = this.state.floor.units[index].accessories;

        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {accessory: accessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {accessory: accessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${unit.id}`, {accessory: accessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        this.setState({showUnitAccessory: false});
    }

    handleDeleteShowUnit = (unit) => {
        this.setState({showDeleteModalUnit: true});
        this.setState({unitTemp: unit});
    }

    handleDeleteUnit = () => {
        this.deleteUnit(this.state.unitTemp);
    }

    handleUnitAccClose = async () => {
        this.setState({showUnitAccessory: false})
        this.componentDidMount()
    }

    handleUnitAccShow = (unit) => {
        this.setState({showUnitAccessory: true, unitTemp: unit});
    }
}

export default EditUnit;