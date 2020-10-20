import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import './Registration.css';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter your Name!'),
  email: yup.string().email().required('email is a required field'),
  password: yup.string().required('Password is a required field'),
  
});

export default function Registration() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    
  });

  const [post, setPost] = useState('');
  const [serverError, setServerError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
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
      .post('https://reqres.in/api/users', formState)
      .then((response) => {
        console.log(response);
        setPost(response.data);
        console.log('Success', post);
        setFormState({
          name: '',
          email: '',
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
      <label htmlFor='name'>
        {' '}
        Name:
        <input
          id='name'
          type='text'
          name='name'
          data-cy='name'
          placeholder='Your Name'
          value={formState.name}
          onChange={handleChanges}
        />
        {errors.name.length > 2 ? <p className='error'>{errors.name}</p> : null}
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

      <button
        type='submit'
        name='submit'
        data-cy='submit'
        disabled={isButtonDisabled}
      >
        Submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}
