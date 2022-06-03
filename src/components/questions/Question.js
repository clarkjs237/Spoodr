import React, { useState } from 'react';
import styled from 'styled-components';

import Answers from './Answers';
import AddAnswer from './AddAnswer';

const StyledContainer = styled.div`
  margin 1rem 0;
`;

const StyledQuestion = styled.div`
  display: flex;
`;

const StyledQuestionBody = styled.span`
  font-weight: 700;
`;

const QuestionMeta = styled.div`
  margin-left: auto;
  font-size: 0.8125rem;
`;

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
    <StyledContainer>
      <StyledQuestion>
        <StyledQuestionBody>
          Q:
          {' '}
          {body}
        </StyledQuestionBody>
        <QuestionMeta>
          <span>
            Helpful?
            {' '}
            <span onClick={() => handleHelpfulClick(id)}>Yes</span>
            (
            {helpfulness}
            )
            {' | '}
          </span>
          <span onClick={() => setIsDialogOpen(true)}>Add Answer</span>
        </QuestionMeta>
      </StyledQuestion>
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
    </StyledContainer>
  );
}

export default Question;
