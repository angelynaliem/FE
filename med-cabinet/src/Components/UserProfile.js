import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser } from '../actions/userAction';
import EditUserForm from './EditUserForm';

const UserProfile = (props) => {
    //  const [profile, setProfile] = useState( user )

    return (
        <>
        <div>
            <h1>User Profile</h1>
        </div>
        <div>
            <p>Name: {props.first_name}</p>
            <p>Username: {props.username}</p>
            <p>Email: {props.email}</p>
        </div>
        <Link to='/EditUserForm' component={EditUserForm}>Edit</Link>
        </>
    );
}

const mapStateToProps = state => (
    {
        first_name: state.userReducer.first_name,
        email: state.userReducer.email,
        username: state.userReducer.username,
        error: state.userReducer.error
    }
)

export default connect(mapStateToProps, { editUser })(UserProfile);