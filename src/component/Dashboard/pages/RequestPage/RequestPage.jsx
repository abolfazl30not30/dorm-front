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
import "../../../../style/registerPage.css";
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import {MdDone} from "react-icons/md";

class RequestPage extends Component {

    constructor(props) {
        super(props);
        this.refForAdd = createRef();
        this.inputRef = createRef();
    }

    state = {
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
        },

        requests : [
        ],
    }

    async componentDidMount() {
        // const response1 = await fetch('https://api.saadatportal.com/api/v1/category/search?type=Request').then((response) => response.json())
        //     .then((data) => this.setState({ choices: data }));

        const response2 = await fetch('https://api.saadatportal.com/api/v1/request').then((response) => response.json())
            .then((data) => this.setState({ requests: data }));

    }

    render() {
        return (
            <>
                <div className="p-3">
                    <div className="back-btn">
                        <Link to="/">
                            بازگشت
                            <i className="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                    <div>
                        <h4>
                            درخواست
                        </h4>
                    </div>
                    <div className={'d-flex'} style={{justifyContent: 'center'}}>
                        <button className={'btn-done'} onClick={() => {
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

                            this.setState({tempFields : resetTypeOfTempFields})
                            this.setState({Validations : resetValidations})
                        }}>
                            <MdDone className='ms-1' />ثبت درخواست
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
                            this.state.requests.map(request => (
                                <>
                                    <div className={'account-found mb-3 shadow d-flex row'} style={{height: '200px'}}>
                                        {/*<div className={'d-flex justify-content-left col-1'} style={{backgroundColor: 'rgb(247, 247, 247)'}}>*/}
                                        {/*    <button><AiFillCloseCircle color="#F1416C" /></button>*/}
                                        {/*</div>*/}
                                        <div className={'row'}>
                                            <div className={'col'}>
                                                <label> عنوان :</label>
                                                {request.name}
                                            </div>
                                            <div className={'col'}>
                                                <label> نوع :</label>
                                                {request.type}
                                            </div>
                                            <div className={'row mt-4'}>
                                                <div className={'col'}>
                                                    <label> درخواست کننده :</label>
                                                    {request.assignee}
                                                </div>
                                                <div className={'col row'}>
                                                    <label className={'col-4'}> وضعیت :</label>
                                                    {
                                                        request.checked !== null
                                                            ? (request.checked === true
                                                            ? <Button disabled={true}
                                                                      variant="success"
                                                                      className={'col-8 btn-done'}
                                                                      style={{width: '30%'}}>
                                                                <MdDone className='ms-1' />قبول شده
                                                            </Button>
                                                            : <>
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    delay={{ show: 250, hide: 400 }}
                                                                    overlay={
                                                                        <Tooltip>
                                                                            <div>
                                                                                <label>عنوان:</label>
                                                                                <p>{request.ifFalseTopic}</p>
                                                                            </div>

                                                                            <div>
                                                                                <label>دلیل:</label>
                                                                                <p>{request.ifFalseReason}</p>
                                                                            </div>

                                                                            <div>
                                                                                <label>نوع:</label>
                                                                                <p>{request.ifFalseType}</p>
                                                                            </div>
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Button variant="danger"
                                                                            className={'col-8'}
                                                                            style={{width: '30%'}}>رد شده</Button>
                                                                </OverlayTrigger>
                                                            </>)
                                                            : <Button disabled={true}
                                                                      variant="secondary"
                                                                      className={'col-8'}
                                                                      style={{width: '30%'}}>
                                                                تعیین نشده
                                                            </Button>
                                                    }
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
                                </>
                            ))
                        }
                    </div>
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
                                       className={`input form-control col ${ this.state.Validations.topic_requireReg === false  ? "is-invalid" : ""}`}
                                       onChange={(e) => this.handleInputChange(e, 'topic')}
                                       placeholder=" "
                                />
                                <label className={'placeholder'} style={{right: this.state.Validations.topic_requireReg === false ? '35px' : '12px'}}>
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
                        <button className="btn btn-success" onClick={(event) => {this.handleSubmitType(event)}}>ثبت
                        </button>

                        <button className="btn btn-light" onClick={() => {
                            this.handleCloseType()
                        }}>بستن
                        </button>

                    </Modal.Footer>
                </Modal>

            </>
        );
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
        this.setState({tempFields : updatedTempFields});
    }

    handleSubmitType = async (e) => {
        e.preventDefault();
        let regCheck = /^\s*$/;

        let topic_requireReg = !regCheck.test(this.state.tempFields.topic);
        let selectedTypeBoolean = this.state.tempFields.type !== undefined && this.state.tempFields.type !== null;
        let name_requireReg = !regCheck.test(this.state.tempFields.name);

        const date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0')
        let year = date.getFullYear();
        let date2 = year+"/"+month+"/"+day+" "+"00:"+"00:"+"00";

        console.log(date2,this.state.tempFields.topic,this.state.tempFields.type,this.state.tempFields.reason,this.state.tempFields.name)
        const rawResponse = await fetch('https://api.saadatportal.com/api/v1/request', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dateOfRegistration: date2,name: this.state.tempFields.topic, type: this.state.tempFields.type, reason: this.state.tempFields.reason, checked:true, supervisorId:"9999999",description:"a",assignee:this.state.tempFields.name})
        });

        const content = await rawResponse.json();
        if (topic_requireReg && selectedTypeBoolean && name_requireReg) {
            let updatedRequests = [...this.state.requests];
            let request = {
                name: this.state.tempFields.topic,
                type: this.state.tempFields.type,
                assignee: this.state.tempFields.name,
                reason: this.state.tempFields.reason,
                checked: null, // null, false, true
            }
            updatedRequests.push(request);
            this.setState({requests: updatedRequests});
        }

        this.handleValidations([topic_requireReg, selectedTypeBoolean, name_requireReg],
            ['topic_requireReg', 'selectedTypeBoolean', 'name_requireReg'])

        return topic_requireReg && selectedTypeBoolean && name_requireReg;

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
}

export default RequestPage;