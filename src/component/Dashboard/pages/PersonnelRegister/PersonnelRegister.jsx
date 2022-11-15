import {Component} from "react";
import StepProgressBar from "react-step-progress";
import BasicInformation from "./BasicInformation";
import AdditionalInformation from "./AdditionalInformation";
import UploadPage from "./UploadPage";
import BuildingContext from "../../../../contexts/Building";

class PersonnelRegister extends Component {
    static contextType = BuildingContext;

    personnelBasicInformation = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;
        let phoneNumberReg = /^(\s*09\d{9}\s*)$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^\d{3}-\d{8}$/; // 012-34567890
        let MobileOrHomeTelephoneReg = /^(\s*09\d{9}\s*|\d{3}-\d{8})$/
        let emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        let firstName_requiredReg = !requiredReg.test(this.context.personnelFields.firstName);
        let lastName_requiredReg = !requiredReg.test(this.context.personnelFields.lastName);
        let nationalCode_requiredReg = !requiredReg.test(this.context.personnelFields.nationalCode);
        let placeOfIssue_requiredReg = !requiredReg.test(this.context.personnelFields.placeOfIssue);
        let certificateNumber_requiredReg = !requiredReg.test(this.context.personnelFields.certificateNumber);
        let phoneNumber_requiredReg = !requiredReg.test(this.context.personnelFields.phoneNumber);
        let address_requiredReg = !requiredReg.test(this.context.personnelFields.address);
        let telephoneNumber_requiredReg = !requiredReg.test(this.context.personnelFields.telephoneNumber);
        let emergencyNumber_requiredReg = !requiredReg.test(this.context.personnelFields.emergencyNumber);
        let birthPlace_requiredReg = !requiredReg.test(this.context.personnelFields.birthPlace);
        let birthDate_requiredReg = !requiredReg.test(this.context.personnelFields.birthDate);
        let education_requiredReg = !requiredReg.test(this.context.personnelFields.education);
        let postalCode_requiredReg = !requiredReg.test(this.context.personnelFields.postalCode);
        let email_requiredReg = !requiredReg.test(this.context.personnelFields.email);
        let nationality_requiredReg = !requiredReg.test(this.context.personnelFields.nationality);
        let maritalStatus_requiredReg = !requiredReg.test(this.context.personnelFields.maritalStatus);
        let religion_requiredReg = !requiredReg.test(this.context.personnelFields.religion);

        let nationalCode_numberReg = numberReg.test(this.context.personnelFields.nationalCode);
        let certificateNumber_numberReg = numberReg.test(this.context.personnelFields.certificateNumber);
        let postalCode_numberReg = numberReg.test(this.context.personnelFields.postalCode);

        let phoneNumber_phoneNumberReg = phoneNumberReg.test(this.context.personnelFields.phoneNumber);

        let telephoneNumber_homeTelephoneReg = homeTelephoneReg.test(this.context.personnelFields.telephoneNumber);

        let emergencyNumber_MobileOrHomeTelephoneReg = MobileOrHomeTelephoneReg.test(this.context.personnelFields.emergencyNumber);

        let email_emailReg = emailReg.test(this.context.personnelFields.email);

        this.context.handleSpecificValidations([firstName_requiredReg, lastName_requiredReg,
            nationalCode_requiredReg, placeOfIssue_requiredReg, certificateNumber_requiredReg, phoneNumber_requiredReg,
            address_requiredReg, telephoneNumber_requiredReg, emergencyNumber_requiredReg,
            birthPlace_requiredReg, birthDate_requiredReg, education_requiredReg,
            postalCode_requiredReg, email_requiredReg, nationality_requiredReg,
            maritalStatus_requiredReg, religion_requiredReg, nationalCode_numberReg,
            certificateNumber_numberReg, postalCode_numberReg, phoneNumber_phoneNumberReg,
            telephoneNumber_homeTelephoneReg, emergencyNumber_MobileOrHomeTelephoneReg, email_emailReg],
            ['firstName_requiredReg', 'lastName_requiredReg',
            'nationalCode_requiredReg', 'placeOfIssue_requiredReg', 'certificateNumber_requiredReg', 'phoneNumber_requiredReg',
            'address_requiredReg', 'telephoneNumber_requiredReg', 'emergencyNumber_requiredReg',
            'birthPlace_requiredReg', 'birthDate_requiredReg', 'education_requiredReg',
            'postalCode_requiredReg', 'email_requiredReg', 'nationality_requiredReg',
            'maritalStatus_requiredReg', 'religion_requiredReg', 'nationalCode_numberReg',
            'certificateNumber_numberReg', 'postalCode_numberReg', 'phoneNumber_phoneNumberReg',
            'telephoneNumber_homeTelephoneReg', 'emergencyNumber_MobileOrHomeTelephoneReg', 'email_emailReg'], 'personnelFieldsValidation')

