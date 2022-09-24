import React, { Component } from 'react';
import * as yup from 'yup';
import BuildingContext from "../../../../contexts/Building";

class FamilyGuest extends Component {
    static contextType = BuildingContext;

    state = {
        fields : {
            admission_start_date : '',
            admission_end_date : '',
            payment_date : '',
        },
        errors : []
    }

    // schema = yup.object().shape({
    //     admission_start_date: yup.string().required('فیلد "تاریخ شروع پذیرش" نمیتواند خالی باشد'),
    //     admission_end_date: yup.string().required('فیلد "تاریخ اتمام پذیرش" نمیتواند خالی باشد'),
    //     payment_date: yup.string().required('فیلد "تاریخ پرداخت" نمیتواند خالی باشد')
    // })

    // handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = await this.validate();
    //     console.log(result);
    // }
    //
    // validate = async () => {
    //     try {
    //         const result = await this.schema.validate(this.state.fields, {abortEarly : false});
    //         return result;
    //     } catch (error){
    //         console.log(error.errors);
    //         this.setState({error: error.errors});
    //     }
    // }

    handleChange = (e, name) => {
        // this.setState({
        //     [name] : e.target.value
        // });

        this.context.handleFields(e, name)

        // console.log(this.state.admission_start_date)
    }

    render() {
        // const {admission_start_date, admission_end_date, payment_date} = this.state.fields;
        return (
            <>
                <form className="register-step-box" onSubmit={this.handleSubmit}>
                    <h2>مهمان (بستگان درجه یک)</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input"
                                   placeholder=" "
                                   name='admission_start_date'
                                   value={this.context.admission_start_date}
                                   onChange={(e) => {this.props.updateData(e, 'admission_start_date'); this.handleChange(e, 'admission_start_date')}}/>
                                    {/*this.props.updateData*/}
                            <label className="placeholder">تاریخ شروع پذیرش<span style={{color : 'red'}}>*</span></label>

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input"
                                   placeholder=" "
                                   name='admission_end_date'
                                   value={this.context.admission_end_date}
                                   onChange={(e) => {this.props.updateData(e, 'admission_end_date'); this.handleChange(e, 'admission_end_date')}}/>
                            <label className="placeholder">تاریخ اتمام پذیرش<span style={{color : 'red'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text"
                                   className="input"
                                   placeholder=" "
                                   name='payment_date'
                                   value={this.context.payment_date}
                                   onChange={(e) => {this.props.updateData(e, 'payment_date'); this.handleChange(e, 'payment_date')}}/>
                            <label className="placeholder">تاریخ پرداخت<span style={{color : 'red'}}>*</span></label>
                        </div>
                        <div>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">مبلغ پرداخت اجاره</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">مبلغ پرداخت ودیعه</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">مبلغ پرداخت تخفیف</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">نام و نام خانوادگی</label>   
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">کد ملی</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره شناسنامه</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">محل صدور</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">تاریخ تولد</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <select className='input'>
                                <option>پدر</option>
                                <option>مادر</option>
                                <option>خواهر</option>
                                <option>برادر</option>
                                <option>غیره</option>
                            </select>
                            <label className="placeholder">نسبت با اقامتگر</label>    
                        </div>
                        <div className="input-group-register col-8">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">آدرس محل سکونت</label>    
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" "/>
                            <label className="placeholder">شماره تماس</label>    
                        </div>
                    </div>
                </form>
            </>
        );
    }
}
 
export default FamilyGuest;