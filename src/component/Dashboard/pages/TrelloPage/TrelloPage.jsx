import React, {Component} from "react";
import Section from "./section";
import TaskContext from "../../../../contexts/tasks";
import Modal from "react-bootstrap/Modal";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select} from "@mui/material";
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

class TrelloPage extends Component {
    state = {
        taskPersonnel: {},
        selectedParent: {},
        parentsFound: [],
        searchBase: "fullName",
        searchContent: "",
        showChangeParentModal: false,
        taskClicked: false,
        NewTaskClicked: false,
        clickedTask: {},
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

    handleTaskClicked = async (id) => {
        this.setState({taskClicked: true})
        const targetTask = {...this.state.tasks.find(task => task.id === id)}
        this.setState({clickedTask: targetTask, tempDueDate: targetTask.dueDate})
        const Hour = parseInt(targetTask.timeLog)
        const Minute = Math.ceil((targetTask.timeLog - Hour)*60)
        const getParent = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?parentId=${targetTask.personnelId}`)
            .then((response) => response.json()).then((data) => {this.setState({taskPersonnel: data[0]})})

        this.setState({
            tempHourTimeLog: Hour,
            tempMinuteTimeLog: Minute
        })
    }

// handler functions for new task button -------------------------------------------------------------------------------
    onNewTask = () => {
        this.setState({
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
    };

    onDone = async () => {
        const parsedTimeLog = this.state.tempHourTimeLog + (this.state.tempMinuteTimeLog / 60)
        let year = this.state.tempDueDate.year;
        let month = this.state.tempDueDate.month;
        let day = this.state.tempDueDate.day;

        const formattedDueDate = year + '/' + month + '/' + day;
        const postNewTask = await fetch('https://api.saadatportal.com/api/v1/task', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.tempName,
                timeLog: parsedTimeLog,
                dueDate: formattedDueDate,
                description: this.state.tempDescription,
                priority: this.state.tempPriority,
                status: "todo",
                personnelId: this.state.selectedParent.parentId
            })
        })
        this.setState({
            tempName: "",
            tempDescription: "",
            tempDueDate: {},
            tempHourTimeLog: 0,
            tempMinuteTimeLog: 0,
            tempPriority: "",
            tempPersonnelId: "",})
        this.onClose()


        await this.componentDidMount();
    };
//----------------------------------------------------------------------------------------------------------------------
// handler functions for edit task -------------------------------------------------------------------------------------
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

    handleChangeDueDate = (input) => {
        const updatedTask = this.state.clickedTask;
        updatedTask.dueDate = input.target.value;
        this.setState({clickedTask: updatedTask})
    };

    handleChangePriority = (input) => {
        const updatedTask = this.state.clickedTask;
        updatedTask.priority = input.target.value;
        this.setState({clickedTask: updatedTask})
    };

    onSubmitChanges = async () => {
        const updatedTask = {...this.state.clickedTask};
        updatedTask.timeLog = this.state.tempHourTimeLog + (this.state.tempMinuteTimeLog / 60)

        updatedTask.dueDate = this.state.tempDueDate
        const patchTask = await fetch(`https://api.saadatportal.com/api/v1/task/${this.state.clickedTask.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
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
        const updatedTasks = [...this.state.tasks]
        const index = updatedTasks.indexOf(targetTask);
        targetTask.status = result.destination.droppableId;
        updatedTasks[index] = targetTask;
        this.setState({tasks: updatedTasks})
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
        let updatedTasks = [...this.state.tasks]
        updatedTasks = updatedTasks.filter((task) => {return task.id !== id});
        this.setState({tasks: updatedTasks})
        const deleteTask = await fetch(`https://api.saadatportal.com/api/v1/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        await this.componentDidMount()
    }

    handleParentNotFound = () => {
        if (this.state.parentsFound.length === 0) {
            this.setState({parentNotFound: true})
        }
        else {
            this.setState({parentNotFound: false})
        }
    }

    handleSearch = async () => {
        const getParents = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?${this.state.searchBase}=${this.state.searchContent}`)
            .then((response) => response.json())
            .then((data) => this.setState({parentsFound : data}, () => {this.handleParentNotFound()}))
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
                            taskClicked: this.state.taskClicked,
                            newTaskClicked: this.state.NewTaskClicked,
                            handleTaskClicked: this.handleTaskClicked,
                            onClose: this.onClose,
                            onNewTask: this.onNewTask,
                            handleDelete: this.handleDelete
                        }}>

                        {/* New Task button*/}
                        <div className={"d-flex justify-content-center"}>
                            <button className="btn btn-lg btn-success w-50" onClick={this.onNewTask}>افزودن وظیفه</button>
                        </div>

