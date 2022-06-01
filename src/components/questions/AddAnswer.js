import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

function AddAnswer({ isDialogOpen, setIsDialogOpen, questionId, getAnswers }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAnswerSubmit = async () => {
    event.preventDefault();
    const data = {
      body: answer,
      name: username,
      email,
    };
    try {
      await fetch(`${process.env.URL}/qa/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
          Authorization: process.env.GITTOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setIsDialogOpen(false);
      getAnswers();
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

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    >
      <Dialog.Panel>
        <Dialog.Title>Add your answer</Dialog.Title>
        <Dialog.Description>
          Description
        </Dialog.Description>
        <form onSubmit={handleAnswerSubmit}>
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
          <label htmlFor="answer">
            Your question:
            <textarea
              id="answer"
              value={answer}
              onChange={handleAnswerChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}

export default AddAnswer;
