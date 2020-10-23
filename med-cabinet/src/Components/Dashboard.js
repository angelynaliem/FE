import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import './Registration.css';
import { useHistory } from 'react-router-dom';



const Dashboard =()=> {
  
  const [formState, setFormState] = useState({
    Type:'',
    Depression: '',
    Inflammation: '',
    Insomnia: '',
    Appetite: '',
    Pain: '',
    Nausea: '',
    Creative: '',
    Energetic: '',
    Euphoric: '',
    Focused: '',
    Happy: '',
    Hungry: '',
    Relaxed: '',
  });


  const [serverError, setServerError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
   Type:'',
    Depression: '',
    Inflammation: '',
    Insomnia: '',
    Appetite: '',
    Pain: '',
    Nausea: '',
    Creative: '',
    Energetic: '',
    Euphoric: '',
    Focused: '',
    Happy: '',
    Hungry: '',
    Relaxed: '',
  });

  const handleChanges = (event) => {
    event.persist();

    const newFormData = {
      ...formState,
      [event.target.name]: 
      event.target.type === "checkbox"
      ? event.target.name
      : event.target.value
    };

    validateChange(event);
    setFormState(newFormData);
  };

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.type === 'checkbox'? event.target.name : event.target.value)
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

  const formSchema = yup.object().shape({
    Type: yup
      .string()
      
      .oneOf(['Indica', 'Sativa', 'Hybrid']),
    Creative: yup.string('Creative'),
    Energetic: yup.string('Energetic'),
    Euphoric: yup.string('Energetic'),
    Focused: yup.string('Focused'),
    Happy: yup.string('Happy'),
    Hungry: yup.string('Hungry'),
    Relaxed: yup.string('Relaxed'),
    Depression: yup.string('Depression'),
    Inflammation: yup.string('Inflammation'),
    Insomnia: yup.string('Insomnia'),
    Appetite: yup.string('Appetite'),
    Pain: yup.string('Pain'),
    Nausea: yup.string('Nausea'),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log('valid?', valid);
      setIsButtonDisabled(!valid);
    });
  }, [formState]);

  const stringData = {...formState};
  const history = useHistory();
  const formSubmit = (event) => {
    
    event.preventDefault();
    console.log('form submitted');
    axios.post('https://best-buds.herokuapp.com/predict', stringData)
      .then((response) => {
        history.push("/StrainsList");
        console.log(response.data);
        
       
        setFormState({
          
          Type:'',
          Depression: '',
          Inflammation: '',
          Insomnia: '',
          Appetite: '',
          Pain: '',
          Nausea: '',
          Creative: '',
          Energetic: '',
          Euphoric: '',
          Focused: '',
          Happy: '',
          Hungry: '',
          Relaxed: '',
        });
        setServerError(null);
        
      })
      .catch((error) => {
        setServerError('404 error');
        console.log(error.response.request_response)
      });
  };
  return (
    <form onSubmit={formSubmit}>
      <h1>Fill out to get recommended strains</h1>
      <label htmlFor='type'>
        Choose Type:
        <select
          name='Type'
          id='Type'
          data-cy='type'
          value={formState.Type}
          onChange={handleChanges}
        >
          {/* value not used just a place slection of strain */}
          <option value=''>
            Choose strain type
          </option>
          <option name='Indica' value='Indica'>
            Indica
          </option>
          <option name='Sativa' value='Sativa'>
            Sativa
          </option>
          <option name='Hybrid' value='Hybrid'>
            Hybrid
          </option>
        </select>
      </label>

      <div className=''>
        <h2>Conditions to be treated</h2>

        <label htmlFor='Depression' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Depression'
            data-cy='Depression'
            id='depressionSelect'
            value={formState.Depression}
            onChange={handleChanges}
            
          />
          Depression
        </label>

        <label htmlFor='Inflammation' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Inflammation'
            data-cy='Inflammation'
            id='inflammationSelect'
            checked={formState.Inflammation}
            onChange={handleChanges}
          />
          Inflammation
        </label>

        <label htmlFor='Insomnia' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Insomnia'
            data-cy='Insomnia'
            id='insomniaSelect'
            checked={formState.Insomnia}
            onChange={handleChanges}
          />
          Insomnia
        </label>

        <label htmlFor='Appetite' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Appetite'
            data-cy='Appetite'
            id='lackofappetiteSelect'
            checked={formState.Appetite}
            onChange={handleChanges}
          />
          Lack of appetite
        </label>

        <label htmlFor='Pain' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Pain'
            data-cy='Pain'
            id='painSelect'
            checked={formState.Pain}
            onChange={handleChanges}
          />
          Pain
        </label>

        <label htmlFor='Nausea' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Nausea'
            data-cy='Nausea'
            id='nauseaSelect'
            checked={formState.Nausea}
            onChange={handleChanges}
          />
          Nausea
        </label>
      </div>

      <div>
        {/* <div className='toppingChecklist'> */}
        <h2>Choose desired effect(s)</h2>
        <label htmlFor='Creative' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Creative'
            data-cy='Creative'
            id='creativeSelect'
            // using the checked property insted of value for check boxes so they return the expected bollean
            checked={formState.Creative}
            onChange={handleChanges}
          />
          Creative
        </label>

        <label htmlFor='Energetic' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Energetic'
            data-cy='Energetic'
            id='energeticSelect'
            checked={formState.Energetic}
            onChange={handleChanges}
          />
          Energetic
        </label>

        <label htmlFor='Euphoric' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Euphoric'
            data-cy='Euphoric'
            id='euphoricSelect'
            checked={formState.Euphoric}
            onChange={handleChanges}
          />
          Euphoric
        </label>

        <label htmlFor='Focused' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Focused'
            data-cy='Focused'
            id='focusedSelect'
            checked={formState.Focused}
            onChange={handleChanges}
          />
          Focused
        </label>

        <label htmlFor='Happy' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Happy'
            data-cy='Happy'
            id='happySelect'
            checked={formState.Happy}
            onChange={handleChanges}
          />
          Happy
        </label>

        <label htmlFor='Hungry' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Hungry'
            data-cy='Hungry'
            id='hungrySelect'
            checked={formState.Hungry}
            onChange={handleChanges}
          />
          Hungry
        </label>

        <label htmlFor='Relaxed' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Relaxed'
            data-cy='Relaxed'
            id='relaxedSelect'
            checked={formState.Relaxed}
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
  <pre style={{color:"white"}}>{JSON.stringify(stringData, null, 2)}</pre>
    </form>
  );
}

export default Dashboard
