import { Component } from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';
import { Calendar, DatePicker } from 'react-persian-datepicker';
import 'react-persian-datepicker/lib/styles/basic.css'
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {Modal} from "react-bootstrap";
import {IoIosAddCircleOutline} from "react-icons/io";
import "../../../../style/evan-calender-style.css";
import '../../../../style/paymentPage.css';


class PaymentPage extends Component {
    state = {
        date: '',
        selectedType: '',
        choices: [
            'محصولات بهداشتی',
            'بیمه',
        ],
        inputType:"",
        showType:false,
        styles : {
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
        }
    }

    handleClick(e) {
        e.preventDefault();
        // console.log(this.state.inputText)
    }
    handleAlignment = (event, newAlignment) => {
        this.setState({selectedType : newAlignment});
    };

    updateChoices = (text) => {
        var newArr = this.state.choices;
        newArr.push(text);
        this.setState({choices:newArr})
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
                        <label for="price">مبلغ :</label>
                        <div className="row" style={{marginTop:"20px"}}>
                            <div className='col-3 m-0 p-0'>
                                <select className='form-select' style={{height:"50px"}}>
                                    <option>ریال</option>
                                    <option>دلار</option>
                                </select>
                            </div>
                            <div className='form-group col-9 m-0 p-0'>
                                <input  id="price" type='text' className='form-control  input ' style={{height:"50px",width:"90%"}}/>
                                {/*<TextField id="filled-basic" label="قیمت" variant="filled" />*/}
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <label style={{marginRight:"33px"}}>نوع: </label>
                        <div style={{width: '100%',marginRight:"16px"}}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{this.state.selectedType}&nbsp;</Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className=' row flex-wrap'>
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
                                                    <button value="add"
                                                                  onClick={() => {this.handleOpenType()}}
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
                        <DatePicker calendarStyles={this.state.styles}/>
                    </div>
                    <div className='col-8'>
                        <Form>
                            <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{marginRight: '30px'}}>توضیحات: </Form.Label>
                                <Form.Control as="textarea" rows={8} style={{marginRight: '30px', width: '95%'}}  />
                            </Form.Group>
                        </Form>
                    </div>
                </div>

                <div className='third-section'>
                    <label htmlFor="formFileLg" className="form-label">آپلود فاکتور :</label>
                    <input className="form-control form-control" id="formFileLg" type="file" />
                </div>

                <div className='fourth-section mb-5 mt-2' style={{width: '100%'}}>
                    <button type="button"
                            className="btn btn-success btn-lg btn-block mr-2"
                            style={{width: '100%'}}
                    >
                        ثبت
                    </button>
                </div>
                <Modal centered show={this.state.showType} onHide={() => { this.handleCloseType() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن نوع جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <input type='text'
                               className='form-control mt-3 mb-3 input'
                               onChange={(e) => this.handleInputChange(e)} placeholder="نوع جدید"/>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={(event) => {this.handleSubmitType(event)}}>ثبت</button>
                        <button className="btn btn-light" onClick={() => {this.handleCloseType()}}>بستن</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    handleOpenType = ()=>{
        this.setState({showType:true});
    }

    handleCloseType = () =>{
        this.setState({showType:false})
    }

    handleInputChange = (e) =>{
        this.setState({inputType:e.target.value});
    }

    handleSubmitType = (e) => {
        e.preventDefault();
        let regCheck =  /^\s*$/ ;
        if(!regCheck.test(this.state.inputType)){
            let updateChoice = [...this.state.choices];
            updateChoice.push(this.state.inputType);
            this.setState({choices:updateChoice});
        }
        this.setState({showType:false})
    }
}

export default PaymentPage;