import { Component } from "react";
import './../../../../style/editBuilding.css';
import { BsDoorClosed } from 'react-icons/bs'
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import { TbBuilding } from 'react-icons/tb';
import { EditText, EditTextarea } from 'react-edit-text';
import { Link } from "react-router-dom";

import 'react-edit-text/dist/index.css';

class EditFloorAndUnit extends Component {
    state = {
        floor: [],
        indexOfFloor: null,
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
                        <Link to="/">
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
                                    <button className="floor-close-btn" onClick={() => { this.deleteFloor(f) }}><AiFillCloseCircle color="#F1416C" /></button>
                                    <div className="title"><EditText ref="floorTitle" showEditButton defaultValue={f.name} onSave={this.editFloorTitle} /></div>
                                    <div className="d-flex flex-wrap">
                                        {f.units.map((u) => (
                                            <div className="col-4">
                                                <div className="unit-box">
                                                    <button className="unit-close-btn" onClick={() => { this.deleteUnit(u, i) }}><AiFillCloseCircle color="#F1416C" /></button>
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

    addUnit = (f) => {
        const index = this.state.floor.indexOf(f);
        const newUnit = this.state.floor[index].units.concat(
            { number: "new" }
        )
        const updateFloor = [...this.state.floor]
        updateFloor[index].units = newUnit
        this.setState({ floor: updateFloor })
    }

    editFloorTitle = ({ value, previousValue }) => {
        const floor = this.state.floor.find(({ name }) => name === previousValue);
        const index = this.state.floor.findIndex(({ name }) => name === previousValue);

        (async () => {
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
        })();

        const updatedState = [...this.state.floor];
        updatedState[index].name = value;
        this.setState({ floor: updatedState });
        console.log(this.state.floor);
    };

    editUnitTitle = ({ value, previousValue }) => {
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
        updatedState[indexOfFloor].units[indexOfUnit].number = value;
        this.setState({ floor: updatedState });
        console.log(this.state.floor)
    }

    deleteFloor = (floor) => {
        (async () => {
            await fetch(`http://api.saadatportal.com/api/v1/floor/${floor.id}`, {
                method: 'DELETE',
            })
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res))
        })();

        const updateUsers = this.state.floor.filter(f => f !== floor);
        this.setState({ floor: updateUsers });
        console.log(this.state.floor)
    }

    deleteUnit = (unit, index) => {
        let updatedState = [...this.state.floor];
        let updatedUnit = this.state.floor[index].units;
        updatedUnit = updatedUnit.filter(u => u !== unit);
        updatedState[index].units = updatedUnit;
        this.setState({ floor: updatedState });
        console.log(this.state.floor)
    }

}

export default EditFloorAndUnit;