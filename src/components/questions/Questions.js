import React, { useState, useEffect } from 'react';
import Search from './Search';
import Answers from './Answers';

function Questions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [isCollapsedQuestions, setIsQuestionsCollapsed] = useState(true);

  async function getQuestions() {
    const response = await fetch(
      `${process.env.URL}/qa/questions?product_id=${process.env.PRODUCT_ID}`,
      {
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      },
    );
    const data = await response.json();
    setAllQuestions(data.results);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleQuestionsClick = () => {
    setIsQuestionsCollapsed(!isCollapsedQuestions);
  };

  const handleHelpfulClick = async (questionId) => {
    await fetch(
      `${process.env.URL}/qa/questions/${questionId}/helpful`,
      {
        method: 'PUT',
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      },
    );
    getQuestions();
  };

  useEffect(() => {
    getQuestions();
  }, []);

  let questions = [];
  if (searchTerm.length > 2) {
    questions = allQuestions.filter(
      (question) => question.question_body.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  } else {
    questions = allQuestions;
  }

  if (isCollapsedQuestions) {
    questions = questions.slice(0, 4);
  }

  return (
    <>
      <Search id="search" value={searchTerm} onInputChange={handleSearch} />
      <section>
        {questions.map((question) => (
          <div key={question.question_id}>
            <span>
              Q:
              {question.question_body}
            </span>
            <span>
              Helpful?
              <span onClick={() => handleHelpfulClick(question.question_id)}>Yes</span>
              (
              {question.question_helpfulness}
              )
            </span>
            |
            <span>Add Answer</span>
            <Answers questionId={question.question_id} />
          </div>
        ))}
        {(questions.length > 4)
        && (
        <button type="button" onClick={handleQuestionsClick}>
          More answered questions
        </button>
        )}
        <button type="button">Add a question +</button>
      </section>
    </>
  );
}

export default Questions;
