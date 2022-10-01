import {Component} from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';
import {Calendar, DatePicker} from 'react-persian-datepicker';
import 'react-persian-datepicker/lib/styles/basic.css'
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {Modal} from "react-bootstrap";
import {IoIosAddCircleOutline} from "react-icons/io";
import "../../../../style/evan-calender-style.css";
import '../../../../style/paymentPage.css';
import {AiFillCloseCircle} from "react-icons/ai";
import {MdCloudUpload, MdDelete} from "react-icons/md";
import {RiFileUploadFill} from "react-icons/ri";

import Alert from 'react-bootstrap/Alert';
import {containerClasses} from "@mui/material";


class PaymentPage extends Component {
    state = {
        choices: [
            'محصولات بهداشتی',
            'بیمه',
        ],
        tempChoices: [],
        inputType: "",
        showType: false,

        paymentInput: {
            date: "",
            unit: "",
            value: "",
            type: "",
            paymentType:"",
            description: "",
            file: {
                name: "",
                fileId: "",
            }
        },
        styles: {
            calendarContainer: "calendarContainer",
            dayPickerContainer: "dayPickerContainer",
            monthsList: "monthsList",
            daysOfWeek: "daysOfWeek",
            dayWrapper: "dayWrapper",
            selected: "selected",
            heading: "heading",
            next: "next",
            prev: "prev",
            title: "title",
        },
        isUpload: false,
        uploadFile: [],
        date: '',
        selectedType: null,
        price:'',
        description: '',
        priceType:"IRR", // default value

        Validations: {
            price_requiredReg: '',
            price_numberReg: '',
            selectedTypeBoolean: true,
            date_requiredReg: '',
        }

    }

