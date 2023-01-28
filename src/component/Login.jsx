import React, { Component } from "react";
import "../style/loginStyle.css";
import '../style/registerPage.css';
import logo from "../img/sadat logo-png.png";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import * as yup from 'yup'
import {Link} from "react-router-dom"
import axios from "axios";
import {Box, Button, CircularProgress} from "@mui/material";
import {blue} from "@material-ui/core/colors";
class Login extends Component {
  state = {
    showPassword: false,
    response: '',
    loading: false,
    account: {
      user: '',
      password: ''
    },
    validation: {
      userRequiredReg: '',
      passwordRequiredReg: '',
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
                <div className="login-form">
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
                        style={{border: this.state.validation.userRequiredReg === false ? '1px solid red' : ''}}
                        placeholder="نام کاربری"
                    />
                    {
                      this.state.validation.userRequiredReg === false
                          ?
                          <small className="text-danger" style={{fontSize: "10px"}}>لطفا نام کاربری را وارد کنید</small>
                          : null
                    }
                  </div>
                  <div className="form-group mb-4" style={{width: "80%"}}>
                    <input
                        type={this.state.showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        className={`form-control input password`}
                        style={{border: this.state.validation.passwordRequiredReg === false ? '1px solid red' : ''}}
                        placeholder="گذرواژه"
                    />
                    <div className="mx-2 d-flex align-item-center">
                      <div className={"chk-show d-flex align-items-center justify-content-center"} onClick={
                        () => this.setState({showPassword: !this.state.showPassword})
                      }>
                        <input type="checkbox" checked={this.state.showPassword}/>
                      </div>
                      <label htmlFor="chk-show" className={"m-2"} style={{fontSize: "0.7rem", userSelect: 'none'}}>نمایش گذرواژه</label>
                    </div>
                    {
                      this.state.validation.passwordRequiredReg === false
                          ? <small className="form-text text-danger" style={{fontSize: "10px"}}>لطفا رمز را وارد کنید!</small>
                          : null
                    }
                    {/*{*/}
                    {/*  this.state.errors.includes('ایمیل یا پسورد صحیح نمی باشد')*/}
                    {/*      ? <small className="form-text text-danger" style={{fontSize: "10px"}}>ایمیل یا پسورد صحیح نمی*/}
                    {/*        باشد</small>*/}
                    {/*      : null*/}
                    {/*}*/}
                  </div>
                  {
                    this.state.validation.userRequiredReg === true &&
                    this.state.validation.passwordRequiredReg === true && this.state.response !== ''
                        ?
                        <small className="text-danger mb-2" style={{fontSize: "10px"}}>نام کاربری یا رمز عبور صحیح نیست!</small>
                        : null
                  }
                  <Box className={"w-75"} sx={{ m: 1, position: 'relative' }}>
                    <Button
                        variant="contained"
                        className={"btn-login w-100"}
                        disabled={this.state.loading}
                        onClick={this.handleSubmit}
                    >
                      ورود
                    </Button>
                    {this.state.loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                              color: "#fff",
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              marginTop: '-12px',
                              marginLeft: '-12px',
                            }}
                        />
                    )}
                  </Box>

                  {/*<button*/}
                  {/*    // disabled={this.state.loading}*/}
                  {/*    className="btn-login"*/}
                  {/*     onClick={() => this.handleSubmit()}*/}
                  {/*>ورود</button>*/}
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

                </div>
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

  // schema = yup.object().shape({
  //   user: yup.string().required('لطفا نام کاربری را وارد کنید'),
  //   // password: yup.string().min(8,'رمز عبور باید حداقل 8 کاراکتر باشد')
  // })

  // validate = async () => {
  //   try {
  //     const result = await this.schema.validate(this.state.account, {abortEarly: false});
  //     return result;
  //   } catch (error) {
  //     console.log(error.errors);
  //     this.setState({errors: error.errors})
  //   }
  // }

  validation = () => {
    let requiredReg = /^\s*$/;

    let user_Reg = !requiredReg.test(this.state.account.user);
    let pass_reg = this.state.account.password !== '';

    let updateValidation = {...this.state.validation};
    updateValidation.userRequiredReg = user_Reg;
    updateValidation.passwordRequiredReg = pass_reg;
    this.setState({validation: updateValidation})


    console.log(user_Reg)
    console.log(pass_reg)

    return user_Reg && pass_reg;
  }

  handleSubmit = async () => {
    // e.preventDefault();
    // const result = this.validate();
    // let getValue = await result;

    this.setState({loading: true})
    console.log(123)
    this.setState({response: ''})
    let res = this.validation();

    console.log('res: ')

    if (res) {
      axios.post(`https://api.saadatportal.com/login`, null, {
            params: {
              "username": this.state.account.user,
              "password": this.state.account.password
            }
          },
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "https://api.saadatportal.com",
            }
          })
          .then(response => {
            localStorage.setItem("accessToken", response.headers["accesstoken"]);
            localStorage.setItem("refreshToken", response.headers["refreshtoken"]);
            localStorage.setItem("role", response.headers["role"]);
            localStorage.setItem("username", this.state.account.user);
            localStorage.setItem("id", response.headers["id"])
            window.location = "/dashboard"
          }).catch(err => {
        // this.setState({errors: ['نام کاربری یا پسورد صحیح نمی باشد']})
        this.setState({response: err})
      })
    }
    this.setState({loading: false})
  }
}
export default Login;
