import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./style/reset.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from "react-router-dom";
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXmJWf1FpTGpQdk5yd19DaVZUTX1dQl9hSXlTckVmXHtfcHNVRGM=');

// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
