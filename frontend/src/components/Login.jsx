import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from './sass/components/logo2.png';
import {userLogin} from './store/actions/authActions';
import {useDispatch,useSelector} from "react-redux";
import { useAlert } from 'react-alert';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from './store/types/authType';

const Login = () => {

  const navigate = useNavigate();

     const alert = useAlert();

     const {loading,authenticate,error,successMessage,myInfo} = useSelector(state=>state.auth);


     const dispatch = useDispatch();
  
  const [state, setState] = useState({
    email: '',
    password : ''
});

const inputHandle = e => {
    setState({
         ...state,
         [e.target.name] : e.target.value 
    })
}

const login = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
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
    <div className='main-heading'><h1>This is login Page </h1></div>
    <div className='register'>
         <div className='card-login'>
              <div className='card-header'>
              Login
                <img className='logo' src={logo} alt="" />
                
              </div>

           <div className='card-body'>
                 <form onSubmit={login}>
                     


                     <div className='form-group'>
                           <label htmlFor='email'>Email</label>
                           <input type="email" onChange={inputHandle} name="email" value={state.email} className='form-control' placeholder='Email' id='email' /> 
                     </div>


                     <div className='form-group'>
                           <label htmlFor='password'>Password</label>
                           <input type="password" onChange={inputHandle} name="password" value={state.password} className='form-control' placeholder='Password' id='password' /> 
                     </div>


                     
                   
                     <div className='form-group'>
                     <input type="submit" value="Login" className='btn' />
                     </div>


                     <div className='form-group'>
                             <span><Link style={{textDecoration:'none', color:'black'}} to="/messenger/register"> Don't have any account </Link></span>
                     </div>  
                       
                 </form> 
           </div>
      
           
             

         </div> 
     </div>
     </>
  )
}

export default Login;