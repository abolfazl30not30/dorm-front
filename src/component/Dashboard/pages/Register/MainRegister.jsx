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
        typeofResident: "Constant"
    }
    checked = (e) => {
        const type = e.target.value
        this.setState({typeofResident:type})


        switch (type) {
            case 'Constant':
                return <InformationPage />;
                break;
            case 'otherGuest':
                return <FamilyGuest />;
                break;
            case 'otherGuest':
                return <OtherGuest />;
                break;        
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
                        steps={[
                            {
                                label: 'نوع اقامتگر',
                                name: 'step 1',
                                content:
                                    <div className='typeofResident'>
                                        <div class="">
                                            <input className="" type="radio" name="flexRadioDefault" value='Constant'  onChange={this.checked} />
                                            <label class="" for="Radio1">
                                                اقامتگر ثابت
                                            </label>
                                        </div>
                                        <h6>مهمان</h6>
                                        <div>
                                            <div class="">
                                                <input className="" type="radio" name="flexRadioDefault" value='otherGuest' onChange={this.checked}/>
                                                <label class="" for="Radio2">
                                                    متفرقه
                                                </label>
                                            </div>
                                            <div class="">
                                                <input className="" type="radio" name="flexRadioDefault" value='familyGuest' onChange={this.checked}/>
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
                                content:  <FamilyGuest /> 
                                // content: <>
                                //     {
                                //         // console.log(this.state.typeofResident === 'Constant')
                                //         // this.state.typeofResident === 'Constant' ? <InformationPage /> : <FamilyGuest />
                                //         // switch (this.state.typeofResident) {
                                //         //     case 'Constant':
                                //         //         return <InformationPage />;
                                //         //         break;
                                //         //     case 'otherGuest':
                                //         //         return <InformationPage />;
                                //         //         break;    
                                //         // }
                                        
                                //     }
                                // </>
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