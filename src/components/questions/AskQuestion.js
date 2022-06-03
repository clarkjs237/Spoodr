import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  position: relative;
  z-index: 50;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgb(0 0 0 / 0.5);
`;

const StyledContainer = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPanel = styled(Dialog.Panel)`
  width: 100%;
  max-width: 24rem;
  background-color: white;
  padding: 1rem 3rem 1rem 1rem;
`;

const StyledTitle = styled(Dialog.Title)`
  margin: 0 0 1rem;
`;

const StyledDescription = styled(Dialog.Description)`
  font-weight: 700;
  margin: 1rem 0;
`;

const Label = styled.label`
  margin: 1rem 0 0;
  font-size: 0.8125rem;
  display: block;
`;

const Input = styled.input`
  margin: 0.5rem 0 0;
  width: 100%;
  border: 1px solid #0B2027;
  padding: 1rem;
`;

const Textarea = styled.textarea`
  margin: 0.5rem 0 1rem;
  width: 100%;
  height: 10em;
  border: 1px solid #0B2027;
  padding: 1rem;`;

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
    <StyledDialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    >
      <Overlay aria-hidden="true" />
      <StyledContainer>
        <StyledPanel>
            <StyledTitle>Ask your question</StyledTitle>
            <StyledDescription>
              About the
              {' '}
              {product.name}
            </StyledDescription>
            <form onSubmit={handleQuestionSubmit}>
              <Label htmlFor="username">
                Username
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Label>
              <Label htmlFor="email">
                Email
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Label>
              <Label htmlFor="question">
                Your question
                <Textarea
                  id="question"
                  value={askQuestion}
                  onChange={handleAskQuestionChange}
                />
              </Label>
              <input type="submit" value="Submit" />
            </form>
        </StyledPanel>
      </StyledContainer>
    </StyledDialog>
  );
}

export default AskQuestion;
