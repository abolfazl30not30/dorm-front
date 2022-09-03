import React, { Component } from "react";
import "../style/loginStyle.css";
import logo from "../img/sadat logo-png.png";

class Login extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="container">
          <div className="left-side">
            <div className="title">
              <h2>سعـادت پـرتـال</h2>
            </div>
            <div className="form-container">
              <form className="login-form">
                <div className="title-form">
                  <h3>ورود کاربر</h3>
                </div>
                <input
                  type="text"
                  className="username input"
                  placeholder="نام کاربری"
                />
                <input
                  type="password"
                  className="password input"
                  placeholder="گذرواژه"
                />
                <div className="option-row">
                  <div className="remember">
                    <input
                      type="checkbox"
                      id="chk-remember"
                      className="chk-remember"
                    />
                    <label htmlFor="chk-remember">مرا به خاطر بسپار</label>
                  </div>
                  <div className="forgotDiv">
                    <a href="#" className="forgot">
                      فراموشی رمز؟
                    </a>
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
}

export default Login;
