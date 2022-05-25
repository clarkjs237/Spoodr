import React, { useState, useEffect } from "react";
import { PRODUCT_ID, URL } from "../App";
import Search from "./Search";
import Answers from "./Answers";

function Questions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState([]);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [isCollapsedQuestions, setIsQuestionsCollapsed] = useState(true);
  const [isCollapsedAnswers, setIsCollapsedAnswers] = useState(true);
  const [answerText, setAnswerText] = useState('See more answers');

  useEffect(() => {
    getQuestions();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleQuestionsClick = () => {
    setIsQuestionsCollapsed(!isCollapsedQuestions);
  };

  const handleAnswersClick = () => {
    if (isCollapsedAnswers) {
      setAnswerText('Collapse answers');
    } else {
      setAnswerText('See more answers');
    }
    setIsCollapsedAnswers(!isCollapsedAnswers);
  };

  async function getQuestions() {
    try {
      const response = await fetch(
        `${URL}/qa/questions?product_id=${PRODUCT_ID}`,
        {
          headers: {
            Authorization: process.env.GITTOKEN,
          },
        }
      );
      const data = await response.json();
      setQuestions(data.results);
      setActiveQuestions(data.results.slice(0, 4));
    } catch (error) {
      console.error(`Could not get questions: ${error}`);
    }
  }

  const searchedQuestions = questions.filter((question) =>
    question.question_body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Search id="search" value={searchTerm} onInputChange={handleSearch} />
      <section>
        {searchTerm.length > 2
          ? searchedQuestions.map((question) => {
              let answers = [];
              if (isCollapsedAnswers) {
                answers = Object.values(question.answers).slice(0, 2);
              } else {
                answers = Object.values(question.answers);
              }
              return (
                <div key={question.question_id}>
                  <p>Q: {question.question_body}</p>
                  <Answers
                    answers={answers}
                    isCollapsedAnswers={isCollapsedAnswers}
                    onAnswerClick={handleAnswersClick}
                    answerText={answerText}
                  />
                </div>
              );
            })
          : activeQuestions.map((question) => {
              let answers = [];
              if (isCollapsedAnswers) {
                answers = Object.values(question.answers).slice(0, 2);
              } else {
                answers = Object.values(question.answers);
              }
              return (
                <div key={question.question_id}>
                  <p>Q: {question.question_body}</p>
                  <Answers
                    answers={answers}
                    isCollapsedAnswers={isCollapsedAnswers}
                    onAnswerClick={handleAnswersClick}
                    answerText={answerText}
                  />
                </div>
              );
            })}
        <button onClick={handleQuestionsClick}>More answered questions</button>
        <button>Add a question +</button>
      </section>
    </>
  );
}

export default Questions;
