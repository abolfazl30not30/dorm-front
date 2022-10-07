import {Component, createRef} from "react";
import "../../../../style/paymentHistory.css"
import {DatePicker} from "react-persian-datepicker";
class PaymentHistory extends  Component{
    state = {
        calStyles : {
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
        payment :{},
        typeTransaction: 'all'
    }
    type = createRef();
    startDate = createRef();
    endDate = createRef();
    count = createRef();

    async componentDidMount() {
        let data;
        const response = await fetch('http://api.saadatportal.com/api/v1/paymentHistory').then((response) => response.json())
            .then((data) => this.setState({payment: data},()=>{
                // console.log(this.state.payment)
            }));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const type = this.type.current;
        const startTime = this.startTime.current.value;
        const endTime = this.endTime.current.value;
        const count = this.count.current.value;
        // console.log(type)
    }

    render() {
        return (
            <>
                <div className="payment-history">
                    <div className='title'>صورتحساب</div>
                    <div className="d-flex flex-row mt-4">
                        <div className='d-flex flex-row ms-3'>
                            <span>هزینه کل:</span>
                            <span>50000</span>
                        </div>
                        <div className='d-flex flex-row'>
                            <span>درآمد کل:</span>
                            <span>60000</span>
                        </div>
                    </div>
                    <form className="d-flex flex-row flex-wrap my-2 align-items-center" onSubmit={this.handleSubmit}>
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            <select className='input' ref={this.type}>
                                <option value='all'>همه تراکنش ها</option>
                                <option value='withdraw'>برداشت</option>
                                <option value='deposit'>واریز</option>
                            </select>
                            <label className='placeholder'>نوع تراکنش</label>
                        </div>
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className='input form-control date-picker'
                                        ref={this.startDate}
                            />
                            <label className='placeholder'>از تاریخ</label>
                        </div>
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className='input form-control'
                                        ref={this.endDate}
                            />
                            <label className='placeholder'>تا تاریخ</label>
                        </div>
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            <select className='input' ref={this.count}>
                                <option value='10'>10</option>
                                <option value='25'>25</option>
                                <option value='50'>50</option>
                                <option value='100'>100</option>
                            </select>
                            <label className='placeholder'>تعداد تراکنش</label>
                        </div>
                        <button className='btn btn-see col-12 col-md my-2 px-2'>مشاهده</button>
                    </form>
                    <div className='mx-3' style={{borderBottom: '1px solid #ddd'}}></div>
                    <div className="table-box">
                        <table className='table mt-4'>
                            <thead>
                            <tr>
                                <th>تاریخ</th>
                                <th>مقدار</th>
                                <th>نوع</th>
                                <th>پرداخت کننده</th>
                                <th>توضیحات</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>تاریخ</td>
                                <td>مقدار</td>
                                <td>نوع</td>
                                <td>پرداخت کننده</td>
                                <td>توضیحات</td>
                            </tr>
                            <tr>
                                <td>تاریخ</td>
                                <td>مقدار</td>
                                <td>نوع</td>
                                <td>پرداخت کننده</td>
                                <td>توضیحات</td>
                            </tr>
                            <tr>
                                <td>تاریخ</td>
                                <td>مقدار</td>
                                <td>نوع</td>
                                <td>پرداخت کننده</td>
                                <td>توضیحات</td>
                            </tr>
                            <tr>
                                <td>تاریخ</td>
                                <td>مقدار</td>
                                <td>نوع</td>
                                <td>پرداخت کننده</td>
                                <td>توضیحات</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}
export default PaymentHistory;