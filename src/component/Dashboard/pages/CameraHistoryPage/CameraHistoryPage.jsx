import {Component} from "react";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import {Modal} from "react-bootstrap";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
// import React from "@types/react";

import '../../../../style/registerPage.css';

class CameraHistoryPage extends Component{

    state = {
        validation: {
            title_requireReg: '',
            date_requiredReg: '',
            unit_requireReg: '',
            assignee_requireReg: '',
            unit_numberReg: '',
        },

        showModal: false,

        tmpRequest: {
            title: '',
            description: '',
            unit: '',
            date: '',
            dateValue: '',
            supervisor: '',
            assignee: '',
            status: 'null',
        },

        data: [
            {
                title: "Quality Engineer",
                description: "1HXV83DJMtULHDjWpkPhpvkrLzWG2QNikY",
                date: "2022/04/29",
                unit: 1,
                supervisor: "Stanley Mahon",
                assignee: "Stanley",
                status: 'null'
            }, {
                title: "Product Engineer",
                description: "1GskyHJ6ghjZj5d2RJdwdFVYhJ2oZqJVFS",
                date: "2021/12/17",
                unit: 2,
                supervisor: "Valencia Litt",
                assignee: "Valencia",
                status: 'null'
            }, {
                title: "VP Marketing",
                description: "1A7M9pLJXxc4ti2kEMGYQjyvv1m5YzXFF7",
                date: "2022/10/10",
                unit: 3,
                supervisor: "Christi Raisher",
                assignee: "Christi",
                status: 'null'
            }, {
                title: "Assistant Professor",
                description: "1MjNTasP65qcZLFziitvSBRhGm1dJbnZ8p",
                date: "2021/12/26",
                unit: 4,
                supervisor: "Lynnell Eberts",
                assignee: "Lynnell",
                status: 'null'
            }, {
                title: "Editor",
                description: "1EfqPhbZ8EgUMLtCjdrTvwok66kqi5XHCH",
                date: "2021/11/27",
                unit: 5,
                supervisor: "Mortie Heaphy",
                assignee: "Mortie",
                status: 'null'
            }, {
                title: "VP Product Management",
                description: "1MTSYf6CUQqmXU8CA4Jw3iMtPuaS1728Q3",
                date: "2021/11/06",
                unit: 6,
                supervisor: "Barrett Leguay",
                assignee: "Barrett",
                status: 'null'
            }, {
                title: "Electrical Engineer",
                description: "1LQP3ARF1dV5yST4o5jsUF5KzHVknpuGhk",
                date: "2022/05/20",
                unit: 7,
                supervisor: "Livvie Abdee",
                assignee: "Livvie",
                status: 'null'
            }, {
                title: "Civil Engineer",
                description: "18vNBJKSrt7zanVvNHymQfaTHNMZo47FEC",
                date: "2022/05/28",
                unit: 8,
                supervisor: "Lucy Duggary",
                assignee: "Lucy",
                status: 'null'
            }, {
                title: "Environmental Specialist",
                description: "128YrdXvJALbznowJL6UepVM5QsEHfhgjA",
                date: "2022/06/09",
                unit: 9,
                supervisor: "Meghan Fosh",
                assignee: "Meghan",
                status: 'null'
            }, {
                title: "Web Developer I",
                description: "1KBYyqugpufQB4MnKFcuBnMTzH8f1zekUz",
                date: "2022/07/27",
                unit: 10,
                supervisor: "Hedda Grigoliis",
                assignee: "Hedda",
                status: 'null'
            }, {
                title: "Account Representative II",
                description: "1NQW2EiZLJjLvozUqMx7Pwwd3SJJhappCb",
                date: "2022/01/16",
                unit: 11,
                supervisor: "Estevan Blankhorn",
                assignee: "Estevan",
                status: 'null'
            }, {
                title: "Media Manager II",
                description: "1NuDJ8TL1oGiqg34uTHEM9UdPcuvWEdgyL",
                date: "2022/03/28",
                unit: 12,
                supervisor: "Clementius Pawlaczyk",
                assignee: "Clementius",
                status: 'null'
            }, {
                title: "Administrative Officer",
                description: "1DodSPgrb783GHivpBQn28fH6F2k7G8gjF",
                date: "2022/05/03",
                unit: 13,
                supervisor: "Elana Charnley",
                assignee: "Elana",
                status: 'null'
            }, {
                title: "Budget/Accounting Analyst III",
                description: "1FzMvGY6rZax4TGypPQcCxf8XYcaaM5q1d",
                date: "2022/05/07",
                unit: 14,
                supervisor: "Rufe Shillaber",
                assignee: "Rufe",
                status: 'null'
            }, {
                title: "Marketing Assistant",
                description: "14T9z28NzsLbGorB3GjhwsqqRxgph96LAD",
                date: "2022/03/13",
                unit: 15,
                supervisor: "Mommy Caslane",
                assignee: "Mommy",
                status: 'null'
            },
        ]
    }

