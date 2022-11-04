import React, {Component} from 'react';
import '../../../../style/PresenceAbsence.css'
import {AiOutlineLeft} from 'react-icons/ai'
import {Link} from "react-router-dom";
import { HiOutlineBuildingOffice } from "react-icons/hi";
import BuildingContext from "../../../../contexts/Building";
import FloorAndBedLoading from "../../../loading/FloorAndBedLoading";

class PresenceAbsence extends Component {
    static contextType = BuildingContext;
    state = {
        floor:[],
        isLoading: true,
        floorFake: [
            {
                id: 1, name: "طبقه اول",
                units: [
                    {id: 111, number: "111", empty: false},
                    {id: 112, number: "112", empty: true},
                    {id: 113, number: "113", empty: false},
                    {id: 114, number: "114", empty: false},
                    {id: 115, number: "115", empty: true},
                    {id: 116, number: "116", empty: false}
                ]
            },
            {
                id: 2, name: "طبقه دوم",
                units: [
                    {id: 211, number: "211", empty: true},
                    {id: 212, number: "212", empty: true},
                    {id: 213, number: "213", empty: true},
                    {id: 214, number: "214", empty: true},
                    {id: 215, number: "215", empty: true},
                    {id: 216, number: "216", empty: true}
                ]
            },
            {
                id: 3, name: "طبقه سوم",
                units: [
                    {id: 311, number: "311", empty: false},
                    {id: 312, number: "312", empty: false},
                    {id: 313, number: "313", empty: true},
                    {id: 314, number: "314", empty: true},
                    {id: 315, number: "315", empty: true},
                    {id: 316, number: "316", empty: true}
                ]
            },
            {
                id: 3, name: "طبقه چهارم",
                units: [
                    {id: 311, number: "411", empty: false},
                    {id: 312, number: "412", empty: true},
                    {id: 313, number: "413", empty: false},
                    {id: 314, number: "414", empty: true},
                    {id: 315, number: "415", empty: true},
                    {id: 316, number: "416", empty: true}
                ]
            },
        ]
    }
    async componentDidMount() {
        let data;
        const response = await fetch('https://api.saadatportal.com/api/v1/floor').then((response) => response.json())
            .then((data) => this.setState({floor: data, isLoading: false}));
    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="presence-absence">
                        <div className="title-page">حضور غیاب</div>
                        {this.state.isLoading ? (
                            <div className='row' style={{marginTop: "60px"}}>
                                <FloorAndBedLoading/>
                            </div>
                        ) : (
                            <div className="presence-absence-body row">
                                {this.state.floorFake.map((f) => (
                                    <div className="col-12 col-md-4 p-2">
                                        <div className='pa-floor'>
                                            <div className="title">{f.name}</div>
                                            <div className='units-list row'>
                                                {
                                                    f.units.map((u) => (
                                                        u.empty ? '' :  <div className='units-list-item col-4 my-2'>
                                                            <Link to="/PresenceAbsencePage2" onClick={() => {
                                                                this.context.handleUnitNumberPA(u.number, u.id)
                                                            }}>
                                                                <div className="d-flex flex-column">
                                                                    <div><i className="bi bi-building"></i></div>
                                                                    <div>واحد {u.number}</div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default PresenceAbsence;