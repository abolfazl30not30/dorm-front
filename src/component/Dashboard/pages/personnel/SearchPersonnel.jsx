import React, {Component} from 'react'
import '../../../../style/searchAccount.css'
import {AiOutlineBarcode, AiOutlineUser, AiOutlinePlus} from "react-icons/ai";
import {MdOutlineDeleteOutline, MdOutlineModeEditOutline} from "react-icons/md"
import {BsTelephone} from "react-icons/bs";
import {Link, NavLink} from "react-router-dom"
import BuildingContext from "../../../../contexts/Building";
import Skeleton from "react-loading-skeleton";
import FormControl from "@mui/material/FormControl";
import {Box, Button, CircularProgress, MenuItem, Select} from "@mui/material";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {green, red} from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";

class SearchPersonnel extends Component {
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
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        newEmail: '',
        showEditModal: false,
        showCurrentPassword: false,
        showNewPassword: false,
        editField: "password"
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

                {
                    localStorage.getItem('role') === 'MANAGER'
                        ? <div className={"d-flex justify-content-start mb-3"}>
                            <NavLink to={'/dashboard/PersonnelRegister'} className='btn-done d-flex align-items-center justify-content-center my-0' onClick={() => {
                            }}><AiOutlinePlus className='ms-2'/>افزودن پرسنل
                            </NavLink>
                        </div>
                        : null
                }

