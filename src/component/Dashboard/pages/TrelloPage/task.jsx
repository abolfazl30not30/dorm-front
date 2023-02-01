import React, {Component} from "react";
import "./../../../../style/task.css"
import {Draggable} from "react-beautiful-dnd";
import TaskContext from "./../../../../contexts/tasks";
import {GrClose} from "react-icons/gr"
import Modal from "react-bootstrap/Modal";
import {Box, Button, CircularProgress} from "@mui/material";
import {green, red} from "@mui/material/colors";

class Task extends Component {

    static contextType = TaskContext;

    state = {
        showDeleteModal: false
    }
    onDelete = () => {
        this.setState({showDeleteModal: true})
    }

    render() {
        return (
            <>
                <Draggable key={this.props.id} index={this.props.index} draggableId={this.props.id}>
                    {(provided) => (
                        <div className={"m-3"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} draggable={true}>
                            <div className={'delete-btn d-flex'} style={{backgroundColor: '#EBEBEB', width: '100%', cursor: "default"}}>
                                <div className={'d-flex justify-content-start w-100'}>
                                    <GrClose size={15} style={{cursor: "pointer"}} className={"m-3"} onClick={this.onDelete}/>
                                    <div className={"text-start w-100 m-2"}>
                                        {
                                            this.props.priority === "urgent"
                                                ?
                                                <svg width={"25px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M3.47876 7.9c-.5.3-1.1.1-1.4-.4s-.1-1 .4-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.2.4-.8.6-1.3.3l-4.5-2.7-4.5 2.7z" fill="#ff5630"/>
                                                    <path d="M3.47876 12.2c-.5.3-1.1.2-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z" fill="#ff7452"/>
                                                </svg>
                                                : this.props.priority === "high"
                                                    ?
                                                    <svg width={"25px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path d="M3.5 9.9c-.5.3-1.1.1-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3L8 7.2 3.5 9.9z" fill="#ff5630"/>
                                                    </svg>
                                                    : this.props.priority === "medium"
                                                        ?
                                                        <svg width={"25px"}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path d="M3,4h10c0.6,0,1,0.4,1,1s-0.4,1-1,1H3C2.4,6,2,5.6,2,5S2.4,4,3,4z M3,10h10c0.6,0,1,0.4,1,1s-0.4,1-1,1H3
                                                    c-0.6,0-1-0.4-1-1S2.4,10,3,10z" fill="#FFAB00"/>
                                                        </svg>
                                                        :
                                                        <svg width={"25px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path d="M12.5 6.1c.5-.3 1.1-.1 1.4.4.3.5.1 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.6-.2-.7-.9-.4-1.3.2-.5.9-.7 1.3-.4L8 8.8l4.5-2.7z" fill="#0065ff"/>
                                                        </svg>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="task-container" style={{width: '100%'}} onClick={() => {this.context.handleTaskClicked(this.props.id)}}>
                                <div className="text-center d-flex justify-content-center pt-1 px-1" style={{flexDirection: "column"}}>
                                    <div className="d-flex justify-content-center" style={{flexDirection: "column"}}>
                                        <div className={"text-end text-truncate mx-2"} style={{display: "block", marginTop: "0"}}>
                                            <h5>{this.props.name}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-flex justify-content-end w-100"}>
                                    <p className={"text-start mx-2 mt-1 w-100"} style={{fontSize: ".8rem", margin: "0"}}>{this.props.fullName}</p>
                                    <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} style={{margin: "0 0 5px 5px", width: "30px", height: "30px"}}/>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
                <Modal
                    style={{left: "50%", translate: "-50%"}}
                    centered={true}
                    show={this.state.showDeleteModal}
                    size={'xl'}
                    onHide={() => this.setState({showDeleteModal : false})}
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title>حذف وظیفه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>آیا از حذف وظیفه {this.props.name} مطمئن هستید؟</Modal.Body>
                    <Modal.Footer>
                        {/* Cancel button for delete task modal */}
                        <button className="btn btn-light" onClick={() => {this.setState({showDeleteModal: false})}}>لغو</button>

                        {/* Confirm button for deleting task */}
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#dc3545",
                                    color: "black",
                                    ":hover": {backgroundColor: "#a52834", color: "white"}
                                }}
                                disabled={this.state.loading}
                                onClick={() => {
                                    this.context.handleDelete(this.props.id);
                                    this.setState({showDeleteModal: !this.context.forceCloseDeleteModal});
                                }}
                            >
                                حذف
                            </Button>
                            {this.context.loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: red[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Task;