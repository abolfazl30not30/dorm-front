import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import SimpleTextInput from "../../../../CustomInputs/SimpleTextInput";
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {BsPersonCircle} from "react-icons/bs";

class FGInformationFamilyPage extends Component {
    static contextType = BuildingContext;

    state = {
        peopleFound :[],
        searchInput:"",
        selectedPeople:"",
        searchType:"fullName",
    }

    render() {
        return (
            <>
                <div className="register-step-box">
                    <h2>انتخاب ميزبان</h2>
                    <div className="input-container row align-items-center">
                        <div className="col-1"><label>براساس:</label></div>
                        <div className="col-3 " style={{paddingLeft: "0"}}>
                            <Form.Select aria-label="Default select example" style={{height : "50px"}} value={this.state.searchType} onChange={(e)=>{this.setState({searchType:e.target.value})}}>
                                <option value="fullName">نام و نام خانوادگی</option>
                                <option value="nationalCode">کد ملی</option>
                            </Form.Select>
                        </div>
                        <div className="input-group-register col-7 px-0" style={{paddingRight: "0"}}>
                            <input type="text" id="inputSearch" className="input" placeholder=" " style={{padding:"6px"}} onChange={(e)=>{this.handleSearchInput(e)}}/>
                            <label className="placeholder">جستوجـو</label>
                        </div>
                        <div className="col-1" style={{paddingRight: "0"}}>
                            <button className="btn outline-secondary"><BiSearch fontSize="25px" onClick={this.handleSearchBtn}/>
                            </button>
                        </div>
                    </div>
                    <div className="people-container mt-4">
                        {this.state.peopleFound.map((poeple)=>(
                            <ToggleButtonGroup
                                orientation="vertical"
                                value={this.state.selectedPeople}
                                exclusive
                                color="success"
                                onChange={this.handleChange}
                                aria-label="text alignment"
                                style={{width: "100%"}}
                            >
                                <ToggleButton value={poeple.id} style={{display: "block"}}>
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
                                                    <p>{poeple.reservationDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        ))}
                    </div>
                </div>
            </>
        );
    }
    //search
    handleSearchInput = async (e) =>{
        const value = e.target.value;
        this.setState({searchInput:value});

        const response = await fetch(`http://localhost:8089/api/v1/characteristic/search?${this.state.searchType}=${value}`).then((response) => response.json())
            .then((data) => this.setState({peopleFound: data}));
    }

    handleSearchBtn = async () =>{
        const response = await fetch(`http://localhost:8089/api/v1/characteristic/search?${this.state.searchType}=${this.state.searchInput}`).then((response) => response.json())
            .then((data) => this.setState({peopleFound: data}));
    }

    handleChange = (event, newAlignment) => {
        this.setState({selectedPeople: newAlignment})
        this.context.handleFields(newAlignment, 'familyGuestInformationFamily', 'hostId')
    }

}

export default FGInformationFamilyPage;