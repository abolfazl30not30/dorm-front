import React, { Component } from 'react';
import * as yup from 'yup';

class FamilyGuest extends Component {
    state = {
        fields : {
            admission_start_date : '',
            admission_end_date : '',
            payment_date : '',
        },
        errors : []
    }

    schema = yup.object().shape({
        admission_start_date: yup.string().required('فیلد "تاریخ شروع پذیرش" نمیتواند خالی باشد'),
        admission_end_date: yup.string().required('فیلد "تاریخ اتمام پذیرش" نمیتواند خالی باشد'),
        payment_date: yup.string().required('فیلد "تاریخ پرداخت" نمیتواند خالی باشد')
    })

    handleSubmit = async (e) => {
        e.preventDefault();
        const result = await this.validate();
        console.log(result);
    }

    validate = async () => {
        try {
            const result = await this.schema.validate(this.state.fields, {abortEarly : false});
            return result;
        } catch (error){
            console.log(error.errors);
            this.setState({error: error.errors});
        }
    }

    handleChange = async ({currentTarget : input}) => {
        const fields = {...this.state.fields};
        fields[input.name] = input.value;
        this.setState({fields});
    }

    render() {
        const {admission_start_date, admission_end_date, payment_date} = this.state.fields;
        return (
            <>
                <form className="register-step-box" onSubmit={this.handleSubmit}>
                    <h2>مهمان (بستگان درجه یک)</h2>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" " name='admission_start_date'
                                   value={admission_start_date} onChange={this.handleChange}/>
                            <label className="placeholder">تاریخ شروع پذیرش<span style={{color : 'red'}}>*</span></label>

                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" " name='admission_end_date'
                                   value={admission_end_date} onChange={this.handleChange}/>
                            <label className="placeholder">تاریخ اتمام پذیرش<span style={{color : 'red'}}>*</span></label>
                        </div>
                        <div className="input-group-register col-4">
                            <input type="text" className="input" placeholder=" " name='payment_date'
                                   value={payment_date} onChange={this.handleChange}/>
                            <label className="placeholder">تاریخ پرداخت<span style={{color : 'red'}}>*</span></label>
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