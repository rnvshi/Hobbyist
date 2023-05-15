import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import Navigation from '../components/navBar'

const albumView = () => {
    return (
        <div>

            <h3 id="albumtext">Album:</h3>

            <div id="albumbuttons">
                <button class="albumbutton">Follow Album</button>
                <button class="albumbutton">Unfollow Album</button>
            </div>

            <div id="flexalbumview">

                <div class="albumviewposts">
                    <div >
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>

                    <div >
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>

                    <div >
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>

                </div>

                <div class="albumviewposts">

                    <div >
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>

                    <div >
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>

                    <div >
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>
                </div>


                <div class="albumviewposts">
                    <div>
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>

                    <div >
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>

                    <div >
                        <img class="albumviewimg" src={PlaceholderImg}></img>
                    </div>
                </div>


            </div>
        </div>


    )
}

export default albumView