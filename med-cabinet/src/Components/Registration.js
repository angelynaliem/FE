import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import './Registration.css';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter your Name!'),
  email: yup.string().email().required('email is a required field'),
  password: yup.string().required('Password is a required field'),
  type: yup
    .string()
    .required('Please select strain type')
    .oneOf(['indica', 'sativa', 'hybrid']),
  creative: yup.string().defined(),
  energetic: yup.string().defined(),
  euphoric: yup.string().defined(),
  focused: yup.string().defined(),
  happy: yup.string().defined(),
  hungry: yup.string().defined(),
  relaxed: yup.string().defined(),
  depression: yup.string().defined(),
  inflammation: yup.string().defined(),
  insomnia: yup.string().defined(),
  lackofappetite: yup.string().defined(),
  pain: yup.string().defined(),
  nausea: yup.string().defined(),
});

export default function Registration() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    type: '',
    depression: '',
    inflammation: '',
    insomnia: '',
    lackofappetite: '',
    pain: '',
    nausea: '',
    creative: '',
    energetic: '',
    euphoric: '',
    focused: '',
    happy: '',
    hungry: '',
    relaxed: '',
  });

  const [post, setPost] = useState('');
  const [serverError, setServerError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    type: '',
    depression: '',
    inflammation: '',
    insomnia: '',
    lackofappetite: '',
    pain: '',
    nausea: '',
    creative: '',
    energetic: '',
    euphoric: '',
    focused: '',
    happy: '',
    hungry: '',
    relaxed: '',
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
          type: '',
          depression: '',
          inflammation: '',
          insomnia: '',
          lackofappetite: '',
          pain: '',
          nausea: '',
          creative: '',
          energetic: '',
          euphoric: '',
          focused: '',
          happy: '',
          hungry: '',
          relaxed: '',
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
      <br />

      <label htmlFor='type'>
        Choose Type:
        <select
          name='type'
          id='type'
          data-cy='type'
          value={formState.type}
          onChange={handleChanges}
        >
          {/* value not used just a place slection of strain */}
          <option disabled selected value=''>
            Choose strain type
          </option>
          <option name='indica' value='indica'>
            Indica
          </option>
          <option name='sativa' value='sativa'>
            Sativa
          </option>
          <option name='hybrid' value='hybrid'>
            Hybrid
          </option>
        </select>
      </label>

      <div className=''>
        <h2>Conditions to be treated</h2>

        <label htmlFor='depression' className='effectsChkBox'>
          <input
            type='checkbox'
            name='depression'
            data-cy='depression'
            id='depressionSelect'
            checked={formState.depression}
            onChange={handleChanges}
          />
          Depression
        </label>

        <label htmlFor='inflammation' className='effectsChkBox'>
          <input
            type='checkbox'
            name='inflammation'
            data-cy='inflammation'
            id='inflammationSelect'
            checked={formState.inflammation}
            onChange={handleChanges}
          />
          Inflammation
        </label>

        <label htmlFor='insomnia' className='effectsChkBox'>
          <input
            type='checkbox'
            name='insomnia'
            data-cy='insomnia'
            id='insomniaSelect'
            checked={formState.insomnia}
            onChange={handleChanges}
          />
          Insomnia
        </label>

        <label htmlFor='lackofappetite' className='effectsChkBox'>
          <input
            type='checkbox'
            name='lackofappetite'
            data-cy='lackofappetite'
            id='lackofappetiteSelect'
            checked={formState.lackofappetite}
            onChange={handleChanges}
          />
          Lack of appetite
        </label>

        <label htmlFor='pain' className='effectsChkBox'>
          <input
            type='checkbox'
            name='pain'
            data-cy='pain'
            id='painSelect'
            checked={formState.pain}
            onChange={handleChanges}
          />
          Pain
        </label>

        <label htmlFor='nausea' className='effectsChkBox'>
          <input
            type='checkbox'
            name='nausea'
            data-cy='nausea'
            id='nauseaSelect'
            checked={formState.nausea}
            onChange={handleChanges}
          />
          Nausea
        </label>
      </div>

      <div>
        {/* <div className='toppingChecklist'> */}
        <h2>Choose desired effect(s)</h2>
        <label htmlFor='creative' className='effectsChkBox'>
          <input
            type='checkbox'
            name='creative'
            data-cy='creative'
            id='creativeSelect'
            // using the checked property insted of value for check boxes so they return the expected bollean
            checked={formState.creative}
            onChange={handleChanges}
          />
          Creative
        </label>

        <label htmlFor='energetic' className='effectsChkBox'>
          <input
            type='checkbox'
            name='energetic'
            data-cy='energetic'
            id='energeticSelect'
            checked={formState.energetic}
            onChange={handleChanges}
          />
          Energetic
        </label>

        <label htmlFor='euphoric' className='effectsChkBox'>
          <input
            type='checkbox'
            name='euphoric'
            data-cy='euphoric'
            id='euphoricSelect'
            checked={formState.euphoric}
            onChange={handleChanges}
          />
          Euphoric
        </label>

        <label htmlFor='focused' className='effectsChkBox'>
          <input
            type='checkbox'
            name='focused'
            data-cy='focused'
            id='focusedSelect'
            checked={formState.focused}
            onChange={handleChanges}
          />
          Focused
        </label>

        <label htmlFor='happy' className='effectsChkBox'>
          <input
            type='checkbox'
            name='happy'
            data-cy='happy'
            id='happySelect'
            checked={formState.happy}
            onChange={handleChanges}
          />
          Happy
        </label>

        <label htmlFor='hungry' className='effectsChkBox'>
          <input
            type='checkbox'
            name='hungry'
            data-cy='hungry'
            id='hungrySelect'
            checked={formState.hungry}
            onChange={handleChanges}
          />
          Hungry
        </label>

        <label htmlFor='relaxed' className='effectsChkBox'>
          <input
            type='checkbox'
            name='relaxed'
            data-cy='relaxed'
            id='relaxedSelect'
            checked={formState.relaxed}
            onChange={handleChanges}
          />
          Relaxed
        </label>
      </div>

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
