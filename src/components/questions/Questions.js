import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import Search from './Search';
import Answers from './Answers';

function Questions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [isCollapsedQuestions, setIsQuestionsCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  async function getQuestions() {
    const response = await fetch(
      `${process.env.URL}/qa/questions?product_id=${process.env.PRODUCT_ID}`,
      {
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      },
    );
    const { results } = await response.json();
    setAllQuestions(results);
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
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Panel>
            <Dialog.Title>Deactivate account</Dialog.Title>
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <button type="button" onClick={() => setIsOpen(false)}>Deactivate</button>
            <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </Dialog>
      </section>
    </>
  );
}

export default Questions;
