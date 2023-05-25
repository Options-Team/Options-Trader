import React, { useState, useEffect } from 'react';

const AssessmentPrompt = ({ question, prompt, option1, option2, option3, option4, option5, callback }) => {

  const [option1Checked, setOption1Checked] = useState(false);
  const [option2Checked, setOption2Checked] = useState(false);
  const [option3Checked, setOption3Checked] = useState(false);
  const [option4Checked, setOption4Checked] = useState(false);
  const [option5Checked, setOption5Checked] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const updateValue = (value) => {
    if(inputValue === ''){
      setInputValue(value);
      callback(question, value);
    }
    else {
      setInputValue('');
    }
  };

  return (
    <div>
      <p>{ question }. { prompt }</p>
      <div>
        <div>
          <input 
            type='checkbox'
            value={ 1 }
            checked={ option1Checked }
            onChange={ (ev) => { updateValue(ev.target.value); setOption1Checked(!option1Checked); } }
            disabled={ (option1Checked || option2Checked || option3Checked || option4Checked || option5Checked) && !option1Checked }></input>
          <label>{ option1 }</label>
        </div>
        <div>
          <input 
            type='checkbox'
            value={ 2 }
            checked={ option2Checked }
            onChange={ (ev) => { updateValue(ev.target.value); setOption2Checked(!option2Checked); } }
            disabled={ (option1Checked || option2Checked || option3Checked || option4Checked || option5Checked) && !option2Checked }></input>
          <label>{ option2 }</label>
        </div>
        <div>
          <input 
            type='checkbox'
            value={ 3 }
            checked={ option3Checked }
            onChange={ (ev) => { updateValue(ev.target.value); setOption3Checked(!option3Checked); } }
            disabled={ (option1Checked || option2Checked || option3Checked || option4Checked || option5Checked) && !option3Checked }></input>
          <label>{ option3 }</label>
        </div>
        <div>
          <input 
            type='checkbox'
            value={ 4 }
            checked={ option4Checked }
            onChange={ (ev) => { updateValue(ev.target.value); setOption4Checked(!option4Checked); } }
            disabled={ (option1Checked || option2Checked || option3Checked || option4Checked || option5Checked) && !option4Checked }></input>
          <label>{ option4 }</label>
        </div>
        <div>
          <input 
            type='checkbox'
            value={ 5 }
            checked={ option5Checked }
            onChange={ (ev) => { updateValue(ev.target.value); setOption5Checked(!option5Checked); } }
            disabled={ (option1Checked || option2Checked || option3Checked || option4Checked || option5Checked) && !option5Checked }></input>
          <label>{ option5 }</label>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPrompt;