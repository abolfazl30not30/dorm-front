import React, {Component} from 'react'
import "../../../../../style/uploadPage.css"
import {BsFileEarmarkImage, BsFileEarmarkPdfFill} from "react-icons/bs"
import upload_icon from '../../../../../img/Group 1.png'
import pdf_icon from '../../../../../img/pdf_icon.png'
import png_icon from '../../../../../img/png_icon.png'
import Accordion from 'react-bootstrap/Accordion';
// import progressBar from "./progressBar";
import {ProgressBar} from 'react-bootstrap';
import axios from "axios";
import ReactLoading from "react-loading";
import Alert from "react-bootstrap/Alert";
import {MdCloudUpload, MdDelete} from "react-icons/md";
import {RiFileUploadFill} from "react-icons/ri";

class FGUploadPage extends Component {
    //progress bar
    state = {
        uploadPercentage: 0,
        avatar: '',

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
                        <p>حداکثر حجم آپلود فایل 10 مگابایت می باشد</p>
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
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthPage1(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthPage1 && !this.state.hasErrorBirthPage1 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mx-1">{}</h6>
                                                            <RiFileUploadFill/>
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
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthPage2(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthPage2 && !this.state.hasErrorBirthPage2 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mx-1">{}</h6>
                                                            <RiFileUploadFill/>
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
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthPage3(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthPage3 && !this.state.hasErrorBirthPage3 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mx-1">{}</h6>
                                                            <RiFileUploadFill/>
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
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthPage4(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthPage4 && !this.state.hasErrorBirthPage4 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mx-1">{}</h6>
                                                            <RiFileUploadFill/>
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
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileBirthAllPage(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadBirthAllPage && !this.state.hasErrorBirthAllPage ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mx-1">{}</h6>
                                                            <RiFileUploadFill/>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteAllPage}><MdDelete
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
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileCartPage1(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadCartPage1 && !this.state.hasErrorCartPage1 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mx-1">{}</h6>
                                                            <RiFileUploadFill/>
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
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileCartPage2(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadCartPage2 && !this.state.hasErrorCartPage2 ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mx-1">{}</h6>
                                                            <RiFileUploadFill/>
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
                                                   id="formFileLg" name="filename" onChange={(e) => {
                                                this.handleFileCartAllPage(e)
                                            }}/>
                                            <div>
                                                {this.state.isUploadCartAllPage && !this.state.hasErrorCartAllPage ? (
                                                    <div className="file-container">
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mx-1">{}</h6>
                                                            <RiFileUploadFill/>
                                                        </div>
                                                        <button className="deleteBtn"
                                                                onClick={this.handleDeleteCartAllpage}><MdDelete
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
                                               id="formFileLg" name="filename" onChange={(e) => {
                                            this.handleFilePersonnelImg(e)
                                        }}/>
                                        <div>
                                            {this.state.isUploadPersonnelImg && !this.state.hasErrorPersonnelImg ? (
                                                <div className="file-container">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="mx-1">{}</h6>
                                                        <RiFileUploadFill/>
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
                                               id="formFileLg" name="filename" onChange={(e) => {
                                            this.handleFile(e)
                                        }}/>
                                        <div>
                                            {this.state.isUploadRegister && !this.state.hasErrorRegister ? (
                                                <div className="file-container">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="mx-1">{}</h6>
                                                        <RiFileUploadFill/>
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
                                               id="formFileLg" name="filename" onChange={(e) => {
                                            this.handleFileRegisterUni(e)
                                        }}/>
                                        <div>
                                            {this.state.isUploadRegisterUni && !this.state.hasErrorRegisterUni? (
                                                <div className="file-container">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="mx-1">{}</h6>
                                                        <RiFileUploadFill/>
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
        this.setState({isLoadingBirthPage1: true});
        let formData = new FormData();
        formData.append('file', e.target.files[0]);

        await fetch('http://api.saadatportal.com/api/v1/file', {
            method: 'POST',
            body: formData
        }).then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                this.setState({isLoadingBirthPage1: false});
                this.setState({isUploadBirthPage1: true})
                this.setState({hasErrorBirthPage1: false});
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({isLoadingBirthPage1: false});
                this.setState({isUploadBirthPage1: true})
                this.setState({hasErrorBirthPage1: true});
            });
    }

    handleDeleteBirthPage1 = () => {
    }
}

export default FGUploadPage;