import {Component} from "react";
import "./../../../../style/navbar.css";
import TaskContext from "./../../../../contexts/tasks"

class Navbar extends Component {
    static contextType = TaskContext
    render() {
        return (
            <section className="top-nav">
                <div className="d-flex align-items-center">
                    <div className="m-3">
                        <h5>{this.context.name}</h5>
                        <h6>{this.context.email}</h6>
                    </div>
                </div>
                <input id="menu-toggle" type="checkbox"/>
                <label className='menu-button-container' htmlFor="menu-toggle">
                    <div className='menu-button'></div>
                </label>
                <ul className="menu">
                    <li>
                        <button className="btn btn-lg btn-success w-100" onClick={this.context.onNewTask}>New Task</button>

                    </li>
                    <li>
                        <button className="logout-btn w-100">Log out</button>
                    </li>
                </ul>
            </section>
        );
    }
}

export default Navbar;