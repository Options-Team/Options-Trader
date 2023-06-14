import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AssessmentPrompt from './AssessmentPrompt'
import { submitAssessment } from '../store';

const RiskAssessment = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = auth.id;

  const [prompt1Value, setPrompt1Value] = useState('');
  const [prompt2Value, setPrompt2Value] = useState('');
  const [prompt3Value, setPrompt3Value] = useState('');
  const [prompt4Value, setPrompt4Value] = useState('');
  const [prompt5Value, setPrompt5Value] = useState('');
  const [prompt6Value, setPrompt6Value] = useState('');
  const [prompt7Value, setPrompt7Value] = useState('');
  const [prompt8Value, setPrompt8Value] = useState('');
  const [prompt9Value, setPrompt9Value] = useState('');
  const [prompt10Value, setPrompt10Value] = useState('');

  const submit = (ev) => {
    ev.preventDefault();
    const sum = prompt1Value + prompt2Value + prompt3Value + prompt4Value + prompt5Value + prompt6Value + prompt7Value + prompt8Value + prompt9Value + prompt10Value;
    dispatch(submitAssessment(id, sum));
    navigate('/home');
  };

  const promptResponse = (question, promptValue) => {
    if(promptValue){
      if(question === '1') setPrompt1Value(promptValue * 1);
      if(question === '2') setPrompt2Value(promptValue * 1);
      if(question === '3') setPrompt3Value(promptValue * 1);
      if(question === '4') setPrompt4Value(promptValue * 1);
      if(question === '5') setPrompt5Value(promptValue * 1);
      if(question === '6') setPrompt6Value(promptValue * 1);
      if(question === '7') setPrompt7Value(promptValue * 1);
      if(question === '8') setPrompt8Value(promptValue * 1);
      if(question === '9') setPrompt9Value(promptValue * 1);
      if(question === '10') setPrompt10Value(promptValue * 1);
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
          prompt='How familiar are you with trading financial assets and their associated risks?'
          option1='Not comfortable at all'
          option2='Slightly comfortable'
          option3='Moderately comfortable'
          option4='Quite comfortable'
          option5='Extremely comfortable'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='3'
          prompt='How would you react if the value of your investment portfolio declined by 20% within a short period?'
          option1='Panic and immediately sell the position'
          option2='Feel uncomfortable but hold onto the position'
          option3='Monitor the situation closely before deciding'
          option4='Remain calm and evaluate the stocks'
          option5='See it as an opportunity to buy more equity'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='4'
          prompt='How much time are you willing to dedicate to monitoring your portfolio positions?'
          option1='Very little time'
          option2='A few minutes per week'
          option3='An hour per week'
          option4='A few hours per week'
          option5='Several hours per day'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='5'
          prompt='How experienced are you in trading stocks or other financial instruments?'
          option1='No experience'
          option2='Limited experience'
          option3='Some experience'
          option4='Experienced'
          option5='Highly experienced'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='6'
          prompt='Which of the below best defines your objectives in your investments?'
          option1='Low Risk'
          option2='Moderate Low Risk'
          option3='Moderate Risk'
          option4='Moderately High Risk'
          option5='High Risk'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='7'
          prompt='How confident are you in your ability to analyze market trends and make informed decisions?'
          option1='Not confident at all'
          option2='Slightly confident'
          option3='Moderately confident'
          option4='Quite confident'
          option5='Very confident'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='8'
          prompt='How often do you monitor your investments and stay updated on market news?'
          option1='Rarely'
          option2='Occasionally'
          option3='Regularly'
          option4='Frequently'
          option5='Continuously'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='9'
          prompt='How would you describe your financial goals for stock trading?'
          option1='Preserve capital with minimal risk'
          option2='Generate modest returns with limited risk'
          option3='Seek balanced returns with moderate risk'
          option4='Pursue higher returns with higher risk'
          option5='Maximize returns, accepting significant risk'
          callback={ promptResponse }
        />
        <AssessmentPrompt
          question='10'
          prompt='How important is it for you to receive guidance or advice from professionals when making trading decisions?'
          option1='Very important'
          option2='Quite important'
          option3='Moderately important'
          option4='Slightly important'
          option5='Not important at all'
          callback={ promptResponse }
        />
        <button
          disabled={
            (
              !prompt1Value ||
              !prompt2Value ||
              !prompt3Value ||
              !prompt4Value ||
              !prompt5Value ||
              !prompt6Value ||
              !prompt7Value ||
              !prompt8Value ||
              !prompt9Value ||
              !prompt10Value
            ) ?
            true :
            false
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RiskAssessment;