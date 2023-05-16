import React, { useState } from 'react';
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import { Link } from "react-router-dom";
import { useLazyQuery } from '@apollo/client';
import { QUERY_USERNAME } from '../utils/queries';

const Search = () => {

  const [searchState, setSearchState] = useState({
    username: ''
  });

  const [searchUsername, { loading, data, error }] = useLazyQuery(QUERY_USERNAME);

  const handleChange = (event) => {

    const { value } = event.target;

    setSearchState({
      username: value
    });

  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const { data } = await searchUsername({
      variables: { ...searchState },
    });

    console.log(data.singleUsername);
  };

  return (

    <>
      <div>

        <form class="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Friend..."
            class="search-input"
            value={searchState.username}
            onChange={handleChange} />
          <button
            type="submit"
            class="search-button">
            Search</button>
        </form>

        {data &&

          <Link to={`/profile/${data.singleUsername._id}`}>
            <div className="render-card">
              <img id="avatar" src={data.singleUsername.avatar}></img>
              <p>{data.singleUsername.userName}</p>
              <p>{data.singleUsername.bio}</p>
            </div>
          </Link>
        }

      </div>
    </>
  );
};

export default Search;