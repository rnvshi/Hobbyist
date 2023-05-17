import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Navigation from '../components/navBar';
import hobbylogo from '../images/hobbylogo.png';
import Footer from '../components/footer';
import PlaceholderImg from '../images/placeholderimg.png';
import { QUERY_ME } from '../utils/queries';
import { CREATE_POST } from '../utils/mutations';

const CreatePost = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const myAlbums = data?.me.myAlbums;

  const [formState, setFormState] = useState({
    postImg: '',
    caption: '',
    albumName: '',
  });

  const [createPost] = useMutation(CREATE_POST,
    {
      onCompleted: (data) => {
        alert('Post created !');
      }
    });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    if (!formState.postImg || !formState.albumName) {
      alert('Image URL or album name cannot be empty. Please try again');
    } else {
      try {
        const { data } = await createPost({
          variables: { ...formState },
        });

      } catch (e) {
        console.error(e);
      }
    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleSelect = (e) => {

    e.preventDefault();
    setOpen(false);

    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value
    });

    document.getElementById('selAlb').innerHTML = e.target.value;
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  if (loading) {

    return (
      <>
        <div>Loading...</div>
      </>
    )
  }

  if (myAlbums.length === 0) {

    return (<>
      <div>You have no albums ! Create one before uploading a post. </div>
    </>
    )

  } else if (myAlbums.length !== 0) {

    return (
      <>
        <form id="postform">

          <div id="form-placement">

            <label className="posttext">Provide a photo link:
              <input
                className="postinput"
                type="text"
                name="postImg"
                onChange={handleChange} /></label>
            <br />

            <label className="posttext">Select an album:</label>

            <div>
              <button onClick={handleOpen}>Dropdown</button>

              {open ? (
                <ul className="menu">

                  {myAlbums.map((album, index) =>
                    <li key={index} className="menu-item">
                      <button
                        onClick={handleSelect}
                        value={album.albumName}
                        name="albumName">
                        {album.albumName}
                      </button>
                    </li>)}

                </ul>
              ) : null}

              <p id="selAlb"></p>

            </div>

            <label className="posttext">Add a caption:
              <input
                className="postinput"
                type="text"
                name="caption"
                onChange={handleChange} /></label>

            <br />
            <input id="uploadimg" className="postinput" type="submit" value="Upload Image" onClick={handleFormSubmit} />
            <br />

          </div>

        </form>

      </>
    )
  }
}

export default CreatePost;