import {Component} from "react";
import {Navigate} from "react-router-dom"
import axios from "axios";

class ProtectedRoute extends Component {
    state = {
        isAuth: null
    }

    componentWillMount() {
        const role = localStorage.getItem('role')
        if (role === 'MANAGER') {
            axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                .then((response) => {
                    if (response.headers["accesstoken"]) {
                        localStorage.setItem("accessToken", response.headers["accesstoken"]);
                        this.setState({isAuth: true})
                        console.log(2)
                        return this.state.isAuth
                    } else {
                        this.setState({isAuth: false})
                        console.log(3)
                        return this.state.isAuth
                    }
                })
        } else if (role === 'SUPERVISOR') {
            axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                .then((response) => {
                    if (response.headers["accesstoken"]) {
                        localStorage.setItem("accessToken", response.headers["accesstoken"]);
                        this.setState({isAuth: true})
                        console.log(this.state.isAuth)
                        return this.state.isAuth
                    } else {
                        this.setState({isAuth: false})
                        console.log(5)
                        return this.state.isAuth
                    }
                })
        }
    }

    render() {
        return (
            <>
                {
                    this.state.isAuth === true ?
                        this.props.children
                    : this.state.isAuth === false ?
                        <Navigate to={'/'} replace={true}/>
                    :
                        null
                }
            </>
        );
    }
}
export default ProtectedRoute