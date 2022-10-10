import {Component} from "react";
import "../../style/errors.css";
import image from "../../img/error-access-denied.png";


class ErrorAccessDenied extends Component {
    state = []

    render() {
        return (
            <>
                <div className='error-box'>
                    <div className="error-content">
                        <img src={image} alt='error404' style={{maxHeight:'200px'}} />
                        <div className='text'>متاسفانه شما به این بخش دسترسی ندارید</div>
                        <button className='btn'>بازگشت به صفحه اصلی</button>
                    </div>
                </div>
            </>
        );
    }

}

export default ErrorAccessDenied;