import React, {Component} from 'react';
import '../../../../style/PresenceAbsence.css'
import {Link} from "react-router-dom";
import BuildingContext from "../../../../contexts/Building";
import FloorAndBedLoading from "../../../loading/FloorAndBedLoading";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

class PresenceAbsenceRoomPerson extends Component {
    static contextType = BuildingContext;
    state = {
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
        const response = await fetch(`https://api.saadatportal.com/api/v1/unit/room/${this.context.unitIdPA}`).then((response) => response.json())
            .then((data) => this.setState({rooms: data, isLoading: false}, () => {
                if (data.length == 0) {
                    this.setState({isFull: false})
                } else {
                    this.setState({isFull: true})
                }
            }));

        const responseUnit = await fetch(`https://api.saadatportal.com/api/v1/unit/${this.context.unitIdPA}`).then((response) => response.json())
            .then((data) => this.setState({unit: data, isLoading: false}));

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
                    <div className="title-page">واحد {this.context.unitNumberPA}</div>
                    {
                        this.state.isLoading ? (
                            <div className='row' style={{marginTop: "60px"}}>
                                <FloorAndBedLoading/>
                            </div>
                        ) : (
                            <div className='row'>
                                {this.state.roomsFake.map((r) => (
                                    r.empty ? '' : (<div className="col-12 col-md-4 p-2">
                                            <div className='pa-floor'>
                                                <div className="title">اتاق {r.concatName}</div>
                                                <div className='units-list row'>
                                                    {
                                                        r.beds.map((b) => (
                                                            b.empty ? '' : (<div className='units-list-item col-12 my-2'>
                                                                <div><i className="bi bi-person"></i> {b.person}</div>
                                                                <BootstrapSwitchButton onlabel='حاضر' onstyle='success'
                                                                                       offlabel='غایب' offstyle='secondary'
                                                                                       checked={false}
                                                                                       class='me-2'
                                                                                       onChange={(e) => {this.handleGetStatus(e,b.id)}}
                                                                />
                                                            </div>)
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

    handleGetStatus = (checked,id) => {
        var today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const hh = String(today.getHours()).padStart(2, '0');
        const MM = String(today.getMinutes()).padStart(2, '0');
        const ss = String(today.getSeconds()).padStart(2, '0');
        today = `${mm}/${dd}/${yyyy} ${hh}:${MM}:${ss}`

        const report = {
            "date" : today,
            "title" : "حضور و غیاب",
            "personId" : id,
            "checkCleaning" : checked
        }
        console.log(report);
    }

}

export default PresenceAbsenceRoomPerson;