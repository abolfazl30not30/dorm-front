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

    familyGuestValidation = () => {

        let requiredReg = /^\s*$/;
        let numberReg = /^[0-9]*$/;
        let telephoneReg = /^[0][9]\d{9}/; // iranian telephone number '09---------'
        let emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        let result;

        // constant

        let asd_requiredReg = !requiredReg.test(this.context.fields.admission_start_date);
        let asd_numberReg = numberReg.test(this.context.fields.admission_start_date);

        let aed_requiredReg = !requiredReg.test(this.context.fields.admission_end_date);
        let aed_numberReg = numberReg.test(this.context.fields.admission_end_date);

        let pd_requiredReg = !requiredReg.test(this.context.fields.payment_date);
        let pd_numberReg = numberReg.test(this.context.fields.payment_date);

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

        let ifp_address_requiredReg = !requiredReg.test(this.context.fields.ifp_address);

        let ifp_home_tel_requiredReg = !requiredReg.test(this.context.fields.ifp_home_tel);
        let ifp_home_tel_telephoneReg = homeTelephoneReg.test(this.context.fields.ifp_home_tel);

        let ifp_father_tel_telephoneReg = telephoneOrEmptyReg.test(this.context.fields.ifp_father_tel);

        let ifp_mother_tel_telephoneReg = telephoneOrEmptyReg.test(this.context.fields.ifp_mother_tel);

        let ifp_resident_tel_requiredReg = !requiredReg.test(this.context.fields.ifp_resident_tel);
        let ifp_resident_tel_telephoneReg = telephoneReg.test(this.context.fields.ifp_resident_tel);

        this.context.handleSpecificValidations([ifp_address_requiredReg, ifp_home_tel_requiredReg, ifp_home_tel_telephoneReg,
                ifp_father_tel_telephoneReg, ifp_mother_tel_telephoneReg, ifp_resident_tel_requiredReg, ifp_resident_tel_telephoneReg],
            ['ifp_address_requiredReg', 'ifp_home_tel_requiredReg', 'ifp_home_tel_telephoneReg', 'ifp_father_tel_telephoneReg',
                'ifp_mother_tel_telephoneReg', 'ifp_resident_tel_requiredReg', 'ifp_resident_tel_telephoneReg']);

        return ifp_address_requiredReg &&
            ifp_home_tel_requiredReg &&
            ifp_home_tel_telephoneReg &&
            ifp_father_tel_telephoneReg &&
            ifp_mother_tel_telephoneReg &&
            ifp_resident_tel_requiredReg &&
            ifp_resident_tel_telephoneReg;
    }

    informationFamilyPageValidation = () => {

    }

    otherGuestValidation = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^[0-9]*$/;

        let o_fullName_requiredReg = !requiredReg.test(this.context.fields.o_fullName);
        let o_nationalCode_requiredReg = !requiredReg.test(this.context.fields.o_nationalCode);
        let o_certificateNumber_requiredReg = !requiredReg.test(this.context.fields.o_certificateNumber);
        let o_admissionStartDate_requiredReg = !requiredReg.test(this.context.fields.o_admissionStartDate);
        let o_admissionEndDate_requiredReg = !requiredReg.test(this.context.fields.o_admissionEndDate);

        let o_nationalCode_numberReg = numberReg.test(this.context.fields.o_nationalCode);
        let o_certificateNumber_numberReg = numberReg.test(this.context.fields.o_certificateNumber);
        let o_rentPaymentAmount_numberReg = numberReg.test(this.context.fields.o_rentPaymentAmount);
        let o_depositPaymentAmount_numberReg = numberReg.test(this.context.fields.o_depositPaymentAmount);
        let o_discountPaymentAmount_numberReg = numberReg.test(this.context.fields.o_discountPaymentAmount);

        this.context.handleSpecificValidations([o_fullName_requiredReg, o_nationalCode_requiredReg, o_certificateNumber_requiredReg,
                o_admissionStartDate_requiredReg, o_admissionEndDate_requiredReg, o_nationalCode_numberReg, o_certificateNumber_numberReg,
                o_rentPaymentAmount_numberReg, o_depositPaymentAmount_numberReg, o_discountPaymentAmount_numberReg],
            ['o_fullName_requiredReg', 'o_nationalCode_requiredReg', 'o_certificateNumber_requiredReg',
                'o_admissionStartDate_requiredReg', 'o_admissionEndDate_requiredReg', 'o_nationalCode_numberReg', 'o_certificateNumber_numberReg',
                'o_rentPaymentAmount_numberReg', 'o_depositPaymentAmount_numberReg', 'o_discountPaymentAmount_numberReg']);

        return o_fullName_requiredReg && o_nationalCode_requiredReg && o_certificateNumber_requiredReg &&
            o_admissionStartDate_requiredReg && o_admissionEndDate_requiredReg && o_nationalCode_numberReg && o_certificateNumber_numberReg &&
            o_rentPaymentAmount_numberReg && o_depositPaymentAmount_numberReg && o_discountPaymentAmount_numberReg;
    }

    constantInformationPageValidation = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^[0-9]*$/;

        let c_firstName_requiredReg = !requiredReg.test(this.context.fields.c_firstName);
        let c_lastName_requiredReg = !requiredReg.test(this.context.fields.c_lastName);
        let c_nationalCode_requiredReg = !requiredReg.test(this.context.fields.c_nationalCode);
        let c_certificateNumber_requiredReg = !requiredReg.test(this.context.fields.c_certificateNumber);
        let c_placeOfIssue_requiredReg = !requiredReg.test(this.context.fields.c_placeOfIssue);
        let c_birthDate_requiredReg = !requiredReg.test(this.context.fields.c_birthDate);
        let c_nationality_requiredReg = !requiredReg.test(this.context.fields.c_nationality);
        let c_fatherName_requiredReg = !requiredReg.test(this.context.fields.c_fatherName);
        let c_spouseFullName_requiredReg = !requiredReg.test(this.context.fields.c_spouseFullName);
        let c_healthDescription_requiredReg = !requiredReg.test(this.context.fields.c_healthDescription);

        let c_nationalCode_numberReg = numberReg.test(this.context.fields.c_nationalCode);
        let c_certificateNumber_numberReg = numberReg.test(this.context.fields.c_certificateNumber);
        let c_studentNumber_numberReg = numberReg.test(this.context.fields.c_studentNumber);

        if (this.context.fields.c_maritalStatus !== 'married') {
            c_spouseFullName_requiredReg = true;
        }

        if (this.context.fields.c_health === 'false') {
            c_healthDescription_requiredReg = true;
        }

        this.context.handleSpecificValidations([c_firstName_requiredReg, c_lastName_requiredReg, c_nationalCode_requiredReg, c_certificateNumber_requiredReg,
                c_placeOfIssue_requiredReg, c_birthDate_requiredReg, c_nationality_requiredReg, c_fatherName_requiredReg, c_spouseFullName_requiredReg,
                c_healthDescription_requiredReg, c_nationalCode_numberReg, c_certificateNumber_numberReg, c_studentNumber_numberReg],
            ['c_firstName_requiredReg', 'c_lastName_requiredReg', 'c_nationalCode_requiredReg', 'c_certificateNumber_requiredReg',
                'c_placeOfIssue_requiredReg', 'c_birthDate_requiredReg', 'c_nationality_requiredReg', 'c_fatherName_requiredReg', 'c_spouseFullName_requiredReg',
                'c_healthDescription_requiredReg', 'c_nationalCode_numberReg', 'c_certificateNumber_numberReg', 'c_studentNumber_numberReg']);

        return c_firstName_requiredReg && c_lastName_requiredReg && c_nationalCode_requiredReg && c_certificateNumber_requiredReg &&
            c_placeOfIssue_requiredReg && c_birthDate_requiredReg && c_nationality_requiredReg && c_fatherName_requiredReg && c_spouseFullName_requiredReg &&
            c_healthDescription_requiredReg && c_nationalCode_numberReg && c_certificateNumber_numberReg && c_studentNumber_numberReg;
    }

    state = {
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
                //         (this.context.typeofResident === 'constant' ? this.constantInformationPageValidation : null)),

                validator: this.otherGuestValidation,
            },
            {
                label: 'مشخصات تکمیلی',
                name: 'step 2',
                content: <InformationFurtherPage />,
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
                updatedState[1].content = <FamilyGuest />;
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