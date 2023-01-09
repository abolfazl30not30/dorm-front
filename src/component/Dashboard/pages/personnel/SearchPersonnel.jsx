import React, {Component} from 'react'
import '../../../../style/searchAccount.css'
import {AiOutlineBarcode, AiOutlineUser,AiOutlineArrowLeft} from "react-icons/ai";
import {BsTelephone} from "react-icons/bs";
import {Link} from "react-router-dom"
import BuildingContext from "../../../../contexts/Building";
import Skeleton from "react-loading-skeleton";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Select} from "@mui/material";
import axios from "axios";

class SearchPersonnel extends Component {
    static contextType = BuildingContext;

    state = {
        searchLoading: true,
        placeholder: '',
        accountFound: [],
        searchInput: "",
        searchType: "fullName",
    }

    async componentDidMount() {
        this.setState({searchLoading: true})
        axios.get('https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Personnel', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                accountFound: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Personnel', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    accountFound: data,
                                    searchLoading: false
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Personnel', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    accountFound: data,
                                    searchLoading: false
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
                <div className="d-flex flex-row justify-content-between align-items-center w-100 my-3">
                    <div>
                        <h4>
                            پرسنل
                        </h4>
                    </div>
                    <div className="back-btn p-0">
                        <Link to="/dashboard">
                            بازگشت
                            <i className="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                </div>
                <div className="search-box justify-content-center">
                    <div className="form-floating">
                        <FormControl className={"w-100"}>
                            <Select
                                sx={{ height: 50, borderRadius: "0.5rem", minWidth: '8rem', backgroundColor: "#fff"}}
                                id="select-field"
                                value={this.state.searchType}
                                onChange={(value) => this.setState({searchType: value.target.value})}>
                                <MenuItem value={"fullName"}>نام و نام خانوادگی</MenuItem>
                                <MenuItem value={"nationalCode"}>کد ملی</MenuItem>
                                <MenuItem value={"phoneNumber"}>شماره تلفن</MenuItem>
                            </Select>
                            <label className="placeholder" style={{
                                top: '-10px',
                                fontSize: "0.9rem",
                                backgroundColor: '#f9f9f9',
                                color: '#2a2e32b3',
                                margin: '-0.2rem 0',
                                padding: '0 .4rem -0.4rem',
                                opacity: '1',
                            }}>براساس</label>
                        </FormControl>
                    </div>
                    <input type="text"
                           id="inputSearch"
                           placeholder="جسـتجـو..."
                           onChange={this.handleSearchInput}/>
                    <div className="search-icon"><i className="bi bi-search"></i></div>
                </div>
                <div className='result'>
                    {
                        this.state.searchLoading ?
                            [...Array(5)].map((x, i) =>
                                (
                                    <div  className="peoples-found-loading d-flex flex-md-row flex-column align-items-center justify-content-between">
                                        <div className="my-2 mx-3">
                                            <Skeleton style={{borderRadius: "50%"}} animation="wave" variant="circular" width={80} height={80} />
                                        </div>
                                        <div className="my-2">
                                            <Skeleton animation="wave" height={30} width={200}/>
                                        </div>
                                        <div className="my-2">
                                            <Skeleton animation="wave" height={30} width={200}/>
                                        </div>
                                        <div className="my-2">
                                            <Skeleton animation="wave" height={30} width={200}/>
                                        </div>
                                    </div>
                                ))
                            :
                            this.state.accountFound.map(accountFound => (
                        <Link to={accountFound.id} className='account-found-link' onClick={() => {
                            this.context.handlePersonId(accountFound.parentId, accountFound.id)
                        }}>
                            <div className="peoples-found d-flex flex-md-row flex-column justify-content-between align-items-center">

                                <div className="people-image my-2">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBnUckFxDVe5FOT5vuVfWCvWWY1pUrOPBOFPu9CNZYpABJSYPCigxy9rEc32E6mBamw3c&usqp=CAU"
                                    />
                                </div>
                                <div className="d-flex flex-row align-items-center my-2">
                                    <div className="people-item">
                                        <AiOutlineUser className='ms-2'/>
                                        نام و نام خانوادگی:
                                    </div>
                                    {accountFound.fullName}
                                </div>
                                <div className="d-flex flex-row align-items-center my-2">
                                    <div className="people-item">
                                        <BsTelephone className='ms-2'/>
                                        شماره تلفن:
                                    </div>
                                    {accountFound.phoneNumber}
                                </div>
                                <div className="d-flex flex-row align-items-center my-2">
                                    <div className="people-item">
                                        <AiOutlineBarcode className='ms-2'/>
                                        کد ملی:
                                    </div>
                                    {accountFound.nationalCode}
                                </div>
                            </div>
                        </Link>
                        ))}
                    &nbsp;
                </div>
            </>
        );
    }
    //search
    handleSearchInput = async (e) => {
        const value = e.target.value;
        this.setState({searchInput: value, searchLoading: true});
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Personnel&${this.state.searchType}=${e.target.value}`,
            {headers: {
                    'Authorization': localStorage.getItem('accessToken'),
                    'Access-Control-Allow-Origin': '*'
                }}).then(response => response.data)
            .then((data) => this.setState({
                accountFound: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Personnel&${this.state.searchType}=${e.target.value}`,
                                {headers: {
                                        'Authorization': localStorage.getItem('accessToken'),
                                        'Access-Control-Allow-Origin': '*'
                                    }}).then(response => response.data)
                                .then((data) => this.setState({
                                    accountFound: data,
                                    searchLoading: false
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Personnel&${this.state.searchType}=${e.target.value}`,
                                {headers: {
                                        'Authorization': localStorage.getItem('accessToken'),
                                        'Access-Control-Allow-Origin': '*'
                                    }}).then(response => response.data)
                                .then((data) => this.setState({
                                    accountFound: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }
}

export default SearchPersonnel;