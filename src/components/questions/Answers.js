import React from "react";

function Answers({ answers, isCollapsedAnswers, onAnswerClick, answerText }) {
  return (
    <section>
      {answers.map((answer) => (
        <div key={answer.id}>
          <p>A: {answer.body}</p>
          <footer>
            <span>by {answer.answerer_name}</span>
            <span>Helpful? Yes({answer.helpfulness})</span>
            <span>Report</span>
          </footer>
        </div>
      ))}
      <p onClick={onAnswerClick}>{answerText}</p>
    </section>
  );
}

export default Answers;
