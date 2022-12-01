import {Component} from "react";
import Section from "./section";
import TaskContext from "../../../../contexts/tasks";
import Modal from "react-bootstrap/Modal";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Calender from "./calender";
import {DragDropContext} from "react-beautiful-dnd";

class TrelloPage extends Component {
    state = {
        searchPersonnelModal: false,
        TaskClicked: false,
        NewTaskClicked: false,
        ClickedTask: {},
        tasks: [],
        tempName: "",
        tempDescription: "",
        tempDueDate: new Date(),
        tempTimeLog: '',
        tempPriority: "",
        tempPersonnelId: "",
    }

    handleOpenPersonnelModal = () => {
        this.setState({searchPersonnelModal : true})
    }

    //
    handleTaskClicked = (id) => {
        this.setState({TaskClicked: true})
        const targetTask = {...this.state.tasks.find(task => task.id === id)}
        this.setState({ClickedTask: targetTask})
    }

// handler functions for new task button -------------------------------------------------------------------------------
    onNewTask = () => {
        this.setState({NewTaskClicked: true})
    };

    handleName = (input) => {
        this.setState({tempTitle: input.target.value})
    }

    handleDescription = (input) => {
        this.setState({tempDescription: input.target.value})
    }

    handleDueDate = (input) => {
        this.setState({tempDue: input})
    }

    handlePriority = (input) => {
        this.setState({tempPriority: input.target.value})
    }

    onClose = () => {
        this.setState({NewTaskClicked: false})
        this.setState({TaskClicked: false})
    };

    onDone = async () => {
        let year = this.state.tempDueDate.getFullYear();
        let month = this.state.tempDueDate.getMonth();
        let day = this.state.tempDueDate.getDay();

        let formattedDueDate = year + '/' + month + '/' + day;
        const postNewTask = await fetch('https://api.saadatportal.com/api/v1/task', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.tempName,
                timeLog: 12,
                dueDate: formattedDueDate,
                description: this.state.tempDescription,
                priority: this.state.tempPriority,
                status: "todo",
                personnelId: "b7f6f6b2afae4ac5994aafdfd9a8a987"
            })
        })
        this.setState({tempTitle: "", tempDescription: "", tempDue: new Date(), tempPriority: ""})
        this.onClose()

        await this.componentDidMount();
    };
