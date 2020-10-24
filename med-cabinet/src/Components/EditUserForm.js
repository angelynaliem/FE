import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { editUser } from '../actions/userAction';
import {connect} from 'react-redux';

const EditUserForm = (props) => {
    // const [profile, setProfile] = useState( user )
    const {push} = useHistory()

    const handleChange = (e) => {
        // setProfile({...profile, [e.target.name]: e.target.value})
        props.editUser(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       props.editUser({
        first_name: props.first_name,
        email: props.email,
        username: props.username,
        error: props.error
       })
        push('/UserProfile')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>First Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={props.first_name}
                        onChange={handleChange}
                    />
                <label htmlFor='username'>Username</label>
                    <input 
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={props.username}
                        onChange={handleChange}    
                    />
                <label htmlFor='email'>Email</label>
                    <input 
                        type='text'
                        name='email'
                        placeholder='Email'
                        value={props.email}
                        onChange={handleChange}
                    />
                <button onClick={handleSubmit}>Save</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => (
    {
        first_name: state.userReducer.first_name,
        email: state.userReducer.email,
        username: state.userReducer.username,
        error: state.userReducer.error
    }
)

export default connect(mapStateToProps, { editUser })(EditUserForm);