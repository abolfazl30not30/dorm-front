import React, {Component, createRef} from "react";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import '../../../../style/profilePage.css'
import '../../../../style/registerPage.css';
import '../../../../style/paymentPage.css';
import '../../../../style/searchAccount.css';
import "../../../../style/registerPage.css";
import {Box, CircularProgress} from "@mui/material";
import {green} from "@mui/material/colors";
// import React from "@types/react";

class RequestPage extends Component {

    constructor(props) {
        super(props);
        this.refForAdd = createRef();
        this.inputRef = createRef();
    }

    state = {
        loading: false,
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

        requests : [],

        failure : {
            name: '',
            reason: '',
            type: '',
        }

    }

    render() {
        return (
            <>
                <div className="px-2">
                    <div className="back-btn">
                        <Link to="/">
                            بازگشت
                            <i className="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex flex-row justify-content-between">
                            <div className={'mb-3'}><h4>درخواست (مدیریت)</h4></div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="search-box">
                                <div className="form-floating">
                                    <select className="form-select" id="floatingSelect"
                                            aria-label="Floating label select example"
                                            value={this.state.searchBase}
                                            onChange={(value) => this.setState({searchBase: value.target.value})}>
                                        <option value="name">عنوان</option>
                                        <option value="assignee">نام درخواست کننده</option>
                                        <option value="type">نوع</option>
                                    </select>
                                    <label htmlFor="floatingSelect">براساس</label>
                                </div>
                                <input type="text"
                                       id="inputSearch"
                                       placeholder="جسـتجـو..."
                                       onChange={(e) => {
                                           this.handleSearchInput(e)
                                       }}/>
                                <div className="search-icon"><i className="bi bi-search"></i></div>
                            </div>
                        </div>
                        <div className="d-flex flex-row flex-wrap">
                            {
                                this.state.requests.map((request, index, curr) => (
                                    <>
                                        <div className="col-12 col-md-4 p-2">
                                            <div className={'request-item d-flex flex-column'}>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">عنوان:</div>
                                                    <div>{request.name}</div>
                                                </div>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">نوع:</div>
                                                    <div>{request.type}</div>
                                                </div>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">درخواست کننده:</div>
                                                    <div>{request.assignee}</div>
                                                </div>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">دلیل:</div>
                                                    <div>{request.reason}</div>
                                                </div>
                                                <div className='d-flex flex-row justify-content-between align-items-baseline mb-2'>
                                                    <div className="d-flex flex-row align-items-baseline">
                                                        <i className="bi bi-chevron-left ms-1"/>
                                                        <div className="request-item-title">وضعیت:</div>
                                                        {
                                                            request.checked !== null
                                                                ? (request.checked === true
                                                                    ? <Button className={'request-accept'} disabled={true}>قبول شده</Button>
                                                                    : <OverlayTrigger
                                                                        placement="bottom"
                                                                        delay={{ show: 250, hide: 400 }}
                                                                        overlay={<Tooltip id="button-tooltip">
                                                                            نمایش جرئیات
                                                                        </Tooltip>
                                                                        }
                                                                    >
                                                                        <Button className={'request-reject'} onClick={() => {
                                                                        this.handleOpenFailureModal(request);
                                                                    }}>رد شده</Button>
                                                                        </OverlayTrigger>
                                                                        )
                                                                : <Button className={'request-unknown'} disabled={true}>تعیین نشده</Button>
                                                        }
                                                    </div>
                                                    <div>
                                                        <Button
                                                            disabled={request.checked !== null}
                                                            className={'request-edit'}
                                                            onClick={() => {
                                                                let resetFailure = {
                                                                    name: '',
                                                                    reason: '',
                                                                    type: '',
                                                                }
                                                                this.setState({failure: resetFailure})
                                                                this.handleEditButton(request);
                                                            }}
                                                        >
                                                            <i className="bi bi-pencil ms-1"/>
                                                            ویرایش
                                                        </Button>
                                                    </div>

                                                    <Modal centered show={this.state.showStatusModal} onHide={() => {
                                                        this.handleCloseType();
                                                    }}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>تغییر وضعیت</Modal.Title>
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
                                                                        this.handleEditRadioGroup(value);
                                                                    }}
                                                                >
                                                                    <FormControlLabel labelPlacement="top" value="null" control={<Radio />} label="تعیین نشده" />
                                                                    <FormControlLabel labelPlacement="top" value="true" control={<Radio />} label="تایید شده" />
                                                                    <FormControlLabel labelPlacement="top" value="false" control={<Radio />} label="تایید نشده" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <div style={{display: this.state.tmpRequestForSubmit.checked !== false ? 'none' : 'block'}}>
                                                                <div className={'input-group-register'}>
                                                                    <input
                                                                        className={'input form-control'}
                                                                        placeholder={' '}
                                                                        value={this.state.failure.name}
                                                                        onChange={(value) => {
                                                                            let updatedFailure = {...this.state.failure};
                                                                            updatedFailure.name = value.target.value;
                                                                            this.setState({failure : updatedFailure});
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
                                                                        }}
                                                                    />
                                                                    <label className={'placeholder'}>
                                                                        نوع
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Box sx={{ m: 1, position: 'relative' }}>
                                                                <Button
                                                                    className={"buttonDone"}
                                                                    variant="contained"
                                                                    disabled={this.state.loading}
                                                                    onClick={(event) => {
                                                                        if (this.handleIsValidStatus()) {
                                                                            this.handleSubmitStatus();
                                                                        }
                                                                    }}>
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
                                                            {/*<button className="btn-done" onClick={(event) => {*/}
                                                            {/*    if (this.handleIsValidStatus()) {*/}
                                                            {/*        this.handleSubmitStatus();*/}
                                                            {/*        this.setState({showStatusModal: false});*/}
                                                            {/*    }*/}
                                                            {/*}}>ثبت*/}
                                                            {/*</button>*/}
                                                            <button className="btn btn-light" onClick={() => {
                                                                this.handleCloseType()
                                                            }}>بستن
                                                            </button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </div>
                                                <div className='d-flex flex-row mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">توضیحات:</div>
                                                    <div>{request.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>

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

    componentDidMount = async () => {
        const response = await fetch(`https://api.saadatportal.com/api/v1/request`).then((response) => response.json())
            .then((data) => this.setState({requests: data}));
    }

    handleEditRadioGroup = (value) => {
        let formattedValue = value.target.value === "null" ? null : (value.target.value === "true")
        this.setState({tmpRadioValue : formattedValue})
        let updatedTmpRequestForSubmit = {...this.state.tmpRequestForSubmit};
        updatedTmpRequestForSubmit.checked = formattedValue;
        this.setState({tmpRequestForSubmit : updatedTmpRequestForSubmit});
    }

    handleEditButton = async (request) => {
        this.setState({showStatusModal: true});
        this.setState({tmpRequest: request})
        this.setState({tmpRadioValue: request.checked});
        this.setState({tmpRequestForSubmit: request})
    }

    handleCloseFailureModal = () => {
        this.setState({failureModalShow: false});
    }


    handleGetFailureReasonId = () => {

    }

    handleOpenFailureModal = async (request) => {
        this.setState({failureModalShow: true});
        const response = await fetch(`https://api.saadatportal.com/api/v1/failureReason/${request.failureReason}`).then((response) => response.json())
            .then((data) => this.setState({failure : data}));
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

    handleIsValidStatus = () => {
        // tmpRequestForSubmit
        let regCheck = /^\s*$/;

        // this.state.failure.type =
        let typeForStatus_requiredReg = !regCheck.test(this.state.failure.type);
        if (this.state.tmpRequestForSubmit.checked === null || this.state.tmpRequestForSubmit.checked === true) {
            typeForStatus_requiredReg = true;
        }
        this.handleValidations([typeForStatus_requiredReg], ['typeForStatus_requiredReg']);

        return typeForStatus_requiredReg;
    }

    handleSubmitStatus = async () => {

        let updatedRequests = [...this.state.requests];

        for (const updatedRequestsKey of updatedRequests) {
            if (updatedRequestsKey === this.state.tmpRequest) {
                if (this.state.tmpRequestForSubmit.checked === false) {
                    let failureReasonId= '';
                    this.setState({loading: true})
                    const getFailureReasonId = await fetch('https://api.saadatportal.com/api/v1/failureReason', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: this.state.failure.name,
                            type: this.state.failure.type,
                            reason: this.state.failure.reason
                        })
                    })

                    var content = await getFailureReasonId.json();

                    const patchFailRequest = await fetch(`https://api.saadatportal.com/api/v1/request/${updatedRequestsKey.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            checked: false,
                            failureReasonId: content.id
                        })
                    }).then(() => {
                        this.setState({loading: false});
                        this.setState({showStatusModal: false});
                    });
                } else if (this.state.tmpRequestForSubmit.checked === true) {
                    this.setState({loading: true})
                    const patchAcceptedRequest = await fetch(`https://api.saadatportal.com/api/v1/request/${updatedRequestsKey.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            checked: this.state.tmpRequestForSubmit.checked
                        })
                    }).then(() => {
                        this.setState({loading: false});
                        this.setState({showStatusModal: false});
                    });
                }
                break;
            }
        }
        await this.componentDidMount();
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

    handleSearchInput = async (e) =>{
        const value = e.target.value;
        const response = await fetch(`https://api.saadatportal.com/api/v1/request/search?${this.state.searchBase}=${value}`).then((response) => response.json())
            .then((data) => this.setState({requests : data}));
    }
}

export default RequestPage;