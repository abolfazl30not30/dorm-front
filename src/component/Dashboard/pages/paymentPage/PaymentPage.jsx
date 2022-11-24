import {Component} from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';
import {DatePicker} from 'react-persian-datepicker';
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
import ReactLoading from 'react-loading';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment-jalali';

class PaymentPage extends Component {
    state = {
        choices: [],
        tempChoices: [],
        inputType: "",
        showType: false,

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
        hasError: false,
        isLoading: false,
        uploadFile: [],

        dataPicker: null,
        date: '',
        selectedType: null,
        price: '',
        description: '',
        priceType: "IRR", // default value
        fileName: "",
        fileId: "",
        paymentType:"receive",

        Validations: {
            price_requiredReg: '',
            price_numberReg: '',
            selectedTypeBoolean: true,
            date_requiredReg: '',
        }

    }

    async componentDidMount() {

        const response2 = await fetch('https://api.saadatportal.com/api/v1/category/search?type=Payment').then((response) => response.json())
            .then((data) => this.setState({choices : data}));
    }

    render() {
        return (
            <>
                <div>
                    <div className="back-btn">
                        <Link to="/dashboard">
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
                                    <select className='form-select' style={{height: "50px"}} value={this.state.priceType}
                                            onChange={(e) => {
                                                this.handlePriceType(e)
                                            }}>
                                        <option value="IRR">ریال</option>
                                        <option value="USD">دلار</option>
                                    </select>
                                </div>
                                <div className='form-group col-9 m-0 p-0'>
                                    <input id="price"
                                           type='text'
                                           value={this.state.price}
                                           className={`input form-control ${(this.state.Validations.price_requiredReg && this.state.Validations.price_numberReg) === false ? "is-invalid" : ""}`}
                                           style={{height: "50px", width: "90%"}} onChange={(e) => {
                                        this.handlePriceInput(e)
                                    }}/>

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
                            <label style={{marginRight: "33px"}}>نوع : </label>
                            <div style={{width: '100%', marginRight: "16px"}}>
                                <Accordion
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
                                                                <small className="text-danger">یکی از فیلدهای زیر را اتخاب
                                                                    کنید!</small>
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
                            <div>
                                <label className='mb-3'>تاریخ: </label>
                                <DatePicker calendarStyles={this.state.styles}
                                            value={this.state.dataPicker}
                                            className={`input form-control ${this.state.Validations.date_requiredReg === false ? "is-invalid" : ""}`}
                                            onChange={value => {
                                                this.handleDateInput(value)
                                            }}
                                />

                                {
                                    this.state.Validations.date_requiredReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }
                            </div>
                            <div>
                                <label htmlFor="price" className="mt-3">نوع تراکنش:</label>
                                <div className="row" style={{marginTop: "10px"}}>
                                    <div className='col-11 mx-3 p-0'>
                                        <select className='form-select' style={{height: "50px"}} value={this.state.paymentType}
                                                onChange={(e) => {
                                                    this.setState({paymentType:e.target.value})
                                                }}>
                                            <option value="expend">پرداخت</option>
                                            <option value="receive">دریافت</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-8'>
                            <Form>
                                <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label style={{marginRight: '30px'}}>توضیحات: </Form.Label>
                                    <Form.Control as="textarea" rows={8} value={this.state.description}
                                                  style={{marginRight: '30px', width: '95%'}} onChange={(e) => {
                                        this.handleDescriptionInput(e)
                                    }}/>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className="row">

                    </div>
                    <div className='third-section'>
                        <label htmlFor="formFileLg" className="form-label">آپلود فاکتور :</label>
                        <div className="row">
                            <div className="col-6">
                                <input className="form-control form-control " id="formFileLg" type="file" onChange={(e) => {
                                    this.handleInputFile(e)
                                }}/>
                            </div>
                            <div className="col-6">
                                {this.state.isUpload && !this.state.hasError ? (
                                    <div className="file-container">
                                        <button className="deleteBtn" onClick={this.handleDeleteFile}><MdDelete
                                            fontSize="25px"/></button>
                                        <div className="d-flex align-items-center">
                                            <h6 className="mx-1">{this.state.fileName}</h6>
                                            <RiFileUploadFill/>
                                        </div>
                                    </div>
                                ) : (this.state.isLoading ? (
                                        <div className="d-flex align-item-start">
                                            <button className="uploadBtn" onClick={this.handleUpload}
                                                    disabled={this.state.isLoading}><MdCloudUpload fontSize="35px"/>
                                            </button>
                                            <ReactLoading type="cylon" color="#bdc3c7" className="loading" height={1}
                                                          width={45}/>
                                        </div>
                                    ) : (
                                        <button className="uploadBtn" onClick={this.handleUpload}
                                                disabled={this.state.isLoading}><MdCloudUpload fontSize="35px"/></button>
                                    )
                                )}

                            </div>
                        </div>
                        <div>
                            {
                                this.state.isUpload && (
                                    (this.state.hasError) ? (
                                        <Alert variant='danger' className="mt-3">
                                            فایل آپلود نشد
                                        </Alert>
                                    ) : (
                                        <Alert variant='success' className="mt-3">
                                            فایل با موفقیت آپلود شد
                                        </Alert>
                                    )
                                )
                            }
                        </div>


                    </div>

                    <div className='fourth-section mt-5 mb-3 d-flex justify-content-center'>
                        <button type="button"
                                className="btn btn-success "
                                style={{width: '50%'}}
                                onClick={this.handleSubmitPayment}
                        >
                            ثبت
                        </button>
                    </div>
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

    handleClick(e) {
        e.preventDefault();
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

    handleDeleteFile = async () => {
        await fetch(`https://api.saadatportal.com/api/v1/file/${this.state.fileId}`, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => console.log(res));
        this.setState({fileId: ""});
        this.setState({isUpload: false});
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

    handleUpload = async () => {
        this.setState({isLoading: true});
        let formData = new FormData();
        console.log(this.state.uploadFile[0]);
        formData.append('file', this.state.uploadFile[0]);
        await fetch('https://api.saadatportal.com/api/v1/file', {
            method: 'POST',
            body: formData
        }).then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                this.setState({fileId: result.message.id})
                this.setState({isUpload: true})
                this.setState({hasError: false})
                this.setState({isLoading: false});
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({isUpload: true})
                this.setState({hasError: true})
                this.setState({isLoading: false});
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

    handleInputFile = async (event) => {
        this.setState({uploadFile: event.target.files})
        this.setState({fileName: event.target.files[0].name})
    }

    handlePriceInput = (event) => {
        this.setState({price: event.target.value})
    }

    handleDescriptionInput = (event) => {
        this.setState({description: event.target.value})
    }

    handleDateInput = (value) => {
        this.setState({dataPicker: value})
        let date = new Date(value._d);
        let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + "00:" + "00:" + "00";
        this.setState({date: convertDate})
    }

    handlePriceType = (event) => {
        this.setState({priceType: event.target.value})
    }

    handleSubmitPayment = async () => {
        let result = this.handleValidations();
        let payment = {
            date: this.state.date,
            unit: this.state.priceType,
            value: this.state.price,
            type: this.state.selectedType,
            paymentType: this.state.paymentType,
            description: this.state.description,
            parentId: "",
            parentType: "Personnel",
        }
        if (this.state.fileId !== "") {
            let file = {file:{
                    name: this.state.fileName,
                    fileId:this.state.fileId
                }}
            payment = Object.assign(payment,file)
        }
        if (result) {
            const rawResponse = await fetch('https://api.saadatportal.com/api/v1/paymentHistory', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payment)
            });
            var content = await rawResponse.json();
            console.log(content);
            this.setState({
                date: "",
                price: "",
                selectedType: "",
                description: "",
                fileName: "",
                fileId: "",
                isUpload: false,
            })
        } else {
            console.log("ERROR")
        }
    }
}

export default PaymentPage;