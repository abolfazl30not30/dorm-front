import React, { Component } from 'react'
import '../../../../style/searchAccount.css'
import {Accordion} from "react-bootstrap";
import png_icon from "../../../../img/png_icon.png";
import pdf_icon from "../../../../img/pdf_icon.png";
import { IoIosSearch } from "react-icons/io";
import { FiUser } from "react-icons/fi";


class SearchAccount extends Component {
    state = {
        placeholder: '',
        accountFound : [
            {
                "name" : "ali",
                "phone" : "09123231",
                "email" : "asd@gmail.com"
            },
            {
                "name" : "ali",
                "phone" : "09123231",
                "email" : "asd@gmail.com"
            },
            {
                "name" : "ali",
                "phone" : "09123231",
                "email" : "asd@gmail.com"
            },
            {
                "name" : "ali",
                "phone" : "09123231",
                "email" : "asd@gmail.com"
            }
        ]
    }
    render() {
        return (
            <>
                <div className='search-container row'>
                    <div>
                        <label htmlFor="orders" className='m-2'>براساس:</label>
                        <select className='form-select' style={{width: '20%'}} name="order" form="order-form" onChange={this.handlePlaceHolder}>
                            <option value="national-code">کدملی</option>
                            <option value="name" >نام</option>
                            <option value="phone-number">شماره تلفن</option>
                        </select>

                        <input className="form-control" type='text' placeholder='search'/> {/*placeholder = {this.state.placeholder}*/}
                        {/*<Accordion defaultActiveKey="0" className='col-3'>*/}
                        {/*    <Accordion.Item eventKey="0">*/}
                        {/*        <Accordion.Header>بر اساس</Accordion.Header>*/}
                        {/*        <Accordion.Body>*/}
                        {/*            <form>*/}
                        {/*                <input type="radio" name="order" value="national-code" className='m-2'/>*/}
                        {/*                    <label>کدملی</label><br />*/}
                        {/*                <input type="radio" name="order" value="name" className='m-2'/>*/}
                        {/*                    <label>نام</label><br />*/}
                        {/*                <input type="radio" name="order" value="phone-number" className='m-2'/>*/}
                        {/*                    <label>شماره تلفن</label>*/}
                        {/*            </form>*/}

                        {/*        </Accordion.Body>*/}
                        {/*    </Accordion.Item>*/}
                        {/*</Accordion>*/}

                        <button className='btn btn-outline-primary'><IoIosSearch size={30} className='search-logo'/></button>
                    </div>
                </div>
                <div className='result'>
                    {this.state.accountFound.map(accountFound => (
                        <>
                            <div className='account-found shadow mb-3 row'>
                                <div className='col'>نام:&nbsp;{accountFound.name}</div>
                                <div className='col'>ایمیل:&nbsp;{accountFound.email}</div>
                                <div className='col'>تلفن:&nbsp;{accountFound.phone}</div>
                                <div className='col'>تلفن:&nbsp;{accountFound.phone}</div>
                                <div className='col'>تلفن:&nbsp;{accountFound.phone}</div>
                                <FiUser size={50} />
                            </div>
                        </>
                    ))}
                    &nbsp;
                </div>
            </>
        );
    }

    handlePlaceHolder= () =>  {
        this.setState({placeHolder : '123'})
        console.log(this.state.placeholder)
    }
}

export default SearchAccount;