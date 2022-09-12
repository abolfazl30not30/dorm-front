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
                {/* <div className='register-container'>
                    <div className="progress-bar">
                    </div>
                    <div className="page-container">
                        <UploadPage />
                    </div>
                </div> */}
                <div style={{ direction: "ltr" }}>
                    <StepProgressBar
                        startingStep={0}
                        steps={[
                            {
                                label: 'مشخصات اولیه',
                                name: 'step 1',
                                content: <UploadPage />
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