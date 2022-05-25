import React from "react";

function Answers({ answers }) {
  return (
    <>
      {answers.map((answer) => (
        <div>
          <p>A: {answer.body}</p>
          <footer>
            <span>by {answer.answerer_name}</span>
            <span>Helpful? Yes({answer.helpfulness})</span>
            <span>Report</span>
          </footer>
        </div>
      ))}
    </>
  );
}

export default Answers;
