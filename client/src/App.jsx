
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Signup from './components/Singup'
import { RouterProvider } from 'react-router'

import { MainLayout } from './components/MainLayout'
import { Home } from './components/Home'
import Login from './components/Login'
import { Profile } from './components/Profile'


const browserRouter = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,   
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },

    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])


function App() {


  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
