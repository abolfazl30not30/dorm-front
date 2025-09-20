import React, {Component} from 'react'
import "../../../../../style/uploadPage.css"
import {BsFileEarmarkImage, BsFileEarmarkPdfFill} from "react-icons/bs"
import upload_icon from '../../../../../img/Group 1.png'
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import ReactLoading from "react-loading";
import Alert from "react-bootstrap/Alert";
import {MdDelete} from "react-icons/md";
import {RiFileUploadFill} from "react-icons/ri";
import BuildingContext from "../../../../../contexts/Building";

class FGUploadPage extends Component {
    static contextType = BuildingContext;

    constructor(props) {
        super(props);
        this.inputBirthPage1 = React.createRef();
        this.inputBirthPage2 = React.createRef();
        this.inputBirthPage3 = React.createRef();
        this.inputBirthPage4 = React.createRef();
        this.inputBirthAllPage = React.createRef();
        this.inputCartPage1 = React.createRef();
        this.inputCartPage2 = React.createRef();
        this.inputCartAllPage = React.createRef();
        this.inputPersonnelImg = React.createRef();
        this.inputRegister = React.createRef();
        this.inputRegisterUni = React.createRef();
    }

    //progress bar
    state = {
        uploadPercentage: 0,
        avatar: '',

        fileIdBirthPage1: "",
        fileIdBirthPage2: "",
        fileIdBirthPage3: "",
        fileIdBirthPage4: "",
        fileIdBirthAllPage: "",
        fileIdCartPage1: "",
        fileIdCartPage2: "",
        fileIdCartAllPage: "",
        fileIdPersonnelImg: "",
        fileIdRegister: "",
        fileIdRegisterUni: "",

        nameBirthPage1: "",
        nameBirthPage2: "",
        nameBirthPage3: "",
        nameBirthPage4: "",
        nameBirthAllPage: "",
        nameCartPage1: "",
        nameCartPage2: "",
        nameCartAllPage: "",
        namePersonnelImg: "",
        nameRegister: "",
        nameRegisterUni: "",

        isUploadBirthPage1: false,
        isUploadBirthPage2: false,
        isUploadBirthPage3: false,
        isUploadBirthPage4: false,
        isUploadBirthAllPage: false,
        isUploadCartPage1: false,
        isUploadCartPage2: false,
        isUploadCartAllPage: false,
        isUploadPersonnelImg: false,
        isUploadRegister: false,
        isUploadRegisterUni: false,

        isLoadingBirthPage1: false,
        isLoadingBirthPage2: false,
        isLoadingBirthPage3: false,
        isLoadingBirthPage4: false,
        isLoadingBirthAllPage: false,
        isLoadingCartPage1: false,
        isLoadingCartPage2: false,
        isLoadingCartAllPage: false,
        isLoadingPersonnelImg: false,
        isLoadingRegister: false,
        isLoadingRegisterUni: false,

        hasErrorBirthPage1: false,
        hasErrorBirthPage2: false,
        hasErrorBirthPage3: false,
        hasErrorBirthPage4: false,
        hasErrorBirthAllPage: false,
        hasErrorCartPage1: false,
        hasErrorCartPage2: false,
        hasErrorCartAllPage: false,
        hasErrorPersonnelImg: false,
        hasErrorRegister: false,
        hasErrorRegisterUni: false,

    }

    componentDidMount = () => {
        const {avatar} = this.props;
        this.setState({avatar})
    }

