import {Component} from "react";
import StepProgressBar from "react-step-progress";
import BasicInformation from "./BasicInformation";
import AdditionalInformation from "./AdditionalInformation";
import UploadPage from "./UploadPage";
import BuildingContext from "../../../../contexts/Building";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

class PersonnelRegister extends Component {
    static contextType = BuildingContext;

    personnelBasicInformation = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;
        let phoneNumberReg = /^(\s*09\d{9}\s*)$/; // iranian telephone number '09---------'
        let homeTelephoneReg = /^[0]\d{10}$/; // 012-34567890
        let MobileOrHomeTelephoneReg = /^(\s*09\d{9}\s*|[0]\d{10})$/
        let emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        let firstName_requiredReg = !requiredReg.test(this.context.personnelFields.firstName);
        let lastName_requiredReg = !requiredReg.test(this.context.personnelFields.lastName);
        let fatherName_requiredReg = !requiredReg.test(this.context.personnelFields.fatherName);
        let nationalCode_requiredReg = !requiredReg.test(this.context.personnelFields.nationalCode);
        let placeOfIssue_requiredReg = !requiredReg.test(this.context.personnelFields.placeOfIssue);
        let certificateNumber_requiredReg = !requiredReg.test(this.context.personnelFields.certificateNumber);
        let phoneNumber_requiredReg = !requiredReg.test(this.context.personnelFields.phoneNumber);
        let address_requiredReg = !requiredReg.test(this.context.personnelFields.address);
        let telephoneNumber_requiredReg = !requiredReg.test(this.context.personnelFields.telephoneNumber);
        let emergencyNumber_requiredReg = !requiredReg.test(this.context.personnelFields.emergencyNumber);
        let birthPlace_requiredReg = !requiredReg.test(this.context.personnelFields.birthPlace);
        let birthDate_requiredReg = !requiredReg.test(this.context.personnelFields.birthDate);
        let postalCode_requiredReg = !requiredReg.test(this.context.personnelFields.postalCode);
        let email_requiredReg = !requiredReg.test(this.context.personnelFields.email);
        let nationality_requiredReg = !requiredReg.test(this.context.personnelFields.nationality);
        let maritalStatus_requiredReg = !requiredReg.test(this.context.personnelFields.maritalStatus);
        let healthyStatus_requiredReg = !requiredReg.test(this.context.personnelFields.healthyStatus);
        let type_requiredReg = !requiredReg.test(this.context.personnelFields.type);
        let spouseFullName_requiredReg = !requiredReg.test(this.context.personnelFields.spouseFullName);

        let nationalCode_numberReg = numberReg.test(this.context.personnelFields.nationalCode);
        let certificateNumber_numberReg = numberReg.test(this.context.personnelFields.certificateNumber);
        let postalCode_numberReg = numberReg.test(this.context.personnelFields.postalCode);

        let phoneNumber_phoneNumberReg = phoneNumberReg.test(this.context.personnelFields.phoneNumber);

        let telephoneNumber_homeTelephoneReg = homeTelephoneReg.test(this.context.personnelFields.telephoneNumber);

        let emergencyNumber_MobileOrHomeTelephoneReg = MobileOrHomeTelephoneReg.test(this.context.personnelFields.emergencyNumber);

        let email_emailReg = emailReg.test(this.context.personnelFields.email);

        if (this.context.personnelFields.health === 'false') {
            healthyStatus_requiredReg = true;
        }
        if (this.context.personnelFields.maritalStatus === 'single') {
            spouseFullName_requiredReg = true;
        }

