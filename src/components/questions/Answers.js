import React, { useState } from 'react';

function Answers({ allAnswers }) {
  const [answers, setAnswers] = useState(allAnswers.slice(0, 2));
  const [isCollapsedAnswers, setIsCollapsedAnswers] = useState(true);
  const [answerText, setAnswerText] = useState('See more answers');

  const handleAnswerClick = () => {
    if (isCollapsedAnswers) {
      setAnswers(allAnswers);
      setAnswerText('Collapse answers');
    } else {
      setAnswers(allAnswers.slice(0, 2));
      setAnswerText('See more answers');
    }
    setIsCollapsedAnswers(!isCollapsedAnswers);
  };

  return (
    <>
      {answers.map((answer) => (
        <div key={answer.id}>
          <p>
            A:
            {answer.body}
          </p>
          <footer>
            <span>
              by
              {answer.answerer_name}
            </span>
            <span>
              Helpful? Yes(
              {answer.helpfulness}
              )
            </span>
            <span>Report</span>
          </footer>
        </div>
      ))}
      <p onClick={handleAnswerClick}>{answerText}</p>
    </>
  );
}

export default Answers;
