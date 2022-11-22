import {Component, createRef} from "react";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "@mui/material/ToggleButton";
import Button from 'react-bootstrap/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {IoIosAddCircleOutline} from "react-icons/io";
import {TiTimes} from "react-icons/ti";
import {TiTick} from "react-icons/ti";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";

import '../../../../style/profilePage.css'
import '../../../../style/registerPage.css';
import '../../../../style/paymentPage.css';
import '../../../../style/searchAccount.css';
import "../../../../style/registerPage.css";
// import React from "@types/react";

class RequestPage extends Component {

    constructor(props) {
        super(props);
        this.refForAdd = createRef();
        this.inputRef = createRef();
    }

    state = {
        failureModalShow: false,

        tmpRadioValue: '',
        tmpRequest: '',

        tmpRequestForSubmit: {
            topic: 'test',
            type: 'test',
            name: 'test',
            reason: 'test',
            checked: 'null', // default
            failureReasonId: '',
        },


        showStatusModal: false,

        searchBase: 'name',
        searchContent: '',

        showOverlay: false,
        showType: false,

        choices: [
            'محصولات بهداشتی',
            'بیمه',
        ],
        addInputContentInModal: '',
        addButtonDisabled: false,

        selectedType: null,
        tempFields: {
            topic: '',
            type: null,
            name: '',
            reason: '',
            checked: false, // default
        },

        Validations: {
            selectedTypeBoolean: true,
            topic_requireReg: '',
            name_requireReg: '',

            typeForStatus_requiredReg: '',
        },

        requests : [
            {
                topic: 'test',
                type: 'test',
                name: 'test',
                reason: 'test',
                checked: 'true', // default
                failureReasonId: '',
                // ifFalseTopic: 'ifFalseTopic',
                // ifFalseReason: 'ifFalseReason',
                // ifFalseType: 'ifFalseType'
            },
            {
                topic: 'test',
                type: 'test',
                name: 'test',
                reason: 'test',
                checked: 'true', // default
                failureReasonId: '',
                // ifFalseTopic: 'ifFalseTopic',
                // ifFalseReason: 'ifFalseReason',
                // ifFalseType: 'ifFalseType'
            }
        ],

        failure : {
            name: '',
            reason: '',
            type: '',
        }

    }

