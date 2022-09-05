import React, { Component } from 'react';
import './../../../../style/roomAndBed.css'
import { BiBed } from 'react-icons/bi'
import { TbBuilding } from 'react-icons/tb'
import { Link, Route, Routes } from "react-router-dom";
import FullViewOfBed from './FullViewOfBed';

class RoomAndBed extends Component {
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
        ]
    }
    render() {
        console.log(this.state)
        return (
            <>
                <div className='unit-box'>
                    <h2 className='me-3'>
                        <TbBuilding />
                        <span className="me-3">واحد 101</span>
                    </h2>
                    <div className="d-flex flex-wrap">
                        {
                            this.state.rooms.map(
                                (room) => (
                                    <div className="col-4">
                                        <div className="room-box">
                                            <div className="title">{room.roomName}</div>
                                            <div className='d-flex flex-wrap'>
                                                {room.bed.map((bed) => (
                                                    <Link to='/FullViewOfBed' className="col-4 p-1">
                                                        <div className={`bed-box ${bed.empty ? "empty" : "full"}`}>
                                                            <BiBed />
                                                            <div className="title">{bed.bedName}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </>
        );
    }

}

export default RoomAndBed;