import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import {
    CardForm,
    CardHeader,
    CardRightContent,
    CardTitle,
    CardWrapper,
    Detail
} from 'react-trello/dist/styles/Base'
import {AddButton, CancelButton} from 'react-trello/dist/styles/Elements'
import EditableLabel from 'react-trello/dist/widgets/EditableLabel'
import {Button, MenuItem, Select} from "@mui/material";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

class NewCardForm extends Component {

    state = {
        // main data
        title: '',
        description: '',
        priority: 'medium',
        dueDate: 'تعریف نشده',
        timeLog: 'تعریف نشده',
        parentId: '',
        parentType: '',

        // showParentModal: false,
        searchBase: '',
        searchContent: '',

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
    }
    updateField = (field, value) => {
        this.setState({[field]: value})
    }

    handleAdd = () => {
        this.props.onAdd(this.state)
    }

    render() {
        const {onCancel, t} = this.props
        return (
            <div style={{backgroundColor: '#f9f9f9'}}>
                {/*<EditableLabel placeholder={'عنوان'} onChange={val => this.updateField('title', val)} />*/}
                <div className="input-group-register">
                    <input type="text"
                           className={`input form-control`}
                           value={this.state.title}
                           onChange={(val) =>  this.updateField('title', val.target.value)}
                           placeholder=" "
                    />
                    <label className="placeholder">
                        عنوان
                    </label>
                </div>
                {/*<div>&nbsp;</div>*/}
                {/*<div>&nbsp;</div>*/}
                <div>&nbsp;</div>

                {
                    this.state.parentId !== ''
                        // ? <div>{this.state.parentSelected}</div>
                    ? (
                        <>
                            <div>
                                <label>آیدی پرسنل:</label>
                                {this.state.parentId}
                            </div>

                            <div>
                                <label>نوع پرسنل: </label>
                                {this.state.parentType}
                            </div>
                        </>)
                        : <div className={'d-flex justify-content-center'}>پرسنلی انتخاب نشده!</div>
                }

                {/*<div>&nbsp;</div>*/}
                {/*<div>&nbsp;</div>*/}

                <div className={'d-flex justify-content-center'}>
                    <Button style={{width: '80%'}} variant="contained" onClick={() => this.handleOpenModal()}>
                        انتخاب پرسنل
                    </Button>
                </div>
                <div>&nbsp;</div>

                <div>
                    <label>
                        {/*due date:*/}
                        تاریخ اتمام:
                    </label>
                </div>
                <DatePicker
                    inputClass={`input form-control`}

                    style={{
                        width: "100%",
                        // boxSizing: "border-box",
                        // height: "26px"
                    }}
                    format="YYYY/MM/DD"
                    onChange={val => {
                        // this.updateField('timeLog', val);
                        let time = "";
                        time += val.year + '/';
                        time += val.month + '/';
                        time += val.day;
                        this.updateField('dueDate', time);
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
                />
                <div>&nbsp;</div>
                <div>
                    <label>
                        {/*time log:*/}
                        زمان صرف شده:
                    </label>
                </div>
                <DatePicker
                    inputClass={`input form-control`}

                    style={{
                        width: "100%",
                        // boxSizing: "border-box",
                        // height: "26px"
                    }}
                    disableDayPicker
                    format="HH:mm"
                    plugins={[
                        <TimePicker hideSeconds/>
                    ]}
                    onChange={val => {
                        // this.updateField('timeLog', val);
                        let time = "";
                        time += val.hour + ':';
                        time += val.minute;
                        // time += val.second;
                        this.updateField('timeLog', time);
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
                />

                <div>&nbsp;</div>

                <div className={'d-flex justify-content-center'}>
                    <Select
                        defaultValue={'medium'}
                        style={{width: '80%'}}
                        onChange={val => this.updateField('priority', val.target.value)}
                    >
                        <MenuItem value={'low'}>کم</MenuItem>
                        <MenuItem value={'medium'}>متوسط</MenuItem>
                        <MenuItem value={'high'}>زیاد</MenuItem>
                        <MenuItem value={'urgent'}>ضروری</MenuItem>
                    </Select>
                </div>

                {/*<select defaultValue={'medium'} onChange={val => this.updateField('priority', val.target.value)}>*/}
                {/*    <option value={'low'}>کم</option>*/}
                {/*    <option value={'medium'}>متوسط</option>*/}
                {/*    <option value={'high'}>زیاد</option>*/}
                {/*    <option value={'urgent'}>ضروری</option>*/}
                {/*</select>*/}

                <Detail>
                    {/*<EditableLabel placeholder={'توضیحات'} onChange={val => this.updateField('description', val)} />*/}
                    <div className="input-group-register">
                        <input type="text"
                               className={`input form-control`}
                               value={this.state.description}
                               onChange={(val) =>  this.updateField('description', val.target.value)}
                               placeholder=" "
                        />
                        <label className="placeholder">
                            توضیحات
                        </label>
                    </div>
                </Detail>

                <button className="btn btn-success" onClick={this.handleAdd}>
                    اضافه کردن کارت
                </button>
                <button className="btn btn-light" onClick={onCancel}>
                    بستن
                </button>

                {/*<AddButton onClick={this.handleAdd}>اضافه کردن کارت</AddButton>*/}
                {/*<CancelButton onClick={onCancel}>بستن</CancelButton>*/}

                <Modal centered size="lg" show={this.state.showParentModal} onHide={() => this.handleCloseModal()}>
                    <Modal.Header closeButton>
                        انتخاب پرسنل
                    </Modal.Header>

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
                                            this.updateField('parentType', parent.type);
                                            this.updateField('parentId', parent.id);
                                            this.setState({showParentModal : false});
                                            this.setState({parent: parent})
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
            </div>
        )
    }

    handleOpenModal = () => {
        this.setState({showParentModal : true});
    }

    handleCloseModal = () => {
        this.setState({showParentModal : false});
    }

    handleSearch = () => {

    }
}

NewCardForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
}

NewCardForm.defaultProps = {
}

export default NewCardForm;