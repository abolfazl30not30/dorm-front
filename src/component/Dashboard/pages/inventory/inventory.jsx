import React, {Component} from "react";
import '../../../../style/inventory.css'
import {BsSearch} from "react-icons/bs";
import {AiFillCloseCircle, AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import Accordion from "react-bootstrap/Accordion";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {IoIosAddCircleOutline} from "react-icons/io";

class inventory extends Component {
    state = {
        show: false,
        inventory: [],
        typeSearch:"",
        type: "needs",
        category: [],
        name: "",
        count: "",
        selectedCategoryBoolean: true,
        selectedCategory: null,
        choices: [],
        tempChoices: [],
        showCategory: false,
        inputCategory: [],
        searchType:"name",
        searchInput:"",

    }
    async componentDidMount() {
        const response = await fetch('http://localhost:8089/api/v1/inventory').then((response) => response.json())
            .then((data) => this.setState({inventory: data}));

        const response2 = await fetch('http://localhost:8089/api/v1/category/search?type=Inventory').then((response) => response.json())
            .then((data) => this.setState({choices: data}));

    }

    render() {
        return (
            <>
                <div className="inventory">
                    <div className="title">انبار</div>
                    <button className='btn btn-add my-4' onClick={() => {
                        this.handleShow()
                    }}><AiOutlinePlus className='ms-2'/>افزودن
                    </button>
                    <div className="row align-items-center">
                        <div className="col-md-1 col-sm-1 px-3 d-flex align-items-center "><label>نوع:</label></div>
                        <div className="col-md-6 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                            <div className='input-group-filter col-6 col-md my-2 px-2'>
                                <Form.Select aria-label="Default select example" style={{height: "50px", fontSize: "14px"}}
                                             value={this.state.typeSearch} onChange={(e) => {this.handleFilterType(e)}}>
                                    <option value="">همه</option>
                                    <option value="needs">نیازمندی</option>
                                    <option value="deficiency">کاستی</option>
                                    <option value="onHand">دارایی</option>
                                </Form.Select>
                                <label className='placeholder'>نوع</label>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                        <div className="col-md-3 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                            <Form.Select aria-label="Default select example" style={{height: "50px", fontSize: "14px"}}
                                         value={this.state.searchType} onChange={(e) => {
                                this.setState({searchType: e.target.value})
                            }}>
                                <option value="name">نام</option>
                                <option value="category">دسته بندی</option>
                            </Form.Select>
                        </div>
                        <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex"
                             style={{paddingRight: "0"}}>
                            <input type="text" id="inputSearch" className="input" placeholder="جسـتوجـو"
                                   style={{padding: "6px"}} onChange={(e) => {
                                this.handleSearchInput(e)
                            }}/>

                            <button className="btn outline-secondary" onClick={this.handleSearchBtn}><BiSearch fontSize="25px" />
                            </button>
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
                                this.state.inventory.map((i) => (
                                    <tr>
                                        <td>{this.convertTypeToPersian(i.accessoryType)}</td>
                                        <td>{i.category}</td>
                                        <td>{i.accessories[0].name}</td>
                                        <td>{i.accessories[0].count}</td>
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
                        <div className="input-group-register mb-3">
                            <select className="input" onChange={(e) => {
                                this.getValueInputType(e.target.value)
                            }}>
                                <option value="needs">نیازمندی</option>
                                <option value="deficiency">کاستی</option>
                                <option value="onHand">دارایی</option>
                            </select>
                            <label className="placeholder">نوع</label>
                        </div>
                        <div>
                            <label style={{marginRight: "33px"}}>دسته بندی: </label>
                            <div style={{width: '100%'}}>
                                <Accordion defaultActiveKey="0"
                                           style={{backgroundColor: this.state.selectedCategoryBoolean ? '' : 'rgba(255, 0, 0, 0.4)'}}
                                >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            {this.state.selectedCategory}&nbsp;
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div>
                                                <div className=' row flex-wrap'>
                                                    {
                                                        this.state.selectedCategoryBoolean // ifSelected condition
                                                            ? null
                                                            : <div className="d-flex justify-content-center mb-3">
                                                                <small className="text-danger">یکی از فیلدهای زیر را اتخاب
                                                                    کنید!</small>
                                                            </div>
                                                    }
                                                    <ToggleButtonGroup
                                                        orientation="vertical"
                                                        value={this.state.selectedCategory}
                                                        exclusive
                                                        onChange={this.handleAlignment}
                                                        aria-label="text alignment"
                                                    >
                                                        {
                                                            this.state.choices.map((c) =>
                                                                <ToggleButton value={c.name} className='col'>
                                                                    {c.name}
                                                                </ToggleButton>
                                                            )
                                                        }
                                                        {
                                                            this.state.tempChoices.map((type, i) =>
                                                                <ToggleButton value={type} className='col'
                                                                              style={{display: "block"}}>
                                                                    <div className="d-flex justify-content-center"
                                                                         style={{position: "relative"}}>
                                                                        <div className="close-btn-div">
                                                                            <button className="close-btn"
                                                                                    onClick={() => {
                                                                                        this.handleDeleteCategory(i)
                                                                                    }}><AiFillCloseCircle
                                                                                color="#F1416C"/></button>
                                                                        </div>
                                                                        <div className="">{type}</div>
                                                                    </div>
                                                                </ToggleButton>
                                                            )
                                                        }
                                                        <button value="add"
                                                                onClick={() => {
                                                                    this.handleOpenCategory()
                                                                }}
                                                                className='col addTypeBtn'
                                                        >
                                                            <IoIosAddCircleOutline size={25}/>
                                                        </button>
                                                    </ToggleButtonGroup>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                        <div className='d-flex flex-row'>

                            <div className='input-group-register col-8 mb-3'>
                                <input type='text' className='input form-control' onChange={(e) => {
                                    this.getValueInputName(e.target.value)
                                }}/>
                                <label className="placeholder" style={{right: '12px'}}>نام</label>
                            </div>

                            <div className='input-group-register col-4 mb-3'>
                                <input type='number' className='input form-control' onChange={(e) => {
                                    this.getValueInputCount(e.target.value)
                                }}/>
                                <label className="placeholder" style={{right: '12px'}}>تعداد</label>
                            </div>

                        </div>
                        <button className='btn btn-record-inventory' onClick={() => {
                            this.handleRecordInventory()
                        }}>ثبت
                        </button>
                    </Modal.Body>
                </Modal>

                <Modal centered show={this.state.showCategory} onHide={() => {
                    this.handleCloseCategory()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن نوع جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <input type='text'
                               className='form-control mt-3 mb-3 input'
                               onChange={(e) => this.handleInputCategoryChange(e)} placeholder="نوع جدید"/>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={(event) => {
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
        const response2 = await fetch('http://localhost:8089/api/v1/category/search?type=Inventory').then((response) => response.json())
            .then((data) => this.setState({choices: data}));
    };
    convertTypeToPersian = (type) => {
        let value = "";
        switch(type) {
            case "needs":
                value = "نیازمندی";
                break;
            case "deficiency":
                value = "کاستی";
                break;
            case "onHand":
                value = "دارایی";
                break;
        }
        return value;
    }
    getValueInputType = (e) => {
        console.log(e);
        this.setState({type: e})
    }
    getValueInputCategory = (e) => {
        this.setState({category: e})
    }
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

    handleOpenCategory = () => {
        this.setState({showCategory: true});
        this.setState({show: false});
    }

    handleCloseCategory = () => {
        this.setState({showCategory: false});
        this.setState({show: true});
    }

    handleInputCategoryChange = (e) => {
        this.setState({inputCategory: e.target.value});
    }

    handleSubmitCategory = (e) => {
        e.preventDefault();
        let regCheck = /^\s*$/;

        if (!regCheck.test(this.state.inputType)) {
            let updateChoice = [...this.state.tempChoices];
            updateChoice.push(this.state.inputCategory);
            this.setState({tempChoices: updateChoice});
        }

        this.setState({showCategory: false});
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
        console.log(newInventory)

        const rawResponse = await fetch('http://localhost:8089/api/v1/inventory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInventory)
        });

        const response = await fetch('http://localhost:8089/api/v1/inventory').then((response) => response.json())
            .then((data) => this.setState({inventory: data}));
        this.setState({show: false})

        this.setState({type:"needs",tempChoices:[],selectedCategory:null,selectedCategoryBoolean: true})
    }

    handleSearchInput = async (e) => {
        const value = e.target.value;
        this.setState({searchInput:value});
        const response = await fetch(`http://localhost:8089/api/v1/inventory/search?${this.state.searchType}=${e.target.value}`).then((response) => response.json())
            .then((data) => this.setState({inventory: data}));
    }

    handleSearchBtn = async () => {
        console.log(this.state.searchInput)
        const response = await fetch(`http://localhost:8089/api/v1/inventory/search?${this.state.searchType}=${this.state.searchInput}`).then((response) => response.json())
            .then((data) => this.setState({inventory: data}));
    }

    handleFilterType = async (e) =>{
        this.setState({typeSearch:e.target.value})
        const response = await fetch(`http://localhost:8089/api/v1/inventory/search?accessoryType=${e.target.value}`).then((response) => response.json())
            .then((data) => this.setState({inventory: data}));
    }

}

export default inventory;