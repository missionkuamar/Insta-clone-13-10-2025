
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Signup from './components/Singup'
import { RouterProvider } from 'react-router'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { MainLayout } from './components/MainLayout'
import { Home } from './components/Home'
import Login from './components/Login'
import { ChatPage } from './components/ChatPage'
import { EditProfile } from './components/EditProfile'
import { Profile } from './components/Profile'



const browserRouter = createBrowserRouter([
 
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
path: '/',
element: <ProtectedRoutes><Home /></ProtectedRoutes>,
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      }
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
