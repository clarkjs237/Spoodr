import React, { useState } from 'react';

import Answers from './Answers';
import AddAnswer from './AddAnswer';

function Question({
  id, body, helpfulness, product, getQuestions,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [answers, setAnswers] = useState([]);

  const getAnswers = async () => {
    try {
      const response = await fetch(`${process.env.URL}/qa/questions/${id}/answers`, {
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      });
      const data = await response.json();
      setAnswers(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHelpfulClick = async (questionId) => {
    try {
      await fetch(`${process.env.URL}/qa/questions/${questionId}/helpful`, {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      });
      getQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <span>
        Q:
        {body}
      </span>
      <span>
        Helpful?
        <span onClick={() => handleHelpfulClick(id)}>Yes</span>
        (
        {helpfulness}
        )
      </span>
      <span onClick={() => setIsDialogOpen(true)}>Add Answer</span>
      <AddAnswer
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        questionId={id}
        getAnswers={getAnswers}
      />
      <Answers
        id={id}
        answers={answers}
        getAnswers={getAnswers}
      />
    </div>
  );
}

export default Question;
