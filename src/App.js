import React, {Component} from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Login from './component/Login';
import MainDashboard from './component/MainDashboard';
import ForgotPassword from "./component/ForgotPassword";
import ProtectedRoute from "./component/protectedRoute";

class App extends Component {

    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={(<Login/>)}/>
                        <Route exact path="/forgot-password" element={(<ForgotPassword/>)}/>
                        <Route exact path="/dashboard/*" element={(<ProtectedRoute><MainDashboard/></ProtectedRoute>)}/>
{/*//                         <Route exact path="/dashboard/*" element={(<MainDashboard/>)}/>*/}
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
