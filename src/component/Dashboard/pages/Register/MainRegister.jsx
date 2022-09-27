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

    updateField = (e, name) => {
        let newFields = {...this.state.fields};
        newFields[name] = e.target.value
        this.setState({ fields: newFields });

    }

    familyGuestValidation = () => {

        let requiredReg = /^\s*$/;
        let numberReg = /^[0-9]*$/;
        let telephoneReg = /^[0][9]\d{9}/; // iranian telephone number '09---------'
        let emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        let result;

        // constant

        let asd_requiredReg = !requiredReg.test(this.state.fields.admission_start_date);
        let asd_numberReg = numberReg.test(this.state.fields.admission_start_date);

        let aed_requiredReg = !requiredReg.test(this.state.fields.admission_end_date);
        let aed_numberReg = numberReg.test(this.state.fields.admission_end_date);

        let pd_requiredReg = !requiredReg.test(this.state.fields.payment_date);
        let pd_numberReg = numberReg.test(this.state.fields.payment_date);

        this.context.handleSpecificValidations([asd_requiredReg, asd_numberReg,
            aed_requiredReg, aed_numberReg, pd_requiredReg,
            pd_numberReg], ['asd_requiredReg', 'asd_numberReg', 'aed_requiredReg',
            'aed_numberReg', 'pd_requiredReg', 'pd_numberReg']);


        result = pd_requiredReg && pd_numberReg && aed_requiredReg && aed_numberReg && asd_requiredReg && asd_numberReg;

        return result;
    }

    informationFurtherPageValidation = () => {
        let requiredReg = /^\s*$/;
        let telephoneReg = /^09\d{9}$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^\d{3}-\d{8}$/;
        let telephoneOrEmptyReg = /^(\s*09\d{9}\s*|\s*)$/;

        let ifp_address_requiredReg = !requiredReg.test(this.state.fields.ifp_address);

        let ifp_home_tel_requiredReg = !requiredReg.test(this.state.fields.ifp_home_tel);
        let ifp_home_tel_telephoneReg = homeTelephoneReg.test(this.state.fields.ifp_home_tel);

        let ifp_father_tel_telephoneReg = telephoneOrEmptyReg.test(this.state.fields.ifp_father_tel);

        let ifp_mother_tel_telephoneReg = telephoneOrEmptyReg.test(this.state.fields.ifp_mother_tel);

        let ifp_resident_tel_requiredReg = !requiredReg.test(this.state.fields.ifp_resident_tel);
        let ifp_resident_tel_telephoneReg = telephoneReg.test(this.state.fields.ifp_resident_tel);

        this.context.handleSpecificValidations([ifp_address_requiredReg, ifp_home_tel_requiredReg, ifp_home_tel_telephoneReg,
                ifp_father_tel_telephoneReg, ifp_mother_tel_telephoneReg, ifp_resident_tel_requiredReg, ifp_resident_tel_telephoneReg],
            ['ifp_address_requiredReg', 'ifp_home_tel_requiredReg', 'ifp_home_tel_telephoneReg', 'ifp_father_tel_telephoneReg',
                'ifp_mother_tel_telephoneReg', 'ifp_resident_tel_requiredReg', 'ifp_resident_tel_telephoneReg']);

        return ifp_address_requiredReg && ifp_home_tel_requiredReg && ifp_home_tel_telephoneReg && ifp_father_tel_telephoneReg && ifp_mother_tel_telephoneReg && ifp_resident_tel_requiredReg && ifp_resident_tel_telephoneReg;
    }

    informationFamilyPageValidation = () => {

    }

    otherGuestValidation = () => {

    }

    informationPageValidation = () => {

    }

    state = {
        fields: {
            admission_start_date: '',
            admission_end_date: '',
            payment_date: '',

            // InformationFurtherPage

            ifp_address: '',
            ifp_home_tel: '',
            ifp_father_tel: '',
            ifp_mother_tel: '',
            ifp_resident_tel: '',
        },

        typeofResident: this.context.typeofResident,
        steps: [
            {
                label: 'نوع اقامتگر',
                name: 'step 1',
                content:
                    <div className='typeofResident'>
                        <div className="">
                            <input className="" type="radio" name="flexRadioDefault" value='constant'
                                   // checked={this.context.typeofResident === 'constant'}
                                   onChange={(e) => { this.checked(e); this.context.handleTypeofResident('constant')}}
                            />
                            <label className="" htmlFor="Radio1">
                                اقامتگر ثابت
                            </label>
                        </div>
                        <h6>مهمان</h6>
                        <div>
                            <div className="">
                                <input className="" type="radio" name="flexRadioDefault" value='otherGuest'
                                       // checked={this.context.typeofResident === 'otherGuest'}
                                       onChange={(e) => { this.checked(e); this.context.handleTypeofResident('otherGuest') }}
                                />
                                <label className="" htmlFor="Radio2">
                                    متفرقه
                                </label>
                            </div>
                            <div className="">
                                <input className="" type="radio" name="flexRadioDefault" value='familyGuest'
                                       // checked={this.context.typeofResident === 'familyGuest'}
                                       onChange={(e) => { this.checked(e); this.context.handleTypeofResident('familyGuest') }}
                                />
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
                // validator: this.context.typeofResident === 'familyGuest' ? this.familyGuestValidation :
                //     (this.context.typeofResident === 'otherGuest' ? this.otherGuestValidation :
                //         (this.context.typeofResident === 'constant' ? this.informationPageValidation : null)),
            },
            {
                label: 'مشخصات تکمیلی',
                name: 'step 2',
                content: <InformationFurtherPage updateData={this.updateField}/>,
                // validator: this.informationFurtherPageValidation,
            },
            {
                label: 'مشخصات بستگان',
                name: 'step 3',
                content: <InformationFamilyPage />,
                // validator: this.InformationFamilyPageValidation
            },
            {
                label: 'آپلود مدارک',
                name: 'step 4',
                content: <UploadPage />
            }
        ],
    }

    checked = (e) => {
        const type = e.target.value
        this.setState({ typeofResident: type })

        // console.log(this.context.typeofResident === 'constant')
        // this.context.handleTypeofResident(type);

        // console.log(type)

        switch (type) {
            case 'constant': {
                let updatedState = [...this.state.steps];
                updatedState[1].content = <InformationPage />;
                this.setState({ steps: updatedState })
                break;
            }

            case 'otherGuest': {
                let updatedState = [...this.state.steps];
                updatedState[1].content = <OtherGuest />;
                this.setState({ steps: updatedState })
                break;
            }

            case 'familyGuest': {
                let updatedState = [...this.state.steps];
                updatedState[1].content = <FamilyGuest updateData={this.updateField}/>;
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