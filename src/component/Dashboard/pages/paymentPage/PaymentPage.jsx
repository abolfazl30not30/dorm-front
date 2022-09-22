import { Component } from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import png_icon from "../../../../img/png_icon.png";
import pdf_icon from "../../../../img/pdf_icon.png";
import Form from 'react-bootstrap/Form';
// import { Calendar, DatePicker } from 'react-persian-datepicker';
// import { DatePicker } from "jalali-react-datepicker";
import 'react-persian-datepicker/lib/styles/basic.css'
// import Calendar from 'react-input-calendar';
import Calendar from 'react-calendar'
import JCalendar from 'reactjs-persian-calendar'
import 'react-calendar/dist/Calendar.css';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class PaymentPage extends Component {
    state = {
        date: ''
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
                    <p>
                        توضیحات توضیحات توضیحات توضیحات توضیحات
                    </p>
                </div>

                <div className='first-section row'>
                    <div className='col-6'>
                        <div className='form-group col-10'>
                            <input type='text' className='form-control mt-3 input'/>
                        </div>
                        <div className='col-2'>
                            <select className='form-select'>
                                <option>IRR</option>
                                <option>USD</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-6 d-flex'>
                        <div className='col-1 mt-3'>
                            نوع:
                        </div>
                        <div className='col-11'>
                            {/*<Accordion defaultActiveKey="0">*/}
                            {/*    <Accordion.Item eventKey="0">*/}
                            {/*        <Accordion.Header>آپلود شناسنامه</Accordion.Header>*/}
                            {/*        <Accordion.Body>*/}

                            {/*        </Accordion.Body>*/}
                            {/*    </Accordion.Item>*/}
                            {/*</Accordion>*/}
                            <select className='form-select mt-3' name="order" form="order-form">
                                <option>محصولات بهداشتی</option>
                                <option>بیمه</option>
                                <option>+</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='second-section d-flex flex-wrap justify-content-start mr-3' style={{height: '50%'}}>
                    <div className='mt-5 mb-3'>
                        <label className='mb-3'>تاریخ: </label>
                        {/*<DatePicker selected={this.state.startDate} onChange={(date) => this.setStartDate(date)} />*/}
                        {/*<Calendar format='DD/MM/YYYY' date='4-12-2014' />*/}

                        {/*<p>*/}
                        {/*    {*/}
                        {/*        this.state.date*/}
                        {/*    }*/}
                        {/*</p>*/}
                        <JCalendar
                            locale={'fa'}
                            color={'#000066'}
                            size={28}
                            onClick={console.log}
                            itemRender={(key, item, children) => children}
                        />
                        {/*<Calendar value={this.state.value} />*/}
                    </div>
                    <div className='col' style={{width: '30%'}}>
                        <Form>
                            <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>توضیحات: </Form.Label>
                                <Form.Control as="textarea" rows={10} />
                            </Form.Group>
                        </Form>
                    </div>
                </div>

                <div className='third-section'>
                    <label htmlFor="formFileLg" className="form-label">آپلود فاکتور :</label>
                    <input className="form-control form-control-lg" id="formFileLg" type="file" />
                </div>

                <div className='fourth-section mb-5 mt-2' style={{width: '100%'}}>
                    <button type="button" className="btn btn-success btn-lg btn-block mr-2" style={{width: '100%'}}>
                        ثبت
                    </button>
                </div>

            </>
        );
    }
}

export default PaymentPage;