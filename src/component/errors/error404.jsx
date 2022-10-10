import {Component} from "react";
import "../../style/errors.css";


class Error404 extends Component {
    state = []

    render() {
        return (
            <>
                <div style={}></div>
                <div className="error-content">
                    <div>404</div>
                    <div>نمی توانیم صفحه مورد نظر شما را پیدا کنیم</div>
                    <button className='btn'>بازگشت به صفحه اصلی</button>
                </div>
            </>
        );
    }

}

export default Error404;