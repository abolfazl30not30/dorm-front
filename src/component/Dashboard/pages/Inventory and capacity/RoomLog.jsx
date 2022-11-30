import {Component} from "react";
import '../../../../style/registerPage.css';
import '../../../../style/paymentHistory.css';
import '../../../../style/inventory.css';
import {Link} from "react-router-dom";
// import React from "@types/react";

class RoomLog extends Component {

    state = {
        logData: [],
    }
    render() {
        return (
            <div className="payment-history">
                <div className="back-btn">
                    <Link to="/dashboard/booking">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>
                <h4>گزارش گیری</h4>
                <div className="table-box">
                    <table className='table '>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>طبقه</th>
                            <th>واحد</th>
                            <th>اتاق</th>
                            <th>تخت</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.logData.map((e, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{e.floor}</td>
                                    <td>{e.unit}</td>
                                    <td>{e.room}</td>
                                    <td>{e.bed}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    async componentDidMount() {
        const response2 = await fetch('https://api.saadatportal.com/api/v1/bed/concat/empty').then((response) => response.json())
            .then((data) => this.setState({ logData: data }));


    }

}

export default RoomLog;