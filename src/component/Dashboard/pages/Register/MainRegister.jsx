import React, { Component, useState } from 'react';
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
import * as yup from 'yup';
import BuildingContext from '../../../../contexts/Building'

class MainRegister extends Component {

    static contextType = BuildingContext;

    validation = () => {

        let reg = /^\s*$/;
        let result;

        result = !this.state.fields.admission_start_date.match(reg) &&
            !this.state.fields.admission_end_date.match(reg) &&
            !this.state.fields.payment_date.match(reg);

        return result;
    }

    state = {
        fields: {
            admission_start_date: '',
            admission_end_date: '',
            payment_date: '',
        },

        typeofResident: "Constant",
        steps: [
            {
                label: 'نوع اقامتگر',
                name: 'step 1',
                content:
                    <div className='typeofResident'>
                        <div className="">
                            <input className="" type="radio" name="flexRadioDefault" value='constant' onChange={(e) => { this.checked(e) }} />
                            <label className="" htmlFor="Radio1">
                                اقامتگر ثابت
                            </label>
                        </div>
                        <h6>مهمان</h6>
                        <div>
                            <div className="">
                                <input className="" type="radio" name="flexRadioDefault" value='otherGuest' onChange={(e) => { this.checked(e) }} />
                                <label className="" htmlFor="Radio2">
                                    متفرقه
                                </label>
                            </div>
                            <div className="">
                                <input className="" type="radio" name="flexRadioDefault" value='familyGuest' onChange={(e) => { this.checked(e) }} />
                                <label className="" htmlFor="Radio3">
                                    بستگان درجه یک
                                </label>
                            </div>
                        </div>
                    </div>
            },
            {
                label: 'مشخصات اولیه',
                name: 'step 1',
                content: "",
                validator: this.validation,
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
        ],
        errors : [],
    }


    updateField = (e, name) => {
        let newFields = {...this.state.fields};
        newFields[name] = e.target.value
        this.setState({ fields: newFields });

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
                updatedState[1].content = <FamilyGuest updateData={this.updateField}/>;
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