import Login from "../components/login";
import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div>

            <div id="logo-img-div">
                <img id="logo-img" src={hobbylogo}></img>

            </div>

            <Login />

            <h3 id="login-here">If you don't have an account please signup <Link id="hereLink" to="/signup">HERE</Link></h3>
        </div>

    )
}

export default LoginPage