import React, {Component} from "react";
import "./../../../../style/task.css"
import {Draggable} from "react-beautiful-dnd";
import TaskContext from "./../../../../contexts/tasks";
import {GrClose} from "react-icons/gr"
import Modal from "react-bootstrap/Modal";

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
                                <div className={'d-flex justify-content-start w-50'}>
                                    <GrClose size={15} style={{cursor: "pointer"}} className={"m-3"} onClick={this.onDelete}/>
                                </div>
                                <div className={"m-2 d-flex justify-content-end w-50"}>
                                    <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} style={{width: "30px", height: "30px"}}/>
                                </div>
                            </div>
                            <div className="task-container" style={{width: '100%'}} onClick={() => {this.context.handleTaskClicked(this.props.id)}}>
                                <div className="text-center d-flex justify-content-center pt-4" style={{flexDirection: "column"}}>
                                    <div className="d-flex justify-content-center" style={{flexDirection: "column"}}>
                                        <div className={"text-left text-truncate mx-2"} style={{display: "block"}}>
                                            <h5>{this.props.name}</h5>
                                        </div>
                                        <div style={{marginBottom: "5px"}}>
                                            {
                                                this.props.priority === "urgent"
                                                ?
                                                <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M3.47876 7.9c-.5.3-1.1.1-1.4-.4s-.1-1 .4-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.2.4-.8.6-1.3.3l-4.5-2.7-4.5 2.7z" fill="#ff5630"/>
                                                    <path d="M3.47876 12.2c-.5.3-1.1.2-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z" fill="#ff7452"/>
                                                </svg>
                                                : this.props.priority === "high"
                                                ?
                                                <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M3.5 9.9c-.5.3-1.1.1-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3L8 7.2 3.5 9.9z" fill="#ff5630"/>
                                                </svg>
                                                : this.props.priority === "medium"
                                                ?
                                                <svg width={"30px"}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M3,4h10c0.6,0,1,0.4,1,1s-0.4,1-1,1H3C2.4,6,2,5.6,2,5S2.4,4,3,4z M3,10h10c0.6,0,1,0.4,1,1s-0.4,1-1,1H3
                                                    c-0.6,0-1-0.4-1-1S2.4,10,3,10z" fill="#FFAB00"/>
                                                </svg>
                                                :
                                                <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M12.5 6.1c.5-.3 1.1-.1 1.4.4.3.5.1 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.6-.2-.7-.9-.4-1.3.2-.5.9-.7 1.3-.4L8 8.8l4.5-2.7z" fill="#0065ff"/>
                                                </svg>
                                            }

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
                <Modal
                    style={{left: "50%", translate: "-50%"}}
                    className={"w-25"}
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

                        {/* Accept button for deleting task */}
                        <button className="btn btn-danger" onClick={() => {
                            this.context.handleDelete(this.props.id);
                            this.setState({showDeleteModal: !this.context.forceCloseDeleteModal});
                        }}>حذف</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Task;