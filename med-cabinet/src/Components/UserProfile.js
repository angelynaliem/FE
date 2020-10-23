import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../actions/userAction';

const UserProfile = ({ editUser, user, isEditing, error }) => {
     const [editing, setEditing] = useState(false);

     const editProfile = profile => {
         
     }


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
        <button>Edit</button>
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