import React, { useState } from 'react';
import PlaceholderImg from '../images/placeholderimg.png';
import Navigation from '../components/navBar';
import hobbylogo from '../images/hobbylogo.png';
import Footer from '../components/footer';
import { useMutation } from '@apollo/client';
import { CREATE_ALBUM } from '../utils/mutations';

const AlbumCreate = () => {

    const [formState, setFormstate] = useState({
        albumName: '',
        description: '',
    });

    const [createAlbum] = useMutation(CREATE_ALBUM,
        {
            onCompleted: (data) => {
                alert('Album created !');
            }
        });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormstate({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await createAlbum({
                variables: { ...formState },
            });

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>

            <form id="postform" onSubmit={handleFormSubmit}>

                <div id="form-placement">

                    <label className="posttext">Album name:
                        <input
                            className="postinput"
                            type="text"
                            name="albumName"
                            onChange={handleChange}
                        /></label>
                    <br />
                    <label className="posttext">Album Description:
                        <input
                            className="postinput"
                            type="text"
                            name="description"
                            onChange={handleChange}
                        /></label>
                    <br />
                    <input id="uploadimg" className="postinput" type="submit" value="Create Album" />
                    <br />

                </div>

            </form>



        </>
    )
}

export default AlbumCreate;