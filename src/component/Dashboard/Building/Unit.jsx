import React, { Component } from 'react';

class Unit extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <div className='col-4'>
                    <div className='unit'>واحد{this.props.Name}</div>
                </div>
            </>
        );
    }
}
 
export default Unit;