import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

const [emailId, setEmailId] = useState("");
const [password, setPassword] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [error, setError] = useState("");
const [isLoginForm, setIsLoginForm] = useState(true);
const dispatch=useDispatch();
const navigate=useNavigate();

const handleLogin=async()=>{
  try{
    const res=await axios.post(BASE_URL + "/login", {
    emailId, password
  }, {withCredentials:true});
  dispatch(addUser(res.data));
  navigate("/");
  }catch(err){
    setError(err.response.data);
    console.error(err);
  }
};
const handleSignUp=async()=>{
  try{
    const res=await axios.post(BASE_URL + "/signup", {
    emailId, password, firstName, lastName
  }, {withCredentials:true});
  dispatch(addUser(res.data.data));
  navigate("/profile");
  }catch(err){
    setError(err.response.data);
    console.error(err);
  }
};

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm?"Login!":"Sign Up!"}</h2>
    <div className="flex flex-col gap-4">
            {!isLoginForm && <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">First Name</span>
        </div>
        <input
        type="text"
        value={firstName}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setFirstName(e.target.value)}
        />
      </label>}
            {!isLoginForm && <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">Last Name</span>
        </div>
        <input
        type="text"
        value={lastName}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setLastName(e.target.value)}
        />
      </label>}
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">Email ID</span>
        </div>
        <input
        type="text"
        value={emailId}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setEmailId(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
        type="password"
        value={password}
        className="input input-bordered w-full max-w-xs"
        onChange={(e)=>setPassword(e.target.value)}
        />
      </label>
    </div>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary p-4" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm?"Login!":"Sign Up!"}</button>
    </div>
      {isLoginForm && <p className='text-red-200'>New User? <button className='text-blue-300' onClick={()=>setIsLoginForm(false)}>Sign Up</button></p>}
      {!isLoginForm && <p className='text-red-200'>Already have an account? <button className='text-blue-300' onClick={()=>setIsLoginForm(true)}>Login</button></p>}
  </div>
</div>
    </div>
  )
}

export default Login