                <div className="search-box justify-content-center flex-column flex-sm-row flex-md-row">
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
                    <div className={"d-flex flex-row"}>
                        <input type="text"
                               disabled={this.state.showEditModal}
                               id="inputSearch"
                               placeholder="جسـتجـو..."
                               onChange={this.handleSearchInput}/>
                        <div className="search-icon"><i className="bi bi-search"></i></div>
                    </div>
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
                                </Link>
                                {
                                    localStorage.getItem('role') === "MANAGER" ?
                                    <div className="d-flex flex-column align-items-center justify-content-center mx-2 my-2">
                                        <button className={"btn btn-sm btn-danger mb-2 w-100"} onClick={() => {
                                            this.setState({selectedAccount: accountFound, showDeleteModal: true})
                                        }}>
                                            <MdOutlineDeleteOutline color={red} size={15}/>
                                        </button>
                                        <button className={"btn-sm btn btn-warning w-100"} onClick={() => {
                                            this.setState({selectedAccount: accountFound, showEditModal: true})
                                        }}>
                                            <MdOutlineModeEditOutline color={"#ffffff"} size={15}/>
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
                        <Modal.Title>حذف پرسنل</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>آیا از حذف پرسنل {this.state.selectedAccount.fullName} مطمئن هستید؟</Modal.Body>
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
                <Modal
                    show={this.state.showEditModal}
                    onHide={() => this.setState({showEditModal: false})}
                    centered={true}
                >
                    <Modal.Header closeButton={true}>
                        <h4>تغییر اطلاعات{this.state.selectedAccount.fullName}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            {/*<FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>*/}
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={this.state.editField}
                                onChange={(e) => {
                                    this.setState({editField: e.target.value})
                                }}
                            >
                                <FormControlLabel value="password" control={<Radio />} label="تغییر گذرواژه" />
                                <FormControlLabel value="email" control={<Radio />} label="تغییر ایمیل" />
                            </RadioGroup>
                        </FormControl>
                        {
                            this.state.editField === "password" ?
                                <>
                                    <div className="input-group-register col-md-4 col-12 mt-4"
                                         style={{width: '100%'}}
                                    >
                                        <input type={this.state.showCurrentPassword ? "text" : "password"}
                                               className={`input form-control`}
                                               value={this.state.currentPassword}
                                               onChange={(e) => this.setState({currentPassword: e.target.value})}
                                               placeholder=" "
                                        />
                                        <label className="placeholder">
                                            گذرواژه فعلی
                                        </label>
                                    </div>
                                    <div className="mx-4 d-flex align-item-center">
                                        <div className={"chk-show d-flex align-items-center justify-content-center"} onClick={
                                            () => this.setState({showCurrentPassword: !this.state.showCurrentPassword})
                                        }>
                                            <input type="checkbox" checked={this.state.showCurrentPassword}/>
                                        </div>
                                        <label htmlFor="chk-show" className={"m-2"} style={{fontSize: "0.7rem", userSelect: 'none'}}>نمایش گذرواژه فعلی</label>
                                    </div>
                                    <div className="input-group-register col-md-4 col-12 mt-4"
                                         style={{width: '100%'}}
                                    >
                                        <input type={this.state.showNewPassword ? "text" : "password"}
                                               className={`input form-control`}
                                               value={this.state.newPassword}
                                               onChange={(e) => this.setState({newPassword: e.target.value})}
                                               placeholder=" "
                                        />
                                        <label className="placeholder">
                                            گذرواژه جدید
                                        </label>
                                    </div>
                                    <div className="input-group-register col-md-4 col-12 mt-2"
                                         style={{width: '100%'}}
                                    >
                                        <input type={this.state.showNewPassword ? "text" : "password"}
                                               className={`input form-control`}
                                               value={this.state.confirmNewPassword}
                                               onChange={(e) => this.setState({confirmNewPassword: e.target.value})}
                                               placeholder=" "
                                        />
                                        <label className="placeholder">
                                            تکرار گذرواژه جدید
                                        </label>
                                    </div>
                                    <div className="mx-4 d-flex align-item-center">
                                        <div className={"chk-show d-flex align-items-center justify-content-center"} onClick={
                                            () => this.setState({showNewPassword: !this.state.showNewPassword})
                                        }>
                                            <input type="checkbox" checked={this.state.showNewPassword}/>
                                        </div>
                                        <label htmlFor="chk-show" className={"m-2"} style={{fontSize: "0.7rem", userSelect: 'none'}}>نمایش گذرواژه جدید</label>
                                    </div>

                                </>
                                :
                                <div className="input-group-register col-md-4 col-12 mt-4"
                                     style={{width: '100%'}}
                                >
                                    <input type={"text"}
                                           className={`input form-control`}
                                           value={this.state.newEmail}
                                           onChange={(e) => this.setState({newEmail: e.target.value})}
                                           placeholder=" "
                                    />
                                    <label className="placeholder">
                                        ایمیل جدید
                                    </label>
                                </div>

                        }
                            </Modal.Body>
                    <Modal.Footer>
                        {/* Submit button for edit detail modal */}
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#20d489",
                                    color: "black",
                                    ":hover": {backgroundColor: "#198754", color: "white"}
                                }}
                                disabled={this.state.deleteLoading}
                                onClick={() => this.changeDetail()}
                            >
                                ثبت
                            </Button>
                            {this.state.deleteLoading && (
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

                        {/* Close button for submitting edit detail */}
                        <button disabled={this.state.deleteLoading} className="btn btn-light" onClick={() => this.setState({showEditModal : false})}>بستن</button>
                    </Modal.Footer>
                </Modal>

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

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/personnel/${respondChar.parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.delete(`https://api.saadatportal.com/api/v1/supervisor/personnel/${respondChar.parentId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        this.setState({deleteLoading: false, showDeleteModal: false})
        this.componentDidMount()
    }

    async changeDetail() {
        this.setState({deleteLoading: true})
        console.log(123)
        if (this.state.editField === "password") {
            console.log(345)
            const body = {
                username: this.state.selectedAccount.fullName,
                oldPassword: this.state.currentPassword,
                newPassword: this.state.newPassword,
                role: "SUPERVISOR"
            }
            await axios.post(`https://api.saadatportal.com/api/v1/changePassword`, body, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .catch(() => {
                        if (localStorage.getItem('role') === 'MANAGER') {
                            axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                .then((response) => {
                                    if (response.headers["accesstoken"]) {
                                        localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                        axios.post(`https://api.saadatportal.com/api/v1/changePassword`, body, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    } else {
                                        window.location = '/'
                                    }
                                })
                        }
                    }
                )
        } else {
            const body = {
                username: this.state.selectedAccount.fullName,
                email: this.state.newEmail,
                role: "SUPERVISOR"
            }
            await axios.post(`https://api.saadatportal.com/api/v1/changePassword`, body, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .catch(() => {
                        if (localStorage.getItem('role') === 'MANAGER') {
                            axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                                .then((response) => {
                                    if (response.headers["accesstoken"]) {
                                        localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                        axios.post(`https://api.saadatportal.com/api/v1/changePassword`, body, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    } else {
                                        window.location = '/'
                                    }
                                })
                        }
                    }
                )
        }
        this.setState({deleteLoading: false})
    }
}

export default SearchPersonnel;