        this.context.handleSpecificValidations([firstName_requiredReg, lastName_requiredReg, fatherName_requiredReg,
                nationalCode_requiredReg, placeOfIssue_requiredReg, certificateNumber_requiredReg, phoneNumber_requiredReg,
                address_requiredReg, telephoneNumber_requiredReg, emergencyNumber_requiredReg,
                birthPlace_requiredReg, birthDate_requiredReg,
                postalCode_requiredReg, email_requiredReg, nationality_requiredReg,
                maritalStatus_requiredReg, nationalCode_numberReg,
                certificateNumber_numberReg, postalCode_numberReg, phoneNumber_phoneNumberReg,
                telephoneNumber_homeTelephoneReg, emergencyNumber_MobileOrHomeTelephoneReg, email_emailReg, healthyStatus_requiredReg,
                type_requiredReg, spouseFullName_requiredReg],
            ['firstName_requiredReg', 'lastName_requiredReg', 'fatherName_requiredReg',
                'nationalCode_requiredReg', 'placeOfIssue_requiredReg', 'certificateNumber_requiredReg', 'phoneNumber_requiredReg',
                'address_requiredReg', 'telephoneNumber_requiredReg', 'emergencyNumber_requiredReg',
                'birthPlace_requiredReg', 'birthDate_requiredReg',
                'postalCode_requiredReg', 'email_requiredReg', 'nationality_requiredReg',
                'maritalStatus_requiredReg', 'nationalCode_numberReg',
                'certificateNumber_numberReg', 'postalCode_numberReg', 'phoneNumber_phoneNumberReg',
                'telephoneNumber_homeTelephoneReg', 'emergencyNumber_MobileOrHomeTelephoneReg', 'email_emailReg',
                'healthyStatus_requiredReg', 'type_requiredReg', 'spouseFullName_requiredReg'], 'personnelFieldsValidation')

