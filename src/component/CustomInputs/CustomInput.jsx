import React, { Component } from "react";
import "../../style/registerPage.css"
import BuildingContext from "../../contexts/Building";
import Error from "./Error";

class CustomInput extends Component {
    static contextType = BuildingContext;

    render() {
        return (
            <>
                <input type="text"
                       className={`input form-control ${this.props.condition1 === false || this.props.condition2 === false ||
                       this.props.condition3 === false || this.props.condition4 === false || this.props.condition5 ? "is-invalid" : ""}`}
                       value={this.props.value}
                       onChange={(e) =>  this.context.handleFields(e, this.props.fieldNameString, this.props.valueOfInputString)}
                       placeholder=" "
                />
                <label className="placeholder"  style={{right: this.props.condition1 === false || this.props.condition2 === false ||
                    this.props.condition3 === false || this.props.condition4 === false || this.props.condition5 ? '35px' : '12px'}}>
                    {
                        this.props.label
                    }
                    {
                        this.props.required
                        ? <span style={{color: 'red'}}>*</span>
                            : null
                    }
                </label>
                <Error
                    condition1={this.props.condition1 === false} // requiredError
                    condition2={this.props.condition2 === false} // phoneNumberError
                    condition3={this.props.condition3 === false} // homeTelError
                    condition4={this.props.condition4 === false} // numberOnlyError
                    error1={'required'}
                    error2={'telephoneRegex'}
                    error3={'homeTelephoneReg'}
                    error4={'numberRequired'}
                />
            </>
        );
    }
}

export default CustomInput;