//----------------------------------------------------------------------------------------------------------------------
// handler functions for edit task -------------------------------------------------------------------------------------
    handleChangeName = (input) => {
        const updatedTask = this.state.ClickedTask;
        updatedTask.name = input.target.value;
        this.setState({ClickedTask: updatedTask})
    };

    handleChangeDescription = (input) => {
        const updatedTask = this.state.ClickedTask;
        updatedTask.description = input.target.value;
        this.setState({ClickedTask: updatedTask})
    };

    handleChangeDueDate = (input) => {
        const updatedTask = this.state.ClickedTask;
        updatedTask.dueDate = input.target.value;
        this.setState({ClickedTask: updatedTask})
    };

    handleChangePriority = (input) => {
        const updatedTask = this.state.ClickedTask;
        updatedTask.priority = input.target.value;
        this.setState({ClickedTask: updatedTask})
    };

    onSubmitChanges = async () => {
        console.log(this.state.ClickedTask)
        const patchTask = await fetch(`https://api.saadatportal.com/api/v1/task/${this.state.ClickedTask.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.ClickedTask)
        })
        await this.componentDidMount()
        this.onClose()
    };
//----------------------------------------------------------------------------------------------------------------------
// handler functions for drag and drop ---------------------------------------------------------------------------------
    onDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.droppableId === result.source.droppableId) {
            return;
        }

        const targetTask = this.state.tasks.find(task => task.id === result.draggableId)
        targetTask.status = result.destination.droppableId;

        const patchTask = await fetch(`https://api.saadatportal.com/api/v1/task/${targetTask.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(targetTask)
        })
        await this.componentDidMount()
    }
    handleDelete = async (id) => {
        const deleteTask = await fetch(`https://api.saadatportal.com/api/v1/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        await this.componentDidMount()

    }
//----------------------------------------------------------------------------------------------------------------------

    componentDidMount = async () => {
        const getTasks = await fetch('https://api.saadatportal.com/api/v1/task').then((response) => response.json())
            .then((data) => this.setState({tasks : data}))
    }

    render() {
        return (
            <DragDropContext
            onDragEnd={this.onDragEnd}
            onDragUpdate={this.onDragUpdate}>
                <div style={{overflowX: "hidden"}}>
                    <TaskContext.Provider
                        value={{
                            name: this.state.name,
                            email: this.state.email,
                            tasks: this.state.tasks,
                            TaskClicked: this.state.TaskClicked,
                            newTaskClicked: this.state.NewTaskClicked,
                            handleTaskClicked: this.handleTaskClicked,
                            onClose: this.onClose,
                            onNewTask: this.onNewTask,
                            handleDelete: this.handleDelete
                        }}>

                        {/* New Task button*/}
                        <button className="btn btn-lg btn-success w-100" onClick={this.onNewTask}>New Task</button>

                        {/* 3 main categories (To Do, In Progress, Done) */}
                        <div className="justify-content-center d-flex row">
                            <div className="col-xl-4 col-lg-4 ml-3 col-md-4 col-sm-4 col-10 mt-5">
                                <h3 className="text-center" style={{userSelect: "none"}}>TO DO</h3>
                                <Section index={0} status={"todo"} title={"To Do"}/>
                            </div>
                            <div className="col-xl-4 col-lg-4 ml-3 col-md-4 col-sm-4 col-10 mt-5">
                                <h3 className="text-center" style={{userSelect: "none"}}>In Progress</h3>
                                <Section index={1} status={"inProgress"} title={"In Progress"}/>
                            </div>
                            <div className="col-xl-4 col-lg-4 ml-3 col-md-4 col-sm-4 col-10 mt-5">
                                <h3 className="text-center" style={{userSelect: "none"}}>Done</h3>
                                <Section index={3} status={"done"} title={"Done"}/>
                            </div>
                        </div>

                    </TaskContext.Provider>

                    {/* New Task modal */}
                    <Modal
                        show={this.state.NewTaskClicked}
                        onHide={this.onClose}
                        centered={true}
                    >
                        <Modal.Header closeButton={true}>
                            <Modal.Title>New task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={'d-flex justify-content-center'}>
                                <button className={'btn btn-success'} onClick={this.handleOpenPersonnelModal}>
                                    انتخاب پرسنل
                                </button>
                            </div>
                            <div>

                                {/* Task name input field */}
                                <TextField className="w-100 mt-3" id="standard-basic" label="عنوان" variant="standard" onChange={this.handleName}/>

                                {/* Task description input field */}
                                <TextField className="w-100 mt-5" id="standard-basic" label="توضیحات" variant="standard" onChange={this.handleDescription}/>

                                {/* Date picker component */}
                                <Calender handleChange={this.handleDueDate} tempValue={this.state.tempDueDate}/>

                                {/* Task priority selector */}
                                <FormControl fullWidth className="mt-5">
                                    <InputLabel id="priority-field">Priority</InputLabel>
                                    <Select
                                        labelId="priority-field"
                                        label="Priority"
                                        onChange={this.handlePriority}
                                    >
                                        <MenuItem className="bg-success" style={{color: "#FFFFFF"}} value={"low"}>Low</MenuItem>
                                        <MenuItem className="bg-warning" style={{color: "#FFFFFF"}} value={"medium"}>Medium</MenuItem>
                                        <MenuItem className="bg-danger" style={{color: "#FFFFFF"}} value={"high"}>High</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>

                            {/* Close button for new task modal */}
                            <button className="btn btn-secondary" onClick={this.onClose}>Close</button>

                            {/* Done button for submitting new task */}
                            <button className="btn btn-primary" onClick={this.onDone}>Done</button>

                        </Modal.Footer>
                    </Modal>

                    {/* Edit Task modal */}
                    <Modal
                        show={this.state.TaskClicked}
                        onHide={this.onClose}
                        centered={true}
                    >
                        <Modal.Header closeButton={true}>
                            <h2>Edit Task</h2>
                        </Modal.Header>
                        <Modal.Body>

                            {/* Name editor field */}
                            <TextField value={this.state.ClickedTask.name} className="w-100 mt-3" id="standard-basic" label="Name" variant="standard" onChange={this.handleChangeName}/>

                            {/* Description editor field */}
                            <TextField value={this.state.ClickedTask.description} className="w-100 mt-5" id="standard-basic" label="Description" variant="standard" onChange={this.handleChangeDescription}/>

                            {/* Date picker field */}
                            <Calender handleChange={this.handleChangeDueDate} tempValue={this.state.ClickedTask.dueDate}/>

                            {/* Priority selector field */}
                            <FormControl fullWidth className="mt-5">
                                <InputLabel id="priority-field">Priority</InputLabel>
                                <Select
                                    value={this.state.ClickedTask.priority}
                                    labelId="priority-field"
                                    label="Priority"
                                    onChange={this.handleChangePriority}
                                >
                                    <MenuItem className="bg-success" style={{color: "#FFFFFF"}} value={"low"}>Low</MenuItem>
                                    <MenuItem className="bg-warning" style={{color: "#FFFFFF"}} value={"medium"}>Medium</MenuItem>
                                    <MenuItem className="bg-danger" style={{color: "#FFFFFF"}} value={"high"}>High</MenuItem>
                                </Select>
                            </FormControl>

                        </Modal.Body>
                        <Modal.Footer>

                            {/* Cancel button for editing task */}
                            <button className="btn btn-secondary" onClick={this.onClose}>Cancel</button>

                            {/* Submit button to change task */}
                            <button className="btn btn-primary" onClick={this.onSubmitChanges}>Submit</button>
                        </Modal.Footer>

                    </Modal>
                    <Modal show={this.state.searchPersonnelModal}>
                        <Modal.Body>
                            <div className="d-flex justify-content-center">
                                <div className="search-box">
                                    <div className="form-floating">
                                        <select className="form-select" id="floatingSelect"
                                                aria-label="Floating label select example"
                                                value={this.state.searchBase}
                                                onChange={(value) => this.setState({searchBase: value.target.value})}>
                                            <option value="name">نام درخواست کننده</option>
                                            <option value="type">نوع</option>
                                            <option value="topic">عنوان</option>
                                        </select>
                                        <label htmlFor="floatingSelect">براساس</label>
                                    </div>
                                    <input type="text"
                                           id="inputSearch"
                                           placeholder="جسـتجـو..."
                                           onChange={(value) => this.setState({searchContent: value.target.value})}/>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </DragDropContext>
        );
    }
}

export default TrelloPage;