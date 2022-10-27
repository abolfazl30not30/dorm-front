import {Component, createRef} from "react";
import Board from 'react-trello'
import {Modal} from "react-bootstrap";
import {EditText} from "react-edit-text";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import AddCardButton from "./CustomComponents/AddCardButton";
import Card from "./CustomComponents/Card";
import NewCardForm from "./CustomComponents/NewCardForm";
import '../../../../style/trelloStyle.css';
import {Button} from "@mui/material";
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
// import React from "@types/react";

class TrelloPage extends Component{

    constructor(props) {
        super(props);
        this.addTagInputs = createRef();
        this.selectPriorityRef = createRef();
    }


    state = {
        showChangeParentModal: false,
        parentSelected: '',

        // inputs in modal for changing parent
        searchBase: '',

        // Selected Card
        selectedCard: '',

        // For Modals
        cardClickedId: '',
        cardClickedLane: '',
        timeLogPlaceholder: '',
        dueDatePlaceholder: '',
        priorityDefaultValue: '',

        parentsFound: [
            {
                type: 'first',
                id: '12332',
            },
            {
                type: 'second',
                id: '12425',
            },
            {
                type: 'third',
                id: '34494',
            }
        ],


        showModal: false,

        data :{
            lanes: [
                {
                    editable: false,
                    style: { width: '45%', alignItems: 'center', borderRadius: 20, color: '#fff' ,backgroundColor: 'green'},
                    // cardStyle: {width: '200%'},
                    // cardStyle: { width: 500},
                    // style: {backgroundColor: 'yellow'},
                    // cardStyle: { backgroundColor: 'blue' },
                    id: 'lane1',
                    title: 'Done',
                    cards: [
                        {
                            id: 'Card1',
                            title: 'Write Blog',
                            description: 'Can AI make memes',
                            label: '30 mins' ,
                            dueDate: '2022/2/2',
                            timeLog: '2',
                            editable: false
                        },
                        {
                            id: 'Card2',
                            title: 'Pay Rent',
                            description: 'Transfer via NEFT',
                            label: '5 mins',
                            editable: false,
                        }
                    ]
                },
                {
                    editable: true,
                    style: { width: '45%', alignItems: 'center', borderRadius: 20, color: '#fff' ,backgroundColor: 'red'},
                    id: 'lane2',
                    title: 'To do',
                    cards: []
                },
                {
                    editable: false,
                    style: { width: '45%', alignItems: 'center', borderRadius: 20, color: '#fff' ,backgroundColor: '#ba7931'},
                    id: 'lane3',
                    title: 'In progress',
                    cards: []
                },
            ]

        }
    }

