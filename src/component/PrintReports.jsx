import React, {Component} from "react";
import {Table} from "react-bootstrap";
import headerLogo from "./../img/sadat logo-png.png"
class PrintReports extends Component {
    // state = {
    //     cleaningReport: this.props.report.filter((report) => report.title === "cleaning"),
    //     delayInArrivalReport: this.props.report.filter((report) => report.title === "delayInArrival"),
    //     exitReport: this.props.report.filter((report) => report.title === "exit"),
    //     violationReport: this.props.report.filter((report) => report.title === "violation"),
    //     penaltyReport: this.props.report.filter((report) => report.title === "penalty"),
    //     dischargeReport: this.props.report.filter((report) => report.title === "discharge"),
    //     cancelContractReport: this.props.report.filter((report) => report.title === "cancelContract")
    // }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         cleaningReport: this.props.report.filter((report) => report.title === "cleaning"),
    //         delayInArrivalReport: this.props.report.filter((report) => report.title === "delayInArrival"),
    //         exitReport: this.props.report.filter((report) => report.title === "exit"),
    //         violationReport: this.props.report.filter((report) => report.title === "violation"),
    //         penaltyReport: this.props.report.filter((report) => report.title === "penalty"),
    //         dischargeReport: this.props.report.filter((report) => report.title === "discharge"),
    //         cancelContractReport: this.props.report.filter((report) => report.title === "cancelContract")
    //     }
    // }
    static getDerivedStateFromProps(props, state) {
        return {
            cleaningReport: props.report.filter((report) => report.title === "cleaning"),
            delayInArrivalReport: props.report.filter((report) => report.title === "delayInArrival"),
            exitReport: props.report.filter((report) => report.title === "exit"),
            violationReport: props.report.filter((report) => report.title === "violation"),
            penaltyReport: props.report.filter((report) => report.title === "penalty"),
            dischargeReport: props.report.filter((report) => report.title === "discharge"),
            cancelContractReport: props.report.filter((report) => report.title === "cancelContract")
        }
    };
    // componentDidMount() {
    //     this.setState({
    //         cleaningReport: this.props.report.filter((report) => report.title === "cleaning"),
    //         delayInArrivalReport: this.props.report.filter((report) => report.title === "delayInArrival"),
    //         exitReport: this.props.report.filter((report) => report.title === "exit"),
    //         violationReport: this.props.report.filter((report) => report.title === "violation"),
    //         penaltyReport: this.props.report.filter((report) => report.title === "penalty"),
    //         dischargeReport: this.props.report.filter((report) => report.title === "discharge"),
    //         cancelContractReport: this.props.report.filter((report) => report.title === "cancelContract")
    //     })
    //     console.log(this.state)
    // }

    render() {
        return (
            <div className="tabs-content" style={{direction: "rtl"}}>
                <div className={"text-center"}><img src={headerLogo} width={200} height={200} style={{marginTop: "-50px", marginBottom: "-50px"}}/></div>
                <div className={"mb-5"} style={{fontSize: '1.5rem', fontWeight: '600'}}>گزارش ها</div>
                <div className={"mx-2"}>
                    {
                        this.state.cleaningReport.length !== 0 ?
                        <>
                            <h5 className={"text-center my-4"}>نوبت نظافت شبانه</h5>
                            <div>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>تاریخ</th>
                                        <th>توضیحات</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.cleaningReport.map((c, i) => (
                                            <tr>
                                                <td>{c.date}</td>
                                                <td>{c.description}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </> : null
                    }
                    {
                        this.state.delayInArrivalReport.length !== 0 ?
                        <>
                            <h5 className={"text-center my-4"}>تأخیر در ورود</h5>
                            <div>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>تاریخ</th>
                                        <th>ساعت</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.delayInArrivalReport.map((d, i) => (
                                            <tr>
                                                <td>{d.date}</td>
                                                <td>{d.hour}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </> : null
                    }
                    {
                        this.state.exitReport.length !== 0 ?
                        <>
                            <h5 className={"text-center my-4"}>خروج</h5>
                            <div>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>از تاريخ</th>
                                        <th>تا تاريخ</th>
                                        <th>آدرس مقصد</th>
                                        <th>شماره تماس مقصد</th>
                                        <th>نسبت</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.exitReport.map((e, i) => (
                                            <tr>
                                                <td>{e.startDate}</td>
                                                <td>{e.endDate}</td>
                                                <td>{e.destinationAddress}</td>
                                                <td>{e.destinationPhoneNumber}</td>
                                                <td>{e.relation}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </> : null
                    }
                    {
                        this.state.violationReport.length !== 0 ?
                            <>
                                <h5 className={"text-center my-4"}>ثبت تخلف</h5>
                                <div>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>گزارش تخلف</th>
                                            <th>تاریخ</th>
                                            <th>ساعت</th>
                                            <th>عملیات</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.violationReport.map((v, i) => (
                                                <tr>
                                                    <td>{v.description}</td>
                                                    <td>{v.date}</td>
                                                    <td>{v.hour}</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                </div>
                            </> : null
                    }
                    {
                        this.state.penaltyReport.length !== 0 ?
                        <>
                            <h5 className={"text-center my-4"}>ثبت جریمه</h5>
                            <div>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>نوع جریمه</th>
                                        <th>مقدار جریمه</th>
                                        <th>دلیل جریمه</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.penaltyReport.map((p, i) => (
                                            <tr>
                                                <td>{p.penaltyType === "financial" ? ("نقدی") : ("تنبیهی")}</td>
                                                <td>{p.penaltyAmount}</td>
                                                <td>{p.description}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </> : null
                    }
                    {
                        this.state.dischargeReport.length !== 0 ?
                        <>
                            <h5 className={"text-center my-4"}>اعلام تخلیه</h5>
                            <div>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>تاریخ اعلام تخلیه</th>
                                        <th>تاریخ تخلیه</th>
                                        <th>تاریخ عودت ودیعه</th>
                                        <th>کسر ضرر و زیان</th>
                                        <th>علت کسر ضر و زیان</th>
                                        <th>مبلغ قابل عودت</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.dischargeReport.map((d, i) => (
                                            <tr>
                                                <td>{d.startDate}</td>
                                                <td>{d.endDate}</td>
                                                <td>{d.date}</td>
                                                <td>{d.penaltyAmount}</td>
                                                <td>{d.description}</td>
                                                <td>{d.returnedAmount}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </> : null
                    }
                    {
                        this.state.cancelContractReport.length !== 0 ?
                        <>
                            <h5 className={"text-center my-4"}>لغو قرارداد</h5>
                            <div>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>تاریخ</th>
                                        <th>علت</th>
                                        <th>کسر ضرر و زیان</th>
                                        <th>مبلغ قابل عودت</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.cancelContractReport.map((cc, i) => (
                                            <tr>
                                                <td>{cc.date}</td>
                                                <td>{cc.description}</td>
                                                <td>{cc.penaltyAmount}</td>
                                                <td>{cc.returnedAmount}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </> : null
                    }
                </div>
            </div>
        );
    }
}

export default PrintReports