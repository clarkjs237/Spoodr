import React, { useState, useEffect } from 'react';

import Search from './Search';
import Question from './Question';
import AskQuestion from './AskQuestion';

function Questions({ product }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [hasMoreQuestions, setHasMoreQuestions] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${process.env.URL}/qa/questions?product_id=${product.id}&count=1000`, {
        headers: {
          Authorization: process.env.GITTOKEN,
        },
      });
      const data = await response.json();
      setAllQuestions(data.results);
      setQuestions(data.results.slice(0, 2));
      if (data.results.length > 2) {
        setHasMoreQuestions(true);
      } else {
        setHasMoreQuestions(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(() => event.target.value);
    setQuestions(
      questions.filter(
        (question) => question.question_body.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  const handleMoreQuestionsClick = () => {
    setQuestions(allQuestions.slice(0, questions.length + 2));
    if (questions.length < allQuestions.length) {
      setHasMoreQuestions(true);
    } else {
      setHasMoreQuestions(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <Search id="search" value={searchTerm} onInputChange={handleSearch} />
      <section>
        {questions.map((question) => (
          <Question
            key={question.question_id}
            id={question.question_id}
            body={question.question_body}
            helpfulness={question.question_helpfulness}
            getQuestions={getQuestions}
          />
        ))}
        {hasMoreQuestions && (
          <button type="button" onClick={handleMoreQuestionsClick}>
            More answered questions
          </button>
        )}
        <button type="button" onClick={() => setIsDialogOpen(true)}>
          Ask a question +
        </button>
        <AskQuestion
          product={product}
          getQuestions={getQuestions}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </section>
    </>
  );
}

export default Questions;
