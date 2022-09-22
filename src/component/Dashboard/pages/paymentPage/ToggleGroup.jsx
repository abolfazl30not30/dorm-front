import {Component} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PopUpAdd from "./PopUpAdd";

export default class ToggleButtons extends Component{

    constructor(props) {
        super(props)
        this.state = {
            alignment: '',
            choices: [
                'محصولات بهداشتی',
                'بیمه',
            ]
        }
    }

    handleAlignment = (event, newAlignment) => {
        this.setState({alignment : newAlignment});
    };

    updateChoices = (text) => {
        var newArr = this.state.choices;
        newArr.push(text);
        this.setState({choices:newArr})
    }

    render() {
        return (
            <ToggleButtonGroup
                value={this.state.alignment}
                exclusive
                onChange={this.handleAlignment}
                aria-label="text alignment"
            >
                {
                    this.state.choices.map((c) =>
                        <ToggleButton value={c} aria-label={c}>
                            {c}
                        </ToggleButton>
                    )
                }
                <PopUpAdd updateChoices={this.updateChoices}/>
            </ToggleButtonGroup>
        );
    }
}
