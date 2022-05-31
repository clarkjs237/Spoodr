import React, { useState } from 'react';

import Answers from './Answers';

function Question({
  id, body, helpfulness, product, getQuestions,
}) {
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
      <Answers questionId={id} getQuestions={getQuestions} />
    </div>
  );
}

export default Question;
