import { Component } from "react";
import './../../../../style/editBuilding.css';
import { BsDoorClosed } from 'react-icons/bs'
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import { TbBuilding } from 'react-icons/tb';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

class EditFloorAndUnit extends Component {
    state = {
        floor: [],
        indexOfFloor: null,
    }

    componentDidMount() {
        const floor = [
            {
                id: 1, floorName: "طبقه اول",
                unit: [
                    { id: 111, unitName: "111" },
                    { id: 112, unitName: "112" },
                    { id: 113, unitName: "113" },
                    { id: 114, unitName: "114" },
                    { id: 115, unitName: "115" },
                ]
            },
            {
                id: 2, floorName: "طبقه دوم",
                unit: [
                    { id: 211, unitName: "211" },
                    { id: 212, unitName: "212" },
                    { id: 213, unitName: "213" },
                    { id: 214, unitName: "214" }
                ]
            },
            {
                id: 3, floorName: "طبقه سوم",
                unit: [
                    { id: 311, unitName: "311" },
                    { id: 312, unitName: "312" }
                ]
            },
        ]
        this.setState({ floor: floor });
    }

    addFloor = () => {
        const newFloor = this.state.floor.concat(
            {
                id: 3, floorName: "طبقه ....",
                unit: []
            }
        )
        this.setState({ floor: newFloor })
    }

    addUnit = (e) => {
        const floorCurrent = e.target.getAttribute('floor')
        const newUnit = this.state.floor[floorCurrent].unit.concat(
            { id: 311, unitName: "new" }
        )
        const updateFloor = [...this.state.floor]

        updateFloor[floorCurrent].unit = newUnit

        this.setState({ floor: updateFloor })
    }

    editFloorTitle = ({ value, previousValue }) => {
        const index = this.state.floor.findIndex(({ floorName }) => floorName === previousValue);
        const updatedState = [...this.state.floor];
        updatedState[index].floorName = value;
        this.setState({ floor: updatedState });
        console.log(this.state.floor)

    };

    editUnitTitle = ({ value, previousValue }) => {
        let indexOfFloor = -1;
        let indexOfUnit = -1;

        for (let x = 0; x < this.state.floor.length; x++) {
            indexOfUnit = this.state.floor[x].unit.findIndex(({ unitName }) => unitName === previousValue);
            if (indexOfUnit !== -1) {
                indexOfFloor = x;
                break;
            }
        }
        const updatedState = [...this.state.floor];
        updatedState[indexOfFloor].unit[indexOfUnit].unitName = value;
        this.setState({ floor: updatedState });
        console.log(this.state.floor)
    }
    deleteFloor = (floor) => {
        const updateUsers = this.state.floor.filter(f => f !== floor);
        this.setState({ floor: updateUsers });
        console.log(this.state.floor)
    }

    deleteUnit = (unit, index) => {
        let updatedState = [...this.state.floor];
        let updatedUnit = this.state.floor[index].unit;
        updatedUnit = updatedUnit.filter(u => u !== unit);
        updatedState[index].unit = updatedUnit;
        this.setState({ floor: updatedState });
        console.log(this.state.floor)
    }
    render() {
        return (
            <>
                <div className="row pb-5">
                    {this.state.floor.map((f, i) => (
                        <div className="col-4 p-3" key={i}>
                            <div className="floor-box">
                                <button className="floor-close-btn" onClick={() => { this.deleteFloor(f) }}><AiFillCloseCircle color="#F1416C" /></button>
                                <div className="title"><EditText ref="floorTitle" showEditButton defaultValue={f.floorName} onSave={this.editFloorTitle} /></div>
                                <div className="d-flex flex-wrap">
                                    {f.unit.map((u) => (
                                        <div className="col-4" key={u.id}>
                                            <div className="unit-box">
                                                <button className="unit-close-btn" onClick={() => { this.deleteUnit(u, i) }}><AiFillCloseCircle color="#F1416C" /></button>
                                                <TbBuilding fontSize="2rem" />
                                                <div className="title"><EditText className="editable" showEditButton onSave={this.editUnitTitle} defaultValue={u.unitName} /></div>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={this.addUnit} className="unit-add-btn" floor={i}><AiOutlinePlus /></button>
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
            </>
        );
    }
}

export default EditFloorAndUnit;