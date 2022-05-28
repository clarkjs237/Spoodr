import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import Search from './Search';
import Answers from './Answers';

function Questions({ product }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [hasMoreQuestions, setHasMoreQuestions] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userQuestion, setUserQuestion] = useState('');

  async function getQuestions() {
    const response = await fetch(
      `${process.env.URL}/qa/questions?product_id=40352&count=20`,
      {
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      },
    );
    const { results } = await response.json();
    setAllQuestions(results);
    setQuestions(results.slice(0, 2));
    if (results.length > 2) {
      setHasMoreQuestions(true);
    } else {
      setHasMoreQuestions(false);
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleQuestionsClick = () => {
    setQuestions(allQuestions.slice(0, questions.length + 2));
    if (questions.length < allQuestions.length) {
      setHasMoreQuestions(true);
    } else {
      setHasMoreQuestions(false);
    }
  };

  const handleQuestionSubmit = async () => {
    event.preventDefault();
    const response = await axios.post(`${process.env.URL}/qa/questions`, {
      body: userQuestion,
      name: username,
      email,
      product_id: +product.id,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.GITTOKEN,
      },
    });
    getQuestions();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserQuestionChange = (event) => {
    setUserQuestion(event.target.value);
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
        {hasMoreQuestions && (
        <button type="button" onClick={handleQuestionsClick}>
          More answered questions
        </button>
        )}
        <button type="button" onClick={() => setIsDialogOpen(true)}>Add a question +</button>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <Dialog.Panel>
            <Dialog.Title>Ask Your Question</Dialog.Title>
            <Dialog.Description>
              About the
              {' '}
              {product.name}
            </Dialog.Description>
            <form onSubmit={handleQuestionSubmit}>
              <label htmlFor="username">
                Username:
                <input id="username" type="text" value={username} onChange={handleUsernameChange} />
              </label>
              <label htmlFor="email">
                Email:
                <input id="email" type="text" value={email} onChange={handleEmailChange} />
              </label>
              <label htmlFor="question">
                Your question:
                <textarea id="question" value={userQuestion} onChange={handleUserQuestionChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Dialog.Panel>
        </Dialog>
      </section>
    </>
  );
}

export default Questions;
