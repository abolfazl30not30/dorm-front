import React, { Component } from "react";
import "../style/loginStyle.css";
import '../style/registerPage.css';
import logo from "../img/sadat logo-png.png";
import * as yup from 'yup'

class Login extends Component {
  state = {
    account:{
      user:'',
      password:''
    },
    errors: []
  };
  render() {
    const {user,password} = this.state.account
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
                <div className={'input-group-register'}>
                  <input
                      type="text"
                      name="user"
                      value={user}
                      onChange={this.handleChange}
                      className={`username input`}
                      style={{border: this.state.errors.includes('لطفا نام کاربری را وارد کنید') ? '2px solid red' : ''}}
                      placeholder="نام کاربری"
                  />
                  {
                    this.state.errors.includes('لطفا نام کاربری را وارد کنید')
                      ? <small className="text-danger">لطفا نام کاربری را وارد کنید</small>
                        : null
                  }
                </div>
                <div className={'input-group-register'}>
                  <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      className={`password input`}
                      style={{border: this.state.errors.includes('رمز عبور باید حداقل 8 کاراکتر باشد') ? '2px solid red' : ''}}
                      placeholder="گذرواژه"
                  />
                  {
                    this.state.errors.includes('رمز عبور باید حداقل 8 کاراکتر باشد')
                        ? <small className="text-danger">رمز عبور باید حداقل 8 کاراکتر باشد</small>
                        : null
                  }
                </div>
                <div className="option-row mt-3">
                  <div className="remember">
                    <input
                      type="checkbox"
                      id="chk-remember"
                      className="chk-remember"
                    />
                    <label htmlFor="chk-remember">مرا به خاطر بسپار</label>
                  </div>
                </div>
                <button className="btn-login">ورود</button>
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
    password: yup.string().min(8,'رمز عبور باید حداقل 8 کاراکتر باشد')
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
  handleSubmit = (e) => {
    e.preventDefault();
    const result =  this.validate();
    console.log(result);
  }
  
}

export default Login;
