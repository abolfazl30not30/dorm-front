import {Component} from "react";
// import {DatePicker} from "react-persian-datepicker";
import Error from "./Error";
import BuildingContext from "../../contexts/Building";
import "../../style/registerPage.css"
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";

import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import login from "../Login";
import {Button} from "@mui/material";

class DateInput extends Component{
    static contextType = BuildingContext;

    state = {
        value: '',
        digits : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],

        plugin1: [ // this.props.timeInclude === true
            <TimePicker hideSeconds position="bottom"/>,
            // <DatePickerHeader position="left" />
        ],

        plugin2: [// this.props.timeInclude === false
            // <DatePickerHeader position="left" />
        ],
    }
    render() {
        return (
            <>
                <DatePicker
                    // fixMainPosition={false}
                    calendarPosition={`top`}
                    digits={this.state.digits}
                    format={`${this.props.timeInclude ? 'HH:mm YYYY/MM/DD' : 'YYYY/MM/DD'}`}


                    containerStyle={{
                        width: "100%"
                    }}

                    inputClass={`input form-control ${this.props.condition1 === false ? "is-invalid" : ""}`}
                    value={this.props.value}
                    onChange={(value) => {
                        console.log(value.format("YYYY/MM/DD HH:mm:ss"))
                        if (this.props.timeInclude) {
                            this.context.handleDates(value.format("YYYY/MM/DD HH:mm:ss"), this.props.fieldNameString, this.props.valueOfInputString);
                            this.context.handleValueOfDate(value, this.props.valueFieldString, this.props.valueOfInputString);

                        } else {
                            this.context.handleDates(value.format("YYYY/MM/DD"), this.props.fieldNameString, this.props.valueOfInputString)
                            this.context.handleValueOfDate(value, this.props.valueFieldString, this.props.valueOfInputString);
                        }

                    }}

                    mapDays={({ date }) => {
                        let props = {}
                        let isWeekend = [6].includes(date.weekDay.index)

                        if (isWeekend)
                            props.className = "highlight highlight-red";

                        return props
                    }}

                    // placeholder={' '}
                    plugins={this.props.timeInclude ? this.state.plugin1 : this.state.plugin2}

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
                            this.context.handleValueOfDate({}, this.props.valueFieldString, this.props.valueOfInputString);
                            this.context.handleDates('', this.props.fieldNameString, this.props.valueOfInputString)}
                        }
                    >
                        ریست
                    </Button>
                </DatePicker>

                <label className="placeholder"
                       // style={{right: this.props.condition1 === false ? '35px' : '12px'}}
                    style={this.props.value !== "" && this.props.value['day'] !== undefined
                        ? ({display:"none"})
                        : (this.props.condition1 === false
                            ? ({right:'35px',display:"inline"})
                            : ({right:'12px',display:"inline"}))
                    }
                >
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
                    error1={'required'}
                />
            </>
        );
    }
}

export default DateInput;