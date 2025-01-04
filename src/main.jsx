import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import Root from './Root/Root';
import AllBooks from './Pages/AllBooks';
import AddBook from './Pages/AddBook';
import PrivateRoute from './Components/PrivateRoute';
import LoginPage from './Pages/LogInPage';
import Register from './Pages/Register';
import AuthProvider from './Components/AuthProvider';
import CategoryWiseBook from './Pages/CategoryWiseBook';
import Details from './Pages/Details';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: 'allBooks',
        element: <PrivateRoute><AllBooks></AllBooks></PrivateRoute>
      },
      {
        path: 'addBook',
        element: <PrivateRoute><AddBook></AddBook></PrivateRoute>
      },
      {
        path: 'login',
        element: <LoginPage></LoginPage>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'categorywiseBook',
        element: <CategoryWiseBook></CategoryWiseBook>
      },
      {
        path: 'bookdetails/:id',
        element: <Details></Details>,

      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
