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

class EditRoomAndBed extends Component {

    static contextType = BuildingContext;

    state = {
        loading: false,
        rooms: [],
        unit: {
            accessories:[]
        },
        tempRoom:
            {
                id: 2, number: 'اتاق 2',
                description: "اتاق شش تخته تراس دار",
                accessories: [
                    {name: "یخچال", count: "1"},
                    {name: "کمد", count: "2"},
                ],
                beds: [
                    {name: 'تخت 21', empty: true},
                    {name: 'تخت 22', empty: false},
                    {name: 'تخت 23', empty: true},
                    {name: '24 تخت', empty: true},
                    {name: 'تخت 25', empty: true},
                    {name: 'تخت 26', empty: true},
                ]
            }
        ,
        showDeleteModalRoom: false,
        showDeleteModalBed: false,
        showَRoomAccessory: false,
        showَUnitAccessory: false,
        roomTemp: {},
        bedTemp: {},
        unitTemp: {},
        roomIndex: -1,
        unitAccIndex:-1,
        roomAccIndex:-1

    }

    async componentDidMount() {
        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({rooms: data})
            }).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ rooms: data })
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({unit: data})
            }).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                        <Link to="/dashboard/RoomAndBed">
                            بازگشت
                            <i class="bi bi-caret-left-fill"></i>
                        </Link>
                    </div>

                    <div className="text">
                        <h4>ثبت اتاق و تخت</h4>
                        <p>
                            در این بخش ابتدا تمام طبقات به همراه واحد های موجود در هر طبقه را با نام مدنظر خود وارد
                            نمایید و پس از اتمام
                            این مرحله در بخش بعدی اتاق ها و تخت های واقع در هر واحد را وارد می نمایید.
                        </p>
                    </div>

                    <h2 className='unit-name d-flex align-items-center'>
                        <TbBuilding className="mt-2" color='#555' fontSize="1.8rem"/>
                        <span className="unit-title">واحد {this.context.unitNumber}</span>
                        <div className="addAccessory">
                            <button className="addAccessoryBtn" onClick={() => {
                                this.handleUnitAccShow()
                            }}>افزودن امکانات واحد <MdAddCircle fontSize="16px"/></button>
                        </div>
                    </h2>

                    <div className="row pb-5">
                        {this.state.rooms.map((room, i) => (
                            <div className='col-md-6 col-sm-6 col-xs-12'>
                                <div className='room-box'>
                                    <button className="close-btn" onClick={() => {
                                        this.handleDeleteShowRoom(room)
                                    }}><AiFillCloseCircle color="#F1416C"/></button>
                                    <div className="title-container">
                                        <div className="firstTitle d-flex"><label>شماره اتاق:</label><EditText
                                            showEditButton defaultValue={room.number}
                                            editButtonContent={<FaPencilAlt color="#f39c12" fontSize="16px"/>}
                                            onSave={this.editRoomTitle}/></div>
                                        <div className="description d-flex "><label>توضیحات:</label><EditText
                                            showEditButton defaultValue={room.description}
                                            editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px"/>}
                                            onSave={this.editRoomDescription}/></div>
                                        <div className="addAccessory">
                                            <button className="addAccessoryBtn" onClick={() => {
                                                this.handleRoomAccShow(room)
                                            }}>افزودن امکانات اتاق <MdAddCircle fontSize="15px"/></button>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12 row bed-container'>
                                            {
                                                room.beds.map((bed) => (
                                                    <div className='col-4'>
                                                        <div className='bed-box'>
                                                            <button className="close-btn" onClick={() => {
                                                                this.handleDeleteShowBed(bed, i)
                                                            }}><AiFillCloseCircle color="#F1416C"/></button>
                                                            <BiBed fontSize="2rem"/>
                                                            <div className="title"><EditText className="editable"
                                                                                             showEditButton
                                                                                             defaultValue={bed.name}
                                                                                             editButtonContent={
                                                                                                 <FaPencilAlt
                                                                                                     color="#f39c12"
                                                                                                     fontSize="15px"/>}
                                                                                             onSave={this.editBedTitle}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className='col-4'>
                                                <button className='bed-add-btn' onClick={() => {
                                                    this.addBed(room)
                                                }}><div className={"d-flex align-items-center"} style={{color: "#296d9a", fontSize: "1rem"}}>افزودن تخت<AiOutlinePlus size={20} className={"mx-2"}/></div></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-6 col-md-6 col-sm-6 col-xs-12">
                            <div className={"room-box"}>
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
                        <Link to="/dashboard/RoomAndBed" className="register-btn-room">ثـبـت</Link>
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

                <Modal centered show={this.state.showَRoomAccessory} onHide={() => {
                    this.handleRoomAccClose()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن امکانات اتاق</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="accessoryModal justify-content-center">
                        <div className="accessory-box-title d-flex"><h5>تجهیزات</h5><h5>تعداد</h5></div>
                        {this.state.tempRoom.accessories.map((accessory,i) => (
                            <div className="accessory row">
                                <div>
                                    <button className="close-btn" onClick={() => {
                                        this.deleteAccessory(accessory, this.state.tempRoom)
                                    }}><AiFillCloseCircle color="#F1416C"/></button>
                                </div>
                                <div className="accessory-title col-7">
                                    <EditText style={{backgroundColor: "#f9f9f9"}} className="editable" showEditButton
                                              defaultValue={accessory.name}
                                              editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px"/>}
                                              onSave={this.handleRoomAccTitle} onEditMode={()=>{this.setState({roomAccIndex:i})}}/>
                                </div>
                                <div className="accessory-count col-5">
                                    <CounterInput min={0} max={10} count={accessory.count} onCountChange={count => {
                                        this.handleCount(count, accessory, this.state.tempRoom)
                                    }}/>

                                </div>
                            </div>
                        ))}
                        <button onClick={() => {
                            this.addAccessory(this.state.tempRoom)
                        }} className="accessory-add-btn"><AiOutlinePlus/></button>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={() => {
                            this.handleSubmitRoomAcc(this.state.tempRoom)
                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
                            this.handleRoomAccClose()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showَUnitAccessory} onHide={() => {
                    this.handleUnitAccClose()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن امکانات واحد</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="accessoryModal justify-content-center">
                        <div className="accessory-box-title d-flex"><h5>تجهیزات</h5><h5>تعداد</h5></div>
                        {this.state.unit.accessories.map((accessory,i) => (
                            <div className="accessory row">
                                <div>
                                    <button className="close-btn" onClick={() => {
                                        this.deleteUnitAccessory(accessory)
                                    }}><AiFillCloseCircle color="#F1416C"/></button>
                                </div>

                                <div className="accessory-title col-7">
                                    <EditText style={{backgroundColor: "#f9f9f9"}} className="editable" showEditButton
                                              defaultValue={accessory.name}
                                              editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px"/>}
                                              onSave={this.handleUnitAccTitle} onEditMode={()=>{this.setState({unitAccIndex:i})}} editButtonProps={{}} />
                                </div>
                                <div className="accessory-count col-5">
                                    <CounterInput min={0} max={10} count={accessory.count} onCountChange={count => {
                                        this.handleUnitCount(count, accessory)
                                    }}/>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => {
                            this.addUnitAccessory()
                        }} className="accessory-add-btn"><AiOutlinePlus/></button>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={() => {
                            this.handleSubmitUnitAcc()
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




    handleDeleteShowRoom = (Room) => {
        this.setState({showDeleteModalRoom: true});
        this.setState({roomTemp: Room});
    }

    handleDeleteShowBed = (bed, index) => {
        this.setState({showDeleteModalBed: true});
        this.setState({bedTemp: bed});
        this.setState({roomIndex: index});
    }

    handleDeleteRoom = () => {
        this.deleteRoom(this.state.roomTemp);
    }

    handleDeleteBed = () => {
        this.deleteBed(this.state.bedTemp, this.state.roomIndex);
    }

//room
    addRoom = async () => {
        var count = Math.floor(Math.random() * 100) + 1;
        const rawResponse = await axios.post('https://api.saadatportal.com/api/v1/supervisor/room', {unitId: this.context.unitId, number: count, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/room', {unitId: this.context.unitId, number: count, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/room', {unitId: this.context.unitId, number: count, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        var content = await rawResponse;

        const newRoom = this.state.rooms.concat(
            {
                id: content.id, number: 0 ,
                description: "",
                accessories: [],
                beds:[]
            }
        )
        this.setState({rooms: newRoom});

    }

    editRoomTitle = async ({value, previousValue}) => {
        const room = this.state.rooms.find(({number}) => number === previousValue);
        const index = this.state.rooms.findIndex(({number}) => number === previousValue);
        const number = parseInt(value);

        const rawResponse = await axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {number: number, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {number: number, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/room/${room.id}`, {number: number, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const content = await rawResponse;

        const updatedState = [...this.state.rooms];
        updatedState[index].number = value;
        this.setState({rooms: updatedState});
        console.log(this.state.rooms);
    }

    editRoomDescription = ({value, previousValue}) => {

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


    //bed
    addBed = async (r) => {

        const rawResponse = await axios.post('https://api.saadatportal.com/api/v1/supervisor/bed', {name:"تخت", empty: "true", roomId: r.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/bed', {name:"تخت", empty: "true", roomId: r.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/bed', {name:"تخت", empty: "true", roomId: r.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const content = await rawResponse
        const index = this.state.rooms.indexOf(r);
        const newBed = this.state.rooms[index].beds.concat(
            {id:content.id, name: "تخت", empty: "true"}
        )
        const updateRooms = [...this.state.rooms]
        updateRooms[index].beds = newBed
        this.setState({rooms: updateRooms})
    }

    editBedTitle = async ({value, previousValue}) => {
        let indexOfRoom = -1;
        let indexOfBed = -1;

        for (let x = 0; x < this.state.rooms.length; x++) {
            indexOfBed = this.state.rooms[x].beds.findIndex(({name}) => name === previousValue);
            if (indexOfBed !== -1) {
                indexOfRoom = x;
                break;
            }
        }

        const updatedState = [...this.state.rooms];
        const roomId = updatedState[indexOfRoom].id;
        const bedId = updatedState[indexOfRoom].beds[indexOfBed].id;
        const rawResponse = await axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${bedId}`, {roomId: roomId, name: value, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${bedId}`, {roomId: roomId, name: value, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${bedId}`, {roomId: roomId, name: value, empty: "true"}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        const content = await rawResponse;

        updatedState[indexOfRoom].beds[indexOfBed].name = value;
        this.setState({rooms: updatedState});
    }

    deleteBed = async (bed, index) => {
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

        let updatedState = [...this.state.rooms];
        let updatedBed = this.state.rooms[index].beds;
        updatedBed = updatedBed.filter(b => b !== bed);
        updatedState[index].beds = updatedBed;
        this.setState({rooms: updatedState});
    }

    //Room Accessory
    addAccessory = (r) => {
        const index = this.state.rooms.indexOf(r);
        const newAccessory = this.state.rooms[index].accessories.concat(
            {name: "...", count: 0}
        )
        const updateRooms = [...this.state.rooms]
        updateRooms[index].accessories = newAccessory
        this.setState({rooms: updateRooms})
    }

    handleCount = (count, acc, room) => {
        const roomIndex = this.state.rooms.indexOf(room);
        const accIndex = this.state.tempRoom.accessories.indexOf(acc)

        const updatedState = [...this.state.rooms];
        updatedState[roomIndex].accessories[accIndex].count = count;
        this.setState({rooms: updatedState});
    }

    handleRoomAccTitle = ({value}) => {
        const index = this.state.rooms.indexOf(this.state.tempRoom);
        const updateState = [...this.state.rooms];
        updateState[index].accessories[this.state.roomAccIndex].name = value;
        this.setState({rooms:updateState});

    }

    handleRoomAccShow = (room) => {
        this.setState({showَRoomAccessory: true});
        this.setState({tempRoom: room});
    }

    handleRoomAccClose = async () => {
        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({rooms: data})
            }).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/room/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({ rooms: data })
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
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

    //Unit Accessory

    addUnitAccessory = () => {
        const newAccessory = this.state.unit.accessories.concat(
            {name: "...", count: 0}
        )

        const updateUnit = this.state.unit;
        updateUnit.accessories = newAccessory
        this.setState({unit: updateUnit})

    }

    handleUnitCount = (count, acc) => {
        const accIndex = this.state.unit.accessories.indexOf(acc)
        const updatedState = this.state.unit;
        updatedState.accessories[accIndex].count = count;
        this.setState({unit: updatedState});
    }

    handleUnitAccTitle = ({value}) => {
        const updateState = this.state.unit;
        console.log(this.state.unitAccIndex)
        updateState.accessories[this.state.unitAccIndex].name = value;
        this.setState({unit : updateState});
        console.log(this.state.unit)
    }

    deleteUnitAccessory = (accessory) => {
        let updateUnit = this.state.unit;
        let updateAccessory = this.state.unit.accessories;
        updateAccessory = updateAccessory.filter(a => a !== accessory);
        updateUnit.accessories = updateAccessory;
        this.setState({unit: updateUnit});
    }

    handleSubmitUnitAcc = async ()=>{
        const assessories = this.state.unit.accessories;
        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.state.unit.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                return data
            })
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.state.unit.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.state.unit.id}`, {accessory : assessories}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        return data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.setState({showUnitAccessory:false});
    }
    handleUnitAccClose = async () => {
        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                this.setState({unit: data})
            }).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({unit: data })
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.setState({showUnitAccessory: false});
    }

    handleUnitAccShow = () => {
        this.setState({showUnitAccessory: true});

    }


}

export default EditRoomAndBed;