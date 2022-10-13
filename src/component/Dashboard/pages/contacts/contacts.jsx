import React, {Component} from "react";
import '../../../../style/contacts.css'
import {BsSearch} from "react-icons/bs";
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {Modal} from 'react-bootstrap'

class contacts extends Component {
    state = {
        contacts: [
            {
                name: 'میلاد زارع',
                telephoneNumbers: ['09335137958'],
                mobileNumbers: ['09335137958']
            },
            {
                name: 'میلاد زارع',
                telephoneNumbers: ['09335137958'],
                mobileNumbers: ['09335137958']
            },
            {
                name: 'میلاد زارع',
                telephoneNumbers: ['09335137958'],
                mobileNumbers: ['09335137958']
            },
            {
                name: 'میلاد زارع',
                telephoneNumbers: ['09335137958'],
                mobileNumbers: ['09335137958']
            }
        ],
        show: false,
        inputTelephone: [],
        inputMobile: [],
        name: [],
        telephoneNumbers: [],
        mobileNumbers: []
    }

    render() {
        return (
            <>
                <div className="contact">
                    <div className="title">دفترچه تلفن</div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-row">
                            <input type='text' className='form-control input-search' placeholder='جستجو'/>
                            <button className='btn'><BsSearch fontSize="25px"/></button>
                        </div>
                        <button className='btn btn-add' onClick={() => {
                            this.handleShow()
                        }}><AiOutlinePlus className='ms-2'/>افزودن
                        </button>
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
                                        <td>{i.telephoneNumbers}</td>
                                        <td>{i.mobileNumbers}</td>
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
            {}
        )
        this.setState({inputTelephone: newInputTelephone});
    }
    addInputMobileNumbers = () => {
        const newInputMobile = this.state.inputMobile.concat(
            {}
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
        const updateInputsTelephone = this.state.inputTelephone.splice(i,1)
        this.setState({inputTelephone: updateInputsTelephone});
    }
    deleteInputMobile = (i) => {
        const updateInputsMobile = this.state.inputMobile.splice(i,1)
        this.setState({inputMobile: updateInputsMobile});
    }
    handleRecordContact = () => {
        const newContact = {
            name: this.state.name,
            telephoneNumbers : this.state.telephoneNumbers,
            mobileNumbers: this.state.mobileNumbers
        }
        console.log(newContact)
    }
}

export default contacts;