import axios from "axios";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import NavHeader from './NavHeader'
import Strains from './Strains'



const Suggestions =({addToSavedList})=> {
  
  const [strainState, setNewStrain] = useState({
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

  const [data,setData] = useState([]);

  const [buttonOn, setButtonOn] = useState(true);
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

  const inputChange = (event) => {
    event.persist();

    // const newFormData = {
    //   ...formState,
    //   [event.target.name]: 
    //   event.target.type === "checkbox"
    //   ? event.target.name
    //   : event.target.value
    // };

    setNewStrain({
      ...strainState,
      [event.target.name]: event.target.type === "checkbox"
        ? event.target.name
        : event.target.value
    });
    console.log(strainState);
  };

  const [post, setPost] = useState();

  const stringData = {...strainState};
  // const history = useHistory();

  const onSubmitForm = (event) => {
    
    event.preventDefault();
    console.log('form submitted');
    axios.post('https://best-buds.herokuapp.com/predict', stringData)
      .then((response) => {
        
        console.log(response.data);
        
        setPost(response.data); 
        setData(response.data);
       
        setNewStrain({
          
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
        
      })
      .catch((error) => {
        setErrors(error.data);
        console.log("error", error)
      });
  };

    // validateChange(event);
    // setFormState(newFormData);


  const schema = (event) => {
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
    formSchema.isValid(strainState).then((succesful) => {
      console.log('valid?', succesful);
      setButtonOn(!succesful);
    });
  }, [strainState]);

  
  
  return (
    <div>
      <NavHeader/>
    <form onSubmit={onSubmitForm} style={{color:"white"}}>
      <h1>Fill out to get recommended strains</h1>
      <label htmlFor='type'>
        Choose Type:
        <select
          name='Type'
          id='Type'
          data-cy='type'
          value={strainState.Type}
          onChange={inputChange}
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
            value={strainState.Depression}
            onChange={inputChange}
            
          />
          Depression
        </label>

        <label htmlFor='Inflammation' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Inflammation'
            data-cy='Inflammation'
            id='inflammationSelect'
            checked={strainState.Inflammation}
            onChange={inputChange}
          />
          Inflammation
        </label>

        <label htmlFor='Insomnia' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Insomnia'
            data-cy='Insomnia'
            id='insomniaSelect'
            checked={strainState.Insomnia}
            onChange={inputChange}
          />
          Insomnia
        </label>

        <label htmlFor='Appetite' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Appetite'
            data-cy='Appetite'
            id='lackofappetiteSelect'
            checked={strainState.Appetite}
            onChange={inputChange}
          />
          Lack of appetite
        </label>

        <label htmlFor='Pain' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Pain'
            data-cy='Pain'
            id='painSelect'
            checked={strainState.Pain}
            onChange={inputChange}
          />
          Pain
        </label>

        <label htmlFor='Nausea' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Nausea'
            data-cy='Nausea'
            id='nauseaSelect'
            checked={strainState.Nausea}
            onChange={inputChange}
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
            checked={strainState.Creative}
            onChange={inputChange}
          />
          Creative
        </label>

        <label htmlFor='Energetic' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Energetic'
            data-cy='Energetic'
            id='energeticSelect'
            checked={strainState.Energetic}
            onChange={inputChange}
          />
          Energetic
        </label>

        <label htmlFor='Euphoric' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Euphoric'
            data-cy='Euphoric'
            id='euphoricSelect'
            checked={strainState.Euphoric}
            onChange={inputChange}
          />
          Euphoric
        </label>

        <label htmlFor='Focused' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Focused'
            data-cy='Focused'
            id='focusedSelect'
            checked={strainState.Focused}
            onChange={inputChange}
          />
          Focused
        </label>

        <label htmlFor='Happy' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Happy'
            data-cy='Happy'
            id='happySelect'
            checked={strainState.Happy}
            onChange={inputChange}
          />
          Happy
        </label>

        <label htmlFor='Hungry' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Hungry'
            data-cy='Hungry'
            id='hungrySelect'
            checked={strainState.Hungry}
            onChange={inputChange}
          />
          Hungry
        </label>

        <label htmlFor='Relaxed' className='effectsChkBox'>
          <input
            type='checkbox'
            name='Relaxed'
            data-cy='Relaxed'
            id='relaxedSelect'
            checked={strainState.Relaxed}
            onChange={inputChange}
          />
          Relaxed
        </label>
      </div>

      <button
        type='submit'
        name='submit'
        data-cy='submit'
        disabled={buttonOn}
        style={{color:"black"}}
      >
        Submit
      </button>
    </form>
    
    <Strains weed = {data} />
    </div>
  );
}

export default Suggestions