        return firstName_requiredReg && lastName_requiredReg && fatherName_requiredReg &&
            nationalCode_requiredReg && placeOfIssue_requiredReg && certificateNumber_requiredReg && phoneNumber_requiredReg &&
            address_requiredReg && telephoneNumber_requiredReg && emergencyNumber_requiredReg &&
            birthPlace_requiredReg && birthDate_requiredReg &&
            postalCode_requiredReg && email_requiredReg && nationality_requiredReg &&
            maritalStatus_requiredReg && nationalCode_numberReg &&
            certificateNumber_numberReg && postalCode_numberReg && phoneNumber_phoneNumberReg &&
            telephoneNumber_homeTelephoneReg && emergencyNumber_MobileOrHomeTelephoneReg && email_emailReg &&
            healthyStatus_requiredReg && type_requiredReg && spouseFullName_requiredReg;
    }

    personnelAdditionalInformation = () => {
        let requiredReg = /^\s*$/;
        let numberReg = /^\s*[0-9]*\s*$/;
        let homeTelephoneReg = /^(\d{3}-\d{8}|\s*)$/; // 012-34567890

        let education_requiredReg = !requiredReg.test(this.context.personnelFields.education);
        let bankAccountOwnerName_requiredReg = !requiredReg.test(this.context.personnelFields.bankAccountOwnerName);
        let bankAccountShabaNumber_requiredReg = !requiredReg.test(this.context.personnelFields.bankAccountShabaNumber);
        let parentType_requiredReg = !requiredReg.test(this.context.personnelFields.parentType);
        let parentId_requiredReg = !requiredReg.test(this.context.personnelFields.parentId);
        let gender_requiredReg = !requiredReg.test(this.context.personnelFields.gender);

        // let homeNumber_homeTelephoneReg = homeTelephoneReg.test(this.context.personnelFields.homeNumber);

        let bankAccountShabaNumber_numberReg = numberReg.test(this.context.personnelFields.bankAccountShabaNumber)

        this.context.handleSpecificValidations([education_requiredReg, bankAccountOwnerName_requiredReg,
                bankAccountShabaNumber_requiredReg,
                parentType_requiredReg, parentId_requiredReg, gender_requiredReg, bankAccountShabaNumber_numberReg],
            ['education_requiredReg', 'bankAccountOwnerName_requiredReg',
                'bankAccountShabaNumber_requiredReg',
                'parentType_requiredReg', 'parentId_requiredReg', 'gender_requiredReg',
                'bankAccountShabaNumber_numberReg'], 'personnelFieldsValidation')

        return education_requiredReg && bankAccountOwnerName_requiredReg && bankAccountShabaNumber_requiredReg &&
            parentType_requiredReg && parentId_requiredReg && gender_requiredReg &&  bankAccountShabaNumber_numberReg;

    }

    state = {

        steps: [
            {
                label: '???????????? ??????????',
                name: 'step 1',
                content: <BasicInformation />,
                validator: this.personnelBasicInformation
            },
            {
                label: '???????????? ????????????',
                name: 'step 2',
                content: <AdditionalInformation />,
                validator: this.personnelAdditionalInformation,
            },
            {
                label: '?????????? ??????????',
                name: 'step 4',
                content: <UploadPage />,
            }
        ],
        showDoneModal: false
    }

    render() {
        return (
            <>
                <div style={{ direction: "ltr" }}>
                    <StepProgressBar
                        startingStep={0}
                        contentClass={"register-container"}
                        previousBtnName={"????????"}
                        nextBtnName={"????????"}
                        submitBtnName={"??????????"}
                        primaryBtnClass="next-btn"
                        secondaryBtnClass="previous-btn"
                        steps={this.state.steps}
                        onSubmit={this.handleSubmit}
                    />
                </div>
                <Modal centered show={this.state.showDoneModal} className='modal-done'>
                    <Modal.Body className="px-4">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-column">
                                <div className="icon">
                                    <span className="glyphicon glyphicon-ok"></span>
                                </div>
                                <div className="title-modal-done">
                                    ????????!
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between my-3">
                                <Link to="/dashboard/People/profile"  className='btn button-show' onClick={() =>{this.handleGoToShow()}}>??????????</Link>
                                <Link to="" className='btn button-close' onClick={() =>{this.handleCloseModal()}}>????????</Link>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    handleCloseModal = () => {
        this.setState({showDoneModal:false})
        window.location.reload(false);
    }
    handleGoToShow = () => {
        this.setState({showDoneModal:false})
    }
    handleSubmit = async () => {
        let newCharacteristic = {...this.context.personnelFields}

        const profileImg = this.context.personnelUploadPage.find(({name}) => name === "personnelImg");
        if(profileImg !== undefined){
            console.log(profileImg);
            newCharacteristic.profileId = profileImg.fileId;
        }

        console.log(newCharacteristic)
        const newChar = axios.post('https://api.saadatportal.com/api/v1/supervisor/characteristic', newCharacteristic, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
            if (localStorage.getItem('role') === 'MANAGER') {
                axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/characteristic', newCharacteristic, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        } else {
                            window.location = '/'
                        }
                    })
            } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                    .then((response) => {
                        if (response.headers["accesstoken"]) {
                            localStorage.setItem("accessToken", response.headers["accesstoken"]);
                            axios.post('https://api.saadatportal.com/api/v1/supervisor/characteristic', newCharacteristic, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                        } else {
                            window.location = '/'
                        }
                    })
            }})


        var respondChar = await newChar
        let personnel = {
            gender: newCharacteristic.gender,
            type: newCharacteristic.type,
            residenceType:"resident",
            characteristicId: respondChar.id,
            files: this.context.personnelUploadPage,
        }

        console.log(respondChar)

        const newPersonnel = axios.post('https://api.saadatportal.com/api/v1/supervisor/personnel', personnel, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
.catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/personnel', personnel, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)

                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.post('https://api.saadatportal.com/api/v1/supervisor/personnel', personnel, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)

                            } else {
                                window.location = '/'
                            }
                        })
                }})

        var respondPersonnel = await newPersonnel

        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${respondChar.id}`, {parentId : respondPersonnel.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(() => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${respondChar.id}`, {parentId : respondPersonnel.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)

                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then((response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                axios.put(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${respondChar.id}`, {parentId : respondPersonnel.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)

                            } else {
                                window.location = '/'
                            }
                        })
                }})

        this.setState({showDoneModal:true})
    }

}

export default PersonnelRegister;