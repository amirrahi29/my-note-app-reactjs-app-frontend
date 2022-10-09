import React from "react";

const Profile = ()=>{


    const auth = localStorage.getItem('user');

    return(
        <div>
            <center>
                <h3>{JSON.parse(auth).name}</h3>
                <h3>{JSON.parse(auth).email}</h3>
                <h3>{JSON.parse(auth).date}</h3>
            </center>
        </div>
    )
}

export default Profile;