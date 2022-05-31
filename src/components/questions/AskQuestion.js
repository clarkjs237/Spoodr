import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

function AskQuestion({
  product, getQuestions, isDialogOpen, setIsDialogOpen,
}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [askQuestion, setAskQuestion] = useState('');

  const handleQuestionSubmit = async () => {
    event.preventDefault();
    const data = {
      body: askQuestion,
      name: username,
      email,
      product_id: product.id,
    };
    try {
      await fetch(`${process.env.URL}/qa/questions`, {
        method: 'POST',
        headers: {
          Authorization: process.env.GITTOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setIsDialogOpen(false);
      getQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAskQuestionChange = (event) => {
    setAskQuestion(event.target.value);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    >
      <Dialog.Panel>
        <Dialog.Title>Ask Your Question</Dialog.Title>
        <Dialog.Description>
          About the
          {product}
        </Dialog.Description>
        <form onSubmit={handleQuestionSubmit}>
          <label htmlFor="username">
            Username:
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label htmlFor="question">
            Your question:
            <textarea
              id="question"
              value={askQuestion}
              onChange={handleAskQuestionChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}

export default AskQuestion;