        return firstName_requiredReg && lastName_requiredReg &&
            nationalCode_requiredReg && certificateNumber_requiredReg && phoneNumber_requiredReg &&
            address_requiredReg && telephoneNumber_requiredReg && emergencyNumber_requiredReg &&
            birthPlace_requiredReg && birthDate_requiredReg && education_requiredReg &&
            postalCode_requiredReg && email_requiredReg && nationality_requiredReg &&
            maritalStatus_requiredReg && religion_requiredReg && nationalCode_numberReg &&
            certificateNumber_numberReg && postalCode_numberReg && phoneNumber_phoneNumberReg &&
            telephoneNumber_homeTelephoneReg && emergencyNumber_MobileOrHomeTelephoneReg && email_emailReg;
    }

    personnelAdditionalInformation = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;
        let homeTelephoneReg = /^(\d{3}-\d{8}|\s*)$/; // 012-34567890

        let major_requiredReg = !requiredReg.test(this.context.personnelFields.major);
        let spouseFullName_requiredReg = !requiredReg.test(this.context.personnelFields.spouseFullName);
        let bankName_requiredReg = !requiredReg.test(this.context.personnelFields.bankName);
        let cardNumber_requiredReg = !requiredReg.test(this.context.personnelFields.cardNumber);
        let bankAccountNumber_requiredReg = !requiredReg.test(this.context.personnelFields.bankAccountNumber);
        let bankAccountOwnerName_requiredReg = !requiredReg.test(this.context.personnelFields.bankAccountOwnerName);
        let bankAccountShabaNumber_requiredReg = !requiredReg.test(this.context.personnelFields.bankAccountShabaNumber);
        let bankAccountExpirationDate_requiredReg = !requiredReg.test(this.context.personnelFields.bankAccountExpirationDate);
        // let fullName_requiredReg = !requiredReg.test(this.context.personnelFields.fullName);
        let parentType_requiredReg = !requiredReg.test(this.context.personnelFields.parentType);
        let parentId_requiredReg = !requiredReg.test(this.context.personnelFields.parentId);
        let gender_requiredReg = !requiredReg.test(this.context.personnelFields.gender);

        // let homeNumber_homeTelephoneReg = homeTelephoneReg.test(this.context.personnelFields.homeNumber);

        let cardNumber_numberReg = numberReg.test(this.context.personnelFields.cardNumber)
        let bankAccountNumber_numberReg = numberReg.test(this.context.personnelFields.bankAccountNumber)
        let bankAccountShabaNumber_numberReg = numberReg.test(this.context.personnelFields.bankAccountShabaNumber)
        let cvv2_numberReg = numberReg.test(this.context.personnelFields.cvv2)

        this.context.handleSpecificValidations([major_requiredReg, spouseFullName_requiredReg,
                bankName_requiredReg, cardNumber_requiredReg, bankAccountNumber_requiredReg, bankAccountOwnerName_requiredReg,
                bankAccountShabaNumber_requiredReg, bankAccountExpirationDate_requiredReg,
                parentType_requiredReg, parentId_requiredReg, gender_requiredReg, cardNumber_numberReg,
                bankAccountNumber_numberReg, bankAccountShabaNumber_numberReg, cvv2_numberReg],
            ['major_requiredReg', 'spouseFullName_requiredReg',
                'bankName_requiredReg', 'cardNumber_requiredReg', 'bankAccountNumber_requiredReg', 'bankAccountOwnerName_requiredReg',
                'bankAccountShabaNumber_requiredReg', 'bankAccountExpirationDate_requiredReg',
                'parentType_requiredReg', 'parentId_requiredReg', 'gender_requiredReg', 'cardNumber_numberReg',
                'bankAccountNumber_numberReg', 'bankAccountShabaNumber_numberReg', 'cvv2_numberReg'], 'personnelFieldsValidation')

        // console.log (this.context.valueOfDates.personnel.bankAccountExpirationDate)

        return major_requiredReg && spouseFullName_requiredReg &&
            bankName_requiredReg && cardNumber_requiredReg && bankAccountNumber_requiredReg && bankAccountOwnerName_requiredReg &&
            bankAccountShabaNumber_requiredReg && bankAccountExpirationDate_requiredReg &&
            parentType_requiredReg && parentId_requiredReg && gender_requiredReg && cardNumber_numberReg &&
            bankAccountNumber_numberReg && bankAccountShabaNumber_numberReg && cvv2_numberReg;

    }

    state = {

        steps: [
            {
                label: 'مشخصات اولیه',
                name: 'step 1',
                content: <BasicInformation />,
                // validator: this.personnelBasicInformation
            },
            {
                label: 'مشخصات تکمیلی',
                name: 'step 2',
                content: <AdditionalInformation />,
                validator: this.personnelAdditionalInformation,
            },
            {
                label: 'آپلود مدارک',
                name: 'step 4',
                content: <UploadPage />,
            }
        ],

    }

    render() {
        return (
            <>
                <div style={{ direction: "ltr" }}>
                    <StepProgressBar
                        startingStep={0}
                        contentClass={"register-container"}
                        previousBtnName={"قبلی"}
                        nextBtnName={"بعدی"}
                        submitBtnName={"ارسال"}
                        primaryBtnClass="next-btn"
                        secondaryBtnClass="previous-btn"
                        steps={this.state.steps}
                        onSubmit={this.handleSubmit}
                    />
                </div>
            </>
        );
    }

    handleSubmit = () => {

    }

}

export default PersonnelRegister;