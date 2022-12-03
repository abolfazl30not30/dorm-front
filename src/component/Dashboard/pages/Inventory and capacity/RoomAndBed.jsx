import React, {Component} from 'react';
import './../../../../style/roomAndBed.css'
import {BiBed} from 'react-icons/bi'
import {TbBuilding} from 'react-icons/tb'
import {MdDateRange} from 'react-icons/md'
import {AiOutlineNumber} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {IoMdMore} from "react-icons/io";
import {BsPersonCircle} from "react-icons/bs"
import {Link, Route, Routes} from "react-router-dom";
import FullViewOfBed from './FullViewOfBed';
import BuildingContext from '../../../../contexts/Building';
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import {Button, Modal} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import {BiChevronLeft, BiSearch} from 'react-icons/bi'
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

class RoomAndBed extends Component {
    static contextType = BuildingContext;
    state = {

        isLoading: false,
        isFull: false,
        rooms: [],
        show: false,
        showAccessory: false,
        showَRoomAccessory: false,
        selectedPeople: "",
        unit: {
            accessories: []
        },

        bedOpen:
            {
                id: 32, name: 'تخت 32', empty: false,
                personId:"",
            },

        tempPerson:{
            id: 1,
            firstName: 'میلاد',
            lastName: 'زارع',
            nationalCode: 2500255252,
            StartOfStay: '12/34/56',
            image: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
        },

        roomAccessory: {
            accessories: [
                {name: 'یخچال', count: 1},
                {name: 'چوب لباسی', count: 4}
            ]
        },
        tempRoom: {
            accessories: []
        },
        searchInput:"",
        searchType:"firstName",
        peopleFound:[],
    }