    uploadFile = ({target: {files}}) => {
        console.log(files[0])
        let data = new FormData();
        data.append('file', files[0])

        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                if (percent < 100) {
                    this.setState({uploadPercentage: percent})
                }
            }
        }

        axios.post("https://www.mocky.io/v2/5cc8019d300000980a055e76", data, options).then(res => {
            console.log(res)
            this.setState({avatar: res.data.url, uploadPercentage: 100}, () => {
                setTimeout(() => {
                    this.setState({uploadPercentage: 0})
                }, 1000);
            })
        })
    }

    render() {
        return (
            <>
                <div className='upload-container row'>
                    <div className="upload-container-title">
                        <h5>آپلود مدارک</h5>
                        <p>توجه: حداکثر حجم آپلود فایل 10 مگابایت می باشد</p>
                    </div>
                    <div className='sections col-md-7'>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>آپلود شناسنامه</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <div className="my-3">
                                            <div className="upload-title d-flex justify-content-start my-2">
                                                <BsFileEarmarkImage style={{fontSize: "25px"}} color="#FA66A4"/>
                                                <span className='mx-2'>صفحه اول :</span>
                                            </div>
                                            <input className='form-control form-control-sm  p-2 ' type="file"
                                                   ref={this.inputBirthPage1}
                                                   disabled={this.state.isUploadBirthPage1 && !this.state.hasErrorBirthPage1}
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthPage1(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthPage1 && !this.state.hasErrorBirthPage1 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <RiFileUploadFill/>
                                                            <h6 className="mx-1">{this.state.nameBirthPage1}</h6>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteBirthPage1}><MdDelete
                                                            fontSize="20px"/></button>
                                                    </div>
                                                ) : (this.state.isLoadingBirthPage1 && (
                                                        <div
                                                            className="d-flex align-item-center justify-content-center">
                                                            <ReactLoading type="cylon" color="#bdc3c7"
                                                                          className="loading" height={1}
                                                                          width={45}/>
                                                        </div>
                                                    )
                                                )}
                                                {
                                                    this.state.isUploadBirthPage1 && (
                                                        (this.state.hasErrorBirthPage1) && (
                                                            <Alert variant='danger' className="mt-3">
                                                                فایل آپلود نشد
                                                            </Alert>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="my-3">
                                            <div className="upload-title d-flex justify-content-start my-2">
                                                <BsFileEarmarkImage style={{fontSize: "25px"}} color="#FA66A4"/>
                                                <span className='mx-2'>صفحه دوم :</span>
                                            </div>
                                            <input className='form-control form-control-sm  p-2 ' type="file"
                                                   ref={this.inputBirthPage2}
                                                   disabled={this.state.isUploadBirthPage2 && !this.state.hasErrorBirthPage2}
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthPage2(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthPage2 && !this.state.hasErrorBirthPage2 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <RiFileUploadFill/>
                                                            <h6 className="mx-1">{this.state.nameBirthPage2}</h6>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteBirthPage2}><MdDelete
                                                            fontSize="20px"/></button>
                                                    </div>
                                                ) : (this.state.isLoadingBirthPage2 && (
                                                        <div
                                                            className="d-flex align-item-center justify-content-center">
                                                            <ReactLoading type="cylon" color="#bdc3c7"
                                                                          className="loading" height={1}
                                                                          width={45}/>
                                                        </div>
                                                    )
                                                )}
                                                {
                                                    this.state.isUploadBirthPage2 && (
                                                        (this.state.hasErrorBirthPage2) && (
                                                            <Alert variant='danger' className="mt-3">
                                                                فایل آپلود نشد
                                                            </Alert>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="my-3">
                                            <div className="upload-title d-flex justify-content-start my-2">
                                                <BsFileEarmarkImage style={{fontSize: "25px"}} color="#FA66A4"/>
                                                <span className='mx-2'>صفحه سوم :</span>
                                            </div>
                                            <input className='form-control form-control-sm  p-2 ' type="file"
                                                   ref={this.inputBirthPage3}
                                                   disabled={this.state.isUploadBirthPage3 && !this.state.hasErrorBirthPage3}
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthPage3(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthPage3 && !this.state.hasErrorBirthPage3 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <RiFileUploadFill/>
                                                            <h6 className="mx-1">{this.state.nameBirthPage3}</h6>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteBirthPage3}><MdDelete
                                                            fontSize="20px"/></button>
                                                    </div>
                                                ) : (this.state.isLoadingBirthPage3 && (
                                                        <div
                                                            className="d-flex align-item-center justify-content-center">
                                                            <ReactLoading type="cylon" color="#bdc3c7"
                                                                          className="loading" height={1}
                                                                          width={45}/>
                                                        </div>
                                                    )
                                                )}
                                                {
                                                    this.state.isUploadBirthPage3 && (
                                                        (this.state.hasErrorBirthPage3) && (
                                                            <Alert variant='danger' className="mt-3">
                                                                فایل آپلود نشد
                                                            </Alert>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="my-3">
                                            <div className="upload-title d-flex justify-content-start my-2">
                                                <BsFileEarmarkImage style={{fontSize: "25px"}} color="#FA66A4"/>
                                                <span className='mx-2'>صفحه چهارم :</span>
                                            </div>
                                            <input className='form-control form-control-sm  p-2 ' type="file"
                                                   ref={this.inputBirthPage4}
                                                   disabled={this.state.isUploadBirthPage4 && !this.state.hasErrorBirthPage4}
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthPage4(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthPage4 && !this.state.hasErrorBirthPage4 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <RiFileUploadFill/>
                                                            <h6 className="mx-1">{this.state.nameBirthPage4}</h6>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteBirthPage4}><MdDelete
                                                            fontSize="20px"/></button>
                                                    </div>
                                                ) : (this.state.isLoadingBirthPage4 && (
                                                        <div
                                                            className="d-flex align-item-center justify-content-center">
                                                            <ReactLoading type="cylon" color="#bdc3c7"
                                                                          className="loading" height={1}
                                                                          width={45}/>
                                                        </div>
                                                    )
                                                )}
                                                {
                                                    this.state.isUploadBirthPage4 && (
                                                        (this.state.hasErrorBirthPage4) && (
                                                            <Alert variant='danger' className="mt-3">
                                                                فایل آپلود نشد
                                                            </Alert>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="my-3" style={{borderTop: "1px solid #c1c1c1"}}>
                                            <div className="upload-title d-flex justify-content-start my-2">
                                                <BsFileEarmarkPdfFill style={{fontSize: "25px"}} color="#FA9627"/>
                                                <span className='mx-2'>کل صفحات :</span>
                                            </div>
                                            <input className='form-control form-control-sm  p-2 ' type="file"
                                                   ref={this.inputBirthAllPage}
                                                   disabled={this.state.isUploadBirthAllPage && !this.state.hasErrorBirthAllPage}
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthAllPage(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthAllPage && !this.state.hasErrorBirthAllPage ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <RiFileUploadFill/>
                                                            <h6 className="mx-1">{this.state.nameBirthAllPage}</h6>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteBirthAllPage}><MdDelete
                                                            fontSize="20px"/></button>
                                                    </div>
                                                ) : (this.state.isLoadingBirthAllPage && (
                                                        <div
                                                            className="d-flex align-item-center justify-content-center">
                                                            <ReactLoading type="cylon" color="#bdc3c7"
                                                                          className="loading" height={1}
                                                                          width={45}/>
                                                        </div>
                                                    )
                                                )}
                                                {
                                                    this.state.isUploadBirthAllPage && (
                                                        (this.state.hasErrorBirthAllPage) && (
                                                            <Alert variant='danger' className="mt-3">
                                                                فایل آپلود نشد
                                                            </Alert>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>آپلود کارت ملی</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <div className="my-3">
                                            <div className="upload-title d-flex justify-content-start my-2">
                                                <BsFileEarmarkImage style={{fontSize: "25px"}} color="#FA66A4"/>
                                                <span className='mx-2'>صفحه اول :</span>
                                            </div>
                                            <input className='form-control form-control-sm  p-2 ' type="file"
                                                   ref={this.inputCartPage1}
                                                   disabled={this.state.isUploadCartPage1 && !this.state.hasErrorCartPage1}
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileCartPage1(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadCartPage1 && !this.state.hasErrorCartPage1 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <RiFileUploadFill/>
                                                            <h6 className="mx-1">{this.state.nameCartPage1}</h6>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteCartPage1}><MdDelete
                                                            fontSize="20px"/></button>
                                                    </div>
                                                ) : (this.state.isLoadingCartPage1 && (
                                                        <div
                                                            className="d-flex align-item-center justify-content-center">
                                                            <ReactLoading type="cylon" color="#bdc3c7"
                                                                          className="loading" height={1}
                                                                          width={45}/>
                                                        </div>
                                                    )
                                                )}
                                                {
                                                    this.state.isUploadCartPage1 && (
                                                        (this.state.hasErrorCartPage1) && (
                                                            <Alert variant='danger' className="mt-3">
                                                                فایل آپلود نشد
                                                            </Alert>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="my-3">
                                            <div className="upload-title d-flex justify-content-start my-2">
                                                <BsFileEarmarkImage style={{fontSize: "25px"}} color="#FA66A4"/>
                                                <span className='mx-2'>صفحه دوم :</span>
                                            </div>
                                            <input className='form-control form-control-sm  p-2 ' type="file"
                                                   ref={this.inputCartPage2}
                                                   disabled={this.state.isUploadCartPage2 && !this.state.hasErrorCartPage2}
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileCartPage2(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadCartPage2 && !this.state.hasErrorCartPage2 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <RiFileUploadFill/>
                                                            <h6 className="mx-1">{this.state.nameCartPage2}</h6>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteCartPage2}><MdDelete
                                                            fontSize="20px"/></button>
                                                    </div>
                                                ) : (this.state.isLoadingCartPage2 && (
                                                        <div
                                                            className="d-flex align-item-center justify-content-center">
                                                            <ReactLoading type="cylon" color="#bdc3c7"
                                                                          className="loading" height={1}
                                                                          width={45}/>
                                                        </div>
                                                    )
                                                )}
                                                {
                                                    this.state.isUploadCartPage2 && (
                                                        (this.state.hasErrorCartPage2) && (
                                                            <Alert variant='danger' className="mt-3">
                                                                فایل آپلود نشد
                                                            </Alert>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <div className="my-3" style={{borderTop: "1px solid #c1c1c1"}}>
                                            <div className="upload-title d-flex justify-content-start my-2">
                                                <BsFileEarmarkPdfFill style={{fontSize: "25px"}} color="#FA9627"/>
                                                <span className='mx-2'>کل صفحات :</span>
                                            </div>
                                            <input className='form-control form-control-sm  p-2 ' type="file"
                                                   ref={this.inputCartAllPage}
                                                   disabled={this.state.isUploadCartAllPage  && !this.state.hasErrorCartAllPage}
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileCartAllPage(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadCartAllPage && !this.state.hasErrorCartAllPage ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <RiFileUploadFill/>
                                                            <h6 className="mx-1">{this.state.nameCartAllPage}</h6>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteCartAllPage}><MdDelete
                                                            fontSize="20px"/></button>
                                                    </div>
                                                ) : (this.state.isLoadingCartAllPage && (
                                                        <div
                                                            className="d-flex align-item-center justify-content-center">
                                                            <ReactLoading type="cylon" color="#bdc3c7"
                                                                          className="loading" height={1}
                                                                          width={45}/>
                                                        </div>
                                                    )
                                                )}
                                                {
                                                    this.state.isUploadCartAllPage && (
                                                        (this.state.hasErrorCartAllPage) && (
                                                            <Alert variant='danger' className="mt-3">
                                                                فایل آپلود نشد
                                                            </Alert>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>آپلود عکس پرسنلی</Accordion.Header>
                                <Accordion.Body>
                                    <div className="my-3">
                                        <div className="upload-title d-flex justify-content-start my-2">
                                            <BsFileEarmarkImage style={{fontSize: "25px"}} color="#FA66A4"/>
                                            <span className='mx-2'>عکس پرسنلی :</span>
                                        </div>
                                        <input className='form-control form-control-sm  p-2 ' type="file"
                                               ref={this.inputPersonnelImg}
                                               disabled={this.state.isUploadPersonnelImg && !this.state.hasErrorPersonnelImg}
                                               id="formFileLg" name="filename" onChange={(e) => {
                                            this.handleFilePersonnelImg(e)
                                        }}/>
                                        <div>
                                            {this.state.isUploadPersonnelImg && !this.state.hasErrorPersonnelImg ? (
                                                <div className="file-container">
                                                    <div className="d-flex align-items-center">
                                                        <RiFileUploadFill/>
                                                        <h6 className="mx-1">{this.state.namePersonnelImg}</h6>
                                                    </div>
                                                    <button className="deleteBtn"
                                                            onClick={this.handleDeletePersonnelImg}><MdDelete
                                                        fontSize="20px"/></button>
                                                </div>
                                            ) : (this.state.isLoadingPersonnelImg && (
                                                    <div
                                                        className="d-flex align-item-center justify-content-center">
                                                        <ReactLoading type="cylon" color="#bdc3c7"
                                                                      className="loading" height={1}
                                                                      width={45}/>
                                                    </div>
                                                )
                                            )}
                                            {
                                                this.state.isUploadPersonnelImg && (
                                                    (this.state.hasErrorPersonnelImg) && (
                                                        <Alert variant='danger' className="mt-3">
                                                            فایل آپلود نشد
                                                        </Alert>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>آپلود فرم ثبت نام</Accordion.Header>
                                <Accordion.Body>
                                    <div className="my-3">
                                        <div className="upload-title d-flex justify-content-start my-2">
                                            <BsFileEarmarkPdfFill style={{fontSize: "25px"}} color="#FA9627"/>
                                            <span className='mx-2'>فرم ثبت نام :</span>
                                        </div>
                                        <input className='form-control form-control-sm  p-2 ' type="file"
                                               ref={this.inputRegister}
                                               disabled={this.state.isUploadRegister && !this.state.hasErrorRegister}
                                               id="formFileLg" name="filename" onChange={(e) => {
                                            this.handleFileRegister(e)
                                        }}/>
                                        <div>
                                            {this.state.isUploadRegister && !this.state.hasErrorRegister ? (
                                                <div className="file-container">
                                                    <div className="d-flex align-items-center">
                                                        <RiFileUploadFill/>
                                                        <h6 className="mx-1">{this.state.nameRegister}</h6>
                                                    </div>
                                                    <button className="deleteBtn"
                                                            onClick={this.handleDeleteRegister}><MdDelete
                                                        fontSize="20px"/></button>
                                                </div>
                                            ) : (this.state.isLoadingRegister && (
                                                    <div
                                                        className="d-flex align-item-center justify-content-center">
                                                        <ReactLoading type="cylon" color="#bdc3c7"
                                                                      className="loading" height={1}
                                                                      width={45}/>
                                                    </div>
                                                )
                                            )}
                                            {
                                                this.state.isUploadRegister && (
                                                    (this.state.hasErrorRegister) && (
                                                        <Alert variant='danger' className="mt-3">
                                                            فایل آپلود نشد
                                                        </Alert>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>آپلود پرینت ثبت نام دانشگاه</Accordion.Header>
                                <Accordion.Body>
                                    <div className="my-3">
                                        <div className="upload-title d-flex justify-content-start my-2">
                                            <BsFileEarmarkPdfFill style={{fontSize: "25px"}} color="#FA9627"/>
                                            <span className='mx-2'>پرینت ثبت نام دانشگاه :</span>
                                        </div>
                                        <input className='form-control form-control-sm  p-2 ' type="file"
                                               ref={this.inputRegisterUni}
                                               disabled={this.state.isUploadRegisterUni && !this.state.hasErrorRegisterUni}
                                               id="formFileLg" name="filename" onChange={(e) => {
                                            this.handleFileRegisterUni(e)
                                        }}/>
                                        <div>
                                            {this.state.isUploadRegisterUni && !this.state.hasErrorRegisterUni ? (
                                                <div className="file-container">
                                                    <div className="d-flex align-items-center">
                                                        <RiFileUploadFill/>
                                                        <h6 className="mx-1">{this.state.nameRegisterUni}</h6>
                                                    </div>
                                                    <button className="deleteBtn"
                                                            onClick={this.handleDeleteRegisterUni}><MdDelete
                                                        fontSize="20px"/></button>
                                                </div>
                                            ) : (this.state.isLoadingRegisterUni && (
                                                    <div
                                                        className="d-flex align-item-center justify-content-center">
                                                        <ReactLoading type="cylon" color="#bdc3c7"
                                                                      className="loading" height={1}
                                                                      width={45}/>
                                                    </div>
                                                )
                                            )}
                                            {
                                                this.state.isUploadRegisterUni && (
                                                    (this.state.hasErrorRegisterUni) && (
                                                        <Alert variant='danger' className="mt-3">
                                                            فایل آپلود نشد
                                                        </Alert>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className='upload-logo-container col-md-5'>
                        <img src={upload_icon} className='upload-icon' alt='upload_icon'/>
                    </div>
                </div>
            </>
        );
    }

    handleFileBirthPage1 = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isUploadBirthPage1: false})
            this.setState({isLoadingBirthPage1: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameBirthPage1: e.target.files[0].name})


            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdBirthPage1: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "birthPage1", result.message.id)
            //         this.setState({isLoadingBirthPage1: false});
            //         this.setState({isUploadBirthPage1: true})
            //         this.setState({hasErrorBirthPage1: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingBirthPage1: false});
            //         this.setState({isUploadBirthPage1: true})
            //         this.setState({hasErrorBirthPage1: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdBirthPage1: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "birthPage1", result.message.id)
                    this.setState({isLoadingBirthPage1: false});
                    this.setState({isUploadBirthPage1: true})
                    this.setState({hasErrorBirthPage1: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthPage1: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthPage1", result.message.id)
                                            this.setState({isLoadingBirthPage1: false});
                                            this.setState({isUploadBirthPage1: true})
                                            this.setState({hasErrorBirthPage1: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthPage1: false});
                                            this.setState({isUploadBirthPage1: true})
                                            this.setState({hasErrorBirthPage1: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthPage1: false});
                                this.setState({isUploadBirthPage1: true})
                                this.setState({hasErrorBirthPage1: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthPage1: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthPage1", result.message.id)
                                            this.setState({isLoadingBirthPage1: false});
                                            this.setState({isUploadBirthPage1: true})
                                            this.setState({hasErrorBirthPage1: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthPage1: false});
                                            this.setState({isUploadBirthPage1: true})
                                            this.setState({hasErrorBirthPage1: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthPage1: false});
                                this.setState({isUploadBirthPage1: true})
                                this.setState({hasErrorBirthPage1: true});
                            })
                    }})
        }
    }

    handleDeleteBirthPage1 = async () => {
        // await fetch(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage1}`, {
        //     method: 'DELETE',
        // })
        //     .then(res => res.text())
        //     .then(res => console.log(res));

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage1}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage1}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage1}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdBirthPage1);
        this.setState({fileIdBirthPage1: ""});
        this.setState({isUploadBirthPage1: false});
        this.setState({nameBirthPage1: ""});
        this.inputBirthPage1.current.value = "";

    }

    handleFileBirthPage2 = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingBirthPage2: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameBirthPage2: e.target.files[0].name})

            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdBirthPage2: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "birthPage2", result.message.id);
            //         this.setState({isLoadingBirthPage2: false});
            //         this.setState({isUploadBirthPage2: true})
            //         this.setState({hasErrorBirthPage2: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingBirthPage2: false});
            //         this.setState({isUploadBirthPage2: true})
            //         this.setState({hasErrorBirthPage2: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdBirthPage2: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "birthPage2", result.message.id);
                    this.setState({isLoadingBirthPage2: false});
                    this.setState({isUploadBirthPage2: true})
                    this.setState({hasErrorBirthPage2: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthPage2: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthPage2", result.message.id);
                                            this.setState({isLoadingBirthPage2: false});
                                            this.setState({isUploadBirthPage2: true})
                                            this.setState({hasErrorBirthPage2: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthPage2: false});
                                            this.setState({isUploadBirthPage2: true})
                                            this.setState({hasErrorBirthPage2: true});
                                        });
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthPage2: false});
                                this.setState({isUploadBirthPage2: true})
                                this.setState({hasErrorBirthPage2: true});
                            });
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthPage2: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthPage2", result.message.id);
                                            this.setState({isLoadingBirthPage2: false});
                                            this.setState({isUploadBirthPage2: true})
                                            this.setState({hasErrorBirthPage2: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthPage2: false});
                                            this.setState({isUploadBirthPage2: true})
                                            this.setState({hasErrorBirthPage2: true});
                                        });
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthPage2: false});
                                this.setState({isUploadBirthPage2: true})
                                this.setState({hasErrorBirthPage2: true});
                            });
                    }})
        }
    }

    handleDeleteBirthPage2 = async () => {
        // await fetch(`https://api.saadatportal.com/api/v1/file/${this.state.fileIdBirthPage2}`, {
        //     method: 'await ',
        // })
        //     .then(res => res.text())
        //     .then(res => console.log(res));

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage2}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage2}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage2}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdBirthPage2);
        this.setState({fileIdBirthPage2: ""});
        this.setState({isUploadBirthPage2: false});
        this.inputBirthPage2.current.value = "";
    }

    handleFileBirthPage3 = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingBirthPage3: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameBirthPage3: e.target.files[0].name})

            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdBirthPage3: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "birthPage3", result.message.id);
            //         this.setState({isLoadingBirthPage3: false});
            //         this.setState({isUploadBirthPage3: true})
            //         this.setState({hasErrorBirthPage3: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingBirthPage3: false});
            //         this.setState({isUploadBirthPage3: true})
            //         this.setState({hasErrorBirthPage3: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdBirthPage3: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "birthPage3", result.message.id);
                    this.setState({isLoadingBirthPage3: false});
                    this.setState({isUploadBirthPage3: true})
                    this.setState({hasErrorBirthPage3: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthPage3: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthPage3", result.message.id);
                                            this.setState({isLoadingBirthPage3: false});
                                            this.setState({isUploadBirthPage3: true})
                                            this.setState({hasErrorBirthPage3: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthPage3: false});
                                            this.setState({isUploadBirthPage3: true})
                                            this.setState({hasErrorBirthPage3: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthPage3: false});
                                this.setState({isUploadBirthPage3: true})
                                this.setState({hasErrorBirthPage3: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthPage3: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthPage3", result.message.id);
                                            this.setState({isLoadingBirthPage3: false});
                                            this.setState({isUploadBirthPage3: true})
                                            this.setState({hasErrorBirthPage3: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthPage3: false});
                                            this.setState({isUploadBirthPage3: true})
                                            this.setState({hasErrorBirthPage3: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthPage3: false});
                                this.setState({isUploadBirthPage3: true})
                                this.setState({hasErrorBirthPage3: true});
                            })
                    }})
        }
    }

    handleDeleteBirthPage3 = async () => {
        // await fetch(`https://api.saadatportal.com/api/v1/file/${this.state.fileIdBirthPage3}`, {
        //     method: 'DELETE',
        // })
        //     .then(res => res.text())
        //     .then(res => console.log(res));

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage3}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage3}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage3}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdBirthPage3);
        this.setState({fileIdBirthPage3: ""});
        this.setState({isUploadBirthPage3: false});
        this.inputBirthPage3.current.value = "";
    }

    handleFileBirthPage4 = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingBirthPage4: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameBirthPage4: e.target.files[0].name})

            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdBirthPage4: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "birthPage4", result.message.id);
            //         this.setState({isLoadingBirthPage4: false});
            //         this.setState({isUploadBirthPage4: true})
            //         this.setState({hasErrorBirthPage4: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingBirthPage4: false});
            //         this.setState({isUploadBirthPage4: true})
            //         this.setState({hasErrorBirthPage4: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdBirthPage4: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "birthPage4", result.message.id);
                    this.setState({isLoadingBirthPage4: false});
                    this.setState({isUploadBirthPage4: true})
                    this.setState({hasErrorBirthPage4: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthPage4: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthPage4", result.message.id);
                                            this.setState({isLoadingBirthPage4: false});
                                            this.setState({isUploadBirthPage4: true})
                                            this.setState({hasErrorBirthPage4: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthPage4: false});
                                            this.setState({isUploadBirthPage4: true})
                                            this.setState({hasErrorBirthPage4: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthPage4: false});
                                this.setState({isUploadBirthPage4: true})
                                this.setState({hasErrorBirthPage4: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthPage4: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthPage4", result.message.id);
                                            this.setState({isLoadingBirthPage4: false});
                                            this.setState({isUploadBirthPage4: true})
                                            this.setState({hasErrorBirthPage4: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthPage4: false});
                                            this.setState({isUploadBirthPage4: true})
                                            this.setState({hasErrorBirthPage4: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthPage4: false});
                                this.setState({isUploadBirthPage4: true})
                                this.setState({hasErrorBirthPage4: true});
                            })
                    }})
        }
    }

    handleDeleteBirthPage4 = async () => {
        // await fetch(`https://api.saadatportal.com/api/v1/file/${this.state.fileIdBirthPage4}`, {
        //     method: 'await ',
        // })
        //     .then(res => res.text())
        //     .then(res => console.log(res));

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage4}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage4}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthPage4}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdBirthPage4);
        this.setState({fileIdBirthPage4: ""});
        this.setState({isUploadBirthPage4: false});
        this.inputBirthPage4.current.value = "";
    }

    handleFileBirthAllPage = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingBirthAllPage: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameBirthAllPage: e.target.files[0].name})

            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdBirthAllPage: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "birthAllPage", result.message.id);
            //         this.setState({isLoadingBirthAllPage: false});
            //         this.setState({isUploadBirthAllPage: true})
            //         this.setState({hasErrorBirthAllPage: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingBirthAllPage: false});
            //         this.setState({isUploadBirthAllPage: true})
            //         this.setState({hasErrorBirthAllPage: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdBirthAllPage: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "birthAllPage", result.message.id);
                    this.setState({isLoadingBirthAllPage: false});
                    this.setState({isUploadBirthAllPage: true})
                    this.setState({hasErrorBirthAllPage: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthAllPage: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthAllPage", result.message.id);
                                            this.setState({isLoadingBirthAllPage: false});
                                            this.setState({isUploadBirthAllPage: true})
                                            this.setState({hasErrorBirthAllPage: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthAllPage: false});
                                            this.setState({isUploadBirthAllPage: true})
                                            this.setState({hasErrorBirthAllPage: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthAllPage: false});
                                this.setState({isUploadBirthAllPage: true})
                                this.setState({hasErrorBirthAllPage: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdBirthAllPage: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "birthAllPage", result.message.id);
                                            this.setState({isLoadingBirthAllPage: false});
                                            this.setState({isUploadBirthAllPage: true})
                                            this.setState({hasErrorBirthAllPage: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingBirthAllPage: false});
                                            this.setState({isUploadBirthAllPage: true})
                                            this.setState({hasErrorBirthAllPage: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingBirthAllPage: false});
                                this.setState({isUploadBirthAllPage: true})
                                this.setState({hasErrorBirthAllPage: true});
                            })
                    }})
        }
    }

    handleDeleteBirthAllPage = async () => {
        // await fetch(`https://api.saadatportal.com/api/v1/file/${this.state.fileIdBirthAllPage}`, {
        //     method: 'async ',
        // })
        //     .then(res => res.text())
        //     .then(res => console.log(res));

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthAllPage}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthAllPage}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdBirthAllPage}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdBirthAllPage);
        this.setState({fileIdBirthAllPage: ""});
        this.setState({isUploadBirthAllPage: false});
        this.inputBirthAllPage.current.value = "";
    }

    handleFileCartPage1 = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingCartPage1: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameCartPage1: e.target.files[0].name});

            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdCartPage1: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "cardPage1", result.message.id);
            //         this.setState({isLoadingCartPage1: false});
            //         this.setState({isUploadCartPage1: true})
            //         this.setState({hasErrorCartPage1: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingCartPage1: false});
            //         this.setState({isUploadCartPage1: true})
            //         this.setState({hasErrorCartPage1: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdCartPage1: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "cardPage1", result.message.id);
                    this.setState({isLoadingCartPage1: false});
                    this.setState({isUploadCartPage1: true})
                    this.setState({hasErrorCartPage1: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdCartPage1: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "cardPage1", result.message.id);
                                            this.setState({isLoadingCartPage1: false});
                                            this.setState({isUploadCartPage1: true})
                                            this.setState({hasErrorCartPage1: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingCartPage1: false});
                                            this.setState({isUploadCartPage1: true})
                                            this.setState({hasErrorCartPage1: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingCartPage1: false});
                                this.setState({isUploadCartPage1: true})
                                this.setState({hasErrorCartPage1: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdCartPage1: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "cardPage1", result.message.id);
                                            this.setState({isLoadingCartPage1: false});
                                            this.setState({isUploadCartPage1: true})
                                            this.setState({hasErrorCartPage1: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingCartPage1: false});
                                            this.setState({isUploadCartPage1: true})
                                            this.setState({hasErrorCartPage1: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingCartPage1: false});
                                this.setState({isUploadCartPage1: true})
                                this.setState({hasErrorCartPage1: true});
                            })
                    }})
        }
    }

    handleDeleteCartPage1 = async () => {
        // await fetch(`https://api.saadatportal.com/api/v1/file/${this.state.fileIdCartPage1}`, {
        //     method: 'async ',
        // })
        //     .then(res => res.text())
        //     .then(res => console.log(res));

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartPage1}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartPage1}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartPage1}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdCartPage1);
        this.setState({fileIdCartPage1: ""});
        this.setState({isUploadCartPage1: false});
        this.inputCartPage1.current.value = "";
    }

    handleFileCartPage2 = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingCartPage2: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameCartPage2: e.target.files[0].name});

            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdCartPage2: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "cardPage2", result.message.id);
            //         this.setState({isLoadingCartPage2: false});
            //         this.setState({isUploadCartPage2: true})
            //         this.setState({hasErrorCartPage2: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingCartPage2: false});
            //         this.setState({isUploadCartPage2: true})
            //         this.setState({hasErrorCartPage2: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdCartPage2: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "cardPage2", result.message.id);
                    this.setState({isLoadingCartPage2: false});
                    this.setState({isUploadCartPage2: true})
                    this.setState({hasErrorCartPage2: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdCartPage2: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "cardPage2", result.message.id);
                                            this.setState({isLoadingCartPage2: false});
                                            this.setState({isUploadCartPage2: true})
                                            this.setState({hasErrorCartPage2: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingCartPage2: false});
                                            this.setState({isUploadCartPage2: true})
                                            this.setState({hasErrorCartPage2: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingCartPage2: false});
                                this.setState({isUploadCartPage2: true})
                                this.setState({hasErrorCartPage2: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdCartPage2: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "cardPage2", result.message.id);
                                            this.setState({isLoadingCartPage2: false});
                                            this.setState({isUploadCartPage2: true})
                                            this.setState({hasErrorCartPage2: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingCartPage2: false});
                                            this.setState({isUploadCartPage2: true})
                                            this.setState({hasErrorCartPage2: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingCartPage2: false});
                                this.setState({isUploadCartPage2: true})
                                this.setState({hasErrorCartPage2: true});
                            })
                    }})
        }
    }

    handleDeleteCartPage2 = async () => {
        // await fetch(`https://api.saadatportal.com/api/v1/file/${this.state.fileIdCartPage2}`, {
        //     method: 'async ',
        // })
        //     .then(res => res.text())
        //     .then(res => console.log(res));

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartPage2}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartPage2}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartPage2}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdCartPage2);
        this.setState({fileIdCartPage2: ""});
        this.setState({isUploadCartPage2: false});
        this.inputCartPage2.current.value = "";
    }

    handleFileCartAllPage = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingCartAllPage: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameCartAllPage: e.target.files[0].name});

            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdCartAllPage: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "cardAllPage", result.message.id);
            //         this.setState({isLoadingCartAllPage: false});
            //         this.setState({isUploadCartAllPage: true})
            //         this.setState({hasErrorCartAllPage: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingCartAllPage: false});
            //         this.setState({isUploadCartAllPage: true})
            //         this.setState({hasErrorCartAllPage: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdCartAllPage: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "cardAllPage", result.message.id);
                    this.setState({isLoadingCartAllPage: false});
                    this.setState({isUploadCartAllPage: true})
                    this.setState({hasErrorCartAllPage: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdCartAllPage: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "cardAllPage", result.message.id);
                                            this.setState({isLoadingCartAllPage: false});
                                            this.setState({isUploadCartAllPage: true})
                                            this.setState({hasErrorCartAllPage: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingCartAllPage: false});
                                            this.setState({isUploadCartAllPage: true})
                                            this.setState({hasErrorCartAllPage: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingCartAllPage: false});
                                this.setState({isUploadCartAllPage: true})
                                this.setState({hasErrorCartAllPage: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdCartAllPage: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "cardAllPage", result.message.id);
                                            this.setState({isLoadingCartAllPage: false});
                                            this.setState({isUploadCartAllPage: true})
                                            this.setState({hasErrorCartAllPage: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingCartAllPage: false});
                                            this.setState({isUploadCartAllPage: true})
                                            this.setState({hasErrorCartAllPage: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingCartAllPage: false});
                                this.setState({isUploadCartAllPage: true})
                                this.setState({hasErrorCartAllPage: true});
                            })
                    }})
        }
    }

    handleDeleteCartAllPage = async () => {
        // await fetch(`https://api.saadatportal.com/api/v1/file/${this.state.fileIdCartAllPage}`, {
        //     method: 'async ',
        // })
        //     .then(res => res.text())
        //     .then(res => console.log(res));

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartAllPage}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartAllPage}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdCartAllPage}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdCartAllPage);
        this.setState({fileIdCartAllPage: ""});
        this.setState({isUploadCartAllPage: false});
        this.inputCartAllPage.current.value = "";
    }

    handleFilePersonnelImg = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingPersonnelImg: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({namePersonnelImg: e.target.files[0].name});

            // await fetch('https://api.saadatportal.com/api/v1/file', {
            //     method: 'POST',
            //     body: formData
            // }).then((response) => response.json())
            //     .then((result) => {
            //         console.log('Success:', result);
            //         this.setState({fileIdPersonnelImg: result.message.id});
            //         this.context.handleUploadedFile("familyGuestUploadPage", "personnelImg", result.message.id);
            //         this.setState({isLoadingPersonnelImg: false});
            //         this.setState({isUploadPersonnelImg: true})
            //         this.setState({hasErrorPersonnelImg: false});
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         this.setState({isLoadingPersonnelImg: false});
            //         this.setState({isUploadPersonnelImg: true})
            //         this.setState({hasErrorPersonnelImg: true});
            //     });

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdPersonnelImg: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "personnelImg", result.message.id);
                    this.setState({isLoadingPersonnelImg: false});
                    this.setState({isUploadPersonnelImg: true})
                    this.setState({hasErrorPersonnelImg: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdPersonnelImg: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "personnelImg", result.message.id);
                                            this.setState({isLoadingPersonnelImg: false});
                                            this.setState({isUploadPersonnelImg: true})
                                            this.setState({hasErrorPersonnelImg: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingPersonnelImg: false});
                                            this.setState({isUploadPersonnelImg: true})
                                            this.setState({hasErrorPersonnelImg: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingPersonnelImg: false});
                                this.setState({isUploadPersonnelImg: true})
                                this.setState({hasErrorPersonnelImg: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdPersonnelImg: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "personnelImg", result.message.id);
                                            this.setState({isLoadingPersonnelImg: false});
                                            this.setState({isUploadPersonnelImg: true})
                                            this.setState({hasErrorPersonnelImg: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingPersonnelImg: false});
                                            this.setState({isUploadPersonnelImg: true})
                                            this.setState({hasErrorPersonnelImg: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingPersonnelImg: false});
                                this.setState({isUploadPersonnelImg: true})
                                this.setState({hasErrorPersonnelImg: true});
                            })
                    }})
        }
    }

    handleDeletePersonnelImg = async () => {
        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdPersonnelImg}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdPersonnelImg}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdPersonnelImg}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdPersonnelImg);
        this.setState({fileIdPersonnelImg: ""});
        this.setState({isUploadPersonnelImg: false});
        this.inputPersonnelImg.current.value = "";
    }

    handleFileRegister = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingRegister: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameRegister: e.target.files[0].name});

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdRegister: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "register", result.message.id);
                    this.setState({isLoadingRegister: false});
                    this.setState({isUploadRegister: true})
                    this.setState({hasErrorRegister: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdRegister: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "register", result.message.id);
                                            this.setState({isLoadingRegister: false});
                                            this.setState({isUploadRegister: true})
                                            this.setState({hasErrorRegister: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingRegister: false});
                                            this.setState({isUploadRegister: true})
                                            this.setState({hasErrorRegister: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingRegister: false});
                                this.setState({isUploadRegister: true})
                                this.setState({hasErrorRegister: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdRegister: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "register", result.message.id);
                                            this.setState({isLoadingRegister: false});
                                            this.setState({isUploadRegister: true})
                                            this.setState({hasErrorRegister: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingRegister: false});
                                            this.setState({isUploadRegister: true})
                                            this.setState({hasErrorRegister: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingRegister: false});
                                this.setState({isUploadRegister: true})
                                this.setState({hasErrorRegister: true});
                            })
                    }})
        }
    }

    handleDeleteRegister = async () => {
        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdRegister}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdRegister}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdRegister}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdRegister);
        this.setState({fileIdRegister: ""});
        this.setState({isUploadRegister: false});
        this.inputRegister.current.value = "";
    }


    handleFileRegisterUni = async (e) => {
        if (e.target.files[0] !== undefined) {
            this.setState({isLoadingRegisterUni: true});
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.setState({nameRegisterUni: e.target.files[0].name});

            await axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({fileIdRegisterUni: result.message.id});
                    this.context.handleUploadedFile("familyGuestUploadPage", "registerUni", result.message.id);
                    this.setState({isLoadingRegisterUni: false});
                    this.setState({isUploadRegisterUni: true});
                    this.setState({hasErrorRegisterUni: false});
                })
                .catch(() => {
                    if (localStorage.getItem('role') === 'MANAGER') {
                        axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdRegisterUni: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "registerUni", result.message.id);
                                            this.setState({isLoadingRegisterUni: false});
                                            this.setState({isUploadRegisterUni: true});
                                            this.setState({hasErrorRegisterUni: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingRegisterUni: false});
                                            this.setState({isUploadRegisterUni: true})
                                            this.setState({hasErrorRegisterUni: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingRegisterUni: false});
                                this.setState({isUploadRegisterUni: true})
                                this.setState({hasErrorRegisterUni: true});
                            })
                    } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                        axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                            .then((response) => {
                                if (response.headers["accesstoken"]) {
                                    localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                    axios.post('https://api.saadatportal.com/api/v1/supervisor/file', formData, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                        .then((result) => {
                                            console.log('Success:', result);
                                            this.setState({fileIdRegisterUni: result.message.id});
                                            this.context.handleUploadedFile("familyGuestUploadPage", "registerUni", result.message.id);
                                            this.setState({isLoadingRegisterUni: false});
                                            this.setState({isUploadRegisterUni: true});
                                            this.setState({hasErrorRegisterUni: false});
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            this.setState({isLoadingRegisterUni: false});
                                            this.setState({isUploadRegisterUni: true})
                                            this.setState({hasErrorRegisterUni: true});
                                        })
                                } else {
                                    window.location = '/'
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.setState({isLoadingRegisterUni: false});
                                this.setState({isUploadRegisterUni: true})
                                this.setState({hasErrorRegisterUni: true});
                            })
                    }})
        }

    }

    handleDeleteRegisterUni = async () => {

        await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdRegisterUni}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdRegisterUni}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.delete(`https://api.saadatportal.com/api/v1/supervisor/file/${this.state.fileIdRegisterUni}` , {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                            } else {
                                window.location = '/'
                            }
                        })
                }})
        this.context.handleDeleteUploadedFile("familyGuestUploadPage",this.state.fileIdRegisterUni)
        this.setState({fileIdRegisterUni: ""});
        this.setState({isUploadRegisterUni: false});
        this.inputRegisterUni.current.value = "";
    }
}

export default FGUploadPage;