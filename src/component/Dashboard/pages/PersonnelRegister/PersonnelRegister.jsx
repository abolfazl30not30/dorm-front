import {Component} from "react";
import StepProgressBar from "react-step-progress";
import BasicInformation from "./BasicInformation";
import AdditionalInformation from "./AdditionalInformation";
import UploadPage from "./UploadPage";

class PersonnelRegister extends Component {

    state = {

        steps: [
            {
                label: 'مشخصات اولیه',
                name: 'step 1',
                content: <BasicInformation />,
            },
            {
                label: 'مشخصات تکمیلی',
                name: 'step 2',
                content: <AdditionalInformation />,
            },
            {
                label: 'آپلود مدارک',
                name: 'step 4',
                content: <UploadPage />,
            }
        ],
        constantCheck : true,
        otherGuestCheck: false,
        familyGuestCheck : false,
        typeofResident : "constant",

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