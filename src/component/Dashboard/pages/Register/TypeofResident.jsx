import React, { Component } from 'react';
import BuildingContext from "../../../../contexts/Building";

class TypeofResident extends Component {
    state = {}
    static contextType = BuildingContext;

    render() {
        return (
            <div className='typeofResident'>
                <div className="mt-2">
                    <h5 className="mb-5">نوع اقامتگر</h5>
                    <div className="constant-container">
                        <label className="radio-container">
                            اقامتگر ثابت
                            <input type="radio"  name="register-radio" value="constant"
                                   ref={this.constantCheck}
                                   onChange={(e) => { this.context.handleTypeofResident('constant')}}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="guest-container mt-4">
                        <label className="guest-text mb-3">مهمان : </label>
                        <div className="mx-4 my-1">
                            <label className="radio-container">
                                بستگان درجه یک
                                <input type="radio"  name="register-radio" value="familyGuest"
                                       ref={this.familyGuestCheck}
                                       onChange={(e) => {this.context.handleTypeofResident('familyGuest')}}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="mx-4 my-1">
                            <label className="radio-container">
                                متفرقه
                                <input type="radio"  name="register-radio" value="otherGuest"
                                       ref={this.otherGuestCheck}
                                       onChange={(e) => {this.context.handleTypeofResident('otherGuest')}}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




export default TypeofResident;