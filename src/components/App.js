import React from 'react';
import styled from 'styled-components';
import Overview from './overview/Overview';
import Questions from './questions/Questions';
import Related from './related/Related';
import Reviews from './reviews/Reviews';

function App() {
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;
  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;
  return (
    <Wrapper>
      <Title>Hello World, this is my first styled component!
      <Overview />
      <Questions />
      <Related />
      <Reviews />
      </Title>
    </Wrapper>
  );
}

export default App;