    render() {
        return (
            <>
                <div className="back-btn">
                    <Link to="/">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>

                <div>
                    <h4>
                        تاریخچه عکس
                    </h4>
                </div>

                <div className={'d-flex'} style={{justifyContent: 'center'}}>
                    <button className={'btn btn-success'} onClick={() => {
                        this.handleOpenModal();

                        let emptyTmpRequest = {
                            title: '',
                            description: '',
                            unit: '',
                            supervisor: '',
                            date: '',
                            assignee: '',
                            status: 'null',
                        }

                        let resetValidations = {...this.state.validation};
                        resetValidations.assignee_requireReg = '';
                        resetValidations.date_requiredReg = '';
                        resetValidations.unit_requireReg = '';
                        resetValidations.title_requireReg = '';

                        this.setState({validation : resetValidations})

                        this.setState({tmpRequest : emptyTmpRequest})

                        // let resetTypeOfTempFields = {...this.state.tempFields};
                        // resetTypeOfTempFields['type'] = null;
                        // resetTypeOfTempFields['name'] = '';
                        // resetTypeOfTempFields['reason'] = '';
                        // resetTypeOfTempFields['topic'] = '';
                        // resetTypeOfTempFields['accepted'] = null;
                        //
                        // let resetValidations = {...this.state.Validations};
                        // resetValidations['selectedTypeBoolean'] = true;
                        // resetValidations['topic_requireReg'] = '';
                        // resetValidations['name_requireReg'] = '';
                        //
                        // this.setState({tempFields : resetTypeOfTempFields})
                        // this.setState({Validations : resetValidations})

                    }}>
                        ثبت درخواست
                    </button>
                </div>

                <div className="row align-items-center ">
                    <div className="col-md-1 col-sm-2 px-0"><label>براساس:</label></div>
                    <div className="col-md-3 col-sm-6 px-0" style={{paddingLeft: "0"}}>
                        <Form.Select aria-label="Default select example" style={{height:"50px",fontSize:"14px"}} value={this.state.searchType} onChange={(e)=>{this.setState({searchType:e.target.value})}}>
                            <option value="fullName">نام درخواست کننده</option>
                            <option value="title">عنوان</option>
                        </Form.Select>
                    </div>
                    <div className="input-group-register col-md-7 col-sm-11 px-0 d-flex" style={{paddingRight: "0"}}>
                        <input type="text" id="inputSearch" className="input" placeholder="جسـتوجـو" style={{padding:"6px"}} onChange={(e)=>{this.handleSearchInput(e)}}/>
                        <button className="btn outline-secondary"><BiSearch fontSize="25px" onClick={this.handleSearchBtn}/>
                        </button>
                    </div>
                </div>

                <div>
                    <table className='table mt-4'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>عنوان</th>
                                <th>تاریخ</th>
                                <th>واحد</th>
                                <th>نام درخواست کننده</th>
                                <th>وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.data.map((data, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{data.title}</td>
                                    <td>{data.date}</td>
                                    <td>{data.unit}</td>
                                    <td>{data.assignee}</td>
                                    <td>{data.status}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

                <Modal centered show={this.state.showModal} onHide={() =>{
                    this.handleCloseModal();
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>درخواست جدید</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className={'d-flex flex-wrap row'}>
                            <div className={'col-6 input-group-register'}>
                                <input
                                    className={`input form-control mb-2 ${this.state.validation.title_requireReg === false ? "is-invalid" : ""}`}
                                    placeholder={' '}
                                    onChange={(e) =>
                                        this.handleInitializingTmpRequestFields(e, 'title')}
                                />
                                <label className={'placeholder'} style={{right: this.state.validation.title_requireReg === false ? '35px' : '20px'}}>
                                    عنوان
                                    <span style={{color : 'red'}}>*</span>
                                </label>

                                {
                                    this.state.validation.title_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>

                            <div className={'col-6 input-group-register'}>

                                <DatePicker
                                    format="ِِِِِِYYYY/MM/DD"
                                    inputClass={`input form-control mb-2 ${this.state.validation.date_requiredReg === false ? "is-invalid" : ""}`}
                                    value={this.state.tmpRequest.dateValue}

                                    onChange={(value) => {
                                        let updatedTmpRequest = {...this.state.tmpRequest};

                                        updatedTmpRequest.dateValue = value;
                                        updatedTmpRequest.date = new Date(value).toLocaleDateString('fa-IR')
                                        this.setState({tmpRequest : updatedTmpRequest})
                                    }}

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
                                    <button type="button" className={"btn btn-secondary mb-2"} onClick={() => {
                                        let updatedTmpRequest = {...this.state.tmpRequest};

                                        updatedTmpRequest.dateValue = '';
                                        updatedTmpRequest.date = '';
                                        this.setState({tmpRequest : updatedTmpRequest})
                                    }}>
                                        ریست
                                    </button>
                                </DatePicker>
                                <label className={'placeholder'} style={{right: this.state.validation.date_requiredReg === false ? '35px' : '20px'}}>
                                    تاریخ
                                    <span style={{color : 'red'}}>*</span>
                                </label>

                                {
                                    this.state.validation.date_requiredReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>

                        </div>

                        <div className={'d-flex flex-wrap row'}>

                            <div className={'col-6 input-group-register'}>
                                <input
                                    className={`input form-control mb-2 ${this.state.validation.assignee_requireReg === false ? "is-invalid" : ""}`}
                                    placeholder={' '}
                                    onChange={(e) =>
                                        this.handleInitializingTmpRequestFields(e, 'assignee')}
                                />
                                <label className={'placeholder'} style={{right: this.state.validation.assignee_requireReg === false ? '35px' : '20px'}}>
                                    نام درخواست کننده
                                    <span style={{color : 'red'}}>*</span>
                                </label>

                                {
                                    this.state.validation.assignee_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                            </div>

                            <div className={'col-6 input-group-register'}>
                                <input
                                    className={`input form-control mb-2 ${this.state.validation.unit_requireReg === false || this.state.validation.unit_numberReg === false ? "is-invalid" : ""}`}
                                    placeholder={' '}
                                    onChange={(e) =>
                                        this.handleInitializingTmpRequestFields(e, 'unit')}
                                />
                                <label className={'placeholder'} style={{right: this.state.validation.unit_requireReg === false || this.state.validation.unit_numberReg === false ? '35px' : '20px'}}>
                                    شماره واحد
                                    <span style={{color : 'red'}}>*</span>
                                </label>

                                {
                                    this.state.validation.unit_requireReg === false
                                        ? <small
                                            className="text-danger">این فیلد الزامی است!</small>
                                        : <div/>
                                }

                                {
                                    this.state.validation.unit_numberReg === false
                                        ? <small
                                            className="text-danger">عدد وارد کنید!</small>
                                        : <div/>
                                }

                            </div>

                        </div>

                        <div className={'input-group-register'}>
                            <input
                                className={'input form-control'}
                                placeholder={' '}
                                onChange={(e) =>
                                    this.handleInitializingTmpRequestFields(e, 'description')}
                            />
                            <label className={'placeholder'} style={{right: '20px'}}>
                                توضیحات
                            </label>
                        </div>

                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-success" onClick={(event) => {
                            if (this.handleSubmitType(event)) {
                                this.handleCloseModal()
                                console.log(this.state.tmpRequest)
                            }

                        }}>ثبت
                        </button>
                        <button className="btn btn-light" onClick={() => {
                            this.handleCloseModal()
                        }}>بستن
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    handleOpenModal = () => {
        this.setState({showModal : true});
    }

    handleCloseModal = () => {
        this.setState({showModal : false});
    }

    handleSearchBtn = () => {

    }

    handleSubmitType = () => {
        let regCheck = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;

        let updatedData = [...this.state.data];

        let title_requireReg = !regCheck.test(this.state.tmpRequest.title);
        let date_requiredReg = !regCheck.test(this.state.tmpRequest.date);
        let unit_requireReg = !regCheck.test(this.state.tmpRequest.unit);
        let unit_numberReg = numberReg.test(this.state.tmpRequest.unit);
        let assignee_requireReg = !regCheck.test(this.state.tmpRequest.assignee);

        if (title_requireReg && date_requiredReg && unit_requireReg && assignee_requireReg && unit_numberReg) {
            updatedData.push(this.state.tmpRequest);
            this.setState({data : updatedData});
        }

        // console.log(this.state.tmpRequest.date)

        this.handleValidations([title_requireReg, date_requiredReg, unit_requireReg, assignee_requireReg, unit_numberReg],
            ['title_requireReg', 'date_requiredReg', 'unit_requireReg', 'assignee_requireReg', 'unit_numberReg']);

        return title_requireReg && date_requiredReg && unit_requireReg && assignee_requireReg && unit_numberReg; // checking validations
    }

    handleValidations = (valueOfField, nameOfField) => {
        let updatedValidations = {...this.state.validation};

        for (let i = 0; i < valueOfField.length; i++) {
            updatedValidations[nameOfField[i]] = valueOfField[i];
        }

        this.setState({validation : updatedValidations});
    }

    handleInitializingTmpRequestFields = (e, nameOfField) => {
        let updatedTmpRequest = {...this.state.tmpRequest};
        updatedTmpRequest[nameOfField] = e.target.value;

        this.setState({tmpRequest : updatedTmpRequest});
    }

}

export default CameraHistoryPage;