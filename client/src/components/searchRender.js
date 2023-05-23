import React from 'react';
import { Link } from "react-router-dom";

const SearchRender = ({ data }) => {

    if (!data) {
        return (
            <>
                <br></br>
                Search for a friend
            </>
        )
    } else if (data?.singleUsername === null) {
        return (
            <>
                <br></br>
                There was an error in finding this user, please try again.
            </>
        )
    } else if (data?.singleUsername) {
        return (
            <>
                < Link to={`/profile/${data?.singleUsername._id}`
                }>
                    <div className="render-card">
                        <img id="avatar" src={data?.singleUsername.avatar}></img>
                        <p>{data?.singleUsername.userName}</p>
                        <p>{data?.singleUsername.bio}</p>
                    </div>
                </Link >
            </>
        )
    }

}

export default SearchRender;