                        {/* 3 main categories (To Do, In Progress, Done) */}
                        <div className="justify-content-center d-flex row">
                            <div className="col-xl-3 col-lg-3 ml-3 col-md-3 col-sm-10 col-10 mt-5">
                                <h3 className="text-center" style={{userSelect: "none", marginRight: "20px"}}>برای انجام</h3>
                                <Section index={0} status={"todo"}/>
                            </div>
                            <div className="col-xl-3 col-lg-3 ml-3 col-md-3 col-sm-10 col-10 mt-5">
                                <h3 className="text-center" style={{userSelect: "none", marginRight: "20px"}}>در حال انجام</h3>
                                <Section index={1} status={"inProgress"}/>
                            </div>
                            <div className="col-xl-3 col-lg-3 ml-3 col-md-3 col-sm-10 col-10 mt-5" style={{flexDirection: "column"}}>
                                <h3 className="text-center" style={{userSelect: "none", marginRight: "20px"}}>انجام شده</h3>
                                <Section index={3} status={"done"}/>
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

                                {/* Time Log field */}
                                <div className={"text-center d-flex justify-content-center"} style={{flexDirection: "column"}}>
                                    <div className={"mt-3"}>زمان صرف شده</div>
                                    <div className={"d-flex justify-content-center mt-1"}>
                                        <div className={"text-center w-25"} style={{marginLeft: "10px"}}>
                                            <label>ساعت</label>
                                            <NumberPicker
                                                value={this.state.tempHourTimeLog}
                                                min={0}
                                                precision={1}
                                                defaultValue={1}
                                                step={1}
                                                onChange={this.handleHourTimeLog}
                                                />
                                        </div>
                                        <div className={"text-center w-25"}>
                                            <label>دقیقه</label>
                                            <NumberPicker
                                                value={this.state.tempMinuteTimeLog}
                                                min={0}
                                                precision={1}
                                                defaultValue={0}
                                                step={1}
                                                onChange={this.handleMinuteTimeLog}
                                                />
                                        </div>
                                    </div>
                                </div>

                                <div className={'input-group-register input-group-filter my-4 px-2'}>
                                    <label className={''}>
                                        تاریخ اتمام
                                    </label>
                                    {/* Date picker component */}
                                    <DatePicker
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

                                </div>

                                {/* Personnel section */}
                                <div className={"m-2"}>
                                    <div className={"d-flex justify-content-start"}>
                                        <button className={'btn-done'} onClick={() => this.setState({
                                            showChangeParentModal : true,
                                            parentNotFound: false,
                                            parentsFound: [],
                                            searchContent: "",
                                            searchBase: "fullName"
                                        })}>
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
                                        <div className={"d-flex justify-content-center"}>
                                            <InputLabel className={"priority-input text-center"} id="priority-field">اولویت</InputLabel>
                                        </div>
                                        <Select
                                            value={this.state.tempPriority}
                                            sx={{ height: 50, borderRadius: 2}}
                                            labelId="priority-field"
                                            label="اولویت"
                                            onChange={this.handlePriority}
                                        >
                                            <MenuItem value={"low"}><div className={"d-flex align-items-center"}><div className={"bg-primary m-3"} style={{borderRadius: "50%", width: "15px", height: "15px",}}></div>کم</div></MenuItem>
                                            <MenuItem value={"medium"}><div className={"d-flex align-items-center"}><div className={"bg-warning m-3"} style={{borderRadius: "50%", width: "15px", height: "15px"}}></div>متوسط</div></MenuItem>
                                            <MenuItem value={"high"}><div className={"d-flex align-items-center"}><div className={"m-3"} style={{backgroundColor: "#F35C2E", borderRadius: "50%", width: "15px", height: "15px"}}></div>زیاد</div></MenuItem>
                                            <MenuItem value={"urgent"}><div className={"d-flex align-items-center"}><div className={"m-3"} style={{backgroundColor: "#88000d", borderRadius: "50%", width: "15px", height: "15px"}}></div>ضروری</div></MenuItem>
                                        </Select>
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

                            {/* Close button for new task modal */}
                            <button className="btn-done" onClick={this.onDone}>ثبت</button>

                            {/* Done button for submitting new task */}
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
                                    نام پرسنل : {this.state.taskPersonnel.fullName}
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

                            {/* Date picker field */}

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
                            {/* Close button for new task modal */}
                            <button className="btn-done" onClick={this.onSubmitChanges}>ثبت</button>

                            {/* Done button for submitting new task */}
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
                                <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex mt-2" style={{paddingRight: "0"}}>
                                    <input type="text"
                                           id="inputSearch"
                                           className="input"
                                           placeholder="جسـتوجـو"
                                           style={{padding:"6px"}}

                                           onChange={(value) => this.setState({searchContent : value.target.value})}/>
                                    <button className="btn outline-secondary" onClick={this.handleSearch}><BiSearch fontSize="25px"/></button>
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