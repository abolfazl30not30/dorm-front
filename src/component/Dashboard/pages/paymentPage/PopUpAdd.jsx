import { Component } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ToggleButton from "@mui/material/ToggleButton";
import { IoIosAddCircleOutline, IoIosCheckmark, IoIosClose } from "react-icons/io";

const style = {
    position: 'absolute',
    borderRadius: '10px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default class PopUpAdd extends Component {
    state = {
        inputText: '',
    }

    constructor(props){
        super(props)

        this.state = {open : false}
    }


    handleOpen = () => {
        this.setState({open : true});
    }

    handleClose = () => {
        this.setState({open : false});
    }

    handleInputChange = (e, name) => {
        this.setState({
            [name]: e.target.value
        })
    }

    handleClick(e) {
        e.preventDefault();
        // console.log(this.state.inputText)
        if (typeof this.state.inputText != 'undefined') {
            this.props.updateChoices(this.state.inputText);
        }
    }

    render () {
        return (
            <>
                <div>
                    <ToggleButton value="b" aria-label="b" onClick={this.handleOpen}>
                        <IoIosAddCircleOutline size={25}/>
                    </ToggleButton>
                    <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <h5> اضافه کردن گزینه: </h5>
                            <div className='d-flex flex-row row'>
                                <input type='text'
                                       className='form-control mt-3 mb-3 input'
                                       onChange={(e) => this.handleInputChange(e, 'inputText')}/>
                                <button className='btn btn-success col' onClick={(event) => { this.handleClick(event); this.handleClose();}}>
                                    <IoIosCheckmark size={30}/>
                                </button>
                                <button className='btn btn-danger col' onClick={this.handleClose}>
                                    <IoIosClose size={30}/>
                                </button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </>
        );
    }
}
