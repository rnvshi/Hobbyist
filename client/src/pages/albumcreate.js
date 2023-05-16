
import React from 'react'
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'

const AlbumCreate = () => {
    return (
        <>




            <form id="postform" action="#" method="POST" enctype="multipart/form-data">

                <div id="form-placement">



                    <label className="posttext">Album name:
                        <input className="postinput" type="text" name="text" /></label>
                    <label className="posttext">Album Description:
                        <input className="postinput" type="text" name="text" /></label>

                    <br />
                    <input id="uploadimg" className="postinput" type="submit" value="Create Album" />
                    <br />

                </div>

            </form>



        </>
    )
}

export default AlbumCreate