import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/reset.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));