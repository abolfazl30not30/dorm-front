import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../../style/loading.css"
import React from "react";

const FloorAndBedLoading = () => {
        return (
            [...Array(5)].map((x, i) =>
            (
                <div className='col-12 col-md-4'>
                    <div className='floor d-flex flex-column  text-center'>
                        <div style={{marginTop: "-20px"}}>
                            <Skeleton animation="wave" width={60} height={15} />
                        </div>
                        <div className={"row d-flex my-4"}>
                            <div className={"col-4"}>
                                <Skeleton animation="wave" height={60} width={"100%"}/>
                            </div>
                            <div className={"col-4"}>
                                <Skeleton animation="wave" height={60} width={"100%"}/>
                            </div>
                            <div className={"col-4"}>
                                <Skeleton animation="wave" height={60} width={"100%"}/>
                            </div>
                        </div>
                    </div>
                </div>
            )));
}

export default FloorAndBedLoading;