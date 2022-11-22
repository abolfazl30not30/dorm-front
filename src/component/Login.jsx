import React, { Component } from "react";
import "../style/loginStyle.css";
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
                <input
                  type="text"
                  name="user"
                  value={user}
                  onChange={this.handleChange}
                  className="username input"
                  placeholder="نام کاربری"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="password input"
                  placeholder="گذرواژه"
                />
                {this.state.errors.length !== 0 && (
                  this.state.errors.map((e,i) => (<div className="error my-2" key={i}>{e}</div>))
                )}
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
