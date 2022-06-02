import React, { useEffect } from 'react';

import Answer from './Answer';

function Answers({ answers, getAnswers }) {
  useEffect(() => {
    getAnswers();
  }, []);

  return (
    <>
      {answers.map((answer) => (
        <Answer
          key={answer.answer_id}
          id={answer.answer_id}
          body={answer.body}
          username={answer.answerer_name}
          date={answer.date}
          helpfulness={answer.helpfulness}
          getAnswers={getAnswers}
        />
      ))}
    </>
  );
}

export default Answers;