    render() {

        const components = {
            AddCardLink: AddCardButton,
            Card: Card,
            NewCardForm : NewCardForm,
                };
        return (
            <>
                <div>
                    <Board
                        onDataChange={(newData) => this.setState({data: newData})}
                        components={components}
                        data={this.state.data}
                        style={{backgroundColor: 'rgb(247, 247, 247)'}}

                        onCardClick={(cardId, metadata, laneId) => {
                            this.setState({cardClickedId : cardId});
                            this.setState({cardClickedLane : laneId});
                            this.handleOpen();

                            console.log(this.state.data.lanes)

                            this.state.data.lanes.map((lane) => {
                                if (lane.id === laneId) {
                                    for (let i = 0; i < lane.cards.length; i++) {
                                        if (lane.cards[i].id === cardId) {
                                            this.setState({timeLogPlaceholder : lane.cards[i].timeLog});
                                            this.setState({dueDatePlaceholder : lane.cards[i].dueDate});
                                            this.setState({priorityDefaultValue : lane.cards[i].priority});
                                            this.setState({selectedCard: lane.cards[i]})
                                        }
                                    }
                                }
                            })

                            // console.log(cardId)
                            // console.log(laneId)

                            // console.log(this.state.cardClickedId);
                            // console.log(this.state.cardClickedLane);
                        }}

                    />
                </div>

                <Modal centered show={this.state.showModal} onHide={() => {
                    this.handleClose()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                this.state.data.lanes.map((lane, key) => {
                                    if (lane.id === this.state.cardClickedLane) {
                                        for (let i = 0; i < lane.cards.length; i++) {
                                            if (lane.cards[i].id === this.state.cardClickedId) {
                                                // console.log('123')
                                                return(
                                                    <div key={key}>
                                                        <div>
                                                            <div className="title">
                                                                <EditText className="editable"
                                                                          showEditButton
                                                                          onSave={(object) => this.handleEditTitle(object)}
                                                                          defaultValue={lane.cards[i].title}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }
                                    }
                                })
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        {
                            this.state.data.lanes.map((lane, key) => {
                                if (lane.id === this.state.cardClickedLane) {
                                    for (let i = 0; i < lane.cards.length; i++) {
                                        if (lane.cards[i].id === this.state.cardClickedId) {
                                            return(
                                                <div key={key}>
                                                    <div>
                                                        <div className="title">
                                                            <label className={'m-۱'}>
                                                                توضیحات :
                                                            </label>
                                                            <EditText className={'editable m-3'}
                                                                      showEditButton
                                                                      onSave={(object) => this.handleEditDescription(object)}
                                                                      defaultValue={lane.cards[i].description}
                                                            />
                                                        </div>

                                                        <div className={'d-flex mb-3 row'}>
                                                            <div className={'col-6'}>
                                                                <label>
                                                                    {/*time log:*/}
                                                                    زمان صرف شده:
                                                                </label>
                                                                <DatePicker
                                                                    style={{
                                                                        marginRight: '5%',
                                                                        width: "50%",
                                                                        boxSizing: "border-box",
                                                                        height: "26px"
                                                                    }}
                                                                    disableDayPicker
                                                                    format="HH:mm"
                                                                    plugins={[
                                                                        <TimePicker hideSeconds/>
                                                                    ]}
                                                                    placeholder=
                                                                        {this.state.timeLogPlaceholder !== undefined
                                                                            ? (this.state.timeLogPlaceholder + 'h')
                                                                            : this.state.timeLogPlaceholder}
                                                                    // value={this.handleTimeLogValue()}
                                                                    onChange={val => {
                                                                        // this.updateField('timeLog', val);
                                                                        let time = "";
                                                                        time += val.hour + ':';
                                                                        time += val.minute;
                                                                        // time += val.second;
                                                                        this.handleEditTimeLog(time, 'timeLog');
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className={'col-6'}>
                                                                <label>
                                                                    {/*due date:*/}
                                                                    ددلاین:
                                                                </label>
                                                                <DatePicker
                                                                    style={{
                                                                        marginRight: '5%',
                                                                        width: "50%",
                                                                        boxSizing: "border-box",
                                                                        height: "26px"
                                                                    }}
                                                                    format="YYYY/MM/DD"
                                                                    placeholder={this.state.dueDatePlaceholder}
                                                                    onChange={val => {
                                                                        let time = "";
                                                                        time += val.year + '/';
                                                                        time += val.month + '/';
                                                                        time += val.day;
                                                                        this.handleEditTimeLog(time, 'dueDate');
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {
                                                            lane.cards[i].parentId === ''
                                                            ? (
                                                                <>
                                                                    <div className={'d-flex justify-content-center'}>

                                                                        <Button variant={'contained'} onClick={() => this.setState({showChangeParentModal : true})}>
                                                                            اضافه کردن پرسنل
                                                                        </Button>

                                                                    </div>
                                                                </>
                                                                )
                                                                : (
                                                                    <>
                                                                        <div className={'d-flex mb-3 row'}>
                                                                            <div className={'col-6'}>
                                                                                <label>
                                                                                    {/*parent type:*/}
                                                                                    نوع پرسنل:
                                                                                </label>
                                                                                {
                                                                                    lane.cards[i].parentType
                                                                                }
                                                                                {/*<input type={'text'} className={'form-control'}/> /!* doing nothing *!/*/}
                                                                            </div>
                                                                            <div className={'col-6'}>
                                                                                <label>
                                                                                    {/*parent ID:*/}
                                                                                    آیدی پرسنل:
                                                                                </label>
                                                                                {/*<input type={'text'} className={'form-control'}/> /!* doing nothing *!/*/}
                                                                                {
                                                                                    lane.cards[i].parentId
                                                                                }
                                                                            </div>
                                                                        </div>

                                                                        <div className={'d-flex justify-content-center'}>

                                                                            <Button variant={'contained'} onClick={() => this.setState({showChangeParentModal : true})}>
                                                                                عوض کردن پرسنل
                                                                            </Button>

                                                                        </div>
                                                                    </>
                                                                )
                                                        }

                                                        <div className={'d-flex justify-content-center mb-3'}>
                                                            <div className={'col-12'}>
                                                                <label>
                                                                    {/*priority:*/}
                                                                    اولویت:
                                                                </label>
                                                                <select
                                                                    ref={this.selectPriorityRef}
                                                                    className="form-select"
                                                                    defaultValue={this.state.priorityDefaultValue}
                                                                    onChange={val => {
                                                                        this.handleEditPriority(val.target.value);
                                                                        this.setState({priorityDefaultValue : val.target.value})
                                                                    }}
                                                                    style={{
                                                                        border: `4px solid ${this.state.priorityDefaultValue === undefined || this.state.priorityDefaultValue === 'medium' ? 'orange' : (
                                                                            this.state.priorityDefaultValue === 'low' ? 'yellow' : (this.state.priorityDefaultValue === 'high' ? "red" : "rgba(0, 0, 255, 0.6)")
                                                                        )}`
                                                                    }}
                                                                >
                                                                    <option value={'medium'}>متوسط</option>
                                                                    <option value={'low'}>کم</option>
                                                                    <option value={'high'}>زیاد</option>
                                                                    <option value={'urgent'}>ضروری</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                }
                            })
                        }
                    </Modal.Body>
                </Modal>

                <Modal
                    centered show={this.state.showChangeParentModal}
                    size={'xl'}
                    onHide={() => this.setState({showChangeParentModal : false})}
                >

                    <Modal.Header>عوض کردن پرسنل</Modal.Header>
                    <Modal.Body>
                        <div className="row align-items-center ">
                            <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                            <div className="col-md-3 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                                <Form.Select aria-label="Default select example"
                                             style={{height:"50px",fontSize:"14px"}}
                                             value={this.state.searchBase}
                                             onChange={(value) => this.setState({searchBase : value.target.value})}>
                                    <option value="name">نام پرسنل</option>
                                    <option value="type">آیدی پرسنل</option>
                                    <option value="topic">نوع پرسنل</option>
                                </Form.Select>
                            </div>
                            <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex" style={{paddingRight: "0"}}>
                                <input type="text"
                                       id="inputSearch"
                                       className="input"
                                       placeholder="جسـتوجـو"
                                       style={{padding:"6px"}}
                                       onChange={(value) => this.setState({searchContent : value.target.value})}/>
                                <button className="btn outline-secondary" onClick={() => this.handleSearch}><BiSearch fontSize="25px" onClick={this.handleSearchBtn}/>
                                </button>
                            </div>
                        </div>

                        {
                            this.state.parentsFound.map((parent, key) => {
                                return (
                                    <Button
                                        onClick={() => {
                                            this.setState({showChangeParentModal : false});
                                            this.setState({parentSelected: parent})
                                            this.handleEditParent(parent);
                                        }}
                                        style={{width: '50%'}}
                                        variant={'text'}
                                        key={key}
                                    >
                                        <table>
                                            <thead>
                                            <tr>
                                                <th className={'p-3'}>آیدی پرسنل</th>
                                                <th className={'p-3'}>نوع پرسنل</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{parent.id}</td>
                                                <td>{parent.type}</td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        {/*<div style={{color: 'red', display: 'block'}}>{parent.id}آیدی پرسنل: </div>*/}
                                        {/*<div>&nbsp;</div>*/}
                                        {/*<div>{parent.type}نوع پرسنل: </div>*/}

                                    </Button>
                                )
                            })
                        }

                    </Modal.Body>

                </Modal>

            </>
        );
    }

    handleSearch = () => {

    }

    handleOpen = () => {
        this.setState({showModal: true});
    }

    handleClose = () => {
        this.setState({showModal: false});
    }

    handleSubmit = (e) => {

    }

    handleEditTitle = (object) => {
        let updatedData = {...this.state.data};
        updatedData.lanes.map((lane) => {
            if (lane.id === this.state.cardClickedLane) {
                for (let i = 0; i < lane.cards.length; i++) {
                    if (lane.cards[i].id === this.state.cardClickedId) {
                        lane.cards[i].title = object.value;
                    }
                }
            }
        })

        this.setState({data : updatedData});
    }

    handleEditDescription = (object) => {
        let updatedData = {...this.state.data};
        updatedData.lanes.map((lane) => {
            if (lane.id === this.state.cardClickedLane) {
                for (let i = 0; i < lane.cards.length; i++) {
                    if (lane.cards[i].id === this.state.cardClickedId) {
                        lane.cards[i].description = object.value;
                    }
                }
            }
        })

        this.setState({data : updatedData});
    }

    handleEditTag = (object, indexOfTag) => {
        let updatedData = {...this.state.data};
        updatedData.lanes.map((lane) => {
            if (lane.id === this.state.cardClickedLane) {
                for (let i = 0; i < lane.cards.length; i++) {
                    if (lane.cards[i].id === this.state.cardClickedId) {
                        lane.cards[i].tags[indexOfTag].title = object.value;
                    }
                }
            }
        })

        this.setState({data : updatedData});
    }

    handleEditTimeLog = (time, typeOfTimeString) => {
        let updatedData = {...this.state.data};
        updatedData.lanes.map((lane) => {
            if (lane.id === this.state.cardClickedLane) {
                for (let i = 0; i < lane.cards.length; i++) {
                    if (lane.cards[i].id === this.state.cardClickedId) {
                        lane.cards[i][typeOfTimeString] = time;
                    }
                }
            }
        })

        this.setState({data : updatedData});
    }

    handleTimeLogValue = () => {
        let updatedData = {...this.state.data};
        updatedData.lanes.map((lane) => {
            if (lane.id === this.state.cardClickedLane) {
                for (let i = 0; i < lane.cards.length; i++) {
                    if (lane.cards[i].id === this.state.cardClickedId) {
                        return lane.cards[i].timeLog
                    }
                }
            }
        })
    }

    handleEditPriority = (value) => {
        this.setState({forTest : value})

        let updatedData = {...this.state.data};
        updatedData.lanes.map((lane) => {
            if (lane.id === this.state.cardClickedLane) {
                for (let i = 0; i < lane.cards.length; i++) {
                    if (lane.cards[i].id === this.state.cardClickedId) {
                        lane.cards[i].priority = value;
                    }
                }
            }
        })

        this.setState({data : updatedData});
    }

    handleEditParent = (parent) => {
        let updatedData = {...this.state.data};

        updatedData.lanes.map((lane) => {
            if (lane.id === this.state.cardClickedLane) {
                for (let i = 0; i < lane.cards.length; i++) {
                    if (lane.cards[i].id === this.state.cardClickedId) {
                        lane.cards[i].parentId = parent.id;
                        lane.cards[i].parentType = parent.type;
                    }
                }
            }
        })

        this.setState({data : updatedData});
    }
}

export default TrelloPage;