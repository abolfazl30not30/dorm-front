import React, { Component } from "react";
import "../style/loginStyle.css";
import '../style/registerPage.css';
import logo from "../img/sadat logo-png.png";
import * as yup from 'yup';
import {Link} from "react-router-dom";

class Login extends Component {

    state = {
        account:{
            user:'',
            email:''
        },
        errors: [],
        getValue:{}
    };

    render() {
        const {user,email} = this.state.account
        return (
            <>
                <div className="container-login">
                    <div className="left-side">
                        <div className="title">
                            <h2>سعـادت پـرتـال</h2>
                        </div>
                        <button onClick={() => console.log(this.state.account.user)}>asd</button>
                        <div className="form-container">
                            <form className="login-form" onSubmit={this.handleSubmit}>
                                <div className="title-form">
                                    <h3>فراموشی رمز</h3>
                                </div>

                                <div className={'form-group mt-2 mb-4'}  style={{width:"80%"}}>
                                    <input
                                        type="text"
                                        name="user"
                                        value={user}
                                        onChange={this.handleChange}
                                        className={'form-control input username'}
                                        style={{border: this.state.errors.includes('لطفا نام کاربری را وارد کنید') ? '1px solid red' : ''}}
                                        placeholder="نام کاربری"
                                    />
                                    {
                                        this.state.errors.includes('لطفا نام کاربری را وارد کنید')
                                            ? <small className="text-danger" style={{fontSize:"10px"}}>لطفا نام کاربری را وارد کنید</small>
                                            : null
                                    }
                                </div>
                                <div className="form-group mb-4" style={{width:"80%"}}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        className={`form-control input password`}
                                        style={{border: this.state.errors.includes('ایمیل معتبر نیست') ? '1px solid red' : ''}}
                                        placeholder="ایمیل"
                                    />
                                    {
                                        this.state.errors.includes('ایمیل معتبر نیست')
                                            ? <small className="form-text text-danger" style={{fontSize:"10px"}}>ایمیل معتبر نیست</small>
                                            : null
                                    }
                                    {
                                        this.state.errors.includes('شما امکان دسترسی به سیستم ندارید') && !this.state.errors.includes('لطفا نام کاربری را وارد کنید')
                                            ? <small className="form-text text-danger" style={{fontSize:"10px"}}>شما امکان دسترسی به سیستم ندارید</small>
                                            : null
                                    }
                                    {
                                        this.state.errors.includes('ایمیل صحیح نمی باشد')
                                            ? <small className="form-text text-danger" style={{fontSize:"10px"}}>ایمیل صحیح نمی باشد</small>
                                            : null
                                    }
                                </div>
                                <button className="btn-login mb-3">ارسال</button>
                                <Link to="/" className="btn-login mb-3 d-flex align-items-center justify-content-center" style={{backgroundColor:"#DB9B31",textDecoration:"none",textAlign:"center"}}>بازگشت</Link>
                            </form>
                        </div>
                    </div>
                    <div className="right-side">
                        <img src={logo}></img>
                    </div>
                </div>
            </>
        );
    }

    handleChange = ({currentTarget: input}) => {
        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({account})
    }
    schema = yup.object().shape({
        user: yup.string().required('لطفا نام کاربری را وارد کنید'),
        email: yup.string().email('ایمیل معتبر نیست').required('ایمیل معتبر نیست')
    })

    validate = async () => {
        try {
            const result = await this.schema.validate(this.state.account, {abortEarly: false});
            return result;
        } catch (error) {
            console.log(error.errors);
            this.setState({errors: error.errors})
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const result =  this.validate();

        let getValue = await result;

        // let username = "fazel";
        // let password = "12345678";

        // if(username === getValue.user && password === getValue.email){
        //     window.location = '/dashboard';


        let response = '';
        const postEmail = await fetch('https://api.saadatportal.com/api/v1/email/forgot/password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.account.user,
                email: this.state.account.email
            })
        }).then((res) => response = res);

        // let respondForgotPassword = await postEmail.json();

        console.log(response)

        if (response.status === 200) {
            window.location = '/';
            console.log('success')
            this.setState({errors: []})
        } else if (response.status === 500){
            if (!this.state.errors.includes('لطفا نام کاربری را وارد کنید') && !this.state.errors.includes('ایمیل معتبر نیست')){
                this.setState({errors: ['شما امکان دسترسی به سیستم ندارید']})
            }
        } else if (response.status === 403){
            this.setState({errors: ['ایمیل صحیح نمی باشد']})
        }

        // if ()

        // }else {
        //     this.setState({errors: ['ایمیل یا پسورد صحیح نمی باشد']})
        // }
    }
}

export default Login;