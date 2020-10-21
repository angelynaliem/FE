import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import './Registration.css';
import { Link, useHistory } from 'react-router-dom';

const formSchema = yup.object().shape({
  first_name: yup.string().required('Please enter your Name!'),
  email: yup.string().email().required('Email is a required field'),
  username: yup.string().required('Create a Username!'),
  password: yup.string().required('Password is a required field'),
  
});

export default function Registration() {

  const history = useHistory();
  
  const [formState, setFormState] = useState({
    first_name: '',
    email: '',
    username:"",
    password: '',
    
  });

  const [serverError, setServerError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    first_name: '',
    email: '',
    username:"",
    password: '',
   
  });

  const handleChanges = (event) => {
    event.persist();

    const newFormData = {
      ...formState,
      [event.target.name]: event.target.value,
    };

    validateChange(event);
    setFormState(newFormData);
  };

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
      .then((valid) => {
        //  the input is passing
        // the reset of that input's error
        setErrors({ ...errors, [event.target.name]: '' });
      })
      .catch((err) => {
        //  the input is breaking formSchema
        console.log('err', err);
        setErrors({ ...errors, [event.target.name]: err.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log('valid?', valid);
      setIsButtonDisabled(!valid);
    });
  }, [formState]);

  

  const formSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted');
    axios
      .post('https://med-cabinet-api-2020.herokuapp.com/api/auth/register', formState)
      .then((response) => {
        console.log(response);
        history.push("/protected")
        
        setFormState({
          first_name: '',
          email: '',
          username: '',
          password: '',
         
        });
        serverError(null);
      })
      .catch((error) => {
        setServerError('404 error');
      });
  };
  return (
    <form onSubmit={formSubmit}>
      <h1>Registration</h1>
      <label htmlFor='first_name'>
        {' '}
        First Name:
        <input
          id='first_name'
          type='text'
          name='first_name'
          data-cy='name'
          placeholder='First Name'
          value={formState.first_name}
          onChange={handleChanges}
        />
        {errors.first_name.length > 2 ? <p className='error'>{errors.first_name}</p> : null}
      </label>
      <br />
      <label htmlFor='email'>
        E-mail:
        <input
          id='email'
          type='text'
          name='email'
          data-cy='email'
          placeholder='e-mail'
          value={formState.email}
          onChange={handleChanges}
        />
        {errors.email.length > 2 ? (
          <p className='error'>{errors.email}</p>
        ) : null}
      </label>
      <br />
      <label htmlFor='password'>
        Password:
        <input
          id='passwordinput'
          type='password'
          name='password'
          data-cy='password'
          placeholder='Password'
          value={formState.password}
          onChange={handleChanges}
        />
        {errors.password.length > 2 ? (
          <p className='error'>{errors.password}</p>
        ) : null}
      </label>
      <br />
      <label htmlFor='username'>
        Create Username:
        <input
          id='username'
          type='username'
          name='username'
          data-cy='username'
          placeholder='Username'
          value={formState.username}
          onChange={handleChanges}
        />
        {errors.password.length > 2 ? (
          <p className='error'>{errors.username}</p>
        ) : null}
      </label>

      <button
        type='submit'
        name='submit'
        data-cy='submit'
        disabled={isButtonDisabled}
      >
        Submit
      </button>
      <br />
      <div>
      <h2>Already Registered? </h2>
          <Link style={{color: "white", fontSize:"2rem", textDecoration:"none"}}to="/Login" >
           <button>Login Here</button> 
          </Link>
        </div>
    </form>
  );
}
