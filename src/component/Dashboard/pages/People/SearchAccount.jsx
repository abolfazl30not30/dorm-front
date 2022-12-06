import React, {Component} from 'react'
import '../../../../style/searchAccount.css'
import {Accordion} from "react-bootstrap";
import png_icon from "../../../../img/png_icon.png";
import pdf_icon from "../../../../img/pdf_icon.png";
import {IoIosSearch} from "react-icons/io";
import {FiUser} from "react-icons/fi";
import {AiOutlineBarcode, AiOutlineUser} from "react-icons/ai";
import {BsTelephone} from "react-icons/bs";
import {HiOutlineMailOpen} from "react-icons/hi";
import {Link} from "react-router-dom"
import Form from "react-bootstrap/Form";
import {BiSearch} from "react-icons/bi";
import BuildingContext from "../../../../contexts/Building";

class SearchAccount extends Component {
    static contextType = BuildingContext;

    state = {
        placeholder: '',
        accountFound: [],
        searchInput: "",
        searchType: "fullName",
    }

    async componentDidMount() {
        const response = await fetch('https://api.saadatportal.com/api/v1/characteristic/search?parentType=Person').then((response) => response.json())
            .then((data) => this.setState({accountFound: data}));
    }

    render() {
        return (
            <>
                <div className="d-flex flex-row justify-content-between align-items-center w-100 my-3">
                    <div>
                        <h4>
                            اشخاص
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
                        <select className="form-select" id="floatingSelect"
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
                {/*<div className='result'>
                    {this.state.accountFound.map(accountFound => (
                        <>
                            <Link to="profile" className='account-found-link' onClick={() => {
                                this.context.handlePersonId(accountFound.parentId, accountFound.id)
                            }}>
                                <div className='account-found mb-3 d-flex flex-column flex-md-row'>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBnUckFxDVe5FOT5vuVfWCvWWY1pUrOPBOFPu9CNZYpABJSYPCigxy9rEc32E6mBamw3c&usqp=CAU"
                                        style={{
                                            marginLeft: '5%',
                                            marginTop: '1%',
                                            marginBottom: '16px',
                                            width: "200px",
                                            height: "200px",
                                            borderRadius: "100%"
                                        }}/>
                                    <div className='ms-5'>
                                        <div className='col p-2'>
                                            <AiOutlineUser className='ms-2'/>
                                            <label> نام :</label>
                                            {accountFound.firstName}
                                        </div>
                                        <div className='col p-2'>
                                            <AiOutlineUser className='ms-2'/>
                                            <label> نام خانوادگی :</label>
                                            {accountFound.lastName}
                                        </div>
                                        <div className='col p-2'>
                                            <HiOutlineMailOpen className='ms-2'/>
                                            <label> نام پدر :</label>
                                            {accountFound.fatherName}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='col p-2'>
                                            <AiOutlineBarcode className='ms-2'/>
                                            <label> کد ملی :</label>
                                            {accountFound.nationalCode}
                                        </div>
                                        <div className='col p-2'>
                                            <BsTelephone className='ms-2'/>
                                            <label> شماره تلفن :</label>
                                            {accountFound.phoneNumber}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>
                    ))}
                    &nbsp;
                </div>*/}


                <div className='result'>
                    {this.state.accountFound.map(accountFound => (
                        <>
                            <Link to="profile" className='account-found-link' onClick={() => {
                                this.context.handlePersonId(accountFound.parentId, accountFound.id)
                            }}>
                                <div className="peoples-found d-flex flex-md-row flex-column justify-content-around align-items-center">
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
                                    <div className="d-flex flex-row align-items-center my-2">
                                        <div className="people-item">
                                            <i className="bi bi-calendar ms-2"></i>
                                            پذیرش:
                                        </div>
                                        <div className="d-flex flex-row" style={{fontSize: '.8rem'}}>
                                            <span className='ms-1'>از</span>
                                            <span className='ms-1'>{accountFound.timePeriod.startDate}</span>
                                            <span className='ms-1'>تا</span>
                                            <span>{accountFound.timePeriod.endDate.split(" ")[0]}</span>
                                        </div>
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
        const response = await fetch(`https://api.saadatportal.com/api/v1/characteristic/search?parentType=Person&${this.state.searchType}=${e.target.value}`).then((response) => response.json())
            .then((data) => this.setState({accountFound: data}));
    }

}

export default SearchAccount;