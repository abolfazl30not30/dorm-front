import {Component} from "react";
import PersonnelInfo from '../../../../contexts/PersonnelInfo'
import BasicInformation from "./BasicInformation";
import AdditionalInformation from "./AdditionalInformation";
import UploadPage from "./UploadPage";
import PersonnelRegister from "./PersonnelRegister";

class PersonnelFields extends Component {

    state = {
        fields : {
            name: 'lol',
            lastName: '',
        }
    }

    render() {
        return (
            <>
                <PersonnelInfo.Provider value={{
                    fields: this.state.fields,
                }}
                >
                    <BasicInformation />
                    <AdditionalInformation />
                    <UploadPage />
                    <PersonnelRegister />
                </PersonnelInfo.Provider>
            </>
        );
    }

}

export default PersonnelFields;