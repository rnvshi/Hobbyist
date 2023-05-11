import Login from "../components/login";
import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
const LoginPage = () => {
    return (
        <div>

            <div id="logo-img-div">
                <img id="logo-img" src={hobbylogo}></img>

            </div>

            <Login />


        </div>

    )
}

export default LoginPage