import {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import "./../../../../style/newTask.css";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Calender from "./calender";
import TaskContext from "./../../../../contexts/tasks";

class NewTask extends Component{
    static contextType = TaskContext;
    render() {
        return (
            <>
                <Modal
                    show={this.context.NewTaskClicked}
                    onHide={this.context.onDone}
                    centered={true}
                >
                    <Modal.Header>
                        <Modal.Title>New task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextField className="w-100 mt-3" id="standard-basic" label="Title" variant="standard" />
                        <TextField className="w-100 mt-5" id="standard-basic" label="Description" variant="standard" />
                        <Calender handleChange={this.handleDue}/>
                        <FormControl fullWidth className="mt-5">
                            <InputLabel id="priority-field">Priority</InputLabel>
                            <Select
                                style={{borderColor: "green"}}
                                labelId="priority-field"
                                label="Priority"
                            >
                                <MenuItem className="bg-success" style={{color: "#FFFFFF"}} value={1}>Low</MenuItem>
                                <MenuItem className="bg-warning" style={{color: "#FFFFFF"}} value={2}>Medium</MenuItem>
                                <MenuItem className="bg-danger" style={{color: "#FFFFFF"}} value={3}>High</MenuItem>
                            </Select>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.context.onDone}>
                            Close
                        </button>
                        <button className="btn btn-primary">Done</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default NewTask;