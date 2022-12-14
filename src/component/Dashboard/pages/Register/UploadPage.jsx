import React, { Component } from 'react'
import "../../../../style/uploadPage.css"
import {BsFileEarmarkImage,BsFileEarmarkPdfFill} from "react-icons/bs"
import side_img from '../../../../img/sadat logo-png.png'
import pdf_icon from '../../../../img/pdf_icon.png'
import png_icon from '../../../../img/png_icon.png'
import Accordion from 'react-bootstrap/Accordion';
// import progressBar from "./progressBar";
import { ProgressBar } from 'react-bootstrap';
import axios from "axios";

class UploadPage extends Component {
    //progress bar
    state = {
        uploadPercentage: 0,
        avatar: ''
    }

    componentDidMount = () => {
        const { avatar } = this.props;
        this.setState({ avatar })
    }

    uploadFile = ({ target: { files } }) => {
        console.log(files[0])
        let data = new FormData();
        data.append('file', files[0])

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                if (percent < 100) {
                    this.setState({ uploadPercentage: percent })
                }
            }
        }

        axios.post("https://www.mocky.io/v2/5cc8019d300000980a055e76", data, options).then(res => {
            console.log(res)
            this.setState({ avatar: res.data.url, uploadPercentage: 100 }, () => {
                setTimeout(() => {
                    this.setState({ uploadPercentage: 0 })
                }, 1000);
            })
        })
    }

    render() {
        return (
            <>
                <div className='upload-container row'>
                    <div className='upload-logo-container col-6'>
                        <img src={side_img} className='upload-icon' alt='upload_icon' />
                    </div>
                    <div className='sections col-6' >
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>آپلود شناسنامه</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <BsFileEarmarkImage fontsize="20px"/>
                                        <span className='tab'> صفحه اول</span>
                                        <input className='form-control  p-2 ' type="file" id="formFileLg" name="filename" />
                                        <br />


                                        <span className='tab'> صفحه دوم</span>
                                        <input className='form-control p-2' type="file" id="myFile" name="filename" />
                                        <br />

                                        <img src={png_icon} className='png-icon' />
                                        <span className='tab'>صفحه سوم</span>
                                        <input className='p-2' type="file" id="myFile" name="filename" />
                                        <br />

                                        <img src={png_icon} className='png-icon' />
                                        <span className='tab'>صفحه چهارم</span>
                                        <input className='p-2' type="file" id="myFile" name="filename" />
                                        <br />

                                        <BsFileEarmarkPdfFill fontSize="20px"/>
                                        <span className='tab'> کل صفحات</span>
                                        <input className='p-2' type="file" id="myFile" name="filename" />

                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>آپلود کارت ملی</Accordion.Header>
                                <Accordion.Body>
                                    <form action="/" method="get">
                                        <img src={png_icon} className='png-icon' />
                                        <span className='tab'> صفحه اول</span>
                                        <input className='p-2' type="file" id="myFile" name="filename" />
                                        <br />

                                        <img src={png_icon} className='png-icon' />
                                        <span className='tab'> صفحه دوم</span>
                                        <input className='p-2' type="file" id="myFile" name="filename" />
                                    </form>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>آپلود عکس پرسنلی</Accordion.Header>
                                <Accordion.Body>
                                    <form action="/" method="get">
                                        <img src={png_icon} className='png-icon' />
                                        <span className='tab'>عکس پرسنلی</span>
                                        <input className='p-2' type="file" id="myFile" name="filename" />
                                        <br />
                                    </form>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>آپلود پرینت ثبت نام دانشگاه</Accordion.Header>
                                <Accordion.Body>
                                    <form action="/" method="get">
                                        <img src={pdf_icon} className='pdf-icon' />
                                        <span className='tab'>  پرینت ثبت نام دانشگاه</span>
                                        <input className='p-2' type="file" id="myFile" name="filename" />
                                    </form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                </div>
            </>
        );
    }

}

export default UploadPage;