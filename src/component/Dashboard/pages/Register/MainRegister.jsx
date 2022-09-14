import React, { Component } from 'react';
import UploadPage from './UploadPage';
import "../../../../style/mainRegister.css";
import "../../../../style/registerPage.css";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import InformationPage from './InformationPage';
import InformationFurtherPage from './InformationFurtherPage'
import InformationFamilyPage from './InformationFamilyPage'
import FamilyGuest from './FamilyGuest'
import OtherGuest from './OtherGuest'

class MainRegister extends Component {
    state = {
        typeofResident: "Constant",
        steps: [
            {
                label: 'نوع اقامتگر',
                name: 'step 1',
                content:
                    <div className='typeofResident'>
                        <div class="">
                            <input className="" type="radio" name="flexRadioDefault" value='constant' onChange={(e) => { this.checked(e) }} />
                            <label class="" for="Radio1">
                                اقامتگر ثابت
                            </label>
                        </div>
                        <h6>مهمان</h6>
                        <div>
                            <div class="">
                                <input className="" type="radio" name="flexRadioDefault" value='otherGuest' onChange={(e) => { this.checked(e) }} />
                                <label class="" for="Radio2">
                                    متفرقه
                                </label>
                            </div>
                            <div class="">
                                <input className="" type="radio" name="flexRadioDefault" value='familyGuest' onChange={(e) => { this.checked(e) }} />
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
                content: ""
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
        ]
    }

    checked = (e) => {
        const type = e.target.value
        this.setState({ typeofResident: type })

        switch (type) {
            case 'constant': {
                let updatedState = [...this.state.steps];
                updatedState[1].content = <InformationPage />;
                this.setState({ steps: updatedState })
                break;
            }
            case 'otherGuest': {
                let updatedState = [...this.state.steps];
                updatedState[1].content = <FamilyGuest />;
                this.setState({ steps: updatedState })
                break;
            }
            case 'otherGuest': {
                let updatedState = [...this.state.steps];
                updatedState[1].content = <OtherGuest />;;
                this.setState({ steps: updatedState })
                break;
            }
        }
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
                        steps={this.state.steps}
                    />
                </div>
            </>
        );
    }
}

export default MainRegister;