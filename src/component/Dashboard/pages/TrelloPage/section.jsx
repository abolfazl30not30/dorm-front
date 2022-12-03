import {Component} from "react";
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
                    <div className="p-3 pb-5 section-container" style={{borderRadius: "10px", height: "auto", userSelect: "none"}} ref={provided.innerRef} {...provided.droppableProps}>
                            {this.context.tasks.map((task, index)=> (
                                task.status === this.props.status ?
                                    <Task key={index} index={index} id={task.id} name={task.name} priority={task.priority} />
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