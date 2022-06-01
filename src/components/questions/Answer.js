import React from 'react';
import { format } from 'date-fns';

function Answer({
  id,
  body,
  username,
  date,
  helpfulness,
  getAnswers
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

  console.log(id, body);

  return (
    <div key={id}>
      <p>
        A:
        {body}
      </p>
      <footer>
        <span>
          by
          {username}
        </span>
        <span>
          by
          {format(new Date(date), 'MMMM d, yyyy')}
        </span>
        <span>
          Helpful?
          {' '}
          <span onClick={() => handleHelpfulClick(id)}>Yes</span>
          (
          {helpfulness}
          )
        </span>
        <span onClick={() => handleReportClick(id)}>Report</span>
      </footer>
    </div>
  );
}

export default Answer;
