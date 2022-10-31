import React from "react";
import { Slide } from "react-slideshow-image";
import "../../../style/slider.css";
import 'react-slideshow-image/dist/styles.css'
const slideImages = [
    "https://www.shanuozanzibar.com/wp-content/uploads/Dormitory.jpg",
    "https://www.industrialguru.sg/wp-content/uploads/2018/10/Why-Ancillary-Dormitories-Are-Not-So-Common-in-Singapore-Nowadays.jpg",
    "https://cdn1.goibibo.com/voy_mmt/t_g/htl-imgs/201808171900059029-0b9091aa31b611e9bfa90242ac110002.jpg"
];

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

const SlideShow = () => {
    return (
        <>
            <div className="slide-container">
                <Slide {...properties}>
                    <div className="each-slide">
                        <div style={{ backgroundImage: `url(${slideImages[0]})`,height:"100vh" }}>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ backgroundImage: `url(${slideImages[1]})`,height:"100vh" }}>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ backgroundImage: `url(${slideImages[2]})`,height:"100vh"}}>
                        </div>
                    </div>
                </Slide>
            </div>
        </>
    );
};

export default SlideShow;