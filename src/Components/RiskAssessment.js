import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AssessmentPrompt from './AssessmentPrompt'

const RiskAssessment = () => {
  const { auth } = useSelector(state => state);
  const [prompt1Value, setPrompt1Value] = useState('');
  const [prompt2Value, setPrompt2Value] = useState('');
  const [prompt3Value, setPrompt3Value] = useState('');
  const [prompt4Value, setPrompt4Value] = useState('');
  // const [prompt5Value, setPrompt5Value] = useState('');

  const submit = (ev) => {
    ev.preventDefault();
    const sum = prompt1Value + prompt2Value + prompt3Value + prompt4Value;
    // const sum = prompt1Value + prompt2Value + prompt3Value + prompt4Value + prompt5Value;
    console.log(sum, auth.id);
    // console.log(prompt5Value);
  };

  const promptResponse = (question, promptValue) => {
    if(promptValue){
      if(question === '1'){
        setPrompt1Value(promptValue * 1);
      }
      if(question === '2'){
        setPrompt2Value(promptValue * 1);
      }
      if(question === '3'){
        setPrompt3Value(promptValue * 1);
      }
      if(question === '4'){
        setPrompt4Value(promptValue * 1);
      }
      // if(question === '5'){
      //   setPrompt5Value(promptValue * 1);
      // }
    }
  };

  return (
    <div>
      <h2>RISK ASSESSMENT</h2>
      <form onSubmit={ submit }>
        <AssessmentPrompt
          question='1'
          prompt='How comfortable are you with the potential for losing a significant portion of your investment in exchange for the possibility of higher returns?'
          option1='Not comfortable at all'
          option2='Slightly comfortable'
          option3='Moderately comfortable'
          option4='Quite comfortable'
          option5='Extremely comfortable'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='2'
          prompt='How familiar are you with options trading strategies and their associated risks?'
          option1='Not comfortable at all'
          option2='Slightly comfortable'
          option3='Moderately comfortable'
          option4='Quite comfortable'
          option5='Extremely comfortable'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='3'
          prompt='How would you react if the value of your options investment declined by 20% within a short period?'
          option1='Panic and immediately sell the position'
          option2='Feel uncomfortable but hold onto the position'
          option3='Monitor the situation closely before deciding'
          option4='Remain calm and evaluate the options'
          option5='See it as an opportunity to buy more options'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='4'
          prompt='How much time are you willing to dedicate to monitoring your options positions?'
          option1='Very little time'
          option2='A few minutes per week'
          option3='An hour per week'
          option4='A few hours per week'
          option5='Several hours per day'
          callback={ promptResponse }
        />
        {/* <AssessmentPrompt
          prompt=''
          option1=''
          option2=''
          option3=''
          option4=''
          option5=''
        /> */}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default RiskAssessment;