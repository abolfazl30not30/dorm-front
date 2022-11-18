import React, {Component} from 'react';
import '../../../../style/PresenceAbsence.css'
import {Link} from "react-router-dom";
import BuildingContext from "../../../../contexts/Building";
import FloorAndBedLoading from "../../../loading/FloorAndBedLoading";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {BsDoorClosed} from 'react-icons/bs'

class PresenceAbsenceRoomPerson extends Component {
    static contextType = BuildingContext;
    state = {
        roomApi: [
            {
                "roomNumber": 12,
                "information": [
                    {
                        "bedName": "A",
                        "personName": "فاضل",
                        "personId": "9b98c1c579674edd8df8bfcb5c0482f1",
                        "personNationalCode": "2500533395"
                    },
                    {
                        "bedName": "B",
                        "personName": "میلاد",
                        "personId": "9b98c1c579674edd8df8bfcb5c0482f2",
                        "personNationalCode": "2500533395"
                    },
                    {
                        "bedName": "C",
                        "personName": "ابوالفضل",
                        "personId": "9b98c1c579674edd8df8bfcb5c0482f3",
                        "personNationalCode": "2500533395"
                    }
                ]
            },
            {
                "roomNumber": 13,
                "information": [
                    {
                        "bedName": "A",
                        "personName": "امین",
                        "personId": "9b98c1c579674edd8df8bfcb5c0482f4",
                        "personNationalCode": "2500533394"
                    },
                    {
                        "bedName": "B",
                        "personName": "امیر",
                        "personId": "9b98c1c579674edd8df8bfcb5c0482f5",
                        "personNationalCode": "2500533395"
                    },
                    {
                        "bedName": "C",
                        "personName": "مهدی",
                        "personId": "9b98c1c579674edd8df8bfcb5c0482f6",
                        "personNationalCode": "2500533395"
                    }
                ]
            }
        ],
        roomsFake: [
            {
                "id": "c065ace3afd84a818c9f563112a8a61f",
                "number": 1,
                "description": null,
                "beds": [
                    {
                        "id": "427a4678fc5b42bca15c86c756ecbe32",
                        "name": "تخت A",
                        "empty": false,
                        "room": "c065ace3afd84a818c9f563112a8a61f",
                        "person": 'میلاد'
                    }
                ],
                "empty": false,
                "accessories": [],
                "unit": "28579824ad914a3aae4b6e7386ee5c96",
                "concatName": "100-1"
            },
            {
                "id": "c065ace3afd84a818c9f563112a8a61f",
                "number": 1,
                "description": null,
                "beds": [
                    {
                        "id": "427a4678fc5b42bca15c86c756ecbe32",
                        "name": "تخت A",
                        "empty": false,
                        "room": "c065ace3afd84a818c9f563112a8a61f",
                        "person": 'ابوالفضل'
                    }
                ],
                "empty": false,
                "accessories": [],
                "unit": "28579824ad914a3aae4b6e7386ee5c96",
                "concatName": "100-1"
            },
            {
                "id": "c065ace3afd84a818c9f563112a8a61f",
                "number": 1,
                "description": null,
                "beds": [
                    {
                        "id": "427a4678fc5b42bca15c86c756ecbe32",
                        "name": "تخت A",
                        "empty": true,
                        "room": "c065ace3afd84a818c9f563112a8a61f",
                        "person": null
                    }
                ],
                "empty": true,
                "accessories": [],
                "unit": "28579824ad914a3aae4b6e7386ee5c96",
                "concatName": "100-1"
            },

            {
                "id": "c065ace3afd84a818c9f563112a8a61f",
                "number": 1,
                "description": null,
                "beds": [
                    {
                        "id": "427a4678fc5b42bca15c86c756ecbe32",
                        "name": "تخت A",
                        "empty": true,
                        "room": "c065ace3afd84a818c9f563112a8a61f",
                        "person": null
                    }
                ],
                "empty": true,
                "accessories": [],
                "unit": "28579824ad914a3aae4b6e7386ee5c96",
                "concatName": "100-1"
            }
        ],
        rooms: [],
        unit: [],
        isLoading: false
    }

    async componentDidMount() {
        /*const response = await fetch(`http://localhost:8089/api/v1/unit/room/${this.context.unitIdPA}`).then((response) => response.json())
            .then((data) => console.log(data));*/

        /*const responseUnit = await fetch(`http://localhost:8089/api/v1/unit/${this.context.unitIdPA}`).then((response) => response.json())
            .then((data) => this.setState({unit: data, isLoading: false}));*/

        /* const test = await fetch(`http://localhost:8089/api/v1/unit/person/${this.context.unitIdPA}`).then((response) => response.json())
             .then((data) => console.log(data))*/

    }


    render() {
        return (
            <>
                <div className="back-btn">
                    <Link to="/PresenceAbsence">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>
                <div className="presence-absence">
                    <div className="title-page">نوبت نظافت شبانه</div>
                    <div className="title-page" style={{fontSize:'14px'}}><i className="bi bi-building ms-2"></i>واحد {this.context.unitNumberPA}</div>
                    {
                        this.state.isLoading ? (
                            <div className='row' style={{marginTop: "60px"}}>
                                <FloorAndBedLoading/>
                            </div>
                        ) : (
                            <div className='row'>
                                {this.state.roomApi.map((r) => (
                                    r.empty ? '' : (<div className="col-12 col-md-4 p-2">
                                        <div className='pa-floor'>
                                            <div className="title"><BsDoorClosed style={{fontSize:"20px"}} className={'ms-1'} />اتاق {r.roomNumber}</div>
                                            <div className='units-list row'>
                                                {
                                                    r.information.map((b) => (
                                                        b.empty ? '' : (

                                                            <OverlayTrigger
                                                                overlay={
                                                                    <Tooltip id={`tooltip-${b.personId}`}>
                                                                        کد ملی:{b.personNationalCode}
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <div className='units-list-item col-12 my-2'>
                                                                    <div>
                                                                        <i className="bi bi-person ms-1"></i>
                                                                        {b.personName} (تخت {b.bedName})
                                                                    </div>
                                                                    <BootstrapSwitchButton onlabel='انجام شد' onstyle='success'
                                                                                           offlabel='انجام نشد'
                                                                                           offstyle='secondary'
                                                                                           checked={false}
                                                                                           class='me-2'
                                                                                           onChange={(e) => {
                                                                                               this.handleGetStatus(e, b.personId)
                                                                                           }}
                                                                    />
                                                                </div>
                                                            </OverlayTrigger>
                                                    )
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>)
                                ))}
                            </div>
                        )
                    }
                </div>
            </>
        );
    }

    handleGetStatus = (checked, id) => {
        var today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const hh = String(today.getHours()).padStart(2, '0');
        const MM = String(today.getMinutes()).padStart(2, '0');
        const ss = String(today.getSeconds()).padStart(2, '0');
        today = `${mm}/${dd}/${yyyy} ${hh}:${MM}:${ss}`

        const report = {
            "date": today,
            "title": "حضور و غیاب",
            "personId": id,
            "checkCleaning": checked
        }
        console.log(report);
    }

}

export default PresenceAbsenceRoomPerson;