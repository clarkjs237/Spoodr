import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Overview from './Overview';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  document.body.removeChild(container);
  container = null;
});

it('renders with a Title', () => {
  const slogan = container

    .act(() => {
      render(<Overview />, container);
    });
  expect(container.textContent).toBe('');
});
