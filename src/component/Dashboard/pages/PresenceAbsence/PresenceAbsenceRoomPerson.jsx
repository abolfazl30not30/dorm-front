import React, {Component} from 'react';
import '../../../../style/PresenceAbsence.css'
import {Link} from "react-router-dom";
import BuildingContext from "../../../../contexts/Building";
import FloorAndBedLoading from "../../../loading/FloorAndBedLoading";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {BsDoorClosed} from 'react-icons/bs'
import axios from "axios";

class PresenceAbsenceRoomPerson extends Component {
    static contextType = BuildingContext;
    state = {
        rooms: [],
        unit: [],
        isLoading: false
    }

    componentDidMount = async () => {
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/person/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                rooms: data,
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/person/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    rooms: data,
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/unit/person/${this.context.unitId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    rooms: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }


    render() {
        return (
            <>
                <div className="back-btn">
                    <Link to="/dashboard/PresenceAbsence">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>
                <div className="presence-absence">
                    <div className="title-page">نوبت نظافت شبانه</div>
                    <div className="title-page" style={{fontSize:'14px'}}><i className="bi bi-building ms-2"/>واحد {this.context.unitNumberPA}</div>
                    {
                        this.state.isLoading ? (
                            <div className='row' style={{marginTop: "60px"}}>
                                <FloorAndBedLoading/>
                            </div>
                        ) : (
                            <div className='row'>
                                {this.state.rooms.map((r) => (
                                    <div className="col-12 col-md-4 p-2">
                                        <div className='pa-floor'>
                                            <div className="title"><BsDoorClosed style={{fontSize:"20px"}} className={'ms-1'} />اتاق {r.roomNumber}</div>
                                            <div className='units-list row'>
                                                {
                                                    r.information.map((b) => (
                                                        <OverlayTrigger
                                                            overlay={
                                                                <Tooltip id={`tooltip-${b.personId}`}>
                                                                    کد ملی:{b.personNationalCode}
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <div className='units-list-item col-12 my-2'>
                                                                <div>
                                                                    <i className="bi bi-person ms-1"/>
                                                                    {
                                                                        b.personId === null
                                                                        ? <p>تخت خالی است!</p>
                                                                            : <p>{b.personName} تخت {b.bedName}</p>
                                                                    }
                                                                </div>
                                                                {
                                                                    b.personId !== null
                                                                    ? <BootstrapSwitchButton onlabel='انجام شد' onstyle='success'
                                                                                             offlabel='انجام نشد'
                                                                                             offstyle='secondary'
                                                                                             checked={b.checked}
                                                                                             disabled={b.checked}
                                                                                             class='me-2'
                                                                                             onChange={(e) => {
                                                                                                 this.handleGetStatus(e, r, b)
                                                                                             }}
                                                                        />
                                                                        : null
                                                                }
                                                            </div>
                                                        </OverlayTrigger>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </>
        );
    }

    handleGetStatus = async (checked, room, info) => {
        console.log(info)
        let today = new Date().toLocaleDateString('fa-IR-u-nu-latn', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            formatMatcher: 'basic'
        });

        const report = {
            "date": today,
            "title": "cleaning",
            "personId": info.personId,
            "checkCleaning": checked
        }

        axios.post('https://api.saadatportal.com/api/v1/supervisor/record', report, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                loading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', report, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
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
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/record', report, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        let updatedRooms = [...this.state.rooms]
        const roomIndex = updatedRooms.indexOf(room)
        const bedIndex = updatedRooms[roomIndex].information.indexOf(info)
        updatedRooms[roomIndex].information[bedIndex].checked = true
        this.setState({rooms: updatedRooms})
    }
}

export default PresenceAbsenceRoomPerson;