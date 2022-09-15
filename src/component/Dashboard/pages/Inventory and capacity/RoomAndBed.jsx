import React, { Component } from 'react';
import './../../../../style/roomAndBed.css'
import { BiBed } from 'react-icons/bi'
import { TbBuilding } from 'react-icons/tb'
import { Link, Route, Routes } from "react-router-dom";
import FullViewOfBed from './FullViewOfBed';
import BuildingContext from '../../../../contexts/Building';
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import { Button, Modal } from 'react-bootstrap'

class RoomAndBed extends Component {
    static contextType = BuildingContext;
    state = {
        rooms1: [
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
        isLoading: true,
        rooms: []
    }

    async componentDidMount() {
        const response = await fetch(`http://api.saadatportal.com/api/v1/unit/${this.context.unitId}`).then((response) => response.json())
            .then((data) => this.setState({ rooms: data, isLoading: false }));
        console.log(this.state.rooms)
    }

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
                                                    <div className="title">{room.number}</div>
                                                    <div className='d-flex flex-wrap'>
<<<<<<< HEAD
        {
            room.beds.map((bed) => (
                <Link to='/FullViewOfBed' className="col-4 p-1">
                    <div className={`bed-box ${bed.empty ? "empty" : "full"}`}>
                        <BiBed fontSize="2rem" />
                        <div className="title">{bed.name}</div>
=======
                                                        {room.bed.map((bed) => (

                            <div className="col-4 p-1">
                                <div className={`bed-box ${bed.empty ? "empty" : "full"}`}>
                                    {/* {console.log(bed.empty)} */}
                                    <Button onClick={this.handleShow}>
                                        <BiBed fontSize="2rem" />
                                        <div className="title">{bed.bedName}</div>
                                    </Button>
>>>>>>> modalPage
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                                            </div >
                                        )
                                    )
        }
        <Modal centered show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ثبت تخت</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (bed.empty) ? (
                        console.log(bed.empty)

                    ) : (
                        console.log(bed.empty)
                    )
                }
            </Modal.Body>
        </Modal>
                            </div >
                        )
    }

                </div>
            </>
        );
    }

}

export default RoomAndBed;