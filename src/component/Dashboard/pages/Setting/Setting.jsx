import React, {Component, createRef} from 'react';
import {Input, Button} from "@mui/material";
import Gallery from "react-gallery-picker";
import IMAGE1  from "../../../../sliderImg/1.jpeg";
import IMAGE2  from "../../../../sliderImg/2.jpeg";
import IMAGE3  from  "../../../../sliderImg/3.jpeg";
import IMAGE4  from  "../../../../sliderImg/4.jpeg";
import IMAGE5  from  "../../../../sliderImg/5.jpeg";
import IMAGE6  from  "../../../../sliderImg/6.jpeg";
import IMAGE7  from  "../../../../sliderImg/7.jpeg";
import IMAGE8  from  "../../../../sliderImg/8.jpeg";
import IMAGE9  from  "../../../../sliderImg/9.jpeg";
import IMAGE10 from "../../../../sliderImg/10.jpeg";
import IMAGE11 from "../../../../sliderImg/11.jpeg";
import IMAGE12 from "../../../../sliderImg/12.jpeg";
import IMAGE13 from "../../../../sliderImg/13.jpeg";
import IMAGE14 from "../../../../sliderImg/14.jpeg";
import IMAGE15 from "../../../../sliderImg/15.jpeg";

import '../../../../style/sliderImg.css'
import BuildingContext from "../../../../contexts/Building";
import {Link} from "react-router-dom";

class Setting extends Component {
    static contextType = BuildingContext;

    state = {
        images: [
            // {
            //     imageFile: '',
            //
            //     nameImageFile: '',
            //
            //     isUploadImageFile: '',
            //
            //     isLoadingImageFile: '',
            //
            //     hasErrorImageFile: ''
            // }
        ],

        e: '',
    }

    render() {
        return (
            <>
                <div className="back-btn">
                    <Link to="/dashboard">
                        بازگشت
                        <i className="bi bi-caret-left-fill"/>
                    </Link>
                </div>
                <div>
                    <h4 className={'mb-2'}>
                        انتخاب عکس
                    </h4>
                </div>
                <button
                    className={'btn btn-danger'}
                    onClick={() => {
                    this.context.handleResetSlider();
                    this.handleUnselect(this.state.e);
                }}
                >
                    حذف همه انتخاب ها
                </button>
                <div className={'d-flex row'}>
                    <div className={'col'}>
                        <Gallery imagesRecived={[{url: IMAGE1, name: "image1"}, { url: IMAGE2, name: "image2"},
                            {url: IMAGE3, name: "image3"}, {url: IMAGE4, name: "image4"}, {url: IMAGE5, name: "image5"},
                            {url: IMAGE6, name: "image6"}, {url: IMAGE7, name: "image7"}, {url: IMAGE8, name: "image8"},
                            {url: IMAGE9, name: "image9"}, {url: IMAGE10, name: "image10"}, {url: IMAGE11, name: "image11"},
                            {url: IMAGE12, name: "image12"}, {url: IMAGE13, name: "image13"}, {url: IMAGE14, name: "image14"},
                            {url: IMAGE15, name: "image15"},]}
                                 returnImages={(e) => {
                                     this.setState({e : e})
                                     this.handleImages(e, false)
                                 }}
                        />
                    </div>
                </div>
            </>
        );
    }

    handleImages = async (e, isUnselectClicked) => {
        let selectedSlider = [...this.context.slider];
        for (let i = 0; i < selectedSlider.length; i++) {
            e[selectedSlider[i].fileId].selected = true;
        }
        this.context.handleResetSlider();

        for (let i = 0; i < 15; i++) {
            if (e[i].selected) {
                this.context.handleImageSlider(e[i].title, e[i].id)
            }
        }

        if (isUnselectClicked) {
            this.context.handleResetSlider();
        }
    }

    handleUnselect = (e) => {
        for (let i = 0; i < 15; i++) {
            if (e[i].selected) {
                e[i].selected = false;
            }
        }
    }

}

export default Setting;