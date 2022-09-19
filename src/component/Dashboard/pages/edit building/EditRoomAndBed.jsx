import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import { EditText, EditTextarea } from 'react-edit-text';
import { BiBed } from 'react-icons/bi';
import CounterInput from "react-counter-input";
import { Button, Modal } from 'react-bootstrap';
import "../../../../style/editBuilding.css";
import { Padding } from '@syncfusion/ej2-react-charts';
import { TbBuilding } from "react-icons/tb"
import BuildingContext from '../../../../contexts/Building';
import { MdAddCircle } from "react-icons/md";

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
        unit: [],
        tempRoom:
        {
            id: 2, number: 'اتاق 2',
            description: "اتاق شش تخته تراس دار",
            accessories: [
                { name: "یخچال", count: "1" },
                { name: "کمد", count: "2" },
            ],
            beds: [
                { id: 21, name: 'تخت 21', empty: true },
                { id: 22, name: 'تخت 22', empty: false },
                { id: 23, name: 'تخت 23', empty: true },
                { id: 24, name: '24 تخت', empty: true },
                { id: 25, name: 'تخت 25', empty: true },
                { id: 26, name: 'تخت 26', empty: true },

            ]
        }
        ,
        showDeleteModalRoom: false,
        showDeleteModalBed: false,
        showَRoomAccessory: false,


    }

    async componentDidMount() {

        const response = await fetch(`http://api.saadatportal.com/api/v1/unit/room/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({ rooms: data }));

        const responseUnit = await fetch(`http://api.saadatportal.com/api/v1/unit/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({ unit: data }));
        console.log(this.state.rooms)
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
                            در این بخش ابتدا تمام طبقات به همراه واحد های موجود در هر طبقه را با نام مدنظر خود وارد نمایید و پس از اتمام
                            این مرحله در بخش بعدی اتاق ها و تخت های واقع در هر واحد را وارد می نمایید.
                        </p>
                    </div>

                    <h2 className='unit-name'>
                        <TbBuilding className="mt-2" color='#555' fontSize="1.8rem" />
                        <span className="unit-title">واحد {this.context.unitNumber}</span>
                        <div className="col-5">
                            <div className="addAccessory">
                                <button className="addAccessoryBtn" onClick={() => { this.hanldeFloorAccShow() }}>امکانات طبقه <MdAddCircle fontSize="15px" /> </button>
                            </div>
                        </div>

                    </h2>



                    <div className="row pb-5">
                        {this.state.rooms.map((room, i) => (
                            <div className='col-12'>
                                <div className='room-box'>
                                    <button className="close-btn" onClick={() => { this.deleteRoom(room) }}><AiFillCloseCircle color="#F1416C" /></button>
                                    <div className="title-container row">
                                        <div className="col-6 d-flex align-item-center"><div className="firstTitle"><label>شماره اتاق:</label><EditText showEditButton defaultValue={room.number} editButtonContent={<FaPencilAlt color="#f39c12" fontSize="16px" />} /></div></div>
                                        <div className='col-6  d-flex align-item-center'><div className="description"><label>توضیحات:</label><EditText showEditButton defaultValue={room.description} editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px" />} /></div></div>
                                    </div>
                                    <div className="col-5">
                                        <div className="addAccessory">
                                            <button className="addAccessoryBtn" onClick={() => { this.handleRoomAccShow(room) }}>امکانات اتاق <MdAddCircle fontSize="15px" /> </button>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 row bed-container'>
                                            {
                                                room.beds.map((bed) => (
                                                    <div className='col-4'>
                                                        <div className='bed-box'>
                                                            <button className="close-btn" onClick={() => { this.deleteBed(bed, i) }}><AiFillCloseCircle color="#F1416C" /></button>
                                                            <BiBed fontSize="2rem" />
                                                            <div className="title"><EditText className="editable" showEditButton defaultValue={bed.name} editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px" />} /></div>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                            <div className='col-4'>
                                                <button onClick={() => { this.addBed(room) }} className="bed-add-btn"><AiOutlinePlus /></button>
                                            </div>

                                        </div>
                                        <div className='col-6 d-flex justify-content-center align-items-center'>
                                            <div className='accessory-box'>
                                                <div className="accessory-box-title"><h5>تجهیزات</h5><h5>تعداد</h5></div>
                                                {room.accessories.map((accessory) => (
                                                    <div className="accessory row">
                                                        <div><button className="close-btn" onClick={() => { this.deleteAccessory(accessory, i) }}><AiFillCloseCircle color="#F1416C" /></button></div>
                                                        <div className="accessory-title col-7">
                                                            <EditText style={{ backgroundColor: "#f9f9f9" }} className="editable" showEditButton defaultValue={accessory.name} editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px" />} />
                                                        </div>
                                                        <div className="accessory-count col-5">
                                                            <CounterInput min={0} max={10} count={accessory.count} onCountChange={count => console.log(count)} />
                                                        </div>
                                                    </div>
                                                ))}
                                                <button onClick={() => { this.addAccessory(room) }} className="accessory-add-btn"><AiOutlinePlus /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-12"><div className='room-add-btn' onClick={() => { this.addRoom() }}><AiOutlinePlus /></div></div>
                    </div>
                    <div className="register">
                        <button className="register-btn-room">ثـبـت</button>
                    </div>
                </div>

                {/* <Modal centered show={this.state.showDeleteModalRoom} onClick={() => { this.handleDeleteCloseRoom(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف اتاق</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين اتاق مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-danger" onClick={() => this.handleDeleteCloseRoom(true)}>حذف</button>
                        <button className="btn btn-light" onClick={() => this.handleDeleteCloseRoom(false)}>بستن</button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showDeleteModalBed} onClick={() => { this.handleDeleteCloseBed(false) }}>
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
                </Modal> */}

                <Modal centered show={this.state.showَRoomAccessory} onClick={() => { this.handleRoomAccClose() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>اضافه کردن امکانات اتاق</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <div className="accessory-box-title"><h5>تجهیزات</h5><h5>تعداد</h5></div>
                        {this.state.tempRoom.accessories.map((accessory) => (
                            <div className="accessory row">
                                <div><button className="close-btn" onClick={() => { }}><AiFillCloseCircle color="#F1416C" /></button></div>
                                <div className="accessory-title col-7">
                                    <EditText style={{ backgroundColor: "#f9f9f9" }} className="editable" showEditButton defaultValue={accessory.name} editButtonContent={<FaPencilAlt color="#f39c12" fontSize="15px" />} />
                                </div>
                                <div className="accessory-count col-5">
                                    <CounterInput min={0} max={10} count={accessory.count} onCountChange={count => console.log(count)} />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => { this.addAccessory() }} className="accessory-add-btn"><AiOutlinePlus /></button>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={() => { }}>ثبت</button>
                        <button className="btn btn-light" onClick={() => { this.handleRoomAccClose() }}>بستن</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    handleDeleteShowRoom = () => {
        this.setState({ showDeleteModalRoom: true })
    }

    handleDeleteShowBed = () => {
        this.setState({ showDeleteModalBed: true })
    }

    handleRoomAccShow = (room) => {
        this.setState({ showَRoomAccessory: true })
    }

    handleDeleteCloseRoom = () => {

    }
    handleDeleteCloseBed = () => { }
    handleRoomAccClose = () => {
        this.setState({ showَRoomAccessory: false })
    }

    addRoom = async () => {

        var count = Math.floor(Math.random() * 100) + 1;
        const rawResponse = await fetch('http://api.saadatportal.com/api/v1/room', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ unitId: this.context.unitId, number: count, empty: "true" })
        });
        var content = await rawResponse.json();

        const newRoom = this.state.rooms.concat(
            {
                id: content.id, number: content.number,
                description: "",
                accessories: [
                ],
                beds: [
                    { id: 21, name: 'تخت ...', empty: true },
                ]
            }
        )
        this.setState({ rooms: newRoom })
    }

    addBed = (r) => {
        const index = this.state.rooms.indexOf(r);
        const newBed = this.state.rooms[index].beds.concat(
            { id: 311, bedName: "تخت ...", empty: true }
        )
        const updateRooms = [...this.state.rooms]
        updateRooms[index].beds = newBed
        this.setState({ rooms: updateRooms })
    }

    addAccessory = (r) => {
        const index = this.state.rooms.indexOf(r);
        const newAccessory = this.state.rooms[index].accessory.concat(
            { name: "....", count: "0" }
        )
        const updateRooms = [...this.state.rooms]
        updateRooms[index].accessory = newAccessory
        this.setState({ rooms: updateRooms })
    }

    editRoomTitle = ({ value, previousValue }) => {
        // const index = this.state.floor.findIndex(({ floorName }) => floorName === previousValue);
        // const updatedState = [...this.state.floor];
        // updatedState[index].floorName = value;
        // this.setState({ floor: updatedState });
    };

    editBedTitle = ({ value, previousValue }) => {
        // let indexOfFloor = -1;
        // let indexOfUnit = -1;

        // for (let x = 0; x < this.state.floor.length; x++) {
        //     indexOfUnit = this.state.floor[x].unit.findIndex(({ unitName }) => unitName === previousValue);
        //     if (indexOfUnit !== -1) {
        //         indexOfFloor = x;
        //         break;
        //     }
        // }
        // const updatedState = [...this.state.floor];
        // updatedState[indexOfFloor].unit[indexOfUnit].unitName = value;
        // this.setState({ floor: updatedState });
        // console.log(this.state.floor)
    }

    deleteRoom = async (room) => {
        console.log(room.id)
        await fetch(`http://api.saadatportal.com/api/v1/room/${room.id}`, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => console.log(res))

        const updateState = this.state.rooms.filter(r => r !== room);
        this.setState({ rooms: updateState });
        console.log(this.state.rooms)
    }

    deleteBed = (bed, index) => {
        let updatedState = [...this.state.rooms];
        let updatedBed = this.state.rooms[index].beds;
        updatedBed = updatedBed.filter(b => b !== bed);
        updatedState[index].beds = updatedBed;
        this.setState({ rooms: updatedState });
        console.log(this.state.rooms)
    }

    deleteAccessory = (accessory, index) => {
        let updatedState = [...this.state.rooms];
        let updatedAccessory = this.state.rooms[index].accessory;
        updatedAccessory = updatedAccessory.filter(a => a !== accessory);
        updatedState[index].accessory = updatedAccessory;
        this.setState({ rooms: updatedState });
        console.log(this.state.rooms)
    }

}

export default EditRoomAndBed;