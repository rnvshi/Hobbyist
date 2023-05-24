import React, { useContext } from 'react'
import { useMutation } from '@apollo/client';
import {
    ADD_FRIEND,
    ACCEPT_FRIEND,
    DECLINE_FRIEND,
    DELETE_FRIEND
  } from '../utils/mutations.js'

import { UserContext } from '../utils/userContext';

const ProfileFriends = ({friend, userId}) => {


    const [userState,setUserState] = useContext(UserContext);


    const [addFriend] = useMutation(ADD_FRIEND);

    const handleAddFriend = async () => {
        try {
        await addFriend({
            variables: { friendId: userId },
        });

        } catch (e) {
        console.error(e);
        }
        window.location.reload()
        // setUserState({friends: [...userState.friends,]})
    };

    const [acceptFriend] = useMutation(ACCEPT_FRIEND);

    const handleAcceptFriend = async () => {
        try {
        await acceptFriend({
            variables: { friendId: userId },
        });

        } catch (e) {
        console.error(e);
        }
        window.location.reload()
    };

    const [declineFriend] = useMutation(DECLINE_FRIEND);

    const handleDeclineFriend = async () => {
        try {
        await declineFriend({
            variables: { friendId: userId },
        });

        } catch (e) {
        console.error(e);
        }
        window.location.reload()
    };

    const [deleteFriend] = useMutation(DELETE_FRIEND);

    const handleDeleteFriend = async () => {
        try {
        await deleteFriend({
            variables: { friendId: userId },
        });

        } catch (e) {
        console.error(e);
        }
        window.location.reload()
    };

    return (
        <>
            {!friend &&
                <button
                className='button'
                onClick={handleAddFriend}
                >
                Add Friend
                </button>
            }

            {friend && friend.sender === false &&
                <h3>
                Request pending!
                </h3>
            }

            {friend && friend.sender === null &&
                <>
                    <h3>
                        This is your friend
                    </h3>
                    <button
                        onClick={handleDeleteFriend}
                    >
                        un-friend
                    </button>
                </>
            }

            {friend && friend.sender === true &&
                <>
                    <h3>
                        Accept request?
                    </h3>
                    <button
                        onClick={handleAcceptFriend}
                    >
                        Accept
                    </button>

                    <button
                        onClick={handleDeclineFriend}
                    >
                        Decline
                    </button>
                </>
            }
        
        </>
    )
}

export default ProfileFriends