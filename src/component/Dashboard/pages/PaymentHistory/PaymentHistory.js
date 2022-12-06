import {Component, createRef} from "react";
import "../../../../style/paymentHistory.css"
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Button} from "@mui/material";
import {RiDownloadCloud2Fill} from "react-icons/ri";

class PaymentHistory extends Component {
    state = {
        payment: [],
        paymentFilter: [],
        typeTransaction: 'all',
        dataPickerStart: null,
        dataPickerEnd: null,
        dateStart: '',
        dateEnd: '',
        totalPayment: "",
        totalReceive: "",
    }

    async componentDidMount() {
        const response = await fetch('https://api.saadatportal.com/api/v1/account').then((response) => response.json())
            .then((data) => this.setState({totalPayment : data.totalPayment ,totalReceive : data.totalReceived}));

        const response2 = await fetch('https://api.saadatportal.com/api/v1/paymentHistory').then((response) => response.json())
            .then((data) => this.setState({payment : data}));

    }

    render() {
        return (
            <>
                <div className="payment-history">
                    <div className='title'>صورتحساب</div>
                    <div className="d-flex flex-row mt-4">
                        <div className='d-flex flex-row ms-3'>
                            <span className="mx-2">هزینه کل: </span>
                            <span>{this.state.totalPayment} ريال </span>
                        </div>
                        <div className='d-flex flex-row'>
                            <span className="mx-2">درآمد کل:  </span>
                            <span>{this.state.totalReceive} ريال </span>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap my-2 align-items-center">
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            <select className='input' ref={this.type}>
                                <option value='all'>همه تراکنش ها</option>
                                <option value='expend'>پرداخت</option>
                                <option value='receive'>دریافت</option>
                            </select>
                            <label className='placeholder'>نوع تراکنش</label>
                        </div>
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            {/*<DatePicker calendarStyles={this.state.calStyles}*/}
                            {/*            inputFormat="jYYYY/jM/jD"*/}
                            {/*            className='input form-control date-picker'*/}
                            {/*            ref={this.startDate}*/}
                            {/*            onChange={value => {*/}
                            {/*                this.handleDateStartInput(value)*/}
                            {/*            }}*/}
                            {/*/>*/}
                            {/*<label className='placeholder'>از تاریخ</label>*/}

                            <DatePicker
                                // fixMainPosition={false}
                                calendarPosition={`top`}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                format={`YYYY/MM/DD`}


                                containerStyle={{
                                    width: "100%"
                                }}

                                inputClass={`input form-control`}
                                value={this.state.dateStart}
                                onChange={(value) => {
                                    this.handleDateStartInput(value)
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
                                        this.setState({dateStart: {}})
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
                            }}>از تاریخ</label>
                        </div>
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            {/*<DatePicker calendarStyles={this.state.calStyles}*/}
                            {/*            inputFormat="jYYYY/jM/jD"*/}
                            {/*            className='input form-control'*/}
                            {/*            ref={this.endDate}*/}
                            {/*            onChange={value => {*/}
                            {/*                this.handleDateEndInput(value)*/}
                            {/*            }}*/}
                            {/*/>*/}
                            {/*<label className='placeholder'>تا تاریخ</label>*/}

                            <DatePicker
                                // fixMainPosition={false}
                                calendarPosition={`top`}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                format={`YYYY/MM/DD`}

                                containerStyle={{
                                    width: "100%"
                                }}

                                inputClass={`input form-control`}
                                value={this.state.dateEnd}
                                onChange={(value) => {
                                    this.handleDateEndInput(value)
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
                                        this.setState({dateEnd: {}})
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
                            }}>تا تاریخ</label>
                        </div>
                        <div className='input-group-filter col-6 col-md my-2 px-2'>
                            <input type="text" className='input' ref={this.count}/>
                            <label className='placeholder'>تعداد تراکنش</label>
                        </div>
                        <button className='btn btn-see col-12 col-md my-2 px-2' onClick={this.handleSubmit}>مشاهده
                        </button>
                    </div>
                    <div className='mx-3' style={{borderBottom: '1px solid #ddd'}}></div>
                    <div className="table-box">
                        <table className='table mt-4'>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>نوع تراکنش</th>
                                <th>نوع</th>
                                <th>تاریخ</th>
                                <th>مقدار</th>
                                <th>پرداخت کننده</th>
                                <th>توضیحات</th>
                                <th>فايل فاكتور</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.payment.map((peyment, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{peyment.paymentType === "expend" ? ("پرداخت"):("دریافت")}</td>
                                        <td>{peyment.type}</td>
                                        <td>{peyment.date}</td>
                                        <td>{peyment.amount.value}</td>
                                        <td>{peyment.parentId}</td>
                                        <td>{peyment.description}</td>
                                        <td>{Object.keys(peyment.file).length !== 0 &&(
                                            <div className="record-item"
                                                 onClick={() => this.downloadFile(peyment.file)}>
                                                <div className='ms-2'>دانلود</div>
                                                <RiDownloadCloud2Fill/>
                                            </div>
                                        )}
                                        </td>
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


    handleDateStartInput = (value) => {
        // this.setState({dataPickerStart: value})
        // let date = new Date(value._d);
        // let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " 00:00:00";
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year  + '/' + month + '/' + day;
        this.setState({dateStart: convertDate})
    }
    handleDateEndInput = (value) => {
        // this.setState({dataPickerEnd: value})
        // let date = new Date(value._d);
        // let convertDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " 00:00:00";
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year  + '/' + month + '/' + day;
        this.setState({dateEnd: convertDate})
    }
    handleSubmit = async () => {
        let type;
        switch (this.type.current.value) {
            case 'all': {
                type = ["receive", "expend"];
                break;
            }
            case 'receive': {
                type = ["receive"];
                break;
            }
            case 'expend': {
                type = ["expend"];
                break;
            }
        }

        let startDate = this.state.dateStart;
        if(Object.keys(startDate).length === 0){
             startDate = "";
        }

        let endDate = this.state.dateEnd;
        if(Object.keys(endDate).length === 0){
             endDate = "";
        }

        const count = parseInt(this.count.current.value);
        const result = {
            paymentType: type,
            count: count,
            startDate: startDate,
            endDate: endDate
        }
        const rawResponse = await fetch('https://api.saadatportal.com/api/v1/paymentHistory/filter', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        });
        var content = await rawResponse.json();
        console.log(content);
        this.setState({payment: content});
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

    downloadFile = async (file) => {

        var filename = Object.keys(file)[0];

        const response = await fetch(`https://api.saadatportal.com/api/v1/file/${Object.values(file)[0]}`).then((result) => {
            return result.blob();
        })
            .then((blob) => {
                if (blob != null) {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            });
    }
}

export default PaymentHistory;