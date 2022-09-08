import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai';
import { EditText, EditTextarea } from 'react-edit-text';
import { BiBed } from 'react-icons/bi';

class EditRoomAndBed extends Component {
    state = {
        rooms: [
            {
                id: 1, roomName: 'اتاق 1',
                description: "اتاق چهار تخته تراس دار",
                accessory: [
                    { name: "یخچال", count: "1" },
                    { name: "کمد", count: "2" },
                    { name: "چوب لباسی", count: "1" },
                ],
                beds: [
                    { id: 11, bedName: 'تخت 11', empty: true },
                    { id: 12, bedName: 'تخت 12', empty: false },
                    { id: 13, bedName: 'تخت 13', empty: true },
                    { id: 14, bedName: 'تخت 14', empty: true },
                ]
            },
            {
                id: 2, roomName: 'اتاق 2',
                description: "اتاق شش تخته تراس دار",
                accessory: [
                    { name: "یخچال", count: "1" },
                    { name: "کمد", count: "2" },
                    { name: "چوب لباسی", count: "1" },
                ],
                beds: [
                    { id: 21, bedName: 'تخت 21', empty: true },
                    { id: 22, bedName: 'تخت 22', empty: false },
                    { id: 23, bedName: 'تخت 23', empty: true },
                    { id: 24, bedName: '24 تخت', empty: true },
                    { id: 25, bedName: 'تخت 25', empty: true },
                    { id: 26, bedName: 'تخت 26', empty: true },

                ]
            },
        ]
    }
    render() {
        return (
            <>
                <div className="RoomAndBed">
                    <div className="back-btn">
                        <Link to="/">
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
                    <div className="row pb-5">
                        {this.state.rooms.map((room, i) => (
                            <div className='col-12 p-3'>
                                <div className='room-box'>
                                    <button className="room-close-btn" onClick={() => { }}><AiFillCloseCircle color="#F1416C" /></button>
                                    <div className="title-container row">
                                        <div className="col-6"><div className="firstTitle"><EditText showEditButton defaultValue={room.roomName} /></div></div>
                                        <div className='col-6'><div className="description"><EditText showEditButton defaultValue={room.description} /></div></div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-6 row bed-container'>
                                            {
                                                room.beds.map((bed) => (
                                                    <div className='col-4'>
                                                        <div className='bed-box'>
                                                            <button className="bed-close-btn" onClick={() => { }}><AiFillCloseCircle color="#F1416C" /></button>
                                                            <BiBed fontSize="2rem" />
                                                            <div className="title"><EditText className="editable" showEditButton defaultValue={bed.bedName} /></div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className='col-4'>
                                                <button onClick={() => { }} className="bed-add-btn"><AiOutlinePlus /></button>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='accessory-box'>
                                                {room.accessory.map((accessory) => (
                                                    <div className="accessory row">
                                                        <div className="accessory-title col-6">
                                                            <h6>{accessory.name}</h6>
                                                        </div>
                                                        <div className="accessory-count col-6">
                                                            <h6>{accessory.count}</h6>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default EditRoomAndBed;