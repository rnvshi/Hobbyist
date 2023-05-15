
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

                    <input class="postinput" type="file" id="image-upload" name="image-upload" />
                    <br />

                    <label class="posttext">Album name:
                        <input class="postinput" type="text" name="text" /></label>

                    <br />
                    <input id="uploadimg" class="postinput" type="submit" value="Create Album" />
                    <br />

                </div>

            </form>



        </>
    )
}

export default AlbumCreate