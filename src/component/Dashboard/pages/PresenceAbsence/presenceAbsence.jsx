import React, {Component} from 'react';
import '../../../../style/PresenceAbsence.css'
import {AiOutlineLeft} from 'react-icons/ai'
import {Link} from "react-router-dom";
import {HiOutlineBuildingOffice} from "react-icons/hi";
import BuildingContext from "../../../../contexts/Building";
import FloorAndBedLoading from "../../../loading/FloorAndBedLoading";

class PresenceAbsence extends Component {
    static contextType = BuildingContext;
    state = {
        floor: [],
        isLoading: true,
        floorFake: [
            {
                id: 1, name: "طبقه اول",
                units: [
                    {id: 111, number: 111, empty: false},
                    // {id: 112, number: "112", empty: true},
                    // {id: 113, number: "113", empty: false},
                    // {id: 114, number: "114", empty: false},
                    // {id: 115, number: "115", empty: true},
                    // {id: 116, number: "116", empty: false}
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
                        <div className="title-page">نوبت نظافت شبانه</div>
                        {this.state.isLoading ? (
                            <div className='row'>
                                <FloorAndBedLoading/>
                            </div>
                        ) : (
                            <div className="presence-absence-body row">
                                {this.state.floor.map((f) => (
                                    <div className="col-12 col-md-4 p-2">
                                        <div className='pa-floor'>
                                            <div className="title">{f.name}</div>
                                            <div className='units-list row'>
                                                {
                                                    f.units.map((u) => (
                                                         <div
                                                            className='units-list-item col-4 my-2 justify-content-center'>
                                                            <Link to="/dashboard/PresenceAbsencePage2" onClick={() => {
                                                                this.context.handleUnitNumber(u.number, u.id)
                                                            }}>
                                                                <div className="d-flex flex-column">
                                                                    <div style={{fontSize: "1.5rem"}}><i
                                                                        className="bi bi-building"
                                                                        style={{color: '#b47a2c'}}></i></div>
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