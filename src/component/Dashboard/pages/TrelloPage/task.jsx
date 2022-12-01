import {Component} from "react";
import "./../../../../style/navbar.css"
import "./../../../../style/task.css"
import {Draggable} from "react-beautiful-dnd";
import TaskContext from "./../../../../contexts/tasks";
import { IconButton } from '@mui/material';
import {GrClose} from "react-icons/gr"

class Task extends Component {
    static contextType = TaskContext;
    render() {
        return (
            <>
                <Draggable key={this.props.id} index={this.props.index} draggableId={this.props.id}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} draggable={true}>
                            <button className={'delete-btn'} style={{backgroundColor: 'rgba(33, 37, 41, 0.2)', width: '100%'}}>
                                <div className={'d-flex justify-content-start'}>
                                    <GrClose size={15}  onClick={() => {
                                        this.context.handleDelete(this.props.id)
                                    }}/>
                                </div>
                            </button>
                            <div className="task-container justify-content-center" onClick={() => {this.context.handleTaskClicked(this.props.id)}}>
                                <div className="text-center d-flex justify-content-center" style={{flexDirection: "column"}}>
                                    <div className="d-flex justify-content-center">
                                        <h4>{this.props.name}</h4>
                                    </div>
                                    <div className="d-flex" style={{flexDirection: "column"}}>
                                        <h6 className="m-3">due:</h6>
                                        <h6 className="m-3">{this.props.dueDate}</h6>
                                    </div>
                                    <div className="d-flex" style={{flexDirection: "column"}}>
                                        <h6 className="m-3">priority: {this.props.priority}</h6>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-center">{this.props.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            </>
        );
    }
}

export default Task;