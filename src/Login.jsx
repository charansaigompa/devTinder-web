import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const[emailId,setEmailId]=useState("charan@gmail.com")
    const[password,setPassword]=useState("Charan1234*")
    const handleLogin=async()=>{
          try{
             axios.post("http://localhost:7777/login",{
            emailId,
            password
           },{withCredentials:true})
          }
          catch(err){
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
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
