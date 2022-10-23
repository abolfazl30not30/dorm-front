import React, {Component} from "react";
import '../../../../style/inventory.css'
import {BsSearch} from "react-icons/bs";
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";

class inventory extends Component {
    state = {
        show: false,
        inventory: [
            {
                "id": "c9b75819a41b43e08c78cf5662e52c35",
                "accessories": [
                    {
                        "id": "43b1b71031fc4b2a895b34d0bfc17ef1",
                        "name": "پریز",
                        "count": 13,
                        "description": null
                    },
                    {
                        "id": "7c260b31b2754d8db301f403064a0668",
                        "name": "دو شاخه",
                        "count": 20,
                        "description": null
                    },
                    {
                        "id": "edf16db654f7455c9f71ac09adabf2ea",
                        "name": "سه راهی",
                        "count": 40,
                        "description": null
                    }
                ],
                "accessoryType": "onHand",
                "category": "تاسیسات"
            },
            {
                "id": "c9b75819a41b43e08c78cf5662e52c35",
                "accessories": [

                    {
                        "id": "43b1b71031fc4b2a895b34d0bfc17ef1",
                        "name": "پریز",
                        "count": 13,
                        "description": null
                    },
                    {
                        "id": "7c260b31b2754d8db301f403064a0668",
                        "name": "دو شاخه",
                        "count": 20,
                        "description": null
                    },
                    {
                        "id": "edf16db654f7455c9f71ac09adabf2ea",
                        "name": "سه راهی",
                        "count": 40,
                        "description": null
                    }

                ],
                "accessoryType": "onHand",
                "category": "تاسیسات"
            }
        ],
        type: [],
        name: [],
        count: []

    }


    /*async componentDidMount() {
        const response = await fetch('http://api.saadatportal.com/api/v1/inventory').then((response) => response.json())
            .then((data) => this.setState({inventory: data}));
    }*/

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
                        <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                        <div className="col-md-3 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                            <Form.Select aria-label="Default select example" style={{height: "50px", fontSize: "14px"}}
                                         value={this.state.searchType} onChange={(e) => {
                                this.setState({searchType: e.target.value})
                            }}>
                                <option value="fullName">نام</option>
                                <option value="nationalCode">نوع</option>
                            </Form.Select>
                        </div>
                        <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex"
                             style={{paddingRight: "0"}}>
                            <input type="text" id="inputSearch" className="input" placeholder="جسـتوجـو"
                                   style={{padding: "6px"}} onChange={(e) => {
                                this.handleSearchInput(e)
                            }}/>
                            <button className="btn outline-secondary"><BiSearch fontSize="25px"
                                                                                onClick={this.handleSearchBtn}/>
                            </button>
                        </div>
                    </div>
                    <div className="table-box">
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>نوع</th>
                                <th>نام</th>
                                <th>تعداد</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.inventory.map((i) => (
                                    <tr>
                                        <td>
                                            {i.accessoryType}
                                        </td>
                                        <td>test</td>
                                        <td>test</td>
                                        {/*{i.accessories.map((acc) => (
                                            console.log(acc.name)
                                        ))}*/}
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
                                <option value="deficiency">نیازمندی</option>
                                <option value="needs">کاستی</option>
                                <option value="onHand">دارایی</option>
                            </select>
                            <label className="placeholder">نوع</label>
                        </div>
                        <div className='input-group-register mb-3'>
                            <input type='text' className='input form-control' onChange={(e) => {
                                this.getValueInputName(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>نام</label>
                        </div>
                        <div className='input-group-register mb-3'>
                            <input type='number' className='input form-control' onChange={(e) => {
                                this.getValueInputCount(e.target.value)
                            }}/>
                            <label className="placeholder" style={{right: '12px'}}>تعداد</label>
                        </div>

                        <button className='btn btn-record-inventory' onClick={() => {
                            this.handleRecordInventory()
                        }}>ثبت
                        </button>

                    </Modal.Body>
                </Modal>
            </>
            /* <>inventory</>*/
        );
    }

    handleClose = () => {
        this.setState({show: false})
    };
    handleShow = () => {
        this.setState({show: true})
    };

    getValueInputType = (e) => {
        this.setState({type: e})
    }
    getValueInputName = (e) => {
        this.setState({name: e})
    }
    getValueInputCount = (e) => {
        this.setState({count: e})
    }

    handleRecordInventory = async () => {

        const newInventory = {
            type: this.state.type,
            name: this.state.name,
            count: this.state.count
        }

        /*const rawResponse = await fetch('http://api.saadatportal.com/api/v1/telephoneHistory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCall)
        });

        const response = await fetch('http://api.saadatportal.com/api/v1/telephoneHistory').then((response) => response.json())
            .then((data) => this.setState({newCall: data}));*/
        this.setState({show: false})
    }
}

export default inventory;