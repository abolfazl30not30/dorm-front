import React, {Component} from "react";
import Section from "./section";
import TaskContext from "../../../../contexts/tasks";
import Modal from "react-bootstrap/Modal";
import {Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select} from "@mui/material";
import {DragDropContext} from "react-beautiful-dnd";
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../../../../style/registerPage.css';
import '../../../../style/paymentHistory.css';
import '../../../../style/trelloPage.css';
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";
import {MdDone} from "react-icons/md";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import {green} from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";
import axios from "axios";

class TrelloPage extends Component {
    state = {
        searchTaskBase: "all",
        searchLoading: false,
        loading: false,
        buttonClicked: false,
        taskPersonnel: {},
        selectedParent: {},
        parentsFound: [],
        searchBase: "fullName",
        searchContent: "",
        showChangeParentModal: false,
        taskClicked: false,
        NewTaskClicked: false,
        clickedTask: {},
        forceCloseDeleteModal: false,
        tasks: [],
        tempName: "",
        tempDescription: "",
        tempDueDate: {},
        tempHourTimeLog: 0,
        tempMinuteTimeLog: 0,
        tempPriority: "",
        tempPersonnelId: "",
        parentNotFound: false

    }

// handler functions for new task button -------------------------------------------------------------------------------
    onNewTask = () => {
        this.setState({
            loading: false,
            selectedParent: {},
            NewTaskClicked: true,
            tempName: "",
            tempDescription: "",
            tempDueDate: {},
            tempHourTimeLog: 0,
            tempMinuteTimeLog: 0,
            tempPriority: "",
            tempPersonnelId: "",
        })
    };

    handleName = (input) => {
        this.setState({tempName: input.target.value})
    }

    handleDescription = (input) => {
        this.setState({tempDescription: input.target.value})
    }

    handleHourTimeLog = (input) => {
        this.setState({tempHourTimeLog: input})
    }

    handleMinuteTimeLog = (input) => {
        this.setState({tempMinuteTimeLog: input})
    }

    handleDueDate = (input) => {
        this.setState({tempDueDate: input})
    }

    handlePriority = (input) => {
        this.setState({tempPriority: input.target.value})
    }

    onClose = () => {
        this.setState({NewTaskClicked: false})
        this.setState({taskClicked: false})
        this.setState({showDeleteTask: false})
    };

    onDone = async () => {
        this.setState({loading: true})
        const parsedTimeLog = this.state.tempHourTimeLog + (this.state.tempMinuteTimeLog / 60)
        let year = this.state.tempDueDate.year;
        let month = this.state.tempDueDate.month;
        let day = this.state.tempDueDate.day;

        const formattedDueDate = year + '/' + month + '/' + day;
        const newTask = {
            name: this.state.tempName,
            timeLog: parsedTimeLog,
            dueDate: formattedDueDate,
            description: this.state.tempDescription,
            priority: this.state.tempPriority,
            status: "todo",
            personnelId: this.state.selectedParent.parentId,
            fullName: this.state.selectedParent.fullName
        }
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/task', newTask, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                loading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/task', newTask, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/task', newTask, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        this.setState({
            tempName: "",
            tempDescription: "",
            tempDueDate: {},
            tempHourTimeLog: 0,
            tempMinuteTimeLog: 0,
            tempPriority: "",
            tempPersonnelId: "",})
        this.onClose()
        this.componentDidMount();
    };
