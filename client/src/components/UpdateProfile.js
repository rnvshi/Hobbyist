import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client';

import { UPDATE_USER } from '../utils/mutations';
import { UserContext } from '../utils/userContext';

const UpdateProfile = () => {

    const [userState,setUserState] = useContext(UserContext);

    const [State, setState] = useState({ bio: '' });
    const [updateUser] = useMutation(UPDATE_USER);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
        [name]: value,
        });
    };

    const handleSubmit = async () => {
        console.log(State.bio)
        try {
        const { data } = await updateUser({
            variables: { ...State },
        });
        setUserState({...userState, bio: data?.updateUser.bio})
        } catch (e) {
        console.error(e);
        }
        handleClose();

        // clear values
        setState({
        bio: '',
        });
    };


    return (
        <>
            
                {!show &&
                    <button
                    className='button'
                    onClick={handleShow}
                    >
                    Update Profile
                    </button>
                }

                {show &&
                    <div>
                    <button
                        onClick={handleClose}
                    >
                        Exit
                    </button>
                    <label>Enter new Bio: </label>
                    <input
                        id='Bio'
                        name='bio'
                        value={State.bio}
                        onChange={handleChange}
                    />
                    <button
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    </div>
                }
        
        </>
    )
}

export default UpdateProfile