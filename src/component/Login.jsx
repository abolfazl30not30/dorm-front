import React, { Component } from "react";
import "../style/loginStyle.css";
import '../style/registerPage.css';
import logo from "../img/sadat logo-png.png";
import * as yup from 'yup'
import {Link} from "react-router-dom"
import axios from "axios";
class Login extends Component {
  state = {
    loading: false,
    account: {
      user: '',
      password: ''
    },
    errors: [],
    getValue: {}
  };

  render() {
    const {user, password} = this.state.account
    return (
        <>
          <div className="container-login">
            <div className="left-side">
              <div className="title">
                <h2>سعـادت پـرتـال</h2>
              </div>
              <div className="form-container">
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="title-form">
                    <h3>ورود کاربر</h3>
                  </div>

                  <div className={'form-group mt-2 mb-4'} style={{width: "80%"}}>
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
                          ?
                          <small className="text-danger" style={{fontSize: "10px"}}>لطفا نام کاربری را وارد کنید</small>
                          : null
                    }
                  </div>
                  <div className="form-group mb-4" style={{width: "80%"}}>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        className={`form-control input password`}
                        style={{border: this.state.errors.includes('رمز عبور باید حداقل 8 کاراکتر باشد') ? '1px solid red' : ''}}
                        placeholder="گذرواژه"
                    />
                    {
                      this.state.errors.includes('رمز عبور باید حداقل 8 کاراکتر باشد')
                          ? <small className="form-text text-danger" style={{fontSize: "10px"}}>رمز عبور باید حداقل 8
                            کاراکتر باشد</small>
                          : null
                    }
                    {
                      this.state.errors.includes('ایمیل یا پسورد صحیح نمی باشد')
                          ? <small className="form-text text-danger" style={{fontSize: "10px"}}>ایمیل یا پسورد صحیح نمی
                            باشد</small>
                          : null
                    }
                  </div>
                  <button disabled={this.state.loading} className="btn-login">ورود</button>
                  <div className="option-row mt-4 mb-2">
                    <div className="remember d-flex align-item-center">
                      <input
                          type="checkbox"
                          id="chk-remember"
                          className="chk-remember"
                      />
                      <label htmlFor="chk-remember">مرا به خاطر بسپار</label>
                    </div>
                    <div className="forgotDiv">
                      <Link to="/forgot-password" className="forgot">
                        فراموشی رمز؟
                      </Link>
                    </div>
                  </div>

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
    // password: yup.string().min(8,'رمز عبور باید حداقل 8 کاراکتر باشد')
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
    const result = this.validate();
    let getValue = await result;

    this.setState({loading: true})
    axios.post(`https://api.saadatportal.com/login`, null, {
          params: {
            "username": getValue.user,
            "password": getValue.password
          }
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          }
        })
        .then(response => {
          localStorage.setItem("accessToken", response.headers["accesstoken"]);
          localStorage.setItem("refreshToken", response.headers["refreshtoken"]);
          localStorage.setItem("role", response.headers["role"]);
          this.setState({loading: false})
          window.location = "/dashboard"
          axios.get('https://api.saadatportal.com/api/v1/task', {headers: {'Authorization': localStorage.getItem('accessToken')}}).then((response) => response.data)
            .then((response) => {
              console.log(response.headers)
            }).catch((error) => {
            console.log(error)
          })}).catch(err => {
      this.setState({loading: false})
      this.setState({errors: ['ایمیل یا پسورد صحیح نمی باشد']})
    })
  }
}
export default Login;
