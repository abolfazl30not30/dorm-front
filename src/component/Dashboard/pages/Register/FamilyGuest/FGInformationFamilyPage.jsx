import React, { Component } from 'react'
import "../../../../../style/registerPage.css"
import BuildingContext from "../../../../../contexts/Building";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {BsPersonCircle} from "react-icons/bs";
import {FormControl, MenuItem, Select} from "@mui/material";

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
                    <div className="search-box d-flex justify-content-center">
                        <div className="form-floating">
                            <FormControl className={"w-100"}>
                                <Select
                                    sx={{ height: 50, borderRadius: 2, minWidth: "10rem"}}
                                    id="select-field"
                                    value={this.state.searchType}
                                    onChange={(e)=>{this.setState({searchType:e.target.value})}}>
                                    <MenuItem value={"fullName"}>نام و نام خانوادگی</MenuItem>
                                    <MenuItem value={"nationalCode"}>کد ملی</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-8px',
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0.2rem',
                                    padding: '0 .4rem',
                                    opacity: '1',
                                }}>براساس</label>
                            </FormControl>
                        </div>
                        <input type="text"
                               id="inputSearch"
                               placeholder="جسـتجـو..."
                               onChange={(e)=>{this.handleSearchInput(e)}}/>
                        <div className="search-icon"><i className="bi bi-search"></i></div>
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
            </>
        );
    }

    async componentDidMount() {
        await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?parentType=Person`).then((response) => response.json())
            .then((data) => this.setState({peopleFound: data}));
    }


    //search
    handleSearchInput = async (e) =>{
        const value = e.target.value;
        this.setState({searchInput:value});
        const response = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?parentType=Person&${this.state.searchType}=${value}`).then((response) => response.json())
            .then((data) => this.setState({peopleFound: data}));
    }


    handleChange = (event, newAlignment) => {
        this.setState({selectedPeople: newAlignment})
        this.context.handleFields(newAlignment, 'familyGuestInformationFamily', 'hostId')
    }

}

export default FGInformationFamilyPage;