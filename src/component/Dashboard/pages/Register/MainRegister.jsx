import React, { Component } from 'react';
import UploadPage from './UploadPage';
import "../../../../style/mainRegister.css";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import InformationPage from './InformationPage';
import InformationFurtherPage from './InformationFurtherPage'
import InformationFamilyPage from './InformationFamilyPage'

class MainRegister extends Component {
    state = {
        typeofResident: ""
    }
    render() {
        return (
            <>
                <div style={{ direction: "ltr" }}>
                    <StepProgressBar
                        startingStep={0}
                        previousBtnName={"قبلی"}
                        nextBtnName={"بعدی"}
                        submitBtnName={"ارسال"}
                        primaryBtnClass="next-btn"
                        secondaryBtnClass="previous-btn"
                        steps={[
                            {
                                label: 'نوع اقامتگر',
                                name: 'step 1',
                                content:
                                    <div className='typeofResident'>
                                        <div class="">
                                            <input className="" type="radio" name="flexRadioDefault" id="Radio1" />
                                            <label class="" for="Radio1">
                                                اقامتگر ثابت
                                            </label>
                                        </div>
                                        <h6>مهمان</h6>
                                        <div>
                                            <div class="">
                                                <input className="" type="radio" name="flexRadioDefault" id="Radio2" checked />
                                                <label class="" for="Radio2">
                                                    متفرقه
                                                </label>
                                            </div>
                                            <div class="">
                                                <input className="" type="radio" name="flexRadioDefault" id="Radio3" checked />
                                                <label class="" for="Radio3">
                                                    بستگان درجه یک
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                            },
                            {
                                label: 'مشخصات اولیه',
                                name: 'step 1',
                                content: <InformationPage />
                            },
                            {
                                label: 'مشخصات تکمیلی',
                                name: 'step 2',
                                content: <InformationFurtherPage />

                            },
                            {
                                label: 'مشخصات بستگان',
                                name: 'step 3',
                                content: <InformationFamilyPage />
                            },
                            {
                                label: 'آپلود مدارک',
                                name: 'step 4',
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