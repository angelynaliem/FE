import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { editUser } from '../actions/userAction';

const EditUserForm = (user, editUser) => {
    const [profile, setProfile] = useState( user )
    const {push} = useHistory()

    const handleChange = (e) => {
        setProfile({...profile, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.editUser(profile)
        push('/UserProfile')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={profile.first_name}
                        onChange={handleChange}
                    />
                <label htmlFor='username'>Username</label>
                    <input 
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={profile.username}
                        onChange={handleChange}    
                    />
                <label htmlFor='email'>Email</label>
                    <input 
                        type='text'
                        name='email'
                        placeholder='Email'
                        value={profile.email}
                        onChange={handleChange}
                    />
                <button onClick={handleSubmit}>Save</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => (
    {
        user: state.userReducer.user,
        isEditing: state.userReducer.isEditing,
        error: state.userReducer.error
    }
)

export default connect(mapStateToProps, { editUser })(EditUserForm);