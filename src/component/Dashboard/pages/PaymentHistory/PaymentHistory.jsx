import {Component, createRef} from "react";
import "../../../../style/paymentHistory.css"
import {DatePicker} from "react-persian-datepicker";
import {AiOutlineEye} from 'react-icons/ai'
import {BsCalculator} from 'react-icons/bs'

class PaymentHistory extends Component {

    state = {
        calStyles: {
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
        payment:[]
        ,
        paymentFilter: [],
        typeTransaction: 'all',
        dataPickerStart: null,
        dataPickerEnd: null,
        dateStart: '',
        dateEnd: ''
    }

    render() {
        return (
            <>
                <div className="payment-history">
                    <div className='title'>صورتحساب</div>
                    <form className="d-flex flex-row flex-wrap my-2 align-items-center mt-3" onSubmit={this.handleSubmit}>
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
                                        onChange={value => {
                                            this.handleDateStartInput(value)
                                        }}
                            />
                            <label className='placeholder'>از تاریخ</label>
                        </div>
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            <DatePicker calendarStyles={this.state.calStyles}
                                        inputFormat="jYYYY/jM/jD"
                                        className='input form-control'
                                        ref={this.endDate}
                                        onChange={value => {
                                            this.handleDateEndInput(value)
                                        }}
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
                        <button className='btn btn-see col-12 col-md my-2 px-2'><AiOutlineEye className={'ms-1'}/>مشاهده
                        </button>
                    </form>
                    <div className="d-flex flex-row my-2">
                        <div className='d-flex flex-row ms-3'>
                            <span><BsCalculator className={'ms-1'} />هزینه کل:</span>
                            <span>50000</span>
                        </div>
                        <div className='d-flex flex-row'>
                            <span><BsCalculator className={'ms-1'} />درآمد کل:</span>
                            <span>60000</span>
                        </div>
                    </div>
                    <div className='mx-3' style={{borderBottom: '1px solid #ddd'}}></div>
                    <div className="table-box">
                        <table className='table mt-4'>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>نوع</th>
                                <th>تاریخ</th>
                                <th>مقدار</th>
                                <th>پرداخت کننده</th>
                                <th>توضیحات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.payment.map((peyment, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{peyment.type}</td>
                                        <td>{new Date(peyment.date).toLocaleDateString('fa-IR')}</td>
                                        <td>{peyment.amount.value}</td>
                                        <td>{peyment.parentId}</td>
                                        <td>{peyment.description}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }

    type = createRef();
    startDate = createRef();
    endDate = createRef();
    count = createRef();

    /*async componentDidMount() {
        let data;
        const response = await fetch('https://api.saadatportal.com/api/v1/paymentHistory').then((response) => response.json())
            .then((data) => this.setState({payment: data}, () => {
                // console.log(this.state.payment)
            }));
    }*/

    handleDateStartInput = (value) => {
        // this.setState({dataPickerStart: value})
        let date = new Date(value._d);
        let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
        this.setState({dateStart: convertDate})
    }
    handleDateEndInput = (value) => {
        // this.setState({dataPickerEnd: value})
        let date = new Date(value._d);
        let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
        this.setState({dateEnd: date})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const type = this.type.current.value;
        const startTime = this.state.dateStart;
        const endTime = this.state.dateEnd;
        const count = this.count.current.value;

        // filter type
        /*( () => {
            switch (type) {
                case 'all':
                    return (() => {
                        console.log(this.state.payment)
                    })();
                case 'withdraw':
                    return (() => {
                        const list = this.state.payment;
                        const filterType = list.filter((payment) => payment.paymentType === 'expend')
                        this.setState({paymentFilter : filterType})
                        console.log(this.state.paymentFilter)
                    })();
                case 'deposit':
                    return (() => {
                        const list = this.state.payment;
                        const filterType = list.filter((payment) => payment.paymentType === 'deposit')
                        this.setState({paymentFilter : filterType})
                        console.log(this.state.paymentFilter)
                    })();
            }
        })();*/
        // filter count
        /*( () => {
            switch (count) {
                case '10':
                    return (() => {
                        console.log('10')
                    })();
                case '25':
                    return (() => {
                        console.log('25')
                    })();
                case '50':
                    return (() => {
                        console.log('50')
                    })();
                case '100':
                    return (() => {
                        console.log('100')
                    })();
            }
        })();*/
        /*console.log(startTime)*/
    }

}

export default PaymentHistory;