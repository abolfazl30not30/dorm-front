import React, { Component } from 'react';
import './../../../../style/roomAndBed.css'
import { BiBed } from 'react-icons/bi'
import { TbBuilding } from 'react-icons/tb'
import { Link, Route, Routes } from "react-router-dom";
import FullViewOfBed from './FullViewOfBed';
import BuildingContext from '../../../../contexts/Building';
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import { Button,Modal } from 'react-bootstrap'

class RoomAndBed extends Component {
    static contextType = BuildingContext;
    state = {
        rooms: [
            {
                id: 1, roomName: 'اتاق 1',
                bed: [
                    { id: 11, bedName: 'تخت 11', empty: true },
                    { id: 12, bedName: 'تخت 12', empty: false },
                    { id: 13, bedName: 'تخت 13', empty: true },
                    { id: 14, bedName: 'تخت 14', empty: true },
                    { id: 15, bedName: 'تخت 15', empty: true },

                ]
            },
            {
                id: 2, roomName: 'اتاق 2',
                bed: [
                    { id: 21, bedName: 'تخت 21', empty: true },
                    { id: 22, bedName: 'تخت 22', empty: false },
                    { id: 23, bedName: 'تخت 23', empty: true },
                    { id: 24, bedName: '24 تخت', empty: true },
                    { id: 25, bedName: 'تخت 25', empty: true },

                ]
            },
            {
                id: 3, roomName: 'اتاق 3',
                bed: [
                    { id: 31, bedName: '31 تخت', empty: true },
                    { id: 32, bedName: 'تخت 32', empty: false },
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
                    {id: 51, accName: 'وسایل سرمایشی', count: 2},
                    {id: 51, accName: "یخچال", count: 1},
                    {id: 51, accName: "چوب لباسی", count: 10}
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
        show:false,
        bedOpen:[],
        roomOpen:[]
    }
    handleClose = () => {
        this.setState({show: false })
    };
    handleShow = (room,bed) => {
        const roomOpen = room
        const bedShow = bed
        this.setState({roomOpen: roomOpen})
        this.setState({bedOpen: bedShow})
        this.setState({show: true })
    };
    render() {
        return (
            <>
                <div className='unitContainer'>
                    <div className="back-btn">
                        <Link to="/booking">
                            بازگشت
                            <i class="bi bi-caret-left-fill"></i>
                        </Link>
                    </div>
                    <div className="text">
                        <h4>انتخاب اتاق و تخت</h4>
                        <p>
                            در این قسمت تخت مدنظر خود را انتخاب نمایید تا وارد مرحله ی نهایی ثبت نام شوید.
                        </p>
                    </div>
                    <h2 className='unit-name'>
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
                                                    <div className="title">{room.roomName}</div>
                                                    <div className='d-flex flex-wrap'>
                                                        {room.bed.map((bed) => (
                                                            <div className="col-4 p-1">
                                                                <div className={`bed-box ${bed.empty ? "empty" : "full"}`}>
                                                                    <Button onClick={() => {this.handleShow(room,bed)}}>
                                                                        <BiBed fontSize="2rem" />
                                                                        <div className="title">{bed.bedName}</div>
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
                <Modal centered show={this.state.show} onClick={() => {this.handleClose()}}>
                    <Modal.Header closeButton>
                    <Modal.Title>ثبت تخت</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            <div className="d-flex flex-column">
                                <div className='d-flex flex-row'>
                                    <div className="mx-1">طبقه/</div>
                                    <div className="mx-1">واحد/</div>
                                    <div className="mx-1">{this.state.roomOpen.roomName}/</div>
                                    <div className="mx-1">{this.state.bedOpen.bedName}</div>
                                </div>
                                <div className="d-flex flex-column flex-md-row">
                                    <div className="col-md-6 col-12 p-3">
                                        {
                                            (this.state.bedOpen.empty) ? (
                                                <div className='modal-info-bed person'>empty</div>
                                            ) : (
                                                <div className='modal-info-bed person'>full</div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6 col-12 p-3">
                                        <div className="d-flex flex-column modal-info-bed accessory">
                                            <div className='title'>مشخصات تخت و اتاق</div>
                                            <table>
                                                <tr>
                                                    <th>امکانات</th>
                                                    <th>تعداد</th>
                                                </tr>
                                                {console.log(this.state.roomOpen.accessory)}
                                                 {/* {this.state.roomOpen.accessory.map( (acc) => (
                                                    <tr>
                                                        <td>{acc.accName}</td>
                                                        <td>{acc.count}</td>
                                                    </tr>
                                                 ))} */}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </Modal.Body>
                </Modal>
            </>
        );
    }

}

export default RoomAndBed;