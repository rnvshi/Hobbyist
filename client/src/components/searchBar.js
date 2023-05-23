import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_USERNAME } from '../utils/queries';
import SearchRender from '../components/searchRender';

const SearchBar = () => {

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

        const searchData = await searchUsername({
            variables: { ...searchState },
        });

    };

    return (

        <>
            <div>

                <form className="search-container" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search Friend..."
                        className="search-input"
                        value={searchState.username}
                        onChange={handleChange} />
                    <button
                        type="submit"
                        className="search-button">
                        Search</button>
                </form>

            </div>

            <div>

                <SearchRender
                    data={data}
                />

            </div>
        </>

    );
};

export default SearchBar;