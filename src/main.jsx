import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './App.css'
import Signup from './Signup.jsx';
import Principal from './Principal.jsx';
import Mydata from './Mydata.jsx';
import Guest from './Guest.jsx';
import Questions from './Questions.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/main",
    element: <Principal />
  },
  {
    path: "/myData",
    element: <Mydata />
  },
  {
    path: "/guest",
    element: <Guest />
  },
  {
    path: "/questions",
    element: <Questions />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