    handleClick(e) {
        e.preventDefault();
        // console.log(this.state.inputText)
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
                <div className="text">
                    <h4>ثبت فاکتور</h4>
                </div>

                <div className='first-section row'>
                    <div className='col-4'>
                        <label htmlFor="price">مبلغ :</label>
                        <div className="row" style={{marginTop: "20px"}}>
                            <div className='col-3 m-0 p-0'>
                                <select className='form-select' style={{height: "50px"}} value={this.state.priceType} onChange={(e)=>{this.handlePriceType(e)}}>
                                    <option value="IRR">ریال</option>
                                    <option value="USD">دلار</option>
                                </select>
                            </div>
                            <div className='form-group col-9 m-0 p-0'>
                                <input id="price"
                                       type='text'
                                       className={`input form-control ${(this.state.Validations.price_requiredReg && this.state.Validations.price_numberReg) === false ? "is-invalid" : ""}`}
                                       style={{height: "50px", width: "90%"}} onChange={(e)=>{this.handlePriceInput(e)}}/>

                                {
                                    this.state.Validations.price_requiredReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                                {
                                    (this.state.Validations.price_numberReg === false && this.state.Validations.price_requiredReg === true)
                                        ? <small
                                            className="text-danger">عدد وارد کنید!</small>
                                        : <div/>
                                }

                                {/*<TextField id="filled-basic" label="قیمت" variant="filled" />*/}
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <label style={{marginRight: "33px"}}>نوع: </label>
                        <div style={{width: '100%', marginRight: "16px"}}>
                            <Accordion defaultActiveKey="0"
                                       style={{backgroundColor: this.state.Validations.selectedTypeBoolean ? '' : 'rgba(255, 0, 0, 0.4)'}}
                            >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        {this.state.selectedType}&nbsp;
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className=' row flex-wrap'>
                                                {
                                                    this.state.Validations.selectedTypeBoolean // ifSelected condition
                                                    ? null
                                                        : <div className="d-flex justify-content-center mb-3">
                                                            <small className="text-danger">یکی از فیلدهای زیر را اتخاب کنید!</small>
                                                          </div>
                                                }
                                                <ToggleButtonGroup
                                                    orientation="vertical"
                                                    value={this.state.selectedType}
                                                    exclusive
                                                    onChange={this.handleAlignment}
                                                    aria-label="text alignment"
                                                >
                                                    {
                                                        this.state.choices.map((c) =>
                                                            <ToggleButton value={c} className='col'>
                                                                {c}
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
                                                                        <button className="close-btn" onClick={() => {
                                                                            this.handleDeleteType(i)
                                                                        }}><AiFillCloseCircle color="#F1416C"/></button>
                                                                    </div>
                                                                    <div className="">{type}</div>
                                                                </div>
                                                            </ToggleButton>
                                                        )
                                                    }
                                                    <button value="add"
                                                            onClick={() => {
                                                                this.handleOpenType()
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
                </div>
                <div className='second-section d-flex flex-wrap justify-content-start mr-3 row' style={{height: '50%'}}>
                    <div className='col-4 mt-5 mb-3 date-container'>
                        <label className='mb-3'>تاریخ: </label>
                        <DatePicker calendarStyles={this.state.styles}
                                    className={`input form-control ${this.state.Validations.date_requiredReg === false ? "is-invalid" : ""}`}
                                    value={this.state.date}
                                    onChange={value=>{this.handleDateInput(value)}}
                        />

                        {
                            this.state.Validations.date_requiredReg === false
                                ? <small
                                    className="text-danger">این فیلد الزامی است!</small>
                                : <div/>
                        }

                    </div>
                    <div className='col-8'>
                        <Form>
                            <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{marginRight: '30px'}}>توضیحات: </Form.Label>
                                <Form.Control as="textarea" rows={8} style={{marginRight: '30px', width: '95%'}} onChange={(e)=>{this.handleDescriptionInput(e)}}/>
                            </Form.Group>
                        </Form>
                    </div>
                </div>

                <div className='third-section'>
                    <label htmlFor="formFileLg" className="form-label">آپلود فاکتور :</label>
                    <div className="row">
                        <div className="col-6">
                            <input className="form-control form-control" id="formFileLg" type="file" onChange={(e)=>{this.handleInputFile(e)}}/>
                        </div>
                        <div className="col-6">
                            {this.state.isUpload ? (
                                <div className="file-container">
                                    <button className="deleteBtn"><MdDelete fontSize="25px"/></button>
                                    <div className="d-flex align-items-center">
                                        <h6 className="mx-1">first page</h6>
                                        <RiFileUploadFill/>
                                    </div>
                                </div>
                            ) : (
                                <button className="uploadBtn" onClick={this.handleUpload}><MdCloudUpload fontSize="35px"/></button>
                            )}
                        </div>
                    </div>
                    <div>
                        {
                            this.state.isUpload ? (
                                <Alert variant='success' className="mt-3">
                                    فایل با موفقیت آپلود شد
                                </Alert>
                            ):(<div></div>)
                        }
                    </div>


                </div>

                <div className='fourth-section mb-5 mt-2' style={{width: '100%'}}>
                    <button type="button"
                            className="btn btn-success btn-lg btn-block mr-2"
                            style={{width: '100%'}}
                            onClick={this.handleSubmitPayment}
                    >
                        ثبت
                    </button>
                </div>
                <Modal centered show={this.state.showType} onHide={() => {
                    this.handleCloseType()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن نوع جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <input type='text'
                               className='form-control mt-3 mb-3 input'
                               onChange={(e) => this.handleInputChange(e)} placeholder="نوع جدید"/>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={(event) => {
                            this.handleSubmitType(event)
                        }}>ثبت
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

    handleOpenType = () => {
        this.setState({showType: true});
    }

    handleCloseType = () => {
        this.setState({showType: false});
    }

    handleAlignment = (event, newAlignment) => {
        this.setState({selectedType: newAlignment});

    };
    handleInputChange = (e) => {
        this.setState({inputType: e.target.value});
    }

    handleSubmitType = (e) => {
        e.preventDefault();
        let regCheck = /^\s*$/;
        if (!regCheck.test(this.state.inputType)) {
            let updateChoice = [...this.state.tempChoices];
            updateChoice.push(this.state.inputType);
            this.setState({tempChoices: updateChoice});
        }
        this.setState({showType: false})
    }

    handleDeleteType = (index) => {
        let updateChoice = [...this.state.tempChoices];
        updateChoice.splice(index, 1);
        this.setState({tempChoices: updateChoice});
    }

    handleUpload = async () =>{
        let formData = new FormData();
        console.log(this.state.uploadFile[0]);

        formData.append('file',this.state.uploadFile[0]);

        await fetch('http://localhost:8089/api/v1/file', {
            method: 'POST',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            body: formData
        }).then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                this.setState({fileId : result.message.id})
                this.setState({isUpload:true})
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({isUpload:false})
            });

    }

    handleValidations = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^[0-9]*$/;

        let price_requiredReg = !requiredReg.test(this.state.price);
        let price_numberReg = numberReg.test(this.state.price);
        let selectedTypeBoolean = this.state.selectedType !== null;
        let date_requiredReg = !requiredReg.test(this.state.date);

        console.log("1")
        console.log(price_requiredReg, price_numberReg, selectedTypeBoolean, date_requiredReg)

        let newValidations = {...this.state.Validations};
        newValidations.price_requiredReg = price_requiredReg;
        newValidations.price_numberReg = price_numberReg;
        newValidations.selectedTypeBoolean = selectedTypeBoolean;
        newValidations.date_requiredReg = date_requiredReg;

        this.setState({Validations: newValidations});

        return price_requiredReg && price_numberReg && selectedTypeBoolean && date_requiredReg;
    }

    handleInputFile = (event) =>{
        this.setState({uploadFile : event.target.files})
    }

    handlePriceInput = (event) =>{
        this.setState({price:event.target.value})
    }

    handleDescriptionInput = (event)=>{
        this.setState({description:event.target.value})
    }

    handleDateInput = (value)=>{
        this.setState({date:value})
        let date = new Date(value._d);
        console.log(date.getDate())
    }
    handlePriceType = (event) =>{
        this.setState({priceType:event.target.value})
    }

    handleSubmitPayment = async () => {
        let result = this.handleValidations();

        // console.log(this.state)
        // console.log(this.state.Validations)

        if (result) {
            const rawResponse = await fetch('http://api.saadatportal.com/api/v1/paymentHistory', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        date: "1400/01/01 00:00:00",
                        unit: this.state.priceType,
                        value: this.state.price,
                        type: this.state.selectedType,
                        paymentType: "receive",
                        description: this.state.description,
                        parentId: "",
                        parentType: "Personnel",
                    }
                )
            });
            var content = await rawResponse.json();
            console.log(content);
        } else {
            console.log("ERROR")
        }
    }
}

export default PaymentPage;