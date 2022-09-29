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

class SearchAccount extends Component {
    state = {
        placeholder: '',
        accountFound: [],
        searchInput:"",
        searchType:"firstName",
    }

    render() {
        return (
            <>
                <div className="row align-items-center">
                    <div className="col-1"><label>براساس:</label></div>
                    <div className="col-3 " style={{paddingLeft: "0"}}>
                        <Form.Select aria-label="Default select example" value={this.state.searchType} onChange={(e)=>{this.setState({searchType:e.target.value})}}>
                            <option value="firstName">نام و نام خانوادگی</option>
                            <option value="nationalCode">کد ملی</option>
                            <option value="phoneNumber">شماره تلفن</option>
                        </Form.Select>
                    </div>
                    <div className="input-group-register col-7 px-0" style={{paddingRight: "0"}}>
                        <input type="text" id="inputSearch" className="input" placeholder=" " style={{padding:"6px"}} onChange={(e)=>{this.handleSearchInput(e)}}/>
                        <label className="placeholder">جستوجـو</label>
                    </div>
                    <div className="col-1" style={{paddingRight: "0"}}>
                        <button className="btn outline-secondary"><BiSearch fontSize="25px" onClick={this.handleSearchBtn}/>
                        </button>
                    </div>
                </div>
                <div className='result'>
                    {this.state.accountFound.map(accountFound => (
                        <>
                            <Link to="profile" className='account-found-link'>
                                <div className='account-found mb-3 d-flex flex-column flex-md-row'>
                                    {/*<FiUser size={80} style={{ marginLeft: '5%', marginTop: '1%' }} />*/}
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
                </div>
            </>
        );
    }

    //search
    handleSearchInput = (e) =>{
        const value = e.target.value;
        this.setState({searchInput:value});
    }
    handleSearchBtn = async () =>{
        const response = await fetch(`http://api.saadatportal.com/api/v1/characteristic/search?${this.state.searchType}=${this.state.searchInput}`).then((response) => response.json())
            .then((data) => this.setState({accountFound: data}));
    }
}

export default SearchAccount;