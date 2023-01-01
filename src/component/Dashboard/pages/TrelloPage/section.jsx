import React, {Component} from "react";
import "./../../../../style/section.css";
import Task from "./task"
import TaskContext from "./../../../../contexts/tasks"
import {Droppable} from "react-beautiful-dnd";

class Section extends Component {
    static contextType = TaskContext;
    render() {
        return (
            <Droppable droppableId={this.props.status}>
                {(provided) =>(
                    <div className="py-2 section-container" style={{borderRadius: "10px", height: "auto", userSelect: "none"}} ref={provided.innerRef} {...provided.droppableProps}>
                        <p className="category-title text-center" style={{userSelect: "none"}}>{this.props.title}</p>
                        {this.context.tasks.map((task, index)=> (
                                task.status === this.props.status ?
                                    <Task key={index} index={index} id={task.id} name={task.name} priority={task.priority} fullName={task.fullName}/>
                                : null
                            ))}
                        {provided.placeholder}
                    </div>
                    )}
            </Droppable>
        );
    }
}

export default Section;