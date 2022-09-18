import { Component } from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import png_icon from "../../../../img/png_icon.png";
import pdf_icon from "../../../../img/pdf_icon.png";
import Form from 'react-bootstrap/Form';

class PaymentPage extends Component {
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
                            <input type='text' className='form-control mt-3'/>
                        </div>
                        <div className='col-2'>
                            <select>
                                <option>IRR</option>
                                <option>USD</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-6 d-flex'>
                        <div className='col-2'>
                            نوع:
                        </div>
                        <div className='col-10'>
                            {/*<Accordion defaultActiveKey="0">*/}
                            {/*    <Accordion.Item eventKey="0">*/}
                            {/*        <Accordion.Header>آپلود شناسنامه</Accordion.Header>*/}
                            {/*        <Accordion.Body>*/}

                            {/*        </Accordion.Body>*/}
                            {/*    </Accordion.Item>*/}
                            {/*</Accordion>*/}
                            <select>
                                <option>محصولات بهداشتی</option>
                                <option>بیمه</option>
                                <option>+</option>

                            </select>
                        </div>
                    </div>
                </div>

                <div className='second-section row'>
                    <div className='col-6'>
                    </div>
                    <div className='col-6'>
                        <Form>
                            <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>توضیحات: </Form.Label>
                                <Form.Control as="textarea" rows={5} />
                            </Form.Group>
                        </Form>
                    </div>
                </div>

            </>
        );
    }
}

export default PaymentPage;