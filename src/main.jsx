import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from "./hooks/Auth.jsx";
import './index.css';
import './App.css';
import { SignIn, SignUp } from "./components/AuthForm.jsx";
import App from "./routes/app";
import User from "./routes/user";
import Message from "./routes/message";
import Profile from "./routes/profile";
import ErrorPage from "./routes/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/users/:uid?",
        element: <User />,
      },
      {
        path: "/messages",
        element: <Message />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ],
  }, 
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
