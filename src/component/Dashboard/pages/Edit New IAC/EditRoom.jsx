import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AiOutlinePlus, AiFillCloseCircle} from 'react-icons/ai';
import {FaPencilAlt} from 'react-icons/fa';
import {EditText, EditTextarea} from 'react-edit-text';
import {BiBed} from 'react-icons/bi';
import CounterInput from "react-counter-input";
import {Button, Modal} from 'react-bootstrap';
import "../../../../style/editBuilding.css";
import {TbBuilding} from "react-icons/tb"
import BuildingContext from '../../../../contexts/Building';
import {MdAddCircle} from "react-icons/md";
import {Box, CircularProgress} from "@mui/material";
import {red} from "@mui/material/colors";
import axios from "axios";
import {BsFillDoorOpenFill} from "react-icons/bs";

class EditRoom extends Component {

    static contextType = BuildingContext;

    state = {
        loading: false,
        rooms: [],
        unit: {},
        showDeleteModalRoom: false,
        showRoomAccessory: false,
        roomTemp: {
            accessories: []
        },
        roomIndex: -1,
        roomAccIndex:-1

    }

    async componentDidMount() {
        const unitId = window.location.href.slice(-32)
        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({rooms: data})
            }).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ rooms: data})
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
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ rooms: data })
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({unit: data})
            }).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({unit: data})
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
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({unit: data })
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
                <div className="RoomAndBed">
                    <div className="back-btn">
                        <Link to={`/dashboard/booking/floor/unit/${this.state.unit.id}`}>
                            بازگشت
                            <i class="bi bi-caret-left-fill"></i>
                        </Link>
                    </div>

                    <div className="text">
                        <h4>ثبت و ویرایش اتاق</h4>
                    </div>

                    <h2 className='unit-name d-flex align-items-center'>
                        <TbBuilding className="mt-2" color='#555' fontSize="1.8rem"/>
                        <span className="unit-title">واحد {this.state.unit.number}</span>
                    </h2>

                    <div className="row pb-5">
                        {this.state.rooms.map((room) => (
                            <div className="col-md-3 col-sm-4 col-xs-12">
                                <div className="room-box d-flex flex-column justify-content-center">
                                    <button className="close-btn" onClick={() => {
                                        this.handleDeleteShowRoom(room)
                                    }}><AiFillCloseCircle color="#F1416C"/></button>

                                    <div className="icon mt-3 mb-3 d-flex justify-content-center">
                                        <BsFillDoorOpenFill fontSize="30px" color=""/>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center text-success">اتاق <EditText
                                        showEditButton defaultValue={room.number}
                                        onSave={this.editRoomTitle}/></div>
                                    <div className="description d-flex align-items-center justify-content-center "><label>توضیحات:</label><EditText
                                        showEditButton defaultValue={room.description}
                                        onSave={this.editRoomDescription}/></div>
                                    <div className="mt-4 d-flex justify-content-center">
                                        <button className="btn show-acc-btn"  onClick={() => {this.handleRoomAccShow(room)}}>امکانات اتاق <MdAddCircle fontSize="15px"/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <div className={"d-flex justify-content-center room-box"} >
                                <button className='room-add-btn' onClick={() => {
                                    this.addRoom()
                                }}><div className={"d-flex align-items-center"} style={{color: "#296d9a", fontSize: "1.5rem"}}>
                                    افزودن اتاق<AiOutlinePlus size={25} className={"mx-2"}/>
                                </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="register">
                        <Link to={`/dashboard/booking/floor/unit/${this.state.unit.id}`} className="register-btn-room">ثـبـت</Link>
                    </div>
                </div>

                <Modal centered show={this.state.showDeleteModalRoom} onHide={() => {
                    this.setState({showDeleteModalRoom: false})
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف اتاق</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين اتاق مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDelete"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={this.handleDeleteRoom}
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
                        <button className="btn btn-light" onClick={() => this.setState({showDeleteModalRoom: false})}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showRoomAccessory} onHide={() => {
                    this.handleRoomAccClose()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن امکانات اتاق</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="accessoryModal justify-content-center">
                        <div className="accessory-box-title d-flex"><h5>تجهیزات</h5><h5>تعداد</h5></div>
                        {this.state.roomTemp.accessories.map((accessory,i) => (
                            <div className="accessory row">
                                <div>
                                    <button className="close-btn" onClick={() => {
                                        this.deleteAccessory(accessory, this.state.roomTemp)
                                    }}><AiFillCloseCircle color="#F1416C"/></button>
                                </div>
                                <div className="accessory-title col-7">
                                    <EditText style={{backgroundColor: "#f9f9f9"}} className="editable" showEditButton
                                              defaultValue={accessory.name}
                                              onSave={this.handleRoomAccTitle} onEditMode={()=>{this.setState({roomAccIndex:i})}}/>
                                </div>
                                <div className="accessory-count col-5">
                                    <CounterInput min={0} max={10} count={accessory.count} onCountChange={count => {
                                        this.handleCount(count, accessory, this.state.roomTemp)
                                    }}/>

                                </div>
                            </div>
                        ))}
                        <button onClick={() => {
                            this.addAccessory(this.state.roomTemp)
                        }} className="accessory-add-btn"><AiOutlinePlus/></button>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={() => {
                            this.handleSubmitRoomAcc(this.state.roomTemp)
                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
                            this.handleRoomAccClose()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }




    handleDeleteShowRoom = (Room) => {
        this.setState({showDeleteModalRoom: true});
        this.setState({roomTemp: Room});
    }

    handleDeleteRoom = () => {
        this.deleteRoom(this.state.roomTemp);
    }

//room
    addRoom = async () => {
        const count = this.state.rooms.length + 1
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/room', {unitId: this.state.unit.id, number: count, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/room', {unitId: this.state.unit.id, number: count, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
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
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/room', {unitId: this.state.unit.id, number: count, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.componentDidMount()
    }

    editRoomTitle = async ({value, previousValue}) => {
        const room = this.state.rooms.find(({number}) => number === previousValue);
        const index = this.state.rooms.findIndex(({number}) => number === previousValue);
        const number = parseInt(value);

        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {number: number, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}})
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {number: number, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {number: number, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const updatedState = [...this.state.rooms];
        updatedState[index].number = value;
        this.setState({rooms: updatedState});
    }

    editRoomDescription = async ({value, previousValue}) => {
        const room = this.state.rooms.find(({description}) => description === previousValue);
        const index = this.state.rooms.findIndex(({description}) => description === previousValue);

        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {
            description: value,
            empty: "true"
        }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {
                                    description: value,
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
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {
                                    description: value,
                                    empty: "true"
                                }, {headers: {'Authorization': localStorage.getItem('accessToken')}})
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        const updatedState = [...this.state.rooms];
        updatedState[index].description = value
        this.setState({rooms: updatedState});
    }

    deleteRoom = async (room) => {
        this.setState({loading: true})

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({loading: false, showDeleteModalRoom: false})
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalRoom: false})
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
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({loading: false, showDeleteModalRoom: false})
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const updateState = this.state.rooms.filter(r => r !== room);
        this.setState({rooms: updateState});
    }
    //Room Accessory...
    addAccessory = (r) => {
        const index = this.state.rooms.indexOf(r);
        console.log(index, this.state.rooms)
        const newAccessory = this.state.rooms[index].accessories.concat(
            {name: "", count: 0}
        )
        const updateRooms = [...this.state.rooms]
        updateRooms[index].accessories = newAccessory
        this.setState({rooms: updateRooms})
    }

    handleCount = (count, acc, room) => {
        const roomIndex = this.state.rooms.indexOf(room);
        const accIndex = this.state.roomTemp.accessories.indexOf(acc)

        const updatedState = [...this.state.rooms];
        updatedState[roomIndex].accessories[accIndex].count = count;
        this.setState({rooms: updatedState});
    }

    handleRoomAccTitle = ({value}) => {
        const index = this.state.rooms.indexOf(this.state.roomTemp);
        const updateState = [...this.state.rooms];
        updateState[index].accessories[this.state.roomAccIndex].name = value;
        this.setState({rooms:updateState});
    }

    handleRoomAccShow = (room) => {
        this.setState({showRoomAccessory: true});
        this.setState({roomTemp: room});
    }

    handleRoomAccClose = async () => {
        this.componentDidMount()
        this.setState({showRoomAccessory: false})
    }

    deleteAccessory = (accessory, room) => {
        let updatedState = [...this.state.rooms];
        let index = this.state.rooms.indexOf(room);
        let updatedAccessory = this.state.rooms[index].accessories;
        updatedAccessory = updatedAccessory.filter(a => a !== accessory);
        updatedState[index].accessories = updatedAccessory;
        this.setState({rooms: updatedState});
    }

    handleSubmitRoomAcc = async (room) =>{
        const index = this.state.rooms.indexOf(room);
        const assessories = this.state.rooms[index].accessories;
        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
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
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.setState({showRoomAccessory:false});
    }
}

export default EditRoom;