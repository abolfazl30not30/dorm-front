import React, {Component} from "react";
import '../../../../style/inventory.css'
import {AiFillCloseCircle, AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import Accordion from "react-bootstrap/Accordion";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {IoIosAddCircleOutline} from "react-icons/io";
import './../../../../style/requestPage.css'
import Skeleton from "react-loading-skeleton";
import {Box, Button, CircularProgress, IconButton, MenuItem, Select} from "@mui/material";
import {green} from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import {IoAddOutline} from "react-icons/io5";

class inventory extends Component {
    state = {
        AddTypeLoading: false,
        searchLoading: true,
        loading: false,
        show: false,
        showAddType: false,
        inventory: [],
        typeSearch: "all",
        type: "needs",
        categories: [],
        tempCategories: [],
        name: "",
        count: "",
        selectedCategoryBoolean: true,
        selectedCategory: null,
        types: [],
        tempTypes: [],
        choices: [],
        tempChoices: [],
        showCategory: false,
        searchType: "name",
        searchInput: "",
        tmpTypeInput: "",
        tmpCategoryInput: '',
    }

    async componentDidMount() {
        this.setState({searchLoading: true})
        axios.get('https://api.saadatportal.com/api/v1/supervisor/inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                inventory: data,
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    inventory: data,
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    inventory: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                choices: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    choices: data,
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    choices: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=InventoryAccessoryType', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                types: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=InventoryAccessoryType', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    types: data,
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=InventoryAccessoryType', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    types: data,
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
                <div className="inventory">
                    <div className="title">انبار</div>
                    <button className='btn-done my-4' onClick={() => {
                        this.handleShow()
                    }}><AiOutlinePlus className='ms-2'/>افزودن
                    </button>
                    <div className="search-box">
                        <div className="form-floating">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '8rem', backgroundColor: "#f9f9f9"}}
                                    id="select-field"
                                    value={this.state.typeSearch}
                                    onChange={this.handleFilterType}>
                                    <MenuItem value={"all"}>همه</MenuItem>
                                    <MenuItem value={"needs"}>نیازمندی</MenuItem>
                                    <MenuItem value={"deficiency"}>کاستی</MenuItem>
                                    <MenuItem value={"onHand"}>دارایی</MenuItem>
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0',
                                    padding: '0 .4rem -0.4rem',
                                    opacity: '1',
                                }}>نوع</label>
                            </FormControl>
                        </div>
                        <div className="form-floating">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '8rem', backgroundColor: "#f9f9f9"}}
                                    id="select-field"
                                    value={this.state.searchType}
                                    onChange={(value) => this.setState({searchType: value.target.value})}>
                                    <MenuItem value={"name"}>نام</MenuItem>
                                    <MenuItem value={"category"}>دسته بندی</MenuItem>
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
                        <div className="d-flex flex-row input-search">
                            <input type="text"
                                   id="inputSearch"
                                   placeholder="جسـتجـو..."
                                   onChange={(e) => {
                                       this.handleSearchInput(e)
                                   }}/>
                            <div className="search-icon"><i className="bi bi-search"></i></div>
                        </div>

                    </div>
                    <div className="table-box">
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>نوع</th>
                                <th>دسته بندی</th>
                                <th>نام</th>
                                <th>تعداد</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.searchLoading ?
                                    [...Array(5)].map((x, i) =>
                                        <tr>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={20} width="100%" /></td>
                                        </tr>
                                    )
                                    :
                                    this.state.inventory.map((x, i)  => (
                                        <tr key={i}>
                                            <td>{x.accessoryType}</td>
                                            <td>{x.category}</td>
                                            {
                                                x.accessories.length !== 0
                                                    ?
                                                    <>
                                                        <td>{x.accessories[0].name}</td>
                                                        <td>{x.accessories[0].count}</td>
                                                    </>
                                                    : null
                                            }
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal className='report-modal' centered show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title><span>ثبت انبار</span></Modal.Title>
                        <button className='btn' onClick={() => {
                            this.handleClose()
                        }}><AiOutlineClose/></button>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<div className="input-group-register mb-3">*/}
                        {/*    <select className='input'*/}
                        {/*            style={{border: this.context.specificValidations.personnelFieldsValidation.type_requiredReg === false ? '2px solid red' : ''}}*/}
                        {/*            value={this.context.personnelFields.type}*/}
                        {/*            onChange={(e) =>  this.context.handleFields(e.target.value, 'personnelFields', 'type')}*/}
                        {/*    >*/}
                        {/*        <option selected="selected" value={''}/>*/}
                        {/*        {*/}
                        {/*            this.state.types.map((t, index) => (*/}
                        {/*                <option value={t.name}>{t.name}</option>*/}
                        {/*            ))*/}
                        {/*        }*/}
                        {/*        {*/}
                        {/*            this.state.names.map((t, index) => (*/}
                        {/*                <option value={t}>{t}</option>*/}
                        {/*            ))*/}
                        {/*        }*/}
                        {/*    </select>*/}
                        {/*    <label className="placeholder">*/}
                        {/*        نوع*/}
                        {/*        <span style={{color: 'red'}}>*</span>*/}
                        {/*    </label>*/}
                        {/*    {*/}
                        {/*        this.context.specificValidations.personnelFieldsValidation.type_requiredReg === false*/}
                        {/*            ? <small className="text-danger">لطفا نوع را انتخاب کنید!</small>*/}
                        {/*            : null*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <div className="input-group-register mb-3 d-flex">
                            <FormControl className={"w-100"} style={{border: "none"}}>
                                <Select
                                    sx={{ height: 50, borderRadius: "0.5rem", minWidth: '8rem', backgroundColor: "#fff"}}
                                    id="select-field"
                                    onChange={(e) => this.setState({type: e.target.value})}>
                                    {
                                        this.state.types.map((type) => (
                                            <MenuItem value={type.name}>{type.name}</MenuItem>
                                        ))
                                    }
                                    {
                                        this.state.tempTypes.map((type) => (
                                            <MenuItem value={type}>{type}</MenuItem>
                                        ))
                                    }
                                    {/*<MenuItem value={"needs"}>نیازمندی</MenuItem>*/}
                                    {/*<MenuItem value={"deficiency"}>کاستی</MenuItem>*/}
                                    {/*<MenuItem value={"onHand"}>دارایی</MenuItem>*/}
                                </Select>
                                <label className="placeholder" style={{
                                    top: '-10px',
                                    fontSize: "0.9rem",
                                    backgroundColor: '#fff',
                                    color: '#2a2e32b3',
                                    margin: '-0.2rem 0',
                                    padding: '0 .4rem -0.4rem',
                                    opacity: '1',
                                }}>نوع</label>
                            </FormControl>
                            <div className="col-md-1 col-2 d-flex align-item-center">
                                <IconButton color="primary" onClick={() => {
                                    this.handleOpenType();

                                    // console.log(this.state.names);
                                    // this.handleAddType();
                                }}>
                                    <IoAddOutline size={30} width={'50%'} height={'50%'}/>
                                </IconButton>
                            </div>
                        </div>
                        <div>
                            {
                                this.state.selectedCategoryBoolean // ifSelected condition
                                    ? null
                                    : <div className="d-flex justify-content-center mb-3">
                                        <small className="text-danger">یکی از فیلدهای زیر را اتخاب
                                            کنید!</small>
                                    </div>
                            }
                            <div className="input-group-register mb-3 d-flex">
                                <FormControl className={"w-100"} style={{border: "none"}}>
                                    <Select
                                        sx={{ height: 50, borderRadius: "0.5rem", minWidth: '8rem', backgroundColor: "#fff"}}
                                        id="select-field"
                                        onChange={(e) => this.setState({selectedCategory: e.target.value})}>
                                        {
                                            this.state.categories.map((category) => (
                                                <MenuItem value={category.name}>{category.name}</MenuItem>
                                            ))
                                        }
                                        {
                                            this.state.tempCategories.map((category) => (
                                                <MenuItem value={category}>{category}</MenuItem>
                                            ))
                                        }

                                        {/*<MenuItem value={"needs"}>نیازمندی</MenuItem>*/}
                                        {/*<MenuItem value={"deficiency"}>کاستی</MenuItem>*/}
                                        {/*<MenuItem value={"onHand"}>دارایی</MenuItem>*/}
                                    </Select>
                                    <label className="placeholder" style={{
                                        top: '-10px',
                                        fontSize: "0.9rem",
                                        backgroundColor: '#fff',
                                        color: '#2a2e32b3',
                                        margin: '-0.2rem 0',
                                        padding: '0 .4rem -0.4rem',
                                        opacity: '1',
                                    }}>دسته بندی</label>
                                </FormControl>
                                <div className="col-md-1 col-2 d-flex align-item-center">
                                    <IconButton color="primary" onClick={() => {
                                        this.handleOpenCategory();

                                        // console.log(this.state.names);
                                        // this.handleAddType();
                                    }}>
                                        <IoAddOutline size={30} width={'50%'} height={'50%'}/>
                                    </IconButton>
                                </div>
                                {/*<Accordion defaultActiveKey="0"*/}
                                {/*           style={{backgroundColor: this.state.selectedCategoryBoolean ? '' : 'rgba(255, 0, 0, 0.4)'}}*/}
                                {/*>*/}
                                {/*    <Accordion.Item eventKey="0">*/}
                                {/*        <Accordion.Header>*/}
                                {/*            {this.state.selectedCategory}&nbsp;*/}
                                {/*        </Accordion.Header>*/}
                                {/*        <Accordion.Body>*/}
                                {/*            <div>*/}
                                {/*                <div className=' row flex-wrap'>*/}
                                {/*                    {*/}
                                {/*                        this.state.selectedCategoryBoolean // ifSelected condition*/}
                                {/*                            ? null*/}
                                {/*                            : <div className="d-flex justify-content-center mb-3">*/}
                                {/*                                <small className="text-danger">یکی از فیلدهای زیر را اتخاب*/}
                                {/*                                    کنید!</small>*/}
                                {/*                            </div>*/}
                                {/*                    }*/}
                                {/*                    <ToggleButtonGroup*/}
                                {/*                        orientation="vertical"*/}
                                {/*                        value={this.state.selectedCategory}*/}
                                {/*                        exclusive*/}
                                {/*                        onChange={this.handleAlignment}*/}
                                {/*                        aria-label="text alignment"*/}
                                {/*                    >*/}
                                {/*                        {*/}
                                {/*                            this.state.choices.map((c) =>*/}
                                {/*                                <ToggleButton value={c.name} className='col'>*/}
                                {/*                                    {c.name}*/}
                                {/*                                </ToggleButton>*/}
                                {/*                            )*/}
                                {/*                        }*/}
                                {/*                        {*/}
                                {/*                            this.state.tempChoices.map((type, i) =>*/}
                                {/*                                <ToggleButton value={type} className='col'*/}
                                {/*                                              style={{display: "block"}}>*/}
                                {/*                                    <div className="d-flex justify-content-center"*/}
                                {/*                                         style={{position: "relative"}}>*/}
                                {/*                                        <div className="close-btn-div">*/}
                                {/*                                            <button className="close-btn"*/}
                                {/*                                                    onClick={() => {*/}
                                {/*                                                        this.handleDeleteCategory(i)*/}
                                {/*                                                    }}><AiFillCloseCircle*/}
                                {/*                                                color="#F1416C"/></button>*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className="">{type}</div>*/}
                                {/*                                    </div>*/}
                                {/*                                </ToggleButton>*/}
                                {/*                            )*/}
                                {/*                        }*/}
                                {/*                        <button value="add"*/}
                                {/*                                onClick={() => {*/}
                                {/*                                    this.handleOpenCategory()*/}
                                {/*                                }}*/}
                                {/*                                className='col addTypeBtn'*/}
                                {/*                        >*/}
                                {/*                            <IoIosAddCircleOutline size={25}/>*/}
                                {/*                        </button>*/}
                                {/*                    </ToggleButtonGroup>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </Accordion.Body>*/}
                                {/*    </Accordion.Item>*/}
                                {/*</Accordion>*/}
                            </div>
                        </div>
                        <div className='d-flex flex-row'>

                            <div className='input-group-register col-8 mb-3'>
                                <input type='text' className='input form-control' onChange={(e) => {
                                    this.getValueInputName(e.target.value)
                                }}/>
                                <label className="placeholder" style={{right: '12px'}}>نام کالا</label>
                            </div>

                            <div className='input-group-register col-4 mb-3'>
                                <input type='number' className='input form-control' onChange={(e) => {
                                    this.getValueInputCount(e.target.value)
                                }}/>
                                <label className="placeholder" style={{right: '12px'}}>تعداد</label>
                            </div>

                        </div>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                className={"buttonDone w-100"}
                                variant="contained"
                                disabled={this.state.loading}
                                onClick={() => {
                                    this.handleRecordInventory().then(r => {})
                                }}
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

                <Modal centered={true} show={this.state.showAddType} onHide={this.handleCloseType}>
                    <Modal.Header closeButton={true}>
                        اضافه کردن نوع
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className={`input form-control`}
                            onChange={(e) => this.setState({tmpTypeInput : e.target.value})}
                            placeholder='نوع'
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-success" onClick={(event) => {
                            this.handleSubmitType(event);
                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
                            this.setState({showAddTypeModal: false})
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showCategory} onHide={() => {
                    this.handleCloseCategory()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن دسته بندی</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <input type='text'
                               className='form-control mt-3 mb-3 input'
                               onChange={(e) => this.setState({tmpCategoryInput: e.target.value})} placeholder="دسته بندی جدید"/>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn-done" onClick={(event) => {
                            this.handleSubmitCategory(event)
                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
                            this.handleCloseCategory()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleClose = () => {
        this.setState({show: false})
    };
    handleShow = async () => {
        this.setState({show: true})
        axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                choices: data,
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    choices: data,
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
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/category/search?type=Inventory', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    choices: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    };

    // convertTypeToPersian = (type) => {
    //     let value = "";
    //     switch(type) {
    //         case "needs":
    //             value = "نیازمندی";
    //             break;
    //         case "deficiency":
    //             value = "کاستی";
    //             break;
    //         case "onHand":
    //             value = "دارایی";
    //             break;
    //     }
    //     return value;
    // }

    getValueInputName = (e) => {
        this.setState({name: e})
    }

    getValueInputCount = (e) => {
        this.setState({count: e})
    }

    handleAlignment = (event, newAlignment) => {
        this.setState({selectedCategory: newAlignment});

    }

    handleValidations = () => {
        let selectedCategoryBoolean = this.state.selectedCategoryBoolean !== null;
        console.log(selectedCategoryBoolean)

        let newValidations = {...this.state.selectedCategoryBoolean};
        newValidations.selectedTypeBoolean = selectedCategoryBoolean;


        this.setState({selectedCategoryBoolean: newValidations});

        return selectedCategoryBoolean;
    }

    handleDeleteCategory = (index) => {
        let updateChoice = [...this.state.tempChoices];
        updateChoice.splice(index, 1);
        this.setState({tempChoices: updateChoice});
    }

    handleOpenType = () => {
        this.setState({showAddType: true});
        this.setState({show: false});
    }

    handleCloseType = () => {
        this.setState({showAddType: false});
        this.setState({show: true});
    }

    handleAddType() {
        this.setState({AddTypeLoading: true})

    }

    handleOpenCategory = () => {
        this.setState({showCategory: true});
        this.setState({show: false});
    }

    handleCloseCategory = () => {
        this.setState({showCategory: false});
        this.setState({show: true});
    }

    handleSubmitCategory = (e) => {
        e.preventDefault();
        let regCheck = /^\s*$/;

        if (!regCheck.test(this.state.tmpCategoryInput)) {
            let updatedChoices = [...this.state.tempCategories];
            if (!updatedChoices.includes(this.state.tmpCategoryInput)) {
                updatedChoices.push(this.state.tmpCategoryInput);
                this.setState({tempCategories: updatedChoices});
            }
        }

        this.setState({showCategory: false});
        this.setState({show: true});
    }

    handleSubmitType = (e) => {
        e.preventDefault();
        let regCheck = /^\s*$/;

        if (!regCheck.test(this.state.tmpTypeInput)) {
            let updatedChoices = [...this.state.tempTypes];
            if (!updatedChoices.includes(this.state.tmpTypeInput)) {
                updatedChoices.push(this.state.tmpTypeInput);
                this.setState({tempTypes: updatedChoices});
            }
        }

        this.setState({showAddType: false});
        this.setState({show: true});
    }

    handleRecordInventory = async () => {
        const newInventory = {
            category: this.state.selectedCategory,
            accessoryType: this.state.type,
            accessories: [
                {
                    name: this.state.name,
                    count: this.state.count
                }
            ]

        }
        this.setState({loading: true})
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/inventory', newInventory, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                loading: false
            })).catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.post('https://api.saadatportal.com/api/v1/supervisor/inventory', newInventory, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        loading: false
                                    }))
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.post('https://api.saadatportal.com/api/v1/supervisor/inventory', newInventory, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => this.setState({
                                        loading: false
                                    }))
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.setState({show: false})

        this.setState({type:"needs",tempChoices:[],selectedCategory:null,selectedCategoryBoolean: true});

        this.componentDidMount()

    }

    handleSearchInput = async (e) => {
        const value = e.target.value;
        this.setState({searchInput: value, searchLoading: true});
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/inventory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                inventory: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/inventory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    inventory: data,
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/inventory/search?${this.state.searchType}=${e.target.value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    inventory: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    handleFilterType = async (e) =>{
        this.setState({typeSearch: e.target.value, searchLoading: true})
        const value = e.target.value !== "all" ? e.target.value : ""
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/inventory/search?accessoryType=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                inventory: data,
                searchLoading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/inventory/search?accessoryType=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    inventory: data,
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
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/inventory/search?accessoryType=${value}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    inventory: data,
                                    searchLoading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }
}

export default inventory;