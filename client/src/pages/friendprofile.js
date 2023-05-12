import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import Navigation from '../components/navBar'

const FriendProfile = () => {
    return (
        <div>

            <div id="logo-img-div">
                <img id="logo-img-profile" src={hobbylogo}></img>
            </div>

            <div>
                <Navigation />
            </div>

            <div id="flexprofilebio">
                <div >
                    <img id="profileimg" src={PlaceholderImg}></img>
                </div>

                <div id="profiletext">
                    <h3>Username:</h3>
                    <h3 id="biotext">Bio:</h3>
                </div>
            </div>
            <div id="friendbuttonsflex">
                <button>UnFriend</button>
                <h3>Request Pending</h3>
                <button>Accept</button>
                <button>Decline</button>
            </div>

            <Footer />
        </div>
    )
}

export default FriendProfile