import React, {Component} from "react";
import '../../../../style/contacts.css'
import {BsSearch} from "react-icons/bs";
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";

class contacts extends Component {
    state = {
        contacts: [],
        show: false,
        inputTelephone: [],
        inputMobile: [],
        name: [],
        telephoneNumbers: [],
        mobileNumbers: []
    }

    async componentDidMount() {
         const response = await fetch('https://api.saadatportal.com/api/v1/phoneBook').then((response) => response.json())
             .then((data) => this.setState({contacts : data}));
    }

    render() {
        return (
            <>
                <div className="contact">
                    <div className="title">دفترچه تلفن</div>
                    <button className='btn btn-add my-4' onClick={() => {
                        this.handleShow()
                    }}><AiOutlinePlus className='ms-2'/>افزودن مخاطب
                    </button>
                    <div className="row align-items-center">
                        <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                        <div className="col-md-3 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                            <Form.Select aria-label="Default select example" style={{height:"50px",fontSize:"14px"}} value={this.state.searchType} onChange={(e)=>{this.setState({searchType:e.target.value})}}>
                                <option value="fullName">نام و نام خانوادگی</option>
                                <option value="nationalCode">شماره همراه</option>
                                <option value="phoneNumber"> تلفن ثابت</option>
                            </Form.Select>
                        </div>
                        <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex" style={{paddingRight: "0"}}>
                            <input type="text" id="inputSearch" className="input" placeholder="جسـتوجـو" style={{padding:"6px"}} onChange={(e)=>{this.handleSearchInput(e)}}/>
                            <button className="btn outline-secondary"><BiSearch fontSize="25px" onClick={this.handleSearchBtn}/>
                            </button>
                        </div>
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
                                this.state.contacts.map((i) => (
                                    <tr>
                                        <td>{i.name}</td>
                                        <td >{i.telephoneNumbers.map((num)=>(<div className="mb-2">{num}</div>))}</td>
                                        <td>{i.mobileNumbers.map((num)=>(<div className="mb-2">{num}</div>))}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal className='report-modal' centered show={this.state.show}>
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



                        <button className='btn btn-record-contact' onClick={() => {
                            this.handleRecordContact()
                        }}>ثبت
                        </button>



                    </Modal.Body>
                </Modal>
            </>
        );
    }

    handleClose = () => {
        this.setState({show: false})
    };

    handleShow = () => {
        this.setState({show: true})
    };
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
        const name = e;
        this.setState({name: name})
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

        const rawResponse = await fetch('https://api.saadatportal.com/api/v1/phoneBook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        });

        const response = await fetch('https://api.saadatportal.com/api/v1/phoneBook').then((response) => response.json())
            .then((data) => this.setState({contacts : data}));

        this.setState({show: false})
    }
}

export default contacts;