import React, {Component} from "react";
import '../../../../style/contacts.css'
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import {Box, Button, CircularProgress, MenuItem, Select} from "@mui/material";
import {green} from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

class contacts extends Component {
    state = {
        searchLoading: true,
        loading :false,
        contacts: [],
        show: false,
        inputTelephone: [],
        inputMobile: [],
        name: [],
        telephoneNumbers: [],
        mobileNumbers: [],
        searchType:"name",
    }

    async componentDidMount() {
        axios.get('https://api.saadatportal.com/api/v1/supervisor/phoneBook', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                contacts: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/phoneBook', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    contacts: data,
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/phoneBook', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    contacts: data,
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
                <div className="contact">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div className="title">دفترچه تلفن</div>
                        <button className='btn-done my-4' onClick={() => {
                            this.handleShow()
                        }}><AiOutlinePlus className='ms-2'/>افزودن مخاطب
                        </button>
                    </div>
                    <div className="search-box d-flex justify-content-center">
                        <div className="form-floating">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#f9f9f9"}}
                                    id="select-field"
                                    value={this.state.searchType}
                                    onChange={(value) => this.setState({searchType: value.target.value})}>
                                    <MenuItem value={"name"}>نام و نام خانوادگی</MenuItem>
                                    <MenuItem value={"mobileNumbers"}>شماره همراه</MenuItem>
                                    <MenuItem value={"telephoneNumbers"}>تلفن ثابت</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
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
                    <div className="table-box">
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>نام و نام خانوادگی</th>
                                <th>تلفن همراه</th>
                                <th>تلفن ثابت</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.searchLoading ?
                                [...Array(5)].map(() =>
                                    <tr>
                                        <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                        <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                        <td><Skeleton animation="wave" height={23} width="100%" /></td>
                                    </tr>
                                )
                                :
                                this.state.contacts.map((i) => (
                                    <tr>
                                        <td>{i.name}</td>
                                        <td >{i.mobileNumbers.map((num)=>(<div className="mb-2">{num}</div>))}</td>
                                        <td>{i.telephoneNumbers.map((num)=>(<div className="mb-2">{num}</div>))}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal className='report-modal' centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title><span>ثبت مخاطب</span></Modal.Title>
                        <button className='btn' onClick={() => {
                            this.handleClose()
                        }}><AiOutlineClose/></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='input-group-register mb-3'>
                            <input type='text' className='input form-control' onChange={(e) => {
                                this.getValueInputName(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>نام و نام خانوادگی</label>
                        </div>

                        <div className='input-group-register mb-3'>
                            <input type='text' className='input form-control' onChange={(e) => {
                                this.getValueInputTelephone(e.target.value,0)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>تلفن ثابت</label>
                        </div>

                        {
                            this.state.inputTelephone.map((telephone, index) => (
                                <div className='input-group-register mb-3'>
                                    <AiOutlineClose className='btn-delete-input' onClick={() => {this.deleteInputTelephone(index)}}/>
                                    <input type='text' className='input form-control' onChange={(e) => {
                                        this.getValueInputTelephone(e.target.value, index+1)
                                    }}/>
                                    <label className="placeholder" style={{right: '12px'}}>تلفن ثابت</label>
                                </div>
                            ))
                        }
                        <div className="add-input-contact mb-3" onClick={() => {
                            this.addInputTelephoneNumbers()
                        }}>
                            <AiOutlinePlus className='ms-2'/>
                        </div>
                        <div className='input-group-register mb-3'>
                            <input type='text' className='input form-control' onChange={(e) => {
                                this.getValueInputMobile(e.target.value,0)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>تلفن همراه</label>
                        </div>
                        {
                            this.state.inputMobile.map((mobile, index) => (
                                <div className='input-group-register mb-3'>
                                    <AiOutlineClose className='btn-delete-input' onClick={() => {this.deleteInputMobile(index)}}/>
                                    <input type='text' className='input form-control' onChange={(e) => {
                                        this.getValueInputMobile(e.target.value, index+1)
                                    }}/>
                                    <label className="placeholder" style={{right: '12px'}}>تلفن همراه</label>
                                </div>
                            ))
                        }
                        <div className="add-input-contact mb-3" onClick={() => {
                            this.addInputMobileNumbers()
                        }}>
                            <AiOutlinePlus className='ms-2'/>
                        </div>

                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone w-100"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={this.handleRecordContact}
                            >
                                ثبت
                            </Button>
                            {this.state.loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    handleSearchInput = async (e) => {
        this.setState({searchLoading: true})
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/phoneBook/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                contacts: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/phoneBook/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    contacts: data,
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/phoneBook/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    contacts: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    handleClose = () => {
        this.setState({show: false})
    };

    handleShow = () => {
        this.setState({show: true})
    }

    addInputTelephoneNumbers = () => {
        const newInputTelephone = this.state.inputTelephone.concat(
            ""
        )
        this.setState({inputTelephone: newInputTelephone});
    }

    addInputMobileNumbers = () => {
        const newInputMobile = this.state.inputMobile.concat(
            ""
        )
        this.setState({inputMobile: newInputMobile});
    }

    getValueInputName = (e) => {
        this.setState({name: e})
    }
    getValueInputTelephone = (e, index) => {
        const updateTelephone = [...this.state.telephoneNumbers];
        updateTelephone[index] = e;
        this.setState({telephoneNumbers: updateTelephone});
    }

    getValueInputMobile = (e, index) => {
        const updateMobile = [...this.state.mobileNumbers];
        updateMobile[index] = e;
        this.setState({mobileNumbers: updateMobile});
    }

    deleteInputTelephone = (i) => {
        const updateInputsTelephone = [...this.state.inputTelephone];
        updateInputsTelephone.splice(i,1)
        this.setState({inputTelephone: updateInputsTelephone});
    }

    deleteInputMobile = (i) => {
        const updateInputsMobile = [...this.state.inputMobile];
        updateInputsMobile.splice(i,1);
        this.setState({inputMobile: updateInputsMobile});
    }

    handleRecordContact = async () => {
        const newContact = {
            name: this.state.name,
            telephoneNumbers : this.state.telephoneNumbers,
            mobileNumbers: this.state.mobileNumbers
        }
        this.setState({loading: true})
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/phoneBook', newContact, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                loading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/phoneBook', newContact, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
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
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/phoneBook', newContact, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})

        this.setState({show: false});
        this.setState({inputTelephone:[]});
        this.setState({inputMobile:[]});
        this.setState({telephoneNumbers:[]});
        this.setState({mobileNumbers:[]});

        this.componentDidMount()
    }


}

export default contacts;