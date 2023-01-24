import React, {Component} from 'react';
import './../../../../style/roomAndBed.css'
import {BiBed} from 'react-icons/bi'
import {TbBuilding} from 'react-icons/tb'
import {MdDateRange} from 'react-icons/md'
import {AiOutlineNumber} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {IoMdMore} from "react-icons/io";
import {BsPersonCircle} from "react-icons/bs"
import {Link} from "react-router-dom";
import BuildingContext from '../../../../contexts/Building';
import FloorAndBedLoading from '../../../loading/FloorAndBedLoading';
import {Button, Modal} from 'react-bootstrap'
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import axios from "axios";

class Bed extends Component {
    static contextType = BuildingContext;
    state = {

        isLoading: false,
        beds: [],
        isFull: false,
        show: false,
        selectedPeople: "",
        bedOpen:
            {
                id: '', name: '', empty: false,
                personId: "",
            },

        tempPerson: {
            id: '',
            firstName: '',
            lastName: '',
            nationalCode: '',
            timePeriod: {
                startDate: "",
                endDate: ""
            },
            image: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
        },

        searchInput: "",
        searchType: "fullName",
        peopleFound: [],
    }

    async componentDidMount() {
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/room/getBeds/8c9dce62bf714323bc883902d66a841a`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({beds: data, isLoading: false}, () => {
                if (data.length === 0) {
                    this.setState({isFull: false})
                } else {
                    this.setState({isFull: true})
                }
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/room/getBeds/8c9dce62bf714323bc883902d66a841a`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({beds: data, isLoading: false}, () => {
                                    if (data.length === 0) {
                                        this.setState({isFull: false})
                                    } else {
                                        this.setState({isFull: true})
                                    }
                                }))
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
                                .then((data) => this.setState({rooms: data, isLoading: false}, () => {
                                    if (data.length === 0) {
                                        this.setState({isFull: false})
                                    } else {
                                        this.setState({isFull: true})
                                    }
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }
        })

    }

    handleClose = () => {
        this.setState({show: false})
    };

    handleSubmit = async () => {
        axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${this.state.bedOpen.id}`, {
            personId: this.state.selectedPeople,
            empty: false
        }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                let updateState = [...this.state.rooms];
                let roomIndex = this.state.rooms.indexOf(this.state.roomAccessory);

                let bedIndex = this.state.rooms[roomIndex].beds.indexOf(this.state.bedOpen);
                updateState[roomIndex].beds[bedIndex].empty = false;
                updateState[roomIndex].beds[bedIndex].person = this.state.selectedPeople;
                this.setState({rooms: updateState});
            }).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${this.state.bedOpen.id}`, {
                                personId: this.state.selectedPeople,
                                empty: false
                            }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((result) => {
                                    let updateState = [...this.state.rooms];
                                    let roomIndex = this.state.rooms.indexOf(this.state.roomAccessory);

                                    let bedIndex = this.state.rooms[roomIndex].beds.indexOf(this.state.bedOpen);
                                    updateState[roomIndex].beds[bedIndex].empty = false;
                                    updateState[roomIndex].beds[bedIndex].person = this.state.selectedPeople;
                                    this.setState({rooms: updateState});
                                }).catch((error) => {
                                console.log(error)
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
                            axios.put(`https://api.saadatportal.com/api/v1/supervisor/bed/${this.state.bedOpen.id}`, {
                                personId: this.state.selectedPeople,
                                empty: false
                            }, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((result) => {
                                    let updateState = [...this.state.rooms];
                                    let roomIndex = this.state.rooms.indexOf(this.state.roomAccessory);

                                    let bedIndex = this.state.rooms[roomIndex].beds.indexOf(this.state.bedOpen);
                                    updateState[roomIndex].beds[bedIndex].empty = false;
                                    updateState[roomIndex].beds[bedIndex].person = this.state.selectedPeople;
                                    this.setState({rooms: updateState});
                                }).catch((error) => {
                                console.log(error)
                            })
                        } else {
                            window.location = '/'
                        }
                    })
            }
        })

        this.handleClose();
    }

    handleShow = async (bed) => {
        this.setState({bedOpen: bed})
        if (bed.empty === false) {
            let person = {}
            console.log("bed")
            console.log(bed)
            console.log(123123123)
            await axios.get(`https://api.saadatportal.com/api/v1/supervisor/person/${bed.person}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => {
                    person = data
                })
                .catch(() => {
                    console.log(123)
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    console.log(321)
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.get(`https://api.saadatportal.com/api/v1/supervisor/person/${bed.person}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => {
                                            person = data
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
                                    axios.get(`https://api.saadatportal.com/api/v1/supervisor/person/${bed.person}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => {
                                            person = data
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                    }
                })

            console.log("person")
            console.log(person)

            // await fetch(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${person.characteristicId}`).then((response) => response.json())
            //     .then((data) => this.setState({tempPerson : data}));

            await axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${person.characteristicId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => this.setState({tempPerson: data}))
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${person.characteristicId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => this.setState({tempPerson: data}))
                                } else {
                                    window.location = '/'
                                }
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${person.characteristicId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((data) => this.setState({tempPerson: data}))
                                } else {
                                    window.location = '/'
                                }
                            })
                    }
                })
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
    handleSearchInput = async (e) => {
        const value = e.target.value;
        this.setState({searchInput: value});
        // await fetch(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`).then((response) => response.json())
        //     .then((data) => this.setState({peopleFound: data}));

        axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({peopleFound: data}))
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({peopleFound: data}))
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({peopleFound: data}))
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })
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
                        <h4>انتخاب تخت</h4>
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
                                <div className="mt-4 d-flex flex-wrap row justify-content-center">
                                    {
                                        this.state.beds.map(
                                            (bed) => (
                                                <div className="col-md-3 col-sm-4 col-xs-12">
                                                    <div className={`bed-box ${bed.empty ? "empty" : "full"}`}>
                                                        <Button onClick={() => {
                                                            this.handleShow(bed)
                                                        }}>
                                                            <BiBed fontSize="2rem"/>
                                                            <div className="title">{bed.name}</div>
                                                        </Button>
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
                                        <div
                                            className="name">{this.state.tempPerson.firstName} {this.state.tempPerson.lastName}</div>
                                        <div className='profile-item'><AiOutlineNumber className='ms-2'/>کد
                                            ملی: {this.state.tempPerson.nationalCode}</div>
                                        <div className='profile-item'><MdDateRange className='ms-2'/>شروع
                                            اقامت: {this.state.tempPerson.timePeriod.startDate}</div>
                                        <div className='profile-item'><AiOutlineUser
                                            className='ms-2'/>تاريخ تولد: {this.state.tempPerson.birthDate}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="search-container-popup">
                                    <div className="d-flex justify-content-center w-100">
                                        <div className="search-box">
                                            <div className="form-floating">
                                                <select className="form-select" id="floatingSelect"
                                                        aria-label="Floating label select example"
                                                        value={this.state.searchType} onChange={(e) => {
                                                    this.setState({searchType: e.target.value})
                                                }}>
                                                    <option value="fullName">نام و نام خانوادگی</option>
                                                    <option value="nationalCode">کد ملی</option>
                                                </select>
                                                <label htmlFor="floatingSelect">نوع</label>
                                            </div>
                                            <input type="text"
                                                   id="inputSearch"
                                                   placeholder="جسـتجـو..."
                                                   onChange={(e) => {
                                                       this.handleSearchInput(e)
                                                   }}/>
                                            <div className="search-icon"><i className="bi bi-search"></i></div>
                                        </div>
                                    </div>
                                    <div className="people-container mt-4">
                                        {this.state.peopleFound.map((poeple) => (
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
                                                                    <p>{poeple.timePeriod.startDate}</p>
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
            </>
        );
    }

}

export default Bed;