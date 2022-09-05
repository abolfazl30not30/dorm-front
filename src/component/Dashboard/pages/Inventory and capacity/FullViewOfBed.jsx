import React, { Component } from 'react';
import './../../../../style/roomAndBed.css'

class FullViewOfBed extends Component {
    state = { 
        person : {
            id:1,
            firstName:'میلاد',
            lastName:'زارع',
            image:'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
        }
      } 
    render() { 
        console.log(this.state.person)
        return (
            <>
                <div className="d-flex justify-content-center">
                    <div className='profile-box'>
                        <img src={this.state.person.image} width='200' alt="" />
                        <div className="name">{this.state.person.firstName} {this.state.person.lastName}</div>
                    </div>
                </div>
                
            </>
        );
    }
}
 
export default FullViewOfBed;