    render() {
        return (
            <>
                <div className="back-btn">
                    <Link to="/">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>

                <div>
                    <h4>
                        درخواست (مدیریت)
                    </h4>
                </div>

                <div className={'d-flex'} style={{justifyContent: 'center'}}>
                    <button className={'btn btn-success'} onClick={() => {
                        this.handleResetFields();
                    }}>
                        ثبت درخواست
                    </button>
                </div>

                <div className="row align-items-center ">
                    <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                    <div className="col-md-3 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                        <Form.Select aria-label="Default select example"
                                     style={{height:"50px",fontSize:"14px"}}
                                     value={this.state.searchBase}
                                     onChange={(value) => this.setState({searchBase : value.target.value})}>
                            <option value="name">نام درخواست کننده</option>
                            <option value="type">نوع</option>
                            <option value="topic">عنوان</option>
                        </Form.Select>
                    </div>
                    <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex" style={{paddingRight: "0"}}>
                        <input type="text"
                               id="inputSearch"
                               className="input"
                               placeholder="جسـتوجـو"
                               style={{padding:"6px"}}
                               onChange={(value) => this.setState({searchContent : value.target.value})}/>
                        <button className="btn outline-secondary"><BiSearch fontSize="25px" onClick={this.handleSearchBtn}/>
                        </button>
                    </div>
                </div>

                <div className={'row'}>
                    {
                        this.state.requests.map((request, index, curr) => (
                            <div key={index}>
                                <div className={'account-found mb-3 shadow d-flex row'} style={{height: '300px'}}>
                                    <div className={'row'}>
                                        <div className={'col'}>
                                            <label> عنوان :</label>
                                            {request.topic}
                                        </div>
                                        <div className={'col'}>
                                            <label> نوع :</label>
                                            {request.type}
                                        </div>
                                        <div className={'row mt-4'}>
                                            <div className={'col'}>
                                                <label> درخواست کننده :</label>
                                                {request.name}
                                            </div>
                                            <div className={'col row'}>
                                                <label className={'col-4'}> وضعیت :</label>

                                                {
                                                    request.checked !== 'null'
                                                        ? (request.checked === 'true'
                                                            ? <Button
                                                                disabled={true}
                                                                variant="success"
                                                                className={'col-8'}
                                                                style={{width: '30%'}}
                                                            >
                                                                قبول شده
                                                            </Button>
                                                            : <>
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    delay={{ show: 250, hide: 400 }}
                                                                    overlay={
                                                                        <Tooltip>
                                                                            <div>
                                                                                نمایش جزئیات
                                                                            </div>
                                                                        </Tooltip>
                                                                    }
                                                                >

                                                                    <Button variant="danger"
                                                                            className={'col-8'}
                                                                            style={{width: '30%'}}
                                                                            onClick={() => {
                                                                                this.handleOpenFailureModal();
                                                                                // this.setState({showStatusModal: 'true'});
                                                                                this.setState({tmpRequest : request});

                                                                                // if (this.state.tmpRequest.failureReasonId === fromAPI) {
                                                                                //     let fromAPI = {
                                                                                //         name: 'اسم123',
                                                                                //         reason: 'دلیل123',
                                                                                //         type: 'نوع123',
                                                                                //     }
                                                                                // }

                                                                                let fromAPI = {
                                                                                    name: 'اسم123',
                                                                                    reason: 'دلیل123',
                                                                                    type: 'نوع123',
                                                                                }

                                                                                this.setState({failure : fromAPI});
                                                                                // console.log(request)

                                                                                // console.log(this.state.requests.indexOf(request))
                                                                                // console.log(request.checked);
                                                                            }}
                                                                    >
                                                                        رد شده
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </>)
                                                        : <Button
                                                            disabled={true}
                                                            variant="secondary"
                                                            className={'col-8'}
                                                            style={{width: '30%'}}
                                                        >
                                                            تعیین نشده
                                                        </Button>
                                                }

                                                {
                                                    <div>
                                                        <label className={'col-4'}>تعیین وضعیت :</label>

                                                        <Button
                                                            variant="secondary"
                                                            className={'col-8'}
                                                            style={{width: '30%', marginTop: '5%'}}
                                                            onClick={() => {
                                                                this.setState({showStatusModal: 'true'});
                                                                this.setState({tmpRequest : request})
                                                                this.setState({tmpRadioValue : request.checked});
                                                                this.setState({tmpRequestForSubmit : request})
                                                                // console.log(request)

                                                                // console.log(this.state.requests.indexOf(request))
                                                                // console.log(request.checked);
                                                            }}
                                                        >
                                                            تعیین وضعیت
                                                        </Button>
                                                    </div>
                                                }

                                                <Modal centered show={this.state.showStatusModal} onHide={() => {
                                                    this.handleCloseType();

                                                    // console.log(this.state.requests);
                                                }}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>تغییر وضعیت: </Modal.Title>
                                                    </Modal.Header>

                                                    <Modal.Body className="justify-content-center">
                                                        <FormControl>

                                                            <RadioGroup
                                                                row
                                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                                name="row-radio-buttons-group"
                                                                value={this.state.tmpRequestForSubmit.checked}
                                                                // onClick={() => console.log(request.checked)}
                                                                onChange={(value) => {
                                                                    this.setState({tmpRadioValue : value.target.value})

                                                                    let updatedTmpRequestForSubmit = {...this.state.tmpRequestForSubmit};
                                                                    updatedTmpRequestForSubmit.checked = value.target.value;
                                                                    this.setState({tmpRequestForSubmit : updatedTmpRequestForSubmit});
                                                                    // let updatedRequests = [...this.state.requests];

                                                                    // for (const updatedRequestsKey of updatedRequests) {
                                                                    //     if (updatedRequestsKey === this.state.tmpRequest) {
                                                                    //         updatedRequestsKey.checked = value.target.value;
                                                                    //         break;
                                                                    //     }
                                                                    // }
                                                                    //
                                                                    // this.setState({requests : updatedRequests})
                                                                }}
                                                            >

                                                                <FormControlLabel labelPlacement="top" value="null" control={<Radio />} label="تعیین نشده" />
                                                                <FormControlLabel labelPlacement="top" value="true" control={<Radio />} label="تایید شده" />
                                                                <FormControlLabel labelPlacement="top" value="false" control={<Radio />} label="تایید نشده" />

                                                            </RadioGroup>
                                                        </FormControl>


                                                        <div style={{display: this.state.tmpRequestForSubmit.checked !== 'false' ? 'none' : 'block'}}>
                                                            <div className={'input-group-register'}>
                                                                <input
                                                                    className={'input form-control'}
                                                                    placeholder={' '}
                                                                    value={this.state.failure.name}
                                                                    onChange={(value) => {
                                                                        let updatedFailure = {...this.state.failure};
                                                                        updatedFailure.name = value.target.value;
                                                                        this.setState({failure : updatedFailure});

                                                                        // let updatedRequests = [...this.state.requests];
                                                                        //
                                                                        // for (const updatedRequestsKey of updatedRequests) {
                                                                        //     if (updatedRequestsKey === this.state.tmpRequest) {
                                                                        //         updatedRequestsKey.ifFalseTopic = value.target.value;
                                                                        //         break;
                                                                        //     }
                                                                        // }
                                                                        //
                                                                        // this.setState({requests : updatedRequests})
                                                                    }}
                                                                />
                                                                <label className={'placeholder'}>
                                                                    عنوان
                                                                </label>
                                                            </div>

                                                            <div className={'input-group-register'}>
                                                                <input
                                                                    className={'input form-control'}
                                                                    placeholder={' '}
                                                                    value={this.state.failure.reason}
                                                                    onChange={(value) => {
                                                                        let updatedFailure = {...this.state.failure};
                                                                        updatedFailure.reason = value.target.value;
                                                                        this.setState({failure : updatedFailure});

                                                                        // let updatedRequests = [...this.state.requests];

                                                                        // for (const updatedRequestsKey of updatedRequests) {
                                                                        //     if (updatedRequestsKey === this.state.tmpRequest) {
                                                                        //         updatedRequestsKey.ifFalseReason = value.target.value;
                                                                        //         break;
                                                                        //     }
                                                                        // }
                                                                        //
                                                                        // this.setState({requests : updatedRequests})
                                                                    }}
                                                                />
                                                                <label className={'placeholder'}>
                                                                    دلیل
                                                                </label>
                                                            </div>

                                                            <div className={'input-group-register'}>
                                                                <input
                                                                    className={'input form-control'}
                                                                    placeholder={' '}
                                                                    value={this.state.failure.type}
                                                                    onChange={(value) => {
                                                                        let updatedFailure = {...this.state.failure};
                                                                        updatedFailure.type = value.target.value;
                                                                        this.setState({failure : updatedFailure});

                                                                        // let updatedRequests = [...this.state.requests];
                                                                        //
                                                                        // for (const updatedRequestsKey of updatedRequests) {
                                                                        //     if (updatedRequestsKey === this.state.tmpRequest) {
                                                                        //         updatedRequestsKey.ifFalseType = value.target.value;
                                                                        //         break;
                                                                        //     }
                                                                        // }
                                                                        //
                                                                        // this.setState({requests : updatedRequests})
                                                                    }}
                                                                />
                                                                <label className={'placeholder'}>
                                                                    نوع
                                                                </label>
                                                            </div>

                                                        </div>

                                                    </Modal.Body>

                                                    <Modal.Footer>
                                                        <button className="btn btn-success" onClick={(event) => {
                                                            if (this.handleIsValidStatus()) {
                                                                this.handleSubmitStatus();
                                                                this.setState({showStatusModal: false});
                                                            }

                                                            // console.log(this.state.tempFields)

                                                        }}>ثبت
                                                        </button>
                                                        <button className="btn btn-light" onClick={() => {
                                                            this.handleCloseType()
                                                        }}>بستن
                                                        </button>
                                                    </Modal.Footer>

                                                </Modal>
                                            </div>
                                        </div>
                                        <div className={'col'}>
                                            <div>
                                                <label>  دلیل :</label>
                                                {request.reason}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <Modal centered size="lg" show={this.state.showType} onHide={() => {
                    this.handleCloseType()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن درخواست جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">

                        <div className={'d-flex row modal-lg'}>

                            <div className={'input-group-register col-6'}>
                                <input type='text'
                                       className={`input form-control col 
                                       ${ this.state.Validations.topic_requireReg === false  ? "is-invalid" : ""}
                                       `}
                                       onChange={(e) =>
                                           this.handleInputChange(e, 'topic')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.topic_requireReg === false ? '35px' : '12px'}}>
                                    &nbsp;عنوان
                                    <span style={{color : 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.topic_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>

                            <div className={'col-6'}>
                                <Accordion defaultActiveKey="0"
                                           style={{backgroundColor: this.state.Validations.selectedTypeBoolean ? '' : 'rgba(255, 0, 0, 0.4)', marginTop: '-10px'}}
                                           className={'col'}
                                >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            {this.state.tempFields.type}&nbsp;
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div>
                                                <div className=' row flex-wrap'>
                                                    {
                                                        this.state.Validations.selectedTypeBoolean // ifSelected condition
                                                            ? null
                                                            : <div className="d-flex justify-content-center mb-3">
                                                                <small className="text-danger">یکی از گزینه های زیر را انتخاب
                                                                    کنید!</small>
                                                            </div>
                                                    }
                                                    <ToggleButtonGroup
                                                        orientation="vertical"
                                                        value={this.state.tempFields.type}
                                                        exclusive
                                                        onChange={this.handleAlignment}
                                                        aria-label="text alignment"
                                                    >
                                                        {
                                                            this.state.choices.map((c, key) =>
                                                                <ToggleButton value={c} className='col' key={key}>
                                                                    {c}
                                                                </ToggleButton>
                                                            )
                                                        }

                                                        <div className={'row'}
                                                             style={{width: '100%', marginRight: '0px', display: 'none'}}
                                                             ref={this.inputRef}
                                                        >
                                                            <input style={{
                                                                borderRadius: '0',
                                                                height: '50px',
                                                                outline: 'none',
                                                                color: '#2a2e32b3',
                                                                border: '0.3px solid #bec6cc',
                                                                padding: '8px'
                                                            }}
                                                                   value={this.state.addInputContentInModal}
                                                                   onChange={(value) => this.setState({addInputContentInModal : value.target.value})}
                                                                   className={'col-8'}
                                                            >

                                                            </input>
                                                            <button className={'col addTypeBtn'}
                                                                    onClick={() => {
                                                                        this.inputRef.current.style.display = 'none';
                                                                        this.setState({addButtonDisabled : false});
                                                                    }}
                                                            >
                                                                <TiTimes size={22} color={'red'}/>
                                                            </button>
                                                            <button className={'col addTypeBtn'}
                                                                    onClick={() => {
                                                                        let required = /^\s*$/;
                                                                        if (!required.test(this.state.addInputContentInModal)) {

                                                                            let updatedChoices = [...this.state.choices];
                                                                            updatedChoices.push(this.state.addInputContentInModal);
                                                                            this.setState({choices : updatedChoices});

                                                                            this.inputRef.current.style.display = 'none';
                                                                            this.setState({addButtonDisabled : false});
                                                                        }
                                                                    }}
                                                            >
                                                                <TiTick size={22} color={'green'}/>
                                                            </button>
                                                        </div>


                                                        <button value="add"
                                                                onClick={() => {
                                                                    this.inputRef.current.style.display = 'block flex';
                                                                    this.setState({addInputContentInModal : ''});
                                                                    this.setState({addButtonDisabled : true});
                                                                }}
                                                                ref={this.refForAdd}
                                                                className='col addTypeBtn'
                                                                disabled={this.state.addButtonDisabled}
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

                        <div>

                            <div className="input-group-register col-12">
                                <input type='text'
                                       className={`input form-control mb-2 ${this.state.Validations.name_requireReg === false ? "is-invalid" : ""}`}
                                       onChange={(e) => this.handleInputChange(e, 'name')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'} style={{right: this.state.Validations.name_requireReg === false ? '35px' : '12px'}}>
                                    درخواست کننده
                                    <span style={{color : 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.name_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>

                            <div className="input-group-register col-12">
                                <textarea  className='input form-control mb-2'
                                           onChange={(e) => this.handleInputChange(e, 'reason')}
                                           placeholder=" "
                                           rows='5'
                                />
                                <label className={'placeholder'}>
                                    دلیل
                                </label>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={(event) => {
                            if (this.handleIsValid()) {
                                this.handleSubmitType(event)
                                this.handleCloseType()
                            }

                            // console.log(this.state.tempFields)

                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
                            this.handleCloseType()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.failureModalShow} onHide={() => {
                    this.handleCloseFailureModal();

                    // console.log(this.state.failureModalShow);
                }}> {/* for failure reason*/}
                    <Modal.Header closeButton>
                        <div style={{color: 'red', fontSize: '2rem'}}>
                            رد شده
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="information">
                            <p>
                                <label style={{marginLeft: '5%'}}>
                                    عنوان:
                                </label>
                                {this.state.failure.type}
                            </p>
                        </div>
                        <div className="information">
                            <p>
                                <label style={{marginLeft: '5%'}}>
                                    اسم:
                                </label>
                                {this.state.failure.name}
                            </p>
                        </div>
                        <div className="information">
                            <p>
                                <label style={{marginLeft: '5%'}}>
                                    دلیل:
                                </label>
                                {this.state.failure.reason}
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>

            </>
        );
    }
    handleCloseFailureModal = () => {
        this.setState({failureModalShow: false});
    }

    handleOpenFailureModal = () => {
        this.setState({failureModalShow: true});
    }

    handleSearchBtn = () => {

    }

    handleOpenType = () => {
        this.setState({showType: true});
    }

    handleCloseType = () => {
        this.setState({showType: false});
        this.setState({showStatusModal: false});
    }

    handleAlignment = (event, newAlignment) => {
        let updatedTempFields = {...this.state.tempFields};
        updatedTempFields['type'] = newAlignment;
        this.setState({tempFields: updatedTempFields});
    }

    handleInputChange = (e, fieldName) => {
        let updatedTempFields = {...this.state.tempFields};
        updatedTempFields[fieldName] = e.target.value;
        this.setState({tempFields : updatedTempFields});
    }

    handleIsValid = () => {
        let regCheck = /^\s*$/;

        let topic_requireReg = !regCheck.test(this.state.tempFields.topic);
        let selectedTypeBoolean = this.state.tempFields.type !== undefined && this.state.tempFields.type !== null;
        let name_requireReg = !regCheck.test(this.state.tempFields.name);

        this.handleValidations([topic_requireReg, selectedTypeBoolean, name_requireReg],
            ['topic_requireReg', 'selectedTypeBoolean', 'name_requireReg'])

        return topic_requireReg && selectedTypeBoolean && name_requireReg;

    }

    handleIsValidStatus = () => {
        // tmpRequestForSubmit
        let regCheck = /^\s*$/;

        // this.state.failure.type =
        let typeForStatus_requiredReg = !regCheck.test(this.state.failure.type);
        if (this.state.tmpRadioValue === 'null' || this.state.tmpRadioValue === 'true') {
            typeForStatus_requiredReg = true;
        }
        this.handleValidations([typeForStatus_requiredReg], ['typeForStatus_requiredReg']);

        return typeForStatus_requiredReg;
    }

    handleSubmitType = (e) => {
        e.preventDefault();
        let updatedRequests = [...this.state.requests];
        let request = {
            topic: this.state.tempFields.topic,
            type: this.state.tempFields.type,
            name: this.state.tempFields.name,
            reason: this.state.tempFields.reason,
            checked: 'null', // null, false, true
        }
        updatedRequests.push(request);
        this.setState({requests: updatedRequests});
    }

    handleSubmitStatus = () => {

        let updatedRequests = [...this.state.requests];

        for (const updatedRequestsKey of updatedRequests) {
            if (updatedRequestsKey === this.state.tmpRequest) {
                updatedRequestsKey.checked = this.state.tmpRequestForSubmit.checked;
                break;
            }
        }

        this.setState({requests : updatedRequests})
    }

    handleValidations = (valueOfField, nameOfField) => {
        let updatedValidations = {...this.state.Validations};

        for (let i = 0; i < valueOfField.length; i++) {
            updatedValidations[nameOfField[i]] = valueOfField[i];
        }
        // updatedValidations[nameOfField] = valueOfField;
        this.setState({Validations : updatedValidations});

        // console.log(this.state.Validations.selectedTypeBoolean)

    }

    handleResetFields = () => {
        this.handleOpenType();

        let resetTypeOfTempFields = {...this.state.tempFields};
        resetTypeOfTempFields['type'] = null;
        resetTypeOfTempFields['name'] = '';
        resetTypeOfTempFields['reason'] = '';
        resetTypeOfTempFields['topic'] = '';
        resetTypeOfTempFields['checked'] = null;

        let resetValidations = {...this.state.Validations};
        resetValidations['selectedTypeBoolean'] = true;
        resetValidations['topic_requireReg'] = '';
        resetValidations['name_requireReg'] = '';

        this.setState({tempFields : resetTypeOfTempFields});
        this.setState({Validations : resetValidations});
    }
}

export default RequestPage;