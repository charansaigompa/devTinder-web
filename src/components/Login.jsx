import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";





const Login = () => {
    const[emailId,setEmailId]=useState("charan@gmail.com")
    const[password,setPassword]=useState("Charan1234*")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [error,setError]=useState("")


    const handleLogin=async()=>{
          try{
           const res= await axios.post(BASE_URL+"/login",{
            emailId,
            password
           },{withCredentials:true})

           dispatch(addUser(res.data))
           return navigate("/")
          }
          catch(err){
            setError(err?.response?.data||"something went wrong")
            console.log(err)
          }
    }
  return (
    <div className="flex justify-center">
      <div className="card card-border bg-base-300 w-96 my-10">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input type="text" className="input" value={emailId} onChange={(e)=>{
                setEmailId(e.target.value)
              }} placeholder="Type here" />
              
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" value={password} onChange={(e)=>{
                setPassword(e.target.value)
              }} placeholder="Type here" />
              
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
