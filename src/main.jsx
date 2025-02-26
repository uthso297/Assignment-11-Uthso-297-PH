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
import Borrowed from './Pages/Borrowed';
import UpdateBook from './Pages/UpdateBook';
import ErrorPages from './Components/ErrorPages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPages></ErrorPages>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: 'allBooks',
        element: <AllBooks></AllBooks>
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
        path: 'allBooks/:id',
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({ params }) => fetch(`https://library-management-system-server-delta.vercel.app/allBooks/${params.id}`)

      },
      {
        path: 'borrowed',
        element: <PrivateRoute><Borrowed></Borrowed></PrivateRoute>
      },
      {
        path: 'allBooks/update/:id',
        element: <PrivateRoute><UpdateBook></UpdateBook></PrivateRoute>
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
