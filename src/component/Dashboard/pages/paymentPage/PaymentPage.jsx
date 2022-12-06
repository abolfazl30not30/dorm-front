import {Component} from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-multi-date-picker";
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
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Button} from "@mui/material";

/*import React from "@types/react";*/

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
        paymentType: "receive",

        Validations: {
            price_requiredReg: '',
            price_numberReg: '',
            selectedTypeBoolean: true,
            date_requiredReg: '',
        },
        showDoneModal: false
    }

    async componentDidMount() {

        const response2 = await fetch('https://api.saadatportal.com/api/v1/category/search?type=Payment').then((response) => response.json())
            .then((data) => this.setState({choices: data}));
    }

    render() {
        return (
            <>
                <div className="back-btn mb-2">
                    <Link to="/dashboard">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>
                <div className="payment-box">
                    <div className="title">
                        <h4>ثبت فاکتور</h4>
                    </div>
                    <div className="d-flex flex-wrap flex-md-row flex-column">
                        <div className="input-group-register col-md-2 col-12">
                            <select className='form-select input'
                                    value={this.state.priceType}
                                    onChange={(e) => {
                                        this.handlePriceType(e)
                                    }}>
                                <option value="IRR">ریال</option>
                                <option value="USD">دلار</option>
                            </select>
                            <label className="placeholder">واحد</label>
                        </div>
                        <div className="input-group-register col-md-4 col-12">
                            <input id="price"
                                   type='number'
                                   value={this.state.price}
                                   className={`input form-control ${(this.state.Validations.price_requiredReg && this.state.Validations.price_numberReg) === false ? "is-invalid" : ""}`}
                                   onChange={(e) => {
                                       this.handlePriceInput(e)
                                   }}/>
                            <label className="placeholder">مبلغ</label>

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

                        </div>
                        <div className="input-group-register col-md-6 col-12">
                            <div>
                                <Accordion
                                    className='p-0'
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
                                                                            <button className="close-btn"
                                                                                    onClick={() => {
                                                                                        this.handleDeleteType(i)
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
                            <label className="placeholder placeholder-typePayment">نوع</label>
                        </div>
                        <div className="input-group-register col-md-2 col-12 date-container">
                            <DatePicker
                                // fixMainPosition={false}
                                calendarPosition={`top`}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                format={`YYYY/MM/DD`}


                                containerStyle={{
                                    width: "100%"
                                }}

                                inputClass={`input form-control`}
                                value={this.state.dataPicker}
                                onChange={(value) => {
                                    this.handleDateInput(value)
                                }}

                                mapDays={({ date }) => {
                                    let props = {}
                                    let isWeekend = [6].includes(date.weekDay.index)

                                    if (isWeekend)
                                        props.className = "highlight highlight-red";

                                    return props
                                }}

                                weekDays={
                                    [
                                        ["شنبه", "Sat"],
                                        ["یکشنبه", "Sun"],
                                        ["دوشنبه", "Mon"],
                                        ["سه شنبه", "Tue"],
                                        ["چهارشنبه", "Wed"],
                                        ["پنجشنبه", "Thu"],
                                        ["جمعه", "Fri"],
                                    ]
                                }

                                calendar={persian}
                                locale={persian_fa}

                            >
                                <Button
                                    onClick={() => {
                                        this.setState({dataPicker: {}})
                                        }
                                    }
                                >
                                    ریست
                                </Button>
                            </DatePicker>
                            <label className="placeholder" style={{
                                top: '-8px',
                                backgroundColor: '#fff',
                                color: '#2a2e32b3',
                                padding: '0 0.4rem',
                                opacity: '1',
                            }}>تاریخ</label>
                        </div>
                        <div className="input-group-register col-md-10 col-12">
                                <textarea className="input form-control" value={this.state.description} placeholder=" "
                                          onChange={(e) => {
                                              this.handleDescriptionInput(e)
                                          }}></textarea>
                            <label className="placeholder">توضیحات</label>
                        </div>
                        <div className="input-group-register col-md-2 col-12">
                            <select className='form-select input'
                                    value={this.state.paymentType}
                                    onChange={(e) => {
                                        this.setState({paymentType:e.target.value})
                                    }}>
                                <option value="receive">دریافت</option>
                                <option value="expend">پرداخت</option>
                            </select>
                            <label className="placeholder">واحد</label>
                        </div>
                    </div>
                    <div className='third-section'>
                        <label htmlFor="formFileLg" className="form-label">آپلود فاکتور :</label>
                        <div className="row">
                            <div className="col-6">
                                <input className="form-control form-control " id="formFileLg" type="file"
                                       onChange={(e) => {
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
                                                disabled={this.state.isLoading}><MdCloudUpload fontSize="35px"/>
                                        </button>
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
                                className="btn-done"
                                style={{width: '5rem'}}
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
                    <Modal.Footer className="justify-content-center">
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

                <Modal centered show={this.state.showDoneModal} className='modal-done'>
                    <Modal.Body className="px-4">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-column">
                                <div className="icon">
                                    <span className="glyphicon glyphicon-ok"></span>
                                </div>
                                <div className="title-modal-done">
                                    موفق!
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between my-3">
                                <Link to="/dashboard/PaymentHistory" className='btn button-show'
                                      onClick={() => this.setState({showDoneModal: false})}>رفتن به صورتحساب</Link>
                                <Link to="" className='btn button-close'
                                      onClick={() => {this.setState({showDoneModal: false});
                                          window.location.reload(false);
                                      }}>بستن</Link>
                            </div>
                        </div>
                    </Modal.Body>
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
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year  + '/' + month + '/' + day;
        // let date = new Date(value._d);
        // let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + "00:" + "00:" + "00";
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
            parentId: "123",
            parentType: "Personnel",
        }
        if (this.state.fileId !== "") {
            let file = {
                file: {
                    name: this.state.fileName,
                    fileId: this.state.fileId
                }
            }
            payment = Object.assign(payment, file)
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
            });
            this.setState({showDoneModal: true})
        } else {
            console.log("ERROR")
        }
    }
}

export default PaymentPage;