    async componentDidMount() {

        console.log(this.context.unitId)
        const response = await fetch(`https://api.saadatportal.com/api/v1/unit/room/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({rooms: data, isLoading: false},()=>{
                if (data.length == 0) {
                    this.setState({isFull: false})
                } else {
                    this.setState({isFull: true})
                }
            }));

        const responseUnit = await fetch(`https://api.saadatportal.com/api/v1/unit/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({unit: data, isLoading: false}));

    }

    handleClose = () => {
        this.setState({show: false})
    };

    handleSubmit = async () =>{
        const rawResponse = await fetch(`https://api.saadatportal.com/api/v1/bed/${this.state.bedOpen.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({personId : this.state.selectedPeople , empty :  false})
        }).then((res)=>res.json())
            .then((result)=>{
                let updateState = [...this.state.rooms];
                let roomIndex = this.state.rooms.indexOf(this.state.roomAccessory);

                let bedIndex =  this.state.rooms[roomIndex].beds.indexOf(this.state.bedOpen);
                updateState[roomIndex].beds[bedIndex].empty = false;
                this.setState({rooms:updateState});
            }).catch((error)=>{
                console.log(error)
            })

        this.handleClose();
    }

    handleShow = async (bed, room) => {
        this.setState({roomAccessory: room})
        this.setState({bedOpen: bed})
        if(bed.empty === false){
            let person = {}
            const response = await fetch(`https://api.saadatportal.com/api/v1/person/${bed.person}`).then((response) => response.json())
                .then((data) => (person = data));
            console.log(person)
            const response2 = await fetch(`https://api.saadatportal.com/api/v1/characteristic/${person.characteristicId}`).then((response) => response.json())
                .then((data) => this.setState({tempPerson : data}));
        }
        this.setState({show: true})
    };

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
    handleChange = (event, newAlignment) => {
        console.log(newAlignment)
        this.setState({selectedPeople: newAlignment})
    }

    //search
    handleSearchInput = async (e) =>{
        const value = e.target.value;
        this.setState({searchInput:value});
        const response = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?${this.state.searchType}=${e.target.value}`).then((response) => response.json())
            .then((data) => this.setState({peopleFound: data}));
    }

    handleSearchBtn = async () =>{
        const response = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?${this.state.searchType}=${this.state.searchInput}`).then((response) => response.json())
            .then((data) => this.setState({peopleFound: data}));
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
                        <h4>انتخاب اتاق و تخت</h4>
                        <p>
                            در این قسمت تخت مدنظر خود را انتخاب نمایید تا وارد مرحله ی نهایی ثبت نام شوید.
                        </p>
                    </div>
                    <h2 className='unit-name'>
                        <TbBuilding className="mt-2" color='#555' fontSize="1.8rem"/>
                        <span className="unit-title">واحد {this.context.unitNumber}</span>
                        <button className='btn show-acc-btn' onClick={() => {
                            this.handleShowAccessory(this.context.unitNumber)
                        }}><IoMdMore/>امکانات واحد
                        </button>
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
                                        {this.state.isFull ? (<h6>ویرایش</h6>) : (<h6> ثبت اتاق و تخت</h6>)}
                                    </Link>
                                </div>
                                <div className="d-flex flex-wrap row">
                                    {
                                        this.state.rooms.map(
                                            (room) => (
                                                <div className="col-md-4 col-sm-6 col-xs-12">
                                                    <div className="room-box ">
                                                        <div className="row">
                                                            <div className="col-7 title">اتاق {room.number}</div>
                                                            <div className="col-5">
                                                                <button className="btn show-acc-btn" onClick={() => {
                                                                    this.handleShowRoomAcc(room)
                                                                }}><IoMdMore/> امکانات
                                                                    اتاق
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex flex-wrap justify-content-around'>
                                                            {room.beds.map((bed) => (
                                                                <div className="col-4 p-1">
                                                                    <div
                                                                        className={`bed-box ${bed.empty ? "empty" : "full"}`}>
                                                                        <Button onClick={() => {
                                                                            this.handleShow(bed, room)
                                                                        }}>
                                                                            <BiBed fontSize="2rem"/>
                                                                            <div className="title">{bed.name}</div>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
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

                <Modal size="lg" centered show={this.state.show} onHide={() => {
                    this.handleClose()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>اتاق {this.state.bedOpen.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            (!this.state.bedOpen.empty) ? (
                                <div className="d-flex justify-content-center">
                                    <div className='profile-box'>
                                        <img className="profile-img"
                                             src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile"/>
                                        <div className="name">{this.state.tempPerson.firstName} {this.state.tempPerson.lastName}</div>
                                        <div className='profile-item'><AiOutlineNumber className='ms-2'/>کد
                                            ملی: {this.state.tempPerson.nationalCode}</div>
                                        <div className='profile-item'><MdDateRange className='ms-2'/>شروع
                                            اقامت: {this.state.tempPerson.startDate}</div>
                                        <div className='profile-item'><AiOutlineUser
                                            className='ms-2'/>تاريخ تولد: {this.state.tempPerson.birthDate}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="search-container-popup">
                                    <div className="input-container row align-items-center">
                                        <div className="col-1"><label>براساس:</label></div>

                                        <div className="col-3 " style={{paddingLeft: "0"}}>
                                            <Form.Select aria-label="Default select example" style={{height : "50px"}} value={this.state.searchType} onChange={(e)=>{this.setState({searchType:e.target.value})}}>
                                                <option value="firstName">نام و نام خانوادگی</option>
                                                <option value="nationalCode">کد ملی</option>
                                            </Form.Select>
                                        </div>

                                        <div className="input-group-register col-7 px-0" style={{paddingRight: "0"}}>
                                            <input type="text" id="inputSearch" className="input" placeholder=" " style={{padding:"6px"}} onChange={(e)=>{this.handleSearchInput(e)}}/>
                                            <label className="placeholder">جستوجـو</label>
                                        </div>
                                        <div className="col-1" style={{paddingRight: "0"}}>
                                            <button className="btn outline-secondary"><BiSearch fontSize="25px" onClick={this.handleSearchBtn}/>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="people-container mt-4">
                                        {this.state.peopleFound.map((poeple)=>(
                                            <ToggleButtonGroup
                                                orientation="vertical"
                                                value={this.state.selectedPeople}
                                                exclusive
                                                color="success"
                                                onChange={this.handleChange}
                                                aria-label="text alignment"
                                                style={{width: "100%"}}
                                            >
                                                <ToggleButton value={poeple.parentId} style={{display: "block"}}>
                                                    <div className="row">
                                                        <div
                                                            className="col-3 profile-img d-flex align-items-center justify-content-center">
                                                            <BsPersonCircle fontSize="60px"/>
                                                        </div>
                                                        <div className="col-9 people-info row">
                                                            <div className="col-6">
                                                                <div className="d-flex">
                                                                    <label>نام و نام خانوادگی: </label>
                                                                    <p>{poeple.firstName} {poeple.lastName}</p>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <label>نام پدر: </label>
                                                                    <p>{poeple.fatherName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="d-flex">
                                                                    <label>کد ملی :</label>
                                                                    <p>{poeple.nationalCode}</p>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <label>تاریخ پذیرش :</label>
                                                                    <p>{poeple.reservationDate}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    </Modal.Body>
                    {
                        (this.state.bedOpen.empty) ? (<Modal.Footer className="justify-content-start">
                            <button className="btn btn-success" onClick={() => {
                                this.handleSubmit()
                            }}>ثبت
                            </button>
                            <button className="btn btn-light" onClick={() => {
                                this.handleClose()
                            }}>بستن
                            </button>
                        </Modal.Footer>) : (<></>)
                    }

                </Modal>
                <Modal centered show={this.state.showAccessory} onClick={() => {
                    this.handleCloseAccessory()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>امکانات واحد</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.unit.accessories.map((acc) => (
                                <div className='d-flex flex-row my-2 w-50'>
                                    <div className='ms-3'><BiChevronLeft/>{acc.name}</div>
                                    <div className='me-auto'>{acc.count} عدد</div>
                                </div>
                            ))
                        }
                    </Modal.Body>
                </Modal>

                <Modal centered show={this.state.showRoomAccessory} onClick={() => {
                    this.handleCloseRoomAcc()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>امکانات اتاق</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {
                            this.state.tempRoom.accessories.map((acc) => (
                                <div className='d-flex flex-row my-2 w-50'>
                                    <div className='ms-3'><BiChevronLeft/>{acc.name}</div>
                                    <div className='me-auto'>{acc.count} عدد</div>
                                </div>
                            ))
                        }
                    </Modal.Body>
                </Modal>
            </>
        );
    }

}

export default RoomAndBed;