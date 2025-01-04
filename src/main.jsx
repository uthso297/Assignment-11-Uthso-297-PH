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
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
