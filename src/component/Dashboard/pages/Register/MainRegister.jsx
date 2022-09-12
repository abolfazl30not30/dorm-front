import React, { Component } from 'react';
import UploadPage from './UploadPage';
import "../../../../style/mainRegister.css";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

class MainRegister extends Component {
    state = {
    }
    render() {
        return (
            <>
                <div style={{ direction: "ltr" }}>
                    <StepProgressBar
                        startingStep={0}
                        previousBtnName={"قبلی"}
                        nextBtnName={"بعدی"}
                        steps={[
                            {
                                label: 'مشخصات اولیه',
                                name: 'step 1',
                            },
                            {
                                label: 'مشخصات بستگان',
                                name: 'step 2',
                            },
                            {
                                label: 'آپلود مدارک',
                                name: 'step 3',
                                content: <UploadPage />
                            }
                        ]}
                    />
                </div>
            </>
        );
    }
}

export default MainRegister;