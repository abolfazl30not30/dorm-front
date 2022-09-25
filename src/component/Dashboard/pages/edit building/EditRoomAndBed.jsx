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

class EditRoomAndBed extends Component {

    static contextType = BuildingContext;

    state = {
        // rooms1: [
        //     {
        //         id: 1, roomName: 'اتاق 1',
        //         description: "اتاق چهار تخته تراس دار",
        //         accessory: [
        //             { name: "یخچال", count: "1" },
        //             { name: "کمد", count: "2" },
        //             { name: "چوب لباسی", count: "1" },
        //         ],
        //         beds: [
        //             { id: 11, bedName: 'تخت 11', empty: true },
        //             { id: 12, bedName: 'تخت 12', empty: false },
        //             { id: 13, bedName: 'تخت 13', empty: true },
        //             { id: 14, bedName: 'تخت 14', empty: true },
        //         ]
        //     },
        //     {
        //         id: 2, roomName: 'اتاق 2',
        //         description: "اتاق شش تخته تراس دار",
        //         accessory: [
        //             { name: "یخچال", count: "1" },
        //             { name: "کمد", count: "2" },
        //         ],
        //         beds: [
        //             { id: 21, bedName: 'تخت 21', empty: true },
        //             { id: 22, bedName: 'تخت 22', empty: false },
        //             { id: 23, bedName: 'تخت 23', empty: true },
        //             { id: 24, bedName: '24 تخت', empty: true },
        //             { id: 25, bedName: 'تخت 25', empty: true },
        //             { id: 26, bedName: 'تخت 26', empty: true },

        //         ]
        //     },
        // ],
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
        const response = await fetch(`http://api.saadatportal.com/api/v1/unit/room/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({rooms: data}));

        const responseUnit = await fetch(`http://api.saadatportal.com/api/v1/unit/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({unit: data}));
        console.log(this.state.rooms[0]);
    }

    render() {
        return (
            <>
                <div className="RoomAndBed">

                    <div className="back-btn">
                        <Link to="/RoomAndBed">
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
                            <div className='col-6'>
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
                                                <button onClick={() => {
                                                    this.addBed(room)
                                                }} className="bed-add-btn"><AiOutlinePlus/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-6">
                            <div className='room-add-btn' onClick={() => {
                                this.addRoom()
                            }}><AiOutlinePlus/></div>
                        </div>
                    </div>
                    <div className="register">
                        <Link to="/RoomAndBed" className="register-btn-room">ثـبـت</Link>
                    </div>
                </div>

                <Modal centered show={this.state.showDeleteModalRoom} onClick={() => {
                    this.handleDeleteCloseRoom(false)
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف اتاق</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين اتاق مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-danger" onClick={() => this.handleDeleteCloseRoom(true)}>حذف</button>
                        <button className="btn btn-light" onClick={() => this.handleDeleteCloseRoom(false)}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showDeleteModalBed} onClick={() => {
                    this.handleDeleteCloseBed(false)
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف تخت</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين تخت مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-danger" onClick={() => this.handleDeleteCloseBed(true)}>حذف</button>
                        <button className="btn btn-light" onClick={() => this.handleDeleteCloseBed(false)}>بستن</button>
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
                                              onSave={this.handleRoomAccTitle} onSave={this.handleRoomAccTitle} onEditMode={()=>{this.setState({roomAccIndex:i})}}/>
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

    handleDeleteCloseRoom = (bool) => {
        this.setState({showDeleteModalRoom: false});
        if (bool) {
            this.deleteRoom(this.state.roomTemp);
        }
    }

    handleDeleteCloseBed = (bool) => {
        this.setState({showDeleteModalBed: false});
        if (bool) {
            this.deleteBed(this.state.bedTemp, this.state.roomIndex);
        }
    }



//room
    addRoom = async () => {
        var count = Math.floor(Math.random() * 100) + 1;
        const rawResponse = await fetch('http://api.saadatportal.com/api/v1/room', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({unitId: this.context.unitId, number: count, empty: "true"})
        });
        var content = await rawResponse.json();

        const newRoom = this.state.rooms.concat(
            {
                id: content.id, number: content.number,
                description: "",
                accessories: [],
                beds: [
                    {id: 21, name: 'تخت ...', empty: true},
                ]
            }
        )
        this.setState({rooms: newRoom});

    }

    editRoomTitle = async ({value, previousValue}) => {
        const room = this.state.rooms.find(({number}) => number === previousValue);
        const index = this.state.rooms.findIndex(({number}) => number === previousValue);
        const number = parseInt(value);

        const rawResponse = await fetch(`http://api.saadatportal.com/api/v1/room/${room.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({number: number, empty: "true"})
        });
        const content = await rawResponse.json();

        const updatedState = [...this.state.rooms];
        updatedState[index].number = value;
        this.setState({rooms: updatedState});
        console.log(this.state.rooms);
    }

    editRoomDescription = ({value, previousValue}) => {

    }

    deleteRoom = async (room) => {
        console.log(room.id)
        await fetch(`http://api.saadatportal.com/api/v1/room/${room.id}`, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => console.log(res))

        const updateState = this.state.rooms.filter(r => r !== room);
        this.setState({rooms: updateState});
        console.log(this.state.rooms)
    }


    //bed
    addBed = async (r) => {

        const rawResponse = await fetch('http://api.saadatportal.com/api/v1/bed', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:"تخت...", empty: "true", roomId: r.id})

        });
        const content = await rawResponse.json()
        const index = this.state.rooms.indexOf(r);
        const newBed = this.state.rooms[index].beds.concat(
            {id:content.id, name: "تخت...", empty: "true"}
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
        const rawResponse = await fetch(`http://api.saadatportal.com/api/v1/bed/${bedId}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({roomId: roomId, name: value, empty: "true"})
        });
        const content = await rawResponse.json();

        updatedState[indexOfRoom].beds[indexOfBed].name = value;
        this.setState({rooms: updatedState});
    }

    deleteBed = async (bed, index) => {
        await fetch(`http://api.saadatportal.com/api/v1/bed/${bed.id}`, {
            method: 'DELETE',
        })
            .then(res => res.text())

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
            {name: "....", count: 0}
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
        const response = await fetch(`http://api.saadatportal.com/api/v1/unit/room/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({rooms: data}));

        this.setState({showَRoomAccessory: false})
    }

    deleteAccessory = (accessory, room) => {
        let updatedState = [...this.state.rooms];
        let index = this.state.rooms.indexOf(room);
        let updatedAccessory = this.state.rooms[index].accessories;
        console.log(updatedAccessory)
        updatedAccessory = updatedAccessory.filter(a => a !== accessory);
        updatedState[index].accessories = updatedAccessory;
        this.setState({rooms: updatedState});

    }

    handleSubmitRoomAcc = async (room) =>{
        const index = this.state.rooms.indexOf(room);
        const assessories = this.state.rooms[index].accessories;

        const rawResponse = await fetch(`http://api.saadatportal.com/api/v1/room/${room.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accessory : assessories})
        });
        this.setState({showَRoomAccessory:false});
    }

    //Unit Accessory

    addUnitAccessory = () => {
        const newAccessory = this.state.unit.accessories.concat(
            {name: "....", count: 0}
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
        const rawResponse = await fetch(`http://api.saadatportal.com/api/v1/unit/${this.state.unit.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accessory : assessories})
        });
        this.setState({showَUnitAccessory:false});
    }
    handleUnitAccClose = async () => {
        const responseUnit = await fetch(`http://api.saadatportal.com/api/v1/unit/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({unit: data}));
        this.setState({showَUnitAccessory: false});
    }

    handleUnitAccShow = () => {
        this.setState({showَUnitAccessory: true});

    }


}

export default EditRoomAndBed;