import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function Answers({ questionId }) {
  const [allAnswers, setAllAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isCollapsedAnswers, setIsCollapsedAnswers] = useState(true);
  const [answerText, setAnswerText] = useState('See more answers');

  async function getAnswers() {
    const response = await fetch(
      `${process.env.URL}/qa/questions/${questionId}/answers`,
      {
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      },
    );
    const data = await response.json();
    setAllAnswers(data.results);
    if (isCollapsedAnswers) {
      setAnswers(data.results.slice(0, 2));
    } else {
      setAnswers(data.results);
    }
  }

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

  const handleHelpfulClick = async (answerId) => {
    await fetch(
      `${process.env.URL}/qa/answers/${answerId}/helpful`,
      {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      },
    );
    getAnswers();
  };

  const handleReportClick = async () => {
  };

  useEffect(() => {
    getAnswers();
  }, []);

  return (
    <>
      {answers.map((answer) => (
        <div key={answer.answer_id}>
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
              by
              {format(new Date(answer.date), 'MMMM d, yyyy')}
            </span>
            <span>
              Helpful?
              {' '}
              <span onClick={() => handleHelpfulClick(answer.answer_id)}>Yes</span>
              (
              {answer.helpfulness}
              )
            </span>
            <span onClick={handleReportClick}>Report</span>
          </footer>
        </div>
      ))}
      {(allAnswers.length > 2)
        && <p onClick={handleAnswerClick}>{answerText}</p>}
    </>
  );
}

export default Answers;
