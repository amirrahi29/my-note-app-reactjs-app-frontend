import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';

const Login_Register = () => {

    //navigate
    const navigate = useNavigate();

    const auth = localStorage.getItem('user');

    useEffect(()=>{
        if(auth){
            navigate('/');
        }
    })

    //register parameters
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isRegisterLoading, setRegisterLoading] = useState(false);

    //login parameters
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isLoginLoading, setLoginLoading] = useState(false);

    const loginSubmit = async()=>{
        setLoginLoading(true);
        let result = await fetch("http://localhost:9000/api/login",{
            method:'post',
            body:JSON.stringify({"email":loginEmail,"password":loginPassword}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        if(result.success === true){
            localStorage.setItem('user',JSON.stringify(result.data));
            setLoginLoading(false);
            navigate('/');
        }
        else if(result.success === false){
            setLoginLoading(false);
            console.log(result.msg);
        }
        else{
            console.log("no response");
        }
    }


    const registerSubmit = async()=>{

        setRegisterLoading(true);

        const name = fname+" "+lname;

        let result = await fetch("http://localhost:9000/api/register",{
            method:'post',
            body:JSON.stringify({"name":name,"email":email,"password":password}),
            headers:{
                'Content-Type':'application/json'
            }
        });

        result = await result.json();
        if(result.success === true){
            localStorage.setItem('user',JSON.stringify(result.data));
            console.log(result);
            setRegisterLoading(false);
            navigate('/');
        }else if(result.success === false){
            console.log(result.msg);
            setRegisterLoading(false);
        }else{
            console.log("no response");
            setRegisterLoading(false);
        }

    }


    return (
        <div>
            <div className="row">
                
                <div className="col-md-6">
                    <div className="registerForm">
                        <h5>Create New Account</h5>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input value={fname} onChange={(e)=>setFname(e.target.value)} type="text" placeholder="Enter first name" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text"  value={lname} onChange={(e)=>setLname(e.target.value)} placeholder="Enter last name" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <br />

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>E-mail</label>
                                    <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <br />

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <br />

                        {isRegisterLoading?<div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>:<div className="row">
                            <div className="col-md-12">
                                <button className="form-control" onClick={registerSubmit}>Submit</button>
                            </div>
                        </div>}

                    </div>
                </div>



                <div className="col-md-6">
                    <div className="loginForm">
                        <h5>Login</h5>
                        <hr />

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>E-mail</label>
                                    <input value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} type="email" placeholder="Enter email" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <br />

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} placeholder="Enter password" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <br />

                        {isLoginLoading?<div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>:<div className="row">
                            <div className="col-md-12">
                                <button className="form-control" onClick={loginSubmit}>Submit</button>
                            </div>
                        </div>}


                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login_Register;