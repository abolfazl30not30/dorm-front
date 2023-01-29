import React, {Component} from "react";
import StepProgressBar from "react-step-progress";
import BasicInformation from "./BasicInformation";
import AdditionalInformation from "./AdditionalInformation";
import UploadPage from "./UploadPage";
import BuildingContext from "../../../../contexts/Building";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {BsCheckCircleFill} from "react-icons/bs";

class PersonnelRegister extends Component {
    static contextType = BuildingContext;

    constructor(props) {
        super(props);
        if (localStorage.getItem('role') !== 'MANAGER') {window.location = "/dashboard"}
    }

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
                label: 'مشخصات اولیه',
                name: 'step 1',
                content: <BasicInformation />,
                validator: this.personnelBasicInformation
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
        showDoneModal: false,
        personnelId: ''
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
                <Modal centered show={this.state.showDoneModal} style={window.innerWidth > 768 ? {width: "25%", marginLeft: "50%", translate: "-50%"} : {width: "100%"}}>
                    <Modal.Header className={"bg-success text-cente d-flex justify-content-center"}>
                        <BsCheckCircleFill style={{color: "#fff"}} size={60}/>
                    </Modal.Header>
                    <Modal.Body className="px-4">
                        <div className="d-flex justify-content-center text-success" style={{fontSize: "2.5rem"}}>
                            موفق!
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row justify-content-center flex-column flex-md-row">
                            <Link to={`/dashboard/people/${this.state.personnelId}`} className='btn mx-3 btn-sm px-5 btn-success' onClick={() =>{this.handleGoToShow()}}>نمایش</Link>
                            <Link to="" className='btn btn-sm mx-3 px-5 btn-secondary' onClick={() =>{this.handleCloseModal()}}>بستن</Link>
                        </div>
                    </Modal.Footer>
                </Modal>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
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
            newCharacteristic.profileId = profileImg.fileId;
        }

        let respondChar = ''
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/characteristic', newCharacteristic, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                respondChar = data
            })
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.post('https://api.saadatportal.com/api/v1/supervisor/characteristic', newCharacteristic, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        respondChar = data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.post('https://api.saadatportal.com/api/v1/supervisor/characteristic', newCharacteristic, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        respondChar = data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        this.setState({personnelId: respondChar.id})
        let personnel = {
            gender: newCharacteristic.gender,
            type: newCharacteristic.type,
            residenceType:"resident",
            characteristicId: respondChar.id,
            files: this.context.personnelUploadPage,
        }

        let respondPersonnel = ''
        await axios.post('https://api.saadatportal.com/api/v1/supervisor/personnel', personnel, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .then((data) => {
                respondPersonnel = data
            })
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.post('https://api.saadatportal.com/api/v1/supervisor/personnel', personnel, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        respondPersonnel = data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.post('https://api.saadatportal.com/api/v1/supervisor/personnel', personnel, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
                                    .then((data) => {
                                        respondPersonnel = data
                                    })
                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        await axios.put(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${respondChar.id}`, {parentId : respondPersonnel.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)
            .catch(async () => {
                if (localStorage.getItem('role') === 'MANAGER') {
                    await axios.get('https://api.saadatportal.com/api/v1/manager/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.put(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${respondChar.id}`, {parentId: respondPersonnel.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)

                            } else {
                                window.location = '/'
                            }
                        })
                } else if (localStorage.getItem('role') === 'SUPERVISOR') {
                    await axios.get('https://api.saadatportal.com/api/v1/supervisor/token/refresh', {headers: {'Authorization': localStorage.getItem('refreshToken')}})
                        .then(async (response) => {
                            if (response.headers["accesstoken"]) {
                                localStorage.setItem("accessToken", response.headers["accesstoken"]);
                                await axios.put(`https://api.saadatportal.com/api/v1/supervisor/characteristic/${respondChar.id}`, {parentId: respondPersonnel.id}, {headers: {'Authorization': localStorage.getItem('accessToken')}}).then(response => response.data)

                            } else {
                                window.location = '/'
                            }
                        })
                }
            })

        this.setState({showDoneModal:true})
        toast(<div>
                <h4>پرسنل با موفقیت ثبت شد</h4>
            </div>, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                // theme: "colored",
                className: "bg-success text-light",
            }
        )
        this.context.handleReset();
    }

}

export default PersonnelRegister;