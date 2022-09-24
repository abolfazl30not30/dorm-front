import React, { Component } from 'react';
import './../../../../style/roomAndBed.css'
import { BiBed } from 'react-icons/bi'
import { TbBuilding } from 'react-icons/tb'
import { MdDateRange } from 'react-icons/md'
import { AiOutlineNumber } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineMore } from 'react-icons/ai'
import { Link, Route, Routes } from "react-router-dom";
import FullViewOfBed from './FullViewOfBed';
import BuildingContext from '../../../../contexts/Building';
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import { Button, Modal } from 'react-bootstrap'
import { BiChevronLeft } from 'react-icons/bi'

class RoomAndBed extends Component {
    static contextType = BuildingContext;
    state = {
        rooms1: [
            {
                id: 1, roomName: 'اتاق 1',
                bed: [
                    { id: 11, bedName: 'تخت 11', empty: true },
                    {
                        id: 12, bedName: 'تخت 12', empty: false,
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
                    { id: 13, bedName: 'تخت 13', empty: true },
                    { id: 14, bedName: 'تخت 14', empty: true },
                    { id: 15, bedName: 'تخت 15', empty: true },

                ]
            },
            {
                id: 2, roomName: 'اتاق 2',
                bed: [
                    { id: 21, bedName: 'تخت 21', empty: true },
                    {
                        id: 22, bedName: 'تخت 22', empty: false,
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
                    { id: 23, bedName: 'تخت 23', empty: true },
                    { id: 24, bedName: '24 تخت', empty: true },
                    { id: 25, bedName: 'تخت 25', empty: true },

                ]
            },
            {
                id: 3, roomName: 'اتاق 3',
                bed: [
                    { id: 31, bedName: '31 تخت', empty: true },
                    {
                        id: 32, bedName: 'تخت 32', empty: false,
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
                    { id: 33, bedName: 'تخت 33', empty: true },
                    { id: 34, bedName: 'تخت 34', empty: true },
                    { id: 35, bedName: 'تخت 35', empty: true },

                ]
            },
            {
                id: 4, roomName: 'اتاق 4',
                bed: [
                    { id: 41, bedName: '41 تخت', empty: true },
                    { id: 42, bedName: '42 تخت', empty: true },
                    { id: 43, bedName: 'تخت 43', empty: true },
                    { id: 44, bedName: 'تخت 44', empty: true },
                    { id: 45, bedName: 'تخت 45', empty: true },

                ]
            },
            {
                id: 4, roomName: 'اتاق 5',
                bed: [
                    { id: 51, bedName: '51 تخت', empty: true },
                    { id: 52, bedName: '52 تخت', empty: true },
                    { id: 53, bedName: 'تخت 53', empty: true },
                    { id: 54, bedName: '54 تخت', empty: true },
                    { id: 55, bedName: 'تخت 55', empty: true },

                ],
                accessory: [
                    { id: 51, accName: 'وسایل سرمایشی', count: 2 },
                    { id: 51, accName: "یخچال", count: 1 },
                    { id: 51, accName: "چوب لباسی", count: 10 }
                ]
            },
            {
                id: 6, roomName: 'اتاق 6',
                bed: [
                    { id: 61, bedName: '61 تخت', empty: true },
                    { id: 62, bedName: '62 تخت', empty: true },
                    { id: 63, bedName: '63 تخت', empty: true },
                    { id: 64, bedName: 'تخت 64', empty: true },
                    { id: 65, bedName: 'تخت 65', empty: true },

                ]
            }
        ],
        isLoading: false,

        rooms: [],
        show: false,
        showAccessory: false,

        unit: {
            accessories: [
                { name: 'یخچال', count: 1 },
                { name: 'چوب لباسی', count: 4 }
            ]
        },

        bedOpen:
        {
            id: 32, bedName: 'تخت 32', empty: false,
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
                { name: 'یخچال', count: 1 },
                { name: 'چوب لباسی', count: 4 }
            ]
        }
    }

    async componentDidMount() {
        const response = await fetch(`http://api.saadatportal.com/api/v1/unit/room/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({ rooms: data, isLoading: false }));
        const responseUnit = await fetch(`http://api.saadatportal.com/api/v1/unit/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({ unit: data, isLoading: false }));

        console.log(this.state.rooms);
        console.log(this.state.unit);
    }

    handleClose = () => {
        this.setState({ show: false })
    };

    handleShow = (bed, room) => {
        this.setState({ roomAccessory: room })
        this.setState({ bedOpen: bed })
        this.setState({ show: true })
    };

    handleCloseAccessory = () => {
        this.setState({ showAccessory: false })
    };

    handleShowAccessory = () => {
        this.setState({ showAccessory: true })
    };

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
                        <button className='btn' onClick={() => {
                            this.handleShowAccessory(this.context.unitNumber)
                        }}><AiOutlineMore className="mt-2" color='#555' fontSize="1.8rem" /></button>
                        <TbBuilding className="mt-2" color='#555' fontSize="1.8rem" />
                        <span className="unit-title">واحد {this.context.unitNumber}</span>
                    </h2>
                    {
                        this.state.isLoading ? (
                            <div className='row' style={{ marginTop: "60px" }}>
                                <FloorAndBedLoading />
                            </div>
                        ) : (
                            <div className="d-flex flex-wrap">
                                {
                                    this.state.rooms.map(
                                        (room) => (
                                            <div className="col-4">
                                                <div className="room-box">
                                                    <div className="title">{room.description}({room.concatName})</div>
                                                    <div className='d-flex flex-wrap'>
                                                        {room.beds.map((bed) => (
                                                            <div className="col-4 p-1">
                                                                <div
                                                                    className={`bed-box ${bed.empty ? "empty" : "full"}`}>
                                                                    <Button onClick={() => {
                                                                        this.handleShow(bed, room)
                                                                    }}>
                                                                        <BiBed fontSize="2rem" />
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
                        )
                    }
                </div>

                <Modal centered show={this.state.show} onClick={() => {
                    this.handleClose()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.bedOpen.bedName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="accessory-box">
                            <div className='text-center mb-3 fw-bold'>لوازم جانبی</div>
                            <div className="d-flex flex-column">
                                {this.state.roomAccessory.accessories.map((acc) => (
                                    <div className='d-flex flex-row my-2 w-50'>
                                        <div className='ms-3'><BiChevronLeft />{acc.name}</div>
                                        <div className='me-auto'>{acc.count} عدد</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {
                            (!this.state.bedOpen.empty) ? (
                                <div className="d-flex justify-content-center">
                                    <div className='profile-box'>
                                        <img src={this.state.bedOpen.person.image} width='200' alt="" />
                                        <div
                                            className="name">{this.state.bedOpen.person.firstName} {this.state.bedOpen.person.lastName}</div>
                                        <div className='profile-item'><AiOutlineNumber className='ms-2' />کد
                                            ملی: {this.state.bedOpen.person.nationalCode}</div>
                                        <div className='profile-item'><MdDateRange className='ms-2' />شروع
                                            اقامت: {this.state.bedOpen.person.StartOfStay}</div>
                                        <div className='profile-item'><AiOutlineUser
                                            className='ms-2' />سن: {this.state.bedOpen.person.age}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center my-4'>تخت برای شخصی ثبت نشده است</div>
                            )
                        }
                    </Modal.Body>
                </Modal>


                <Modal centered show={this.state.showAccessory} onClick={() => {
                    this.handleCloseAccessory()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>لوازم جانبی</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.unit.accessories.map((acc) => (
                                <div className='d-flex flex-row my-2 w-50'>
                                    <div className='ms-3'><BiChevronLeft />{acc.name}</div>
                                    <div className='me-auto'>{acc.count} عدد</div>
                                </div>
                            ))
                        }
                        {console.log(
                            this.state.unit.accessories.map((acc) => (acc.name))
                        )}
                    </Modal.Body>
                </Modal>
            </>
        );
    }

}

export default RoomAndBed;