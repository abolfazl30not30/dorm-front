import React, { Component } from "react";

class Login extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="container">
          <div className="left-side">
            <div className="title"></div>
            <div className="form-container">
              <div className="login-form">
                <form>
                  <h3>ورود کاربر</h3>
                  <input
                    type="text"
                    className="username"
                    placeholder="نام کاربری"
                  />
                  <input
                    type="password"
                    className="password"
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
                    <a href="#" className="forgot">
                      فراموشی رمز؟
                    </a>
                  </div>
                  <button className="btn-login">ورود</button>
                </form>
              </div>
            </div>
          </div>
          <div className="right-side">
            <img src=""></img>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
