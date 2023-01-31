import React, {Component} from 'react';
import "../../style/header.css";
import MainContext from '../../contexts/ContextProvider';
import Dropdown from 'react-bootstrap/Dropdown';
import {BsPerson, BsPersonPlus} from "react-icons/bs"
import {IoMdExit} from "react-icons/io"
import {GoTasklist} from "react-icons/go"
import {AiOutlineHome} from "react-icons/ai";
import {MdSettings} from "react-icons/md";
import {MdOutlineInventory, MdOutlineModeEditOutline} from "react-icons/md"
import {NavLink, Link} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {Box, Button, CircularProgress} from "@mui/material";
import {green} from "@mui/material/colors";
import axios from "axios";

class Header extends Component {
    static contextType = MainContext;
    state = {
        editLoading: false,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        newEmail: '',
        showEditModal: false,
        showCurrentPassword: false,
        showNewPassword: false,
        editField: "password",
        activeStyle: {
            textDecoration: "underline",
        },
        activeClassName: "underline"
    }

    render() {
        return (
            <>
                <div className='header'>
                    <div className="d-flex align-item-center">
                        <button className='btn' onClick={() => {
                            this.context.handleSidebar()
                        }}><i className="bi bi-list"></i></button>
                        <ul className="d-flex navbar">
                            <li className='navbar-item'>
                                <NavLink
                                    activeClassName='active-header' to="/dashboard" replace={true} className='sidenav-link' end>
                                    <AiOutlineHome style={{paddingLeft: "7px"}} font-size="20px"/>
                                    خانه
                                </NavLink>
                            </li>
                            <li className='navbar-item'>
                                <NavLink activeClassName='active-header' to="/dashboard/Register"
                                         className='sidenav-link'>
                                    <BsPersonPlus style={{paddingLeft: "7px"}} font-size="20px"/>
                                    پذیرش
                                </NavLink>
                            </li>
                            <li className='navbar-item'>
                                <NavLink activeClassName='active-header' to="/dashboard/People"
                                         className='sidenav-link'>
                                    <BsPerson style={{paddingLeft: "7px"}} font-size="20px"/>
                                    اشخاص
                                </NavLink>
                            </li>
                            <li className='navbar-item'>
                                <NavLink activeClassName='active-header' to="/dashboard/booking/floor"
                                         className='sidenav-link'>
                                    <MdOutlineInventory style={{paddingLeft: "7px"}} font-size="20px"/>
                                    موجودی و ظرفیت
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle className="profile-dropdown" id="dropdown-basic">
                                <div className="profile-img-container d-flex align-items-center">
                                    <button className="none-btn">
                                        <img className="profile-img"
                                             src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                             alt="profile"/>
                                    </button>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{
                                zIndex: "100",
                                width: "250px",
                                textAlign: "right",
                                borderRadius: "20px",
                                border: "none",

                                padding: "12px",
                                boxShadow: "0px 0px 4px 0px #0000004d"
                            }}>
                                <div className="dropdown-items">
                                    <Link to="/dashboard">
                                        <div className="d-flex align-items-center px-3 py-1 sidebar-profile">
                                            <div className="sidebar-profile-img">
                                                <img className="profile-img"
                                                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                     alt="profile"/>
                                            </div>
                                            <div className="d-flex flex-column justify-content-center mx-3">
                                                <h6>
                                                    {localStorage.getItem("role") === "MANAGER" ?
                                                    "مدیر" :
                                                        localStorage.getItem('username')
                                                    }
                                                </h6>
                                                {
                                                    localStorage.getItem('role') === "SUPERVISOR"
                                                        ?
                                                        <p onClick={() => {
                                                            window.location = `/personnel/${localStorage.getItem('id')}`
                                                        }}>
                                                            مشاهده پروفایل
                                                        </p>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="dropdown-items">
                                    <Link to="/dashboard/taskManagement">
                                        <GoTasklist/>
                                        <span>مشاهده وظایف</span>
                                    </Link>
                                </div>
                                <div className="dropdown-items">
                                    <Link to="/dashboard/setting">
                                        <MdSettings/>
                                        <span>تنظیمات</span>
                                    </Link>
                                </div>
                                {
                                    localStorage.getItem('role') === "MANAGER"
                                        ?
                                        <div className={"dropdown-items"} onClick={() => {
                                            this.setState({showEditModal: true})
                                        }}>
                                            <MdOutlineModeEditOutline/>
                                            <span>تغییر اطلاعات</span>
                                        </div>
                                        :
                                        null
                                }
                                <div className="dropdown-items">
                                    <Link to="/" onClick={() => {
                                        localStorage.removeItem('role')
                                        localStorage.removeItem('id')
                                        localStorage.removeItem('fullName')
                                        localStorage.removeItem('accessToken')
                                        localStorage.removeItem('refreshToken')
                                    }}>
                                        <IoMdExit/>
                                        <span>خروج</span>
                                    </Link>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <Modal
                    show={this.state.showEditModal}
                    onHide={() => this.setState({showEditModal: false})}
                    centered={true}
                >
                    <Modal.Header closeButton={true}>
                        <h4>تغییر اطلاعات مدیر</h4>
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
                                disabled={this.state.editLoading}
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
                        <button disabled={this.state.editLoading} className="btn btn-light" onClick={() => this.setState({showEditModal : false})}>بستن</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    async changeDetail() {
        this.setState({editLoading: true})
        console.log(123)
        if (this.state.editField === "password") {
            console.log(345)
            const body = {
                username: localStorage.getItem('username'),
                oldPassword: this.state.currentPassword,
                newPassword: this.state.newPassword,
                role: "MANAGER"
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
                username: localStorage.getItem('username'),
                email: this.state.newEmail,
                role: "MANAGER"
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
        this.setState({
            editLoading: false,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            newEmail: '',
            showEditModal: false,
            showCurrentPassword: false,
            showNewPassword: false,
            editField: "password",
        })
    }

}


export default Header;