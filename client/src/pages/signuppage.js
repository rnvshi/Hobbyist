import Signup from "../components/signup";
import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import LoginPage from "./login";
import { Link } from "react-router-dom";
const SignupPage = () => {
    return (
        <div>

            <div id="logo-img-div">
                <img id="logo-img" src={hobbylogo}></img>
            </div>

            <Signup />

            <h3 id="login-here">If you already have an account please login <Link id="hereLink" to="/login">HERE</Link></h3>
        </div>

    )
}

export default SignupPage



