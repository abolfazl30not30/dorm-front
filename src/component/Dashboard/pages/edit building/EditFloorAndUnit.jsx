import { Component } from "react";
import './../../../../style/editBuilding.css';
import { BsDoorClosed } from 'react-icons/bs'
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import { TbBuilding } from 'react-icons/tb';
import { EditText, EditTextarea } from 'react-edit-text';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import CounterInput from "react-counter-input";
import { FaPencilAlt } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md"
import 'react-edit-text/dist/index.css';

class EditFloorAndUnit extends Component {
    state = {
        floor: [],
        indexOfFloor: null,
        showDeleteModalUnit: false,
        showDeleteModalFloor: false,
        showَFloorAccessory: false,
        unitTemp: {},
        floorTemp: {},
        floorIndex: 0
    }

    async componentDidMount() {
        const response = await fetch('http://api.saadatportal.com/api/v1/floor').then((response) => response.json())
            .then((data) => this.setState({ floor: data, isLoading: false }));
        console.log(this.state.floor)
    }
    render() {
        return (
            <>
                <div className="p5">

                    <div className="back-btn">
                        <Link to="/booking">
                            بازگشت
                            <i class="bi bi-caret-left-fill"></i>
                        </Link>
                    </div>

                    <div className="text">
                        <h4>ثبت طبقه و واحد</h4>
                        <p>
                            در این بخش ابتدا تمام طبقات به همراه واحد های موجود در هر طبقه را با نام مدنظر خود وارد نمایید و پس از اتمام
                            این مرحله در بخش بعدی اتاق ها و تخت های واقع در هر واحد را وارد می نمایید.
                        </p>
                    </div>

                    <div className="row pb-5">
                        {this.state.floor.map((f, i) => (
                            <div className="col-4 p-3">
                                <div className="floor-box">
                                    <button className="floor-close-btn" onClick={() => { this.handleDeleteShowFloor(f) }}><AiFillCloseCircle color="#F1416C" /></button>
                                    <div className="row">
                                        <div className="col-7 p-0">
                                            <div className="title">
                                                <EditText ref="floorTitle" showEditButton defaultValue={f.name} onSave={this.editFloorTitle} />
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="addAccessory">
                                                <button className="addAccessoryBtn" onClick={() => { this.hanldeFloorAccShow() }}>امکانات طبقه <MdAddCircle fontSize="15px" /> </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        {f.units.map((u) => (
                                            <div className="col-4">
                                                <div className="unit-box">
                                                    <button className="unit-close-btn" onClick={() => { this.handleDeleteShowUnit(u, i) }}><AiFillCloseCircle color="#F1416C" /></button>
                                                    <TbBuilding fontSize="2rem" />
                                                    <div className="title"><EditText className="editable" showEditButton onSave={this.editUnitTitle} defaultValue={u.number} /></div>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => { this.addUnit(f) }} className="unit-add-btn"><AiOutlinePlus /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-4 p-3">
                            <div className="floor-box add">
                                <button onClick={this.addFloor} className="btn"><AiOutlinePlus /></button>
                            </div>
                        </div>
                    </div>
                    <div className="register">
                        <button className="register-btn">ثـبـت</button>
                    </div>
                </div>

                <Modal centered show={this.state.showDeleteModalFloor} onClick={() => { this.handleDeleteCloseFloor(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف طبقه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين طبقه مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-danger" onClick={() => this.handleDeleteCloseFloor(true)}>حذف</button>
                        <button className="btn btn-light" onClick={() => this.handleDeleteCloseFloor(false)}>بستن</button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showDeleteModalUnit} onClick={() => { this.handleDeleteCloseUnit(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>حذف واحد</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>آيا از حذف اين واحد مطمئن هستيد؟</h6>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-danger" onClick={() => this.handleDeleteCloseUnit(true)}>حذف</button>
                        <button className="btn btn-light" onClick={() => this.handleDeleteCloseUnit(false)}>بستن</button>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={this.state.showَFloorAccessory} onClick={() => { this.handleFloorAccClose() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>اضافه کردن امکانات طبقه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="justify-content-center">
                        <div className="accessory row">
                            <div><button className="close-btn" onClick={() => { }}><AiFillCloseCircle color="#F1416C" /></button></div>
                            <div className="accessory-title col-7">
                                <EditText style={{ backgroundColor: "#f9f9f9" }} className="editable" showEditButton defaultValue="یخچال" editButtonContent={<FaPencilAlt fontSize="15px" />} />
                            </div>
                            <div className="accessory-count col-5">
                                <CounterInput min={0} max={10} count="1" onCountChange={count => console.log(count)} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <button className="btn btn-success" onClick={() => { }}>ثبت</button>
                        <button className="btn btn-light" onClick={() => { this.handleFloorAccClose() }}>بستن</button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

    addFloor = async () => {
        var count = Math.floor(Math.random() * 100) + 1;
        const rawResponse = await fetch('http://api.saadatportal.com/api/v1/floor', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: `${count}طبقه`, empty: "true" })
        });
        var content = await rawResponse.json();
        const newFloor = this.state.floor.concat(
            {
                empty: true,
                id: content.id,
                name: `${count}طبقه`,
                units: []
            }
        )
        this.setState({ floor: newFloor }, () => { console.log(this.state.floor) });
    }

    addUnit = async (f) => {
        var count = Math.floor(Math.random() * 1000) + 1;

        const rawResponse = await fetch('http://api.saadatportal.com/api/v1/unit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number: count, empty: "true", floorId: f.id })
        });
        const content = await rawResponse.json();
        const index = this.state.floor.indexOf(f);
        const newUnit = this.state.floor[index].units.concat(
            { id: content.id, empty: "true", number: count }
        )
        const updateFloor = [...this.state.floor]
        updateFloor[index].units = newUnit
        this.setState({ floor: updateFloor })

    }

    editFloorTitle = async ({ value, previousValue }) => {
        const floor = this.state.floor.find(({ name }) => name === previousValue);
        const index = this.state.floor.findIndex(({ name }) => name === previousValue);
        const rawResponse = await fetch(`http://api.saadatportal.com/api/v1/floor/${floor.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: value, empty: "true" })
        });
        const content = await rawResponse.json();
        console.log(content);

        const updatedState = [...this.state.floor];
        updatedState[index].name = value;
        this.setState({ floor: updatedState });
        console.log(this.state.floor);
    };

    editUnitTitle = async ({ value, previousValue }) => {

        let indexOfFloor = -1;
        let indexOfUnit = -1;

        for (let x = 0; x < this.state.floor.length; x++) {
            indexOfUnit = this.state.floor[x].units.findIndex(({ number }) => number === previousValue);
            if (indexOfUnit !== -1) {
                indexOfFloor = x;
                break;
            }
        }

        const updatedState = [...this.state.floor];

        const floorId = updatedState[indexOfFloor].id;
        const unitId = updatedState[indexOfFloor].units[indexOfUnit].id;
        const number = parseInt(value)

        const rawResponse = await fetch(`http://api.saadatportal.com/api/v1/unit/${unitId}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ floorId: floorId, number: number, empty: "true" })
        });
        const content = await rawResponse.json();
        console.log(content);



        updatedState[indexOfFloor].units[indexOfUnit].number = value;
        this.setState({ floor: updatedState });
        console.log(this.state.floor)
    }
    deleteFloor = async (floor) => {
        this.setState({ showDeleteModal: true });

        await fetch(`http://api.saadatportal.com/api/v1/floor/${floor.id}`, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => console.log(res))

        const updateUsers = this.state.floor.filter(f => f !== floor);
        this.setState({ floor: updateUsers });
        console.log(this.state.floor)
    }

    deleteUnit = async (unit, index) => {

        await fetch(`http://api.saadatportal.com/api/v1/unit/${unit.id}`, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => console.log(res))

        let updatedState = [...this.state.floor];
        let updatedUnit = this.state.floor[index].units;
        updatedUnit = updatedUnit.filter(u => u !== unit);
        updatedState[index].units = updatedUnit;
        this.setState({ floor: updatedState });
        console.log(this.state.floor)
    }

    handleDeleteShowUnit = (unit, index) => {
        this.setState({ showDeleteModalUnit: true });
        this.setState({ unitTemp: unit });
        this.setState({ floorIndex: index });
    }

    handleDeleteShowFloor = (floor) => {
        this.setState({ showDeleteModalFloor: true });
        this.setState({ floorTemp: floor });
    }

    handleDeleteCloseUnit = (bool) => {
        this.setState({ showDeleteModalUnit: false });
        if (bool) {
            this.deleteUnit(this.state.unitTemp, this.state.floorIndex);
        }
    }
    handleDeleteCloseFloor = (bool) => {
        this.setState({ showDeleteModalFloor: false });
        if (bool) {
            this.deleteFloor(this.state.floorTemp);
        }
    }

    hanldeFloorAccShow = () => {
        this.setState({ showَFloorAccessory: true })
    }
    handleFloorAccSubmit = () => {
        this.setState({ showَFloorAccessory: false })
    }
    handleFloorAccClose = () => {
        this.setState({ showَFloorAccessory: false })
    }
}

export default EditFloorAndUnit;