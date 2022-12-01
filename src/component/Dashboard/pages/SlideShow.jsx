import React, {Component} from "react";
import { Slide } from "react-slideshow-image";
import "../../../style/slider.css";
import 'react-slideshow-image/dist/styles.css'
import image1 from '../../../sliderImg/1.jpeg'
import image2 from '../../../sliderImg/2.jpeg'
import image3 from '../../../sliderImg/3.jpeg'
import image4 from '../../../sliderImg/4.jpeg'
import image5 from '../../../sliderImg/5.jpeg'
import image6 from '../../../sliderImg/6.jpeg'
import image7 from '../../../sliderImg/7.jpeg'
import image8 from '../../../sliderImg/8.jpeg'
import image9 from '../../../sliderImg/9.jpeg'
import image10 from '../../../sliderImg/10.jpeg'
import image11 from '../../../sliderImg/11.jpeg'
import image12 from '../../../sliderImg/12.jpeg'
import image13 from '../../../sliderImg/13.jpeg'
import image14 from '../../../sliderImg/14.jpeg'
import image15 from '../../../sliderImg/15.jpeg'

import BuildingContext from "../../../contexts/Building";

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
};

class SlideShow extends Component{
    static contextType = BuildingContext;

    state = {
        sliderImg: {
            image1 : image1,
            image2 : image2,
            image3 : image3,
            image4 : image4,
            image5 : image5,
            image6 : image6,
            image7 : image7,
            image8 : image8,
            image9 : image9,
            image10 : image10,
            image11 : image11,
            image12 : image12,
            image13 : image13,
            image14 : image14,
            image15 : image15,
        }
    }

    render() {
        return (
            <>
                <div className="slide-container">
                    <button onClick={() => console.log(this.context.slider)}>
                        test
                    </button>
                    <Slide {...properties}>
                        {
                            this.context.slider.map((e, index) => (
                                <div className="each-slide">
                                    <div style={{ backgroundImage: `url('${this.state.sliderImg[e.name]}')`,height:"70vh"}}>
                                    </div>
                                </div>
                            ))
                        }
                    </Slide>
                </div>
            </>
        );
    }
}

export default SlideShow;