//----------------------------------------------------------------------------------------------------------------------
// handler functions for edit task -------------------------------------------------------------------------------------
    handleTaskClicked = async (id) => {
        this.setState({taskClicked: true, loading: false})
        const targetTask = {...this.state.tasks.find(task => task.id === id)}
        this.setState({clickedTask: targetTask, tempDueDate: targetTask.dueDate})
        const Hour = parseInt(targetTask.timeLog)
        const Minute = Math.ceil((targetTask.timeLog - Hour)*60)
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentId=${targetTask.personnelId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentId=${targetTask.personnelId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?parentId=${targetTask.personnelId}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        this.setState({
            tempHourTimeLog: Hour,
            tempMinuteTimeLog: Minute
        })
    }

    handleChangeName = (input) => {
        const updatedTask = this.state.clickedTask;
        updatedTask.name = input.target.value;
        this.setState({clickedTask: updatedTask})
    };

    handleChangeHourTimeLog = (input) => {
        this.setState({tempHourTimeLog: input})

    }

    handleChangeMinuteTimeLog = (input) => {
        this.setState({tempMinuteTimeLog: input})
    }

    handleChangeDescription = (input) => {
        const updatedTask = this.state.clickedTask;
        updatedTask.description = input.target.value;
        this.setState({clickedTask: updatedTask})
    };

    handleChangePriority = (input) => {
        const updatedTask = this.state.clickedTask;
        updatedTask.priority = input.target.value;
        this.setState({clickedTask: updatedTask})
    };

    onSubmitChanges = async () => {
        this.setState({loading: true})
        const updatedTask = {...this.state.clickedTask};
        updatedTask.timeLog = this.state.tempHourTimeLog + (this.state.tempMinuteTimeLog / 60)

        updatedTask.dueDate = this.state.tempDueDate
        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/task/${this.state.clickedTask.id}`, updatedTask, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
            }
        }).then(response => response.data)
            .then((data) => this.setState({
                loading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.put(`https://api.saadatportal.com/api/v1/supervisor/task/${this.state.clickedTask.id}`, updatedTask, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.put(`https://api.saadatportal.com/api/v1/supervisor/task/${this.state.clickedTask.id}`, updatedTask, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    loading: false
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        this.componentDidMount()
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
        const updatedTasks = [...this.state.tasks]
        const index = updatedTasks.indexOf(targetTask);
        targetTask.status = result.destination.droppableId;
        updatedTasks[index] = targetTask;
        this.setState({tasks: updatedTasks})
        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/task/${targetTask.id}`, targetTask, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                loading: false
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.put(`https://api.saadatportal.com/api/v1/supervisor/task/${targetTask.id}`, targetTask, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.put(`https://api.saadatportal.com/api/v1/supervisor/task/${targetTask.id}`, targetTask, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        this.componentDidMount()
    }
    handleDelete = async (id) => {
        this.setState({loading: true})
        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/task/${id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then(() => {
                this.setState({loading: false})
                this.setState({forceCloseDeleteModal: true})
                let updatedTasks = [...this.state.tasks]
                updatedTasks = updatedTasks.filter((task) => {return task.id !== id});
                this.setState({tasks: updatedTasks})
                this.setState({forceCloseDeleteModal: true})}).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.delete(`https://api.saadatportal.com/api/v1/supervisor/task/${id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then(() => {
                                    this.setState({loading: false})
                                    this.setState({forceCloseDeleteModal: true})
                                    let updatedTasks = [...this.state.tasks]
                                    updatedTasks = updatedTasks.filter((task) => {return task.id !== id});
                                    this.setState({tasks: updatedTasks})
                                    this.setState({forceCloseDeleteModal: true})})
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.delete(`https://api.saadatportal.com/api/v1/supervisor/task/${id}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then(() => {
                                    this.setState({loading: false})
                                    this.setState({forceCloseDeleteModal: true})
                                    let updatedTasks = [...this.state.tasks]
                                    updatedTasks = updatedTasks.filter((task) => {return task.id !== id});
                                    this.setState({tasks: updatedTasks})
                                    this.setState({forceCloseDeleteModal: true})})
                        } else {
                            window.location = '/'
                        }
                    })
            }})
        // await this.componentDidMount()
    }

    handleParentNotFound = () => {
        if (this.state.parentsFound.length === 0) {
            this.setState({parentNotFound: true})
        }
        else {
            this.setState({parentNotFound: false})
        }
    }

    handleSearchPersonnel = async (e) => {
        if (!this.state.parentNotFound) {this.setState({searchLoading: true})}
        if (e !== "") {
            const value = e.target.value;
            this.setState({searchContent: value});
            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?${this.state.searchBase}=&parentType=Personnel`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => {
                    this.setState({searchLoading: false})
                    this.setState({parentsFound: data}, () => {
                        this.handleParentNotFound()
                    })
                    this.setState({loading: false})}).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?${this.state.searchBase}=&parentType=Personnel`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({searchLoading: false})
                                        this.setState({parentsFound: data}, () => {
                                            this.handleParentNotFound()
                                        })
                                        this.setState({loading: false})})
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?${this.state.searchBase}=&parentType=Personnel`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({searchLoading: false})
                                        this.setState({parentsFound: data}, () => {
                                            this.handleParentNotFound()
                                        })
                                        this.setState({loading: false})})
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        } else {
            axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?${this.state.searchBase}=&parentType=Personnel`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((data) => {
                    this.setState({searchLoading: false})
                    this.setState({parentsFound: data}, () => {
                        this.handleParentNotFound()
                    })
                    this.setState({loading: false})}).catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?${this.state.searchBase}=&parentType=Personnel`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({searchLoading: false})
                                        this.setState({parentsFound: data}, () => {
                                            this.handleParentNotFound()
                                        })
                                        this.setState({loading: false})})
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.get(`https://api.saadatportal.com/api/v1/supervisor/characteristic/search?${this.state.searchBase}=&parentType=Personnel`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        this.setState({searchLoading: false})
                                        this.setState({parentsFound: data}, () => {
                                            this.handleParentNotFound()
                                        })
                                        this.setState({loading: false})})
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        }
    }

    handleSearchTask = async (e) => {
        axios.get(`https://api.saadatportal.com/api/v1/supervisor/task/search?${this.state.searchTaskBase}=${e}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                tasks: data,
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/task/search?${this.state.searchTaskBase}=${e}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    tasks: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get(`https://api.saadatportal.com/api/v1/supervisor/task/search?${this.state.searchTaskBase}=${e}`, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    tasks: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }


    handleDateInput = (value) => {
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year  + '/' + month + '/' + day;
        this.handleSearchTask(convertDate)
    }

    handleChangeSearchPriority = (e) => {
        this.handleSearchTask(e.target.value)
    }

    handleSearchTaskInput = (e) => {
        this.handleSearchTask(e.target.value)
    }
//----------------------------------------------------------------------------------------------------------------------

    componentDidMount = async () => {
        axios.get('https://api.saadatportal.com/api/v1/supervisor/task', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => this.setState({
                tasks: data,
            })).catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/task', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    tasks: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.get('https://api.saadatportal.com/api/v1/supervisor/task', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                .then((data) => this.setState({
                                    tasks: data,
                                }))
                        } else {
                            window.location = '/'
                        }
                    })
            }})
    }

    render() {
        return (
            <DragDropContext
            onDragEnd={this.onDragEnd}
            onDragUpdate={this.onDragUpdate}>
                <div style={{overflowX: "hidden"}}>
                    <TaskContext.Provider
                        value={{
                            loading: this.state.loading,
                            name: this.state.name,
                            email: this.state.email,
                            tasks: this.state.tasks,
                            taskClicked: this.state.taskClicked,
                            newTaskClicked: this.state.NewTaskClicked,
                            handleTaskClicked: this.handleTaskClicked,
                            onClose: this.onClose,
                            onNewTask: this.onNewTask,
                            handleDelete: this.handleDelete,
                            forceCloseDeleteModal: this.state.forceCloseDeleteModal
                        }}>
                        <div className="back-btn">
                            <Link to="/">
                                بازگشت
                                <i className="bi bi-caret-left-fill"/>
                            </Link>
                        </div>

                        {/* New Task button*/}
                        <div className={"d-flex justify-content-end"}>
                            <button className="btn buttonDone mt-3" onClick={this.onNewTask}>افزودن وظیفه</button>
                        </div>

                        <div className="search-box justify-content-center align-items-center mt-4">
                            <div className="form-floating">
                                <FormControl className={"w-100"} style={{border: "none"}}>
                                    <Select
                                        sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                        id="select-field"
                                        value={this.state.searchTaskBase}
                                        onChange={(value) => {
                                            this.setState({searchTaskBase: value.target.value})
                                            if (value.target.value === "all") {
                                                this.componentDidMount()
                                            }
                                        }}>
                                        <MenuItem value={"all"}>همه</MenuItem>
                                        <MenuItem value={"name"}>عنوان</MenuItem>
                                        <MenuItem value={"fullName"}>شخص</MenuItem>
                                        <MenuItem value={"priority"}>اولویت</MenuItem>
                                        <MenuItem value={"dueDate"}>تاریخ اتمام</MenuItem>
                                    </Select>
                                    <label className="placeholder" style={{
                                        top: '-10px',
                                        backgroundColor: '#f9f9f9',
                                        color: '#2a2e32b3',
                                        margin: '-0.2rem 0',
                                        padding: '0 .4rem -0.4rem',
                                        opacity: '1',
                                    }}>بر اساس</label>
                                </FormControl>
                            </div>
                            <div hidden={this.state.searchTaskBase !== "priority"} className="form-floating">
                                <FormControl className={"w-100"} style={{border: "none"}}>
                                    <Select
                                        value={this.state.clickedTask.priority}
                                        sx={{ height: 50, borderRadius: "0.5rem", minWidth: '10rem', backgroundColor: "#fff"}}
                                        onChange={(e) => {
                                            this.handleChangeSearchPriority(e)
                                        }}
                                    >
                                        <MenuItem value={"low"}><div className={"d-flex align-items-center"}><div className={"bg-primary m-3"} style={{borderRadius: "50%", width: "15px", height: "15px",}}></div>کم</div></MenuItem>
                                        <MenuItem value={"medium"}><div className={"d-flex align-items-center"}><div className={"bg-warning m-3"} style={{borderRadius: "50%", width: "15px", height: "15px"}}></div>متوسط</div></MenuItem>
                                        <MenuItem value={"high"}><div className={"d-flex align-items-center"}><div className={"m-3"} style={{backgroundColor: "#F35C2E", borderRadius: "50%", width: "15px", height: "15px"}}></div>زیاد</div></MenuItem>
                                        <MenuItem value={"urgent"}><div className={"d-flex align-items-center"}><div className={"m-3"} style={{backgroundColor: "#88000d", borderRadius: "50%", width: "15px", height: "15px"}}></div>ضروری</div></MenuItem>
                                    </Select>
                                    <label className="placeholder" style={{
                                        top: '-10px',
                                        backgroundColor: '#f9f9f9',
                                        color: '#2a2e32b3',
                                        margin: '-0.2rem 0',
                                        padding: '0 .4rem -0.4rem',
                                        opacity: '1',
                                    }}>اولویت</label>
                                </FormControl>
                            </div>
                            <div hidden={this.state.searchTaskBase !== "dueDate"} className="input-group-register date-container" style={{marginLeft: "-.4rem", marginRight: "-.4rem"}}>
                                <DatePicker
                                    containerClassName={"trello-date-container"}
                                    calendarPosition={`top`}
                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                    format={`YYYY/MM/DD`}
                                    inputClass={`input`}
                                    value={this.state.dataPicker}
                                    onChange={this.handleDateInput}
                                    mapDays={({ date }) => {
                                        let props = {}
                                        let isWeekend = [6].includes(date.weekDay.index)

                                        if (isWeekend)
                                            props.className = "highlight highlight-red";

                                        return props
                                    }}

                                    weekDays={
                                        [
                                            ["شنبه", "Sat"],
                                            ["یکشنبه", "Sun"],
                                            ["دوشنبه", "Mon"],
                                            ["سه شنبه", "Tue"],
                                            ["چهارشنبه", "Wed"],
                                            ["پنجشنبه", "Thu"],
                                            ["جمعه", "Fri"],
                                        ]
                                    }

                                    calendar={persian}
                                    locale={persian_fa}

                                >
                                    <Button
                                        onClick={() => {
                                            this.setState({dataPicker: {}})
                                        }
                                        }
                                    >
                                        ریست
                                    </Button>
                                </DatePicker>
                                <label className="placeholder" style={{
                                    top: '-8px',
                                    backgroundColor: '#f9f9f9',
                                    color: '#2a2e32b3',
                                    margin: '0.3rem 0.4rem',
                                    padding: '0 0.4rem',
                                    opacity: '1',
                                }}>تاریخ</label>
                            </div>
                            <input type="text"
                                   hidden={this.state.searchTaskBase === "dueDate" || this.state.searchTaskBase === "priority" || this.state.searchTaskBase === "all"}
                                   id="inputSearch"
                                   placeholder="جسـتجـو..."
                                   onChange={this.handleSearchTaskInput}
                            style={{height: 50}}/>
                            <div style={this.state.searchTaskBase === "all" ? {height: 50, backgroundColor: "#f6f6f6"} : {height: 50}} hidden={this.state.searchTaskBase === "dueDate" || this.state.searchTaskBase === "priority" || this.state.searchTaskBase === "all"} className="search-icon"><i className="bi bi-search"></i></div>
                        </div>

                        {/* 3 main categories (To Do, In Progress, Done) */}
                        <div className="justify-content-center d-flex row pb-3" style={{minHeight: "300px"}}>
                            <div className="mx-1 col-xl-3 col-lg-3 col-md-12 col-sm-10 col-10 mt-5">
                                <Section title={"برای انجام"} index={0} status={"todo"}/>
                            </div>
                            <div className="mx-1 col-xl-3 col-lg-3 col-md-12 col-sm-10 col-10 mt-5">
                                <Section title={"در حال انجام"} index={1} status={"inProgress"}/>
                            </div>
                            <div className="mx-1 col-xl-3 col-lg-3 col-md-12 col-sm-10 col-10 mt-5">
                                <Section title={"انجام شده"} index={3} status={"done"}/>
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
                            <Modal.Title>وظیفه جدید</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                {/* Name field */}
                                <div className="input-group-register col-md-4 col-12"
                                     style={{width: '100%'}}
                                >
                                    <input type="text"
                                           className={`input form-control`}
                                           value={this.state.tempName}
                                           onChange={this.handleName}
                                           placeholder=" "
                                    />
                                    <label className="placeholder">
                                        عنوان
                                    </label>
                                </div>

                                <div className={'input-group-register input-group-filter my-4 px-2'}>
                                    {/* Date picker component */}
                                    <DatePicker
                                        editable={false}
                                        placeholder=" "
                                        calendarPosition={`top`}
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        format={`YYYY/MM/DD`}

                                        containerStyle={{
                                            width: "100%"
                                        }}

                                        inputClass={`input form-control`}
                                        value={this.state.tempDueDate}
                                        onChange={this.handleDueDate}

                                        mapDays={({ date }) => {
                                            let props = {}
                                            let isWeekend = [6].includes(date.weekDay.index)

                                            if (isWeekend)
                                                props.className = "highlight highlight-red";

                                            return props
                                        }}

                                        weekDays={
                                            [
                                                ["شنبه", "Sat"],
                                                ["یکشنبه", "Sun"],
                                                ["دوشنبه", "Mon"],
                                                ["سه شنبه", "Tue"],
                                                ["چهارشنبه", "Wed"],
                                                ["پنجشنبه", "Thu"],
                                                ["جمعه", "Fri"],
                                            ]
                                        }

                                        calendar={persian}
                                        locale={persian_fa}
                                    >
                                        <Button
                                            onClick={() => {
                                                this.setState({tempDueDate: {}})
                                            }}
                                        >
                                            ریست
                                        </Button>
                                    </DatePicker>
                                    <label className="placeholder" style={{
                                        top: '-8px',
                                        backgroundColor: '#fff',
                                        color: '#2a2e32b3',
                                        margin: '0.3rem 0.7rem',
                                        padding: '0 .4rem',
                                        opacity: '1',
                                    }}>تاریخ اتمام</label>
                                </div>

                                {/* Personnel section */}
                                <div className={"m-2"}>
                                    <div className={"d-flex justify-content-start"}>
                                        <button className={'btn-done'} onClick={() => {this.setState({
                                            searchLoading: false,
                                            showChangeParentModal: true,
                                            parentNotFound: false,
                                            parentsFound: [],
                                            searchContent: "",
                                            searchBase: "fullName"
                                        });
                                            this.handleSearchPersonnel("")
                                        }}>
                                            <MdDone className='ms-1'/>
                                            انتخاب پرسنل
                                        </button>
                                    </div>

                                    {/* Personnel data */}
                                    <div className={"personnel-detail p-2"}>
                                        <div style={{marginRight: "15px"}}>
                                            نام پرسنل : {this.state.selectedParent.fullName}
                                        </div>
                                    </div>
                                </div>

                                {/* Priority selector field */}
                                <div className={"d-flex justify-content-start m-2"}>
                                    <FormControl className="w-50 mt-4">
                                        <Select
                                            value={this.state.tempPriority}
                                            sx={{ height: 50, borderRadius: 2}}
                                            id="priority-field"
                                            onChange={this.handlePriority}
                                        >
                                            <MenuItem value={"low"}><div className={"d-flex align-items-center"}><div className={"bg-primary m-3"} style={{borderRadius: "50%", width: "15px", height: "15px",}}></div>کم</div></MenuItem>
                                            <MenuItem value={"medium"}><div className={"d-flex align-items-center"}><div className={"bg-warning m-3"} style={{borderRadius: "50%", width: "15px", height: "15px"}}></div>متوسط</div></MenuItem>
                                            <MenuItem value={"high"}><div className={"d-flex align-items-center"}><div className={"m-3"} style={{backgroundColor: "#F35C2E", borderRadius: "50%", width: "15px", height: "15px"}}></div>زیاد</div></MenuItem>
                                            <MenuItem value={"urgent"}><div className={"d-flex align-items-center"}><div className={"m-3"} style={{backgroundColor: "#88000d", borderRadius: "50%", width: "15px", height: "15px"}}></div>ضروری</div></MenuItem>
                                        </Select>
                                        <label className="placeholder" style={{
                                            top: '-8px',
                                            backgroundColor: '#fff',
                                            color: '#2a2e32b3',
                                            margin: '-0.2rem 0.7rem',
                                            padding: '0 .4rem',
                                            opacity: '1',
                                        }}>اولویت</label>
                                    </FormControl>
                                </div>

                                {/* Description field */}
                                <div className="mt-4 input-group-register col-md-4 col-12"
                                     style={{width: '100%'}}
                                >
                                    <input type="text"
                                           value={this.state.tempDescription}
                                           className={`input form-control`}
                                           onChange={this.handleDescription}
                                           placeholder=" "
                                    />
                                    <label className="placeholder">
                                        توضیحات
                                    </label>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>

                            {/* Done button for submitting new task */}
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#20d489",
                                        color: "black",
                                        ":hover": {backgroundColor: "#198754", color: "white"}
                                    }}
                                    disabled={this.state.loading}
                                    onClick={this.onDone}
                                >
                                    ثبت
                                </Button>
                                {this.state.loading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Close button for new task modal */}
                            <button className="btn btn-light" onClick={this.onClose}>بستن</button>

                        </Modal.Footer>
                    </Modal>

                    {/* Edit Task modal */}
                    <Modal
                        show={this.state.taskClicked}
                        onHide={this.onClose}
                        centered={true}
                    >
                        <Modal.Header closeButton={true}>
                            <h2>ویرایش وظیفه</h2>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Personnel data */}
                            <div className={"personnel-detail p-2 mt-4"}>
                                <div style={{marginRight: "15px"}}>
                                    نام پرسنل : {this.state.clickedTask.fullName}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center justify-content-center mt-2"}>
                                {/* Name editor field */}
                                <div className="input-group-register col-md-4 col-12"
                                     style={{width: '70%'}}
                                >
                                    <input type="text"
                                           className={`input form-control`}
                                           value={this.state.clickedTask.name}
                                           onChange={this.handleChangeName}
                                           placeholder=" "
                                    />
                                    <label className="placeholder">
                                        عنوان
                                    </label>
                                </div>

                                {/* Edit Priority selector field */}
                                    <FormControl className="mt-4" style={{width: "30%", marginBottom: "31px"}}>
                                        <div className={"d-flex justify-content-center"}>
                                            <InputLabel className={"priority-input text-center"} id="priority-field">اولویت</InputLabel>
                                        </div>
                                        <Select
                                            value={this.state.clickedTask.priority}
                                            sx={{ height: 50, borderRadius: 2}}
                                            labelId="priority-field"
                                            label="اولویت"
                                            onChange={this.handleChangePriority}
                                        >
                                            <MenuItem value={"low"}><div className={"d-flex align-items-center"}><div className={"bg-primary m-3"} style={{borderRadius: "50%", width: "15px", height: "15px",}}></div>کم</div></MenuItem>
                                            <MenuItem value={"medium"}><div className={"d-flex align-items-center"}><div className={"bg-warning m-3"} style={{borderRadius: "50%", width: "15px", height: "15px"}}></div>متوسط</div></MenuItem>
                                            <MenuItem value={"high"}><div className={"d-flex align-items-center"}><div className={"m-3"} style={{backgroundColor: "#F35C2E", borderRadius: "50%", width: "15px", height: "15px"}}></div>زیاد</div></MenuItem>
                                            <MenuItem value={"urgent"}><div className={"d-flex align-items-center"}><div className={"m-3"} style={{backgroundColor: "#88000d", borderRadius: "50%", width: "15px", height: "15px"}}></div>ضروری</div></MenuItem>
                                        </Select>
                                    </FormControl>
                            </div>

                            {/* Edit Time Log field */}
                            <div className={"text-center d-flex justify-content-center"} style={{flexDirection: "column"}}>
                                <div className={"my-1"}>زمان صرف شده</div>
                                <div className={"d-flex justify-content-center mt-1"}>
                                    <div className={"text-center w-25"}>
                                        <label>ساعت</label>
                                        <NumberPicker
                                            value={this.state.tempHourTimeLog}
                                            min={0}
                                            precision={1}
                                            defaultValue={0}
                                            step={1}
                                            onChange={this.handleChangeHourTimeLog}
                                        />
                                    </div>
                                    <div className={"text-center w-25"}>
                                        <label>دقیقه</label>
                                        <NumberPicker
                                            value={this.state.tempMinuteTimeLog}
                                            min={0}
                                            precision={1}
                                            defaultValue={1}
                                            step={1}
                                            onChange={this.handleChangeMinuteTimeLog}
                                        />
                                    </div>
                                </div>
                            </div>
                            

                            {/* Description editor field */}
                            <div className="input-group-register col-md-4 col-12 mt-4"
                                 style={{width: '100%'}}
                            >
                                <input type="text"
                                       className={`input form-control`}
                                       value={this.state.clickedTask.description}
                                       onChange={this.handleChangeDescription}
                                       placeholder=" "
                                />
                                <label className="placeholder">
                                    توضیحات
                                </label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            {/* Submit button for edit task modal */}
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#20d489",
                                        color: "black",
                                        ":hover": {backgroundColor: "#198754", color: "white"}
                                    }}
                                    disabled={this.state.loading}
                                    onClick={this.onSubmitChanges}
                                >
                                    ثبت
                                </Button>
                                {this.state.loading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Close button for submitting edit task */}
                            <button className="btn btn-light" onClick={this.onClose}>بستن</button>
                        </Modal.Footer>

                    </Modal>

                    {/* Choose personnel modal */}
                    <Modal
                        centered show={this.state.showChangeParentModal}
                        size={'xl'}
                        onHide={() => this.setState({showChangeParentModal : false})}
                    >
                        <Modal.Header>انتخاب پرسنل</Modal.Header>
                        <Modal.Body>
                            <div className="row align-items-center">
                                <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                                <div className="col-md-3 col-sm-6 px-0">
                                    <Form.Select aria-label="Default select example"
                                                 style={{height:"50px",fontSize:"14px"}}
                                                 value={this.state.searchBase}
                                                 onChange={(value) => this.setState({searchBase : value.target.value})}>
                                        <option value="fullName">نام پرسنل</option>
                                        <option value="nationalCode">کد ملی پرسنل</option>
                                        <option value="parentType">نوع پرسنل</option>
                                    </Form.Select>
                                </div>
                                <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex" style={{paddingRight: "0"}}>
                                    <input type="text"
                                           id="inputSearch"
                                           className="input"
                                           placeholder="جسـتوجـو"
                                           style={{padding:"6px"}}

                                           onChange={(input) => {this.handleSearchPersonnel(input)}}/>
                                    <button className="btn outline-secondary"><BiSearch fontSize="25px"/></button>
                                </div>
                            </div>

                            <div>
                                <Paper>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align={'right'}>
                                                        #
                                                    </TableCell>
                                                    <TableCell align={'right'}>
                                                        نام
                                                    </TableCell>
                                                    <TableCell align={'right'}>
                                                        کد ملی
                                                    </TableCell>
                                                    <TableCell align={'right'}>
                                                        شماره تماس
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                    {
                                                        this.state.searchLoading ?
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Skeleton animation="wave" height={20} width="100%" />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Skeleton animation="wave" height={20} width="100%" />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Skeleton animation="wave" height={20} width="100%" />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Skeleton animation="wave" height={20} width="100%" />
                                                                </TableCell>
                                                            </TableRow>
                                                            :
                                                        this.state.parentsFound.map((parent, index) => {
                                                            return (
                                                                <TableRow hover onClick={() => {
                                                                    this.setState({showChangeParentModal : false});
                                                                    this.setState({selectedParent: parent});
                                                                }}
                                                                >
                                                                    <TableCell align={"right"}>
                                                                        {index + 1}
                                                                    </TableCell>
                                                                    <TableCell align={'right'}>
                                                                        {parent.fullName}
                                                                    </TableCell>
                                                                    <TableCell align={'right'}>
                                                                        {parent.nationalCode}
                                                                    </TableCell>
                                                                    <TableCell align={'right'}>
                                                                        {parent.phoneNumber}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )})}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                                <h3 hidden={!this.state.parentNotFound} className={"mt-5 text-center text-danger"}>پرسنلی یافت نشد!</h3>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </DragDropContext>
        );
    }
}

export default TrelloPage;