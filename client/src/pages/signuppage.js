import Signup from "../components/signup";
import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
const SignupPage = () => {
    return (
        <div>

            <div id="logo-img-div">
                <img id="logo-img" src={hobbylogo}></img>
            </div>

            <Signup />
        </div>

    )
}

export default SignupPage



