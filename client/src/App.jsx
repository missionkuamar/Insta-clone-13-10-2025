
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Signup from './components/Singup'
import { RouterProvider } from 'react-router'

import { MainLayout } from './components/MainLayout'
import { Home } from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'


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
        path: '/profile/:id',
        element: <Profile />,
      },
      {
        path: '/account/edit',
        element: <EditProfile />,
      },
    {
        path: '/chat',
        element:<ChatPage />
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
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
useEffect(() => {
  let socketio;

  if (user) {
    // console.log(user);

    socketio = io("http://localhost:8000", {
      query: {
        userId: user?._id,
      },
      transports: ["websocket"],
    });

    dispatch(setSocket(socketio));

    socketio.on("getOnlineUsers", (onlineUsers) => {
      console.log(onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    });
  } else {
    dispatch(setSocket(null));
  }

  return () => {
    if (socketio) {
      socketio.close();
    }
    dispatch(setSocket(null));
  };
}, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
