import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from './sass/components/logo2.png';
import {useDispatch,useSelector} from "react-redux"
import { userRegister } from './store/actions/authActions';
import { useAlert } from 'react-alert';

import { ERROR_CLEAR,SUCCESS_MESSAGE_CLEAR } from './store/types/authType';



const Register = () => {

      const navigate = useNavigate();
      const alert = useAlert();

     const {loading,authenticate,error,successMessage,myInfo} = useSelector(state=>state.auth);
     console.log(myInfo);

      const dispatch = useDispatch();

      const [state,setstate] = useState({
            userName : '',
            email:'',
            password:'',
            confirmPassword : '',
            image : ''
       })

       const [loadImage, setLoadImage] = useState('');
  
       const inputHandle = (e) => {
            setstate({
                 ...state,
                 [e.target.name] : e.target.value 
            })
       }

       const fileHandle = (e) =>{
            if(e.target.files.length !==0){
                 setstate({
                      ...state,
                      [e.target.name] : e.target.files[0]
                 })
            }
            
            const reader = new FileReader();
                  reader.onload = () => {
                        setLoadImage(reader.result);
                  }
                  reader.readAsDataURL(e.target.files[0]);
       

           
      }



       const register=(e)=>{

            const {userName,email,password,confirmPassword, image} = state;
            e.preventDefault();
            console.log(state);

            const formData = new FormData();

            formData.append('userName',userName);
            formData.append('email',email);
            formData.append('password',password);
            formData.append('confirmPassword',confirmPassword);
            formData.append('image',image);

            dispatch(userRegister(formData));
       }
       
       useEffect(()=>{
            if(authenticate){
                 navigate('/');
            }
            if(successMessage){
                 alert.success(successMessage);
                 dispatch({type : SUCCESS_MESSAGE_CLEAR })
            }
            if(error){
                 error.map(err=>alert.error(err));
                 dispatch({type : ERROR_CLEAR })
            }
  
       },[successMessage,error])



  return (
    <>
    <div className='main-heading'><h1>This is Regiser Page </h1></div>
     <div className='register'>
          <div className='card'>
               <div className='card-header'>
               REGISTER
                 <img className='logo' src={logo} alt="" />
                 
               </div>

            <div className='card-body'>
                  <form onSubmit={register}>
                      <div className='form-group'>
                            <label htmlFor='username'>User Name</label>
                            <input type="text" className='form-control' onChange={inputHandle} name="userName" value={state.userName}  placeholder='User Name' id='username' /> 
                      </div>


                      <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type="email" className='form-control'  onChange={inputHandle} name="email" value={state.email} placeholder='Email' id='email' /> 
                      </div>


                      <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type="password" className='form-control'onChange={inputHandle} name="password" value={state.password} placeholder='Password' id='password' /> 
                      </div>



                      <div className='form-group'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input type="password" className='form-control' onChange={inputHandle} name="confirmPassword" value={state.confirmPassword} placeholder='Confirm Password' id='confirmPassword' /> 
                      </div>


                      <div className='form-group'>
                          <div className='file-image'>
                                <div className='image'>
                                    {loadImage ? <img src={loadImage} alt=" " /> : 'no image'  } 
                                </div>

                          </div>
                      </div>

                      <div className='file'>
                        <label htmlFor='image'>Select Image</label>
                          <input type="file" className='form-control' onChange={fileHandle}  name='image' id='image' />
                      </div>

                    
                      <div className='form-group'>
                      <input type="submit" value="register" className='btn' name='image' id='image' />
                      </div>


                      <div className='form-group'>
                              <span><Link style={{textDecoration:'none', color:'black'}} to="/messenger/login"> Login Your Account </Link></span>
                      </div>  
                        
                  </form> 
            </div>
            
              

          </div> 
      </div>
    </>
    
    
  )
}

export default Register;