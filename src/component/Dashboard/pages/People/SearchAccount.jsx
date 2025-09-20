import React, {Component} from 'react'
import '../../../../style/searchAccount.css'
import {AiOutlineBarcode, AiOutlineUser,AiOutlineArrowLeft} from "react-icons/ai";
import {BsTelephone} from "react-icons/bs";
import {Link} from "react-router-dom"
import BuildingContext from "../../../../contexts/Building";
import Skeleton from "react-loading-skeleton";
import FormControl from "@mui/material/FormControl";
import {Box, Button, CircularProgress, MenuItem, Select} from "@mui/material";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {red} from "@mui/material/colors";
import {MdOutlineDeleteOutline, MdOutlineModeEditOutline} from "react-icons/md";

class SearchAccount extends Component {
    static contextType = BuildingContext;

    state = {
        searchLoading: true,
        deleteLoading: false,
        placeholder: '',
        accountsFound: [],
        searchInput: "",
        searchType: "fullName",
        selectedAccount: {},
        showDeleteModal: false,
    }

    async componentDidMount() {
        this.setState({searchLoading: true})
        // const response = await fetch('https://api.saadatportal.com/api/v1/characteristic/search?parentType=Person').then((response) => response.json())
        //     .then((data) => this.setState({accountFound: data, searchLoading: false}));

        axios.get('https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                accountFound: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                            اشخاص
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
                    <div className='d-flex flex-row input-search'>
                        <input type="text"
                               id="inputSearch"
                               placeholder="جسـتجـو..."
                               onChange={(e) => {
                                   this.handleSearchInput(e)
                               }}/>
                        <div className="search-icon"><i className="bi bi-search"></i></div>
                    </div>

                </div>
                <div className='result'>
                    {
                        this.state.searchLoading ?
                            [...Array(5)].map((x, i) =>
                                (
                                    <div  className="peoples-found-loading d-flex align-items-center justify-content-between">
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
                                        <div className="my-2">
                                            <Skeleton animation="wave" height={30} width={200}/>
                                        </div>
                                    </div>
                                ))
                        :
                        this.state.accountFound.map(accountFound => (
                            <div className="peoples-found d-flex flex-md-row flex-column justify-content-between align-items-center">
                                <Link to={accountFound.id} className='account-found-link peoples-found d-flex flex-md-row flex-column justify-content-between align-items-center w-100' onClick={() => {
                                    this.context.handlePersonId(accountFound.parentId, accountFound.id)
                                }}>
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
                                    <div className="d-flex flex-row align-items-center my-2">
                                        <div className="people-item">
                                            <AiOutlineArrowLeft className='ms-2'/>
                                            نوع اقامتگر:
                                        </div>
                                        {(() => {
                                            switch (accountFound.personType) {
                                                case 'constant':
                                                    return 'اقامتگر ثابت';
                                                case 'familyGuest':
                                                    return 'بستگان درجه یک';
                                                case 'otherGuest':
                                                    return 'متفرقه';
                                            }
                                        })()}
                                    </div>
                                </Link>

                                {
                                    localStorage.getItem('role') === "MANAGER" ?
                                        <div className="d-flex flex-column align-items-center justify-content-center mx-2 my-2">
                                            <button className={"btn btn-sm btn-danger mb-2 w-100"} onClick={() => {
                                                this.setState({selectedAccount: accountFound, showDeleteModal: true})
                                            }}>
                                                <MdOutlineDeleteOutline color={red} size={15}/>
                                            </button>
                                        </div>
                                        : null
                                }
                            </div>
                    ))}
                    &nbsp;
                </div>
                <Modal
                    style={{left: "50%", translate: "-50%"}}
                    className={"w-25"}
                    centered={true}
                    show={this.state.showDeleteModal}
                    size={'xl'}
                    onHide={() => this.setState({showDeleteModal : false})}
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title>حذف شخض</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>آیا از حذف شخض {this.state.selectedAccount.fullName} مطمئن هستید؟</Modal.Body>
                    <Modal.Footer>
                        {/* Cancel button for delete account modal */}
                        <button disabled={this.state.deleteLoading} className="btn btn-light" onClick={() => {this.setState({showDeleteModal: false})}}>لغو</button>

                        {/* Confirm button for deleting account */}
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#dc3545",
                                    color: "black",
                                    ":hover": {backgroundColor: "#a52834", color: "white"}
                                }}
                                disabled={this.state.deleteLoading}
                                onClick={() => {
                                    this.handleDelete(this.state.selectedAccount.id);
                                }}
                            >
                                حذف
                            </Button>
                            {this.state.deleteLoading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: red[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    //search
    handleSearchInput = async (e) => {
        const value = e.target.value;
        this.setState({searchInput: value, searchLoading: true});
        // const response = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`).then((response) => response.json())
        //     .then((data) => this.setState({accountFound: data, searchLoading: false}));

        axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                accountFound: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
    async handleDelete(charId) {
        this.setState({deleteLoading: true})

        let respondChar = ''
        await axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${charId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                respondChar = data
            }).catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${charId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        respondChar = data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })


        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${charId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${charId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/person/${respondChar.parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/person/${respondChar.parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        this.setState({deleteLoading: false, showDeleteModal: false})
        this.componentDidMount()
    }

}

export default SearchAccount;