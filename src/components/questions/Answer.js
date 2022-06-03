import React from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';

const BoldText = styled.span`
  font-weight: 700;
`;

const StyledFooter = styled.footer`
  color: gray;
  font-size: 0.8125rem;
`;

function Answer({
  id,
  body,
  username,
  date,
  helpfulness,
  getAnswers,
}) {
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

  const handleReportClick = async (answerId) => {
    await fetch(
      `${process.env.URL}/qa/answers/${answerId}/report`,
      {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      },
    );
    getAnswers();
  };

  return (
    <div key={id}>
      <p>
        <BoldText>A:</BoldText>
        {' '}
        {body}
      </p>
      <StyledFooter>
        <span>
          by
          {' '}
          {username}
        </span>
        <span>
          {' | '}
          {format(new Date(date), 'MMMM d, yyyy')}
        </span>
        <span>
          {' | '}
          Helpful?
          {' '}
          <span onClick={() => handleHelpfulClick(id)}>Yes</span>
          (
          {helpfulness}
          )
        </span>
        <span onClick={() => handleReportClick(id)}>
          {' | '}
          Report
        </span>
      </StyledFooter>
    </div>
  );
}

export default Answer;
