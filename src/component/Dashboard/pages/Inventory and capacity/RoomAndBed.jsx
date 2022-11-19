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
        rooms1: [
            {
                id: 1, name: 'اتاق 1',
                beds: [
                    {id: 11, name: 'تخت 11', empty: true},
                    {
                        id: 12, name: 'تخت 12', empty: false,
                        person: {
                            id: 1,
                            firstName: 'ابوافضل',
                            lastName: 'زارع',
                            nationalCode: 2500255252,
                            StartOfStay: '12/34/56',
                            age: 21,
                            image: 'https://docs.microsoft.com/answers/storage/attachments/209536-360-f-364211147-1qglvxv1tcq0ohz3fawufrtonzz8nq3e.jpg'
                        }
                    },
                    {id: 13, name: 'تخت 13', empty: true},
                    {id: 14, name: 'تخت 14', empty: true},
                    {id: 15, name: 'تخت 15', empty: true},

                ]
            },
            {
                id: 2, name: 'اتاق 2',
                beds: [
                    {id: 21, name: 'تخت 21', empty: true},
                    {
                        id: 22, name: 'تخت 22', empty: false,
                        person: {
                            id: 1,
                            firstName: 'پوریا',
                            lastName: 'زارع',
                            nationalCode: 2500255252,
                            StartOfStay: '12/34/56',
                            age: 21,
                            image: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                        }
                    },
                    {id: 23, name: 'تخت 23', empty: true},
                    {id: 24, name: '24 تخت', empty: true},
                    {id: 25, name: 'تخت 25', empty: true},

                ]
            },
            {
                id: 3, name: 'اتاق 3',
                beds: [
                    {id: 31, name: '31 تخت', empty: true},
                    {
                        id: 32, name: 'تخت 32', empty: false,
                        person: {
                            id: 1,
                            firstName: 'فاضل',
                            lastName: 'زارع',
                            nationalCode: 2500255252,
                            StartOfStay: '12/34/56',
                            age: 21,
                            image: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                        }
                    },
                    {id: 33, name: 'تخت 33', empty: true},
                    {id: 34, name: 'تخت 34', empty: true},
                    {id: 35, name: 'تخت 35', empty: true},

                ]
            },
            {
                id: 4, name: 'اتاق 4',
                beds: [
                    {id: 41, name: '41 تخت', empty: true},
                    {id: 42, name: '42 تخت', empty: true},
                    {id: 43, name: 'تخت 43', empty: true},
                    {id: 44, name: 'تخت 44', empty: true},
                    {id: 45, name: 'تخت 45', empty: true},

                ]
            },
            {
                id: 4, name: 'اتاق 5',
                beds: [
                    {id: 51, name: '51 تخت', empty: true},
                    {id: 52, name: '52 تخت', empty: true},
                    {id: 53, name: 'تخت 53', empty: true},
                    {id: 54, name: '54 تخت', empty: true},
                    {id: 55, name: 'تخت 55', empty: true},

                ],
                accessory: [
                    {id: 51, accName: 'وسایل سرمایشی', count: 2},
                    {id: 51, accName: "یخچال", count: 1},
                    {id: 51, accName: "چوب لباسی", count: 10}
                ]
            },
            {
                id: 6, name: 'اتاق 6',
                beds: [
                    {id: 61, name: '61 تخت', empty: true},
                    {id: 62, name: '62 تخت', empty: true},
                    {id: 63, name: '63 تخت', empty: true},
                    {id: 64, name: 'تخت 64', empty: true},
                    {id: 65, name: 'تخت 65', empty: true},

                ]
            }
        ],

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
                person: {
                    id: 1,
                    firstName: 'میلاد',
                    lastName: 'زارع',
                    nationalCode: 2500255252,
                    StartOfStay: '12/34/56',
                    age: 21,
                    image: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                }
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
    handleSubmit = () =>{

    }
    handleShow = (bed, room) => {
        this.setState({roomAccessory: room})
        this.setState({bedOpen: bed})
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
        this.setState({selectedPeople: newAlignment})
    }
    //search
    handleSearchInput = (e) =>{
        const value = e.target.value;
        this.setState({searchInput:value});
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
                        <Link to="/booking">
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
                                        <img src={this.state.bedOpen.person.image} width='200' alt=""/>
                                        <div
                                            className="name">{this.state.bedOpen.person.firstName} {this.state.bedOpen.person.lastName}</div>
                                        <div className='profile-item'><AiOutlineNumber className='ms-2'/>کد
                                            ملی: {this.state.bedOpen.person.nationalCode}</div>
                                        <div className='profile-item'><MdDateRange className='ms-2'/>شروع
                                            اقامت: {this.state.bedOpen.person.StartOfStay}</div>
                                        <div className='profile-item'><AiOutlineUser
                                            className='ms-2'/>سن: {this.state.bedOpen.person.age}</div>
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
                                                <ToggleButton value="hello" style={{display: "block"}}>
                                                    <div className="row">
                                                        <div
                                                            className="col-3 profile-img d-flex align-items-center justify-content-center">
                                                            <BsPersonCircle fontSize="60px"/>
                                                        </div>
                                                        <div className="col-9 people-info row">
                                                            <div className="col-6">
                                                                <div className="d-flex">
                                                                    <label>نام و نام خانوادگی: </label>
                                                                    <p>{poeple.firstName}{poeple.lastName}</p>
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