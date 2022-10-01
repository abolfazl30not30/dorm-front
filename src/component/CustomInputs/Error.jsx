import React, { Component } from "react";
import "../../style/registerPage.css"
import BuildingContext from "../../contexts/Building";

class Error extends Component {
    static contextType = BuildingContext;

    render() {
        return (
            <>
                {
                    this.props.condition1
                        ? <small
                            className="text-danger">{this.context.errors[this.props.error1]}</small>
                        : <div/>
                }
                {
                    this.props.condition2 && !this.props.condition1
                        ? <small
                            className="text-danger">{this.context.errors[this.props.error2]}</small>
                        : <div/>
                }
                {
                    this.props.condition3 && !this.props.condition1
                        ? <small
                            className="text-danger">{this.context.errors[this.props.error3]}</small>
                        : <div/>
                }
                {
                    this.props.condition4 && !this.props.condition1
                        ? <small
                            className="text-danger">{this.context.errors[this.props.error4]}</small>
                        : <div/>
                }
            </>
        );
    }
}

export default Error;