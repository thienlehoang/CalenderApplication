import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
const initialState = []

const reducer = (state = initialState, action) => {
  // Logic cập nhật trạng thái dựa trên action
  switch (action.type) {
      case 'ADD_TODO':
          return {
              ...state,
              todos: [...state.todos, action.payload]
          };
      default:
          return state;
  }
};

const store = createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
