import {Component, createRef} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {TextField} from "@mui/material";
// import DateFnsJalaliUtils from '@date-io/date-fns-jalali';

class Calender extends Component {

    render() {
        return (
            <div className="mt-5">
                {/*<LocalizationProvider dateAdapter={DateFnsJalaliUtils}>*/}
                {/*    <DateTimePicker*/}
                {/*        label="Date&Time picker"*/}
                {/*        renderInput={(params) => <TextField {...params}/>}*/}
                {/*        onChange={this.handleChange}*/}
                {/*         value={this.props.tempValue}/>*/}
                {/*</LocalizationProvider>*/}
            </div>
        );
    }
    handleChange = (input) => {
        this.props.handleChange(input)
    }
}

export default Calender;