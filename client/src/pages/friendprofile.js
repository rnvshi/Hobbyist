import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import Navigation from '../components/navBar'

const FriendProfile = () => {
    return (
        <div id="friend-container">

            <div id="flexprofilebio">
                <div >

                    <img id="profileimg" src={PlaceholderImg}></img>
                </div>

                <div id="profiletext">
                    <h3>Username:</h3>
                    <h3 id="biotext">Bio:</h3>
                    <button id="unfriendbutton">UnFriend</button>
                </div>
            </div>
            <div id="friendbuttonsflex">

                <h3 id="requestpendingtext">Request pending...</h3>
                <button className="friendbuttons">Accept Request</button>
                <button className="friendbuttons">Decline Request</button>
            </div>

        </div>

    )
}

export default FriendProfile