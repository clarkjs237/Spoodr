import React, { useState, useEffect } from "react";
import { PRODUCT_ID, URL } from "../App";
import Search from "./Search";
import Answers from "./Answers";

function Questions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
        {searchTerm.length > 2 ? (
          searchedQuestions.map((question) => {
            const answers = Object.values(question.answers);
            return (
              <div key={question.question_id}>
                <p>Q: {question.question_body}</p>
                <Answers answers={answers} />
              </div>
            );
          })
        ) : (
          questions.map((question) => {
            const answers = Object.values(question.answers);
            return (
              <div key={question.question_id}>
                <p>Q: {question.question_body}</p>
                <Answers answers={answers} />
              </div>
            );
          })
        )}
      </section>
    </>
  );
}

export default Questions;
