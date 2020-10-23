import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser } from '../actions/userAction';
import EditUserForm from './EditUserForm';

const UserProfile = ({ editUser, user, isEditing, error }) => {
     const [profile, setProfile] = useState( user )

    return (
        <>
        <div>
            <h1>User Profile</h1>
        </div>
        <div>
            <p>Name: {user.first_name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
        <Link to='/EditUserForm' component={EditUserForm}>Edit</Link>
        </>
    );
}

const mapStateToProps = state => (
    {
        user: state.userReducer.user,
        isEditing: state.userReducer.isEditing,
        error: state.userReducer.error
    }
)

export default connect(mapStateToProps, { editUser })(UserProfile);