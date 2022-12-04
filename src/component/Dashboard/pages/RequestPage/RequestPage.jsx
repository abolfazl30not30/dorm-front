import {Component, createRef} from "react";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "@mui/material/ToggleButton";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {IoIosAddCircleOutline} from "react-icons/io";
import {IoIosSearch} from "react-icons/io";
import {TiTimes} from "react-icons/ti";
import {TiTick} from "react-icons/ti";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../../../../style/registerPage.css';
import '../../../../style/paymentPage.css';
import '../../../../style/searchAccount.css';
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import {MdDone} from "react-icons/md";
import axios from "axios";

class RequestPage extends Component {

    constructor(props) {
        super(props);
        this.refForAdd = createRef();
        this.inputRef = createRef();
    }

    state = {
        searchBase: 'name',
        searchContent: '',

        failureModalShow: false,

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
            topic: "",
            type: null,
            name: "",
            reason: "",
            checked: null, // default
            description: ""
        },

        Validations: {
            selectedTypeBoolean: true,
            topic_requireReg: '',
            name_requireReg: '',
            description_requireReg: '',
            reason_requireReg: '',

        },

        requests: [
            {
                topic: 'test',
                type: 'test',
                name: 'test',
                reason: 'test',
                checked: 'false', // default
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

        failure: {
            name: 'asd1',
            type: 'asd2',
            reason: 'asd3',
        }
    }

    componentDidMount = async () => {
        // const response1 = await fetch('https://api.saadatportal.com/api/v1/category/search?type=Request').then((response) => response.json())
        //     .then((data) => this.setState({ choices: data }));
        // const response1 = await axios.get("https://api.saadatportal.com/api/v1/request");
        // console.log(response1)
        const response = await fetch('https://api.saadatportal.com/api/v1/request').then((response) => response.json())
            .then((data) => this.setState({requests: data}));

    }

    render() {
        return (
            <>
                <div className="px-2">
                    <div className="back-btn">
                        <Link to="/dashboard">
                            بازگشت
                            <i className="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <h4>
                                    درخواست
                                </h4>
                            </div>
                            <div className={'d-flex'} style={{justifyContent: 'center'}}>
                                <button className={'btn-done'} onClick={() => {
                                    this.handleOpenType();
                                    this.handleResetFields();
                                }}>
                                    <MdDone className='ms-1'/>ثبت درخواست
                                </button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="search-box">
                                <div className="form-floating">
                                    <select className="form-select" id="floatingSelect"
                                            aria-label="Floating label select example"
                                            value={this.state.searchBase}
                                            onChange={(value) => this.setState({searchBase: value.target.value})}>
                                        <option value="name">نام درخواست کننده</option>
                                        <option value="type">نوع</option>
                                        <option value="topic">عنوان</option>
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
                                this.state.requests.map(request => (
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
                                                <div className='d-flex flex-row align-items-baseline mb-2'>
                                                    <i className="bi bi-chevron-left ms-1"/>
                                                    <div className="request-item-title">وضعیت:</div>


                                                    {
                                                        request.checked !== null
                                                            ? (request.checked === true
                                                                ? <Button className={'request-accept'}>قبول شده</Button>
                                                                : <Button className={'request-reject'} onClick={() => {
                                                                    this.handleOpenFailureModal(request);
                                                                }}>رد شده</Button>)
                                                            : <Button className={'request-unknown'}>تعیین نشده</Button>
                                                    }


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
                <Modal centered show={this.state.showType} onHide={() => {
                    this.handleCloseType()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن درخواست جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">

                        <div className={'d-flex flex-column'}>
                            <div className={'input-group-register'}>
                                <input type='text'
                                       className={`input form-control col 
                                       ${this.state.Validations.topic_requireReg === false ? "is-invalid" : ""}
                                       `}
                                       onChange={(e) =>
                                           this.handleInputChange(e, 'topic')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.topic_requireReg === false ? '35px' : '12px'}}>
                                    &nbsp;عنوان
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.topic_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>
                            <div>
                                <Accordion defaultActiveKey="0"
                                           style={{backgroundColor: this.state.Validations.selectedTypeBoolean ? '' : 'rgba(255, 0, 0, 0.4)'}}
                                           className={'p-2'}
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
                                                                <small className="text-danger">یکی از گزینه های زیر را
                                                                    انتخاب
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
                                                             style={{
                                                                 width: '100%',
                                                                 marginRight: '0px',
                                                                 display: 'none'
                                                             }}
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
                                                                   onChange={(value) => this.setState({addInputContentInModal: value.target.value})}
                                                                   className={'col-8'}
                                                            >

                                                            </input>
                                                            <button className={'col addTypeBtn'}
                                                                    onClick={() => {
                                                                        this.inputRef.current.style.display = 'none';
                                                                        this.setState({addButtonDisabled: false});
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
                                                                            this.setState({choices: updatedChoices});

                                                                            this.inputRef.current.style.display = 'none';
                                                                            this.setState({addButtonDisabled: false});
                                                                        }
                                                                    }}
                                                            >
                                                                <TiTick size={22} color={'green'}/>
                                                            </button>
                                                        </div>


                                                        <button value="add"
                                                                onClick={() => {
                                                                    this.inputRef.current.style.display = 'block flex';
                                                                    this.setState({addInputContentInModal: ''});
                                                                    this.setState({addButtonDisabled: true});
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
                            <div className="input-group-register">
                                <input type='text'
                                       className={`input form-control mb-2 ${this.state.Validations.name_requireReg === false ? "is-invalid" : ""}`}
                                       onChange={(e) => this.handleInputChange(e, 'name')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.name_requireReg === false ? '35px' : '12px'}}>
                                    درخواست کننده
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.name_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>
                            <div className="input-group-register">
                                <input type='text'
                                       className={`input form-control mb-2 ${this.state.Validations.description_requireReg === false ? "is-invalid" : ""}`}
                                       onChange={(e) => this.handleInputChange(e, 'description')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.description_requireReg === false ? '35px' : '12px'}}>
                                    توضیحات
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.description_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>
                            <div className="input-group-register ">
                                <textarea
                                    className={`input form-control mb-2 ${this.state.Validations.reason_requireReg === false ? "is-invalid" : ""}`}
                                    onChange={(e) => this.handleInputChange(e, 'reason')}
                                    placeholder=" "
                                    rows='5'
                                />
                                <label className={'placeholder'}
                                       style={{right: this.state.Validations.reason_requireReg === false ? '35px' : '12px'}}>
                                    دلیل
                                    <span style={{color: 'red'}}>*</span>
                                </label>

                                {
                                    this.state.Validations.reason_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn-done" onClick={(event) => {
                            if (this.handleIsValid()) {
                                this.handleSubmit()
                            }
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

    handleOpenFailureModal = async (request) => {
        this.setState({failureModalShow: true});
        // console.log(request)

        // if(request.checked === 'false'){
        const response = await fetch(`https://api.saadatportal.com/api/v1/failureReason/${request.failureReason}`).then((response) => response.json())
            .then((data) => this.setState({failure: data}));

        // }

    }

    handleResetFields = () => {
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

        this.setState({tempFields: resetTypeOfTempFields})
        this.setState({Validations: resetValidations})
    }

    handleSearchBtn = () => {

    }

    handleOpenType = () => {
        this.setState({showType: true});
    }

    handleCloseType = () => {
        this.setState({showType: false});
    }

    handleAlignment = (event, newAlignment) => {
        let updatedTempFields = {...this.state.tempFields};
        updatedTempFields['type'] = newAlignment;
        this.setState({tempFields: updatedTempFields});
    }

    handleInputChange = (e, fieldName) => {
        let updatedTempFields = {...this.state.tempFields};
        updatedTempFields[fieldName] = e.target.value;
        this.setState({tempFields: updatedTempFields});
    }

    handleIsValid = (e) => {
        // e.preventDefault();
        let regCheck = /^\s*$/;

        let topic_requireReg = !regCheck.test(this.state.tempFields.topic);
        let selectedTypeBoolean = this.state.tempFields.type !== undefined && this.state.tempFields.type !== null;
        let name_requireReg = !regCheck.test(this.state.tempFields.name);
        let description_requireReg = !regCheck.test(this.state.tempFields.description);
        let reason_requireReg = !regCheck.test(this.state.tempFields.reason);

        this.handleValidations([topic_requireReg, selectedTypeBoolean, name_requireReg, description_requireReg, reason_requireReg],
            ['topic_requireReg', 'selectedTypeBoolean', 'name_requireReg', 'description_requireReg', 'reason_requireReg'])

        return topic_requireReg && selectedTypeBoolean && name_requireReg && description_requireReg && reason_requireReg;

    }

    handleSubmit = async () => {
        const date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0')
        let year = date.getFullYear();
        let date2 = year + "/" + month + "/" + day + " " + "00:" + "00:" + "00";

        console.log(date2, this.state.tempFields.topic, this.state.tempFields.type, this.state.tempFields.reason, this.state.tempFields.name)
        const rawResponse = await fetch('https://api.saadatportal.com/api/v1/request', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                dateOfRegistration: date2,
                name: this.state.tempFields.topic,
                type: this.state.tempFields.type,
                reason: this.state.tempFields.reason,
                checked: null,
                supervisorId: "6666666",
                description: this.state.tempFields.description,
                assignee: this.state.tempFields.name
            })
        });

        // const response2 = await fetch('https://api.saadatportal.com/api/v1/request').then((response) => response.json())
        //     .then((data) => this.setState({requests: data}));

        await this.componentDidMount();

        const content = await rawResponse.json();

        this.handleCloseType();
    }

    handleValidations = (valueOfField, nameOfField) => {
        let updatedValidations = {...this.state.Validations};

        for (let i = 0; i < valueOfField.length; i++) {
            updatedValidations[nameOfField[i]] = valueOfField[i];
        }

        this.setState({Validations: updatedValidations});

    }

    handleSearchInput = async (e) =>{
        const value = e.target.value;
        this.setState({searchInput:value});
        const response = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?${this.state.searchType}=${e.target.value}`).then((response) => response.json())
            .then((data) => this.setState({accountFound: data}));
    }

    handleCloseFailureModal = () => {
        this.setState({failureModalShow: false})
    }

}

export default RequestPage;