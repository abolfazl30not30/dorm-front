import React, {Component} from 'react'
import '../../../../style/searchAccount.css'
import {AiOutlineBarcode, AiOutlineUser,AiOutlineArrowLeft} from "react-icons/ai";
import {BsTelephone} from "react-icons/bs";
import {Link} from "react-router-dom"
import BuildingContext from "../../../../contexts/Building";

class SearchPersonnel extends Component {
    static contextType = BuildingContext;

    state = {
        placeholder: '',
        accountFound: [],
        searchInput: "",
        searchType: "fullName",
    }

    async componentDidMount() {
        const response = await fetch('https://api.saadatportal.com/api/v1/characteristic/search?parentType=Personnel').then((response) => response.json())
            .then((data) => this.setState({accountFound: data}));
    }

    render() {
        return (
            <>
                <div className="d-flex flex-row justify-content-between align-items-center w-100 my-3">
                    <div>
                        <h4>
                            پرسنل
                        </h4>
                    </div>
                    <div className="back-btn p-0">
                        <Link to="/dashboard">
                            بازگشت
                            <i className="bi bi-caret-left-fill"/>
                        </Link>
                    </div>
                </div>
                <div className="search-box justify-content-center">
                    <div className="form-floating">
                        <select className="form-select" id="floatingSelect"اشخاص
                                aria-label="Floating label select example"
                                value={this.state.searchType}
                                onChange={(value) => this.setState({searchType: value.target.value})}>
                            <option value="fullName">نام و نام خانوادگی</option>
                            <option value="nationalCode">کد ملی</option>
                            <option value="phoneNumber">شماره تلفن</option>
                        </select>
                        <label htmlFor="floatingSelect">براساس</label>
                    </div>
                    <input type="text"
                           id="inputSearch"
                           placeholder="جسـتجـو..."
                           onChange={(e) => {
                               this.handleSearchInput(e)
                           }}/>
                    <div className="search-icon"><i className="bi bi-search"></i></div>
                </div>
                <div className='result'>
                    {this.state.accountFound.map(accountFound => (
                        <>
                            <Link to={accountFound.id} className='account-found-link' onClick={() => {
                                this.context.handlePersonId(accountFound.parentId, accountFound.id)
                            }}>
                                <div className="peoples-found d-flex flex-md-row flex-column justify-content-between align-items-center">
                                    <div className="people-image my-2">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBnUckFxDVe5FOT5vuVfWCvWWY1pUrOPBOFPu9CNZYpABJSYPCigxy9rEc32E6mBamw3c&usqp=CAU"
                                        />
                                    </div>
                                    <div className="d-flex flex-row align-items-center my-2">
                                        <div className="people-item">
                                            <AiOutlineUser className='ms-2'/>
                                            نام و نام خانوادگی:
                                        </div>
                                        {accountFound.fullName}
                                    </div>
                                    <div className="d-flex flex-row align-items-center my-2">
                                        <div className="people-item">
                                            <BsTelephone className='ms-2'/>
                                            شماره تلفن:
                                        </div>
                                        {accountFound.phoneNumber}
                                    </div>
                                    <div className="d-flex flex-row align-items-center my-2">
                                        <div className="people-item">
                                            <AiOutlineBarcode className='ms-2'/>
                                            کد ملی:
                                        </div>
                                        {accountFound.nationalCode}
                                    </div>
                                </div>
                            </Link>
                        </>
                    ))}
                    &nbsp;
                </div>
            </>
        );
    }
    //search
    handleSearchInput = async (e) => {
        const value = e.target.value;
        this.setState({searchInput: value});
        const response = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?parentType=Personnel&${this.state.searchType}=${e.target.value}`).then((response) => response.json())
            .then((data) => this.setState({accountFound: data}));
        console.log(window.location.href)
    }

}

export default SearchPersonnel;