import React from "react";
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {

    const auth = localStorage.getItem('user');
    //navigate
    const navigate = useNavigate();

    const logout=async()=>{
        let result = await fetch("http://localhost:9000/api/logout",{
            method:'post',
            body:JSON.stringify({"user_id":JSON.parse(auth)._id}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        if(result.success === true){
            localStorage.clear();
            navigate('/login_register');
        }
        else if(result.success === false){
            console.log(result.msg);
        }
        else{
            console.log("no response");
        }

    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <Link to={'/'} class="navbar-brand">Welcome</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link to={'/'} class="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/add_note'} class="nav-link">Add Note</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/profile'} class="nav-link">Profile</Link>
                            </li>
                            <li class="nav-item">
                                {auth?<Link to={'login_register'} class="nav-link" onClick={logout}>SignOut</Link>:
                                <Link to={'login_register'} class="nav-link">SignIn/SignUp</Link>}
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;