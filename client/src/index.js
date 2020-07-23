import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './style/app.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul{
    list-style: none;
  }
  a{
      text-decoration: none;
      color: black;
  }
`;


ReactDOM.render(<React.StrictMode><GlobalStyled /><Root /></React.StrictMode>,document.getElementById('root'));
