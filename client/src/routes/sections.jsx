import { lazy, Suspense, useEffect, useContext } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { curr_context } from '../contexts/Central';

import Landing from '../sections/landing';
import Chatbot from '../Chatbot';

 function Router() {
  const now_context = useContext(curr_context);
  const { user, isAuthenticated, isLoading } = useAuth0();



  useEffect(() => {
    console.log(user);
    now_context.set_google_user(user);
  }, [user, now_context]);

  const routes = useRoutes([
    {
      path:"/",
      //element:<Chatbot/>
      element:<Landing/>
    },
    {
      // path: 'landing',
      // element: <Landing />
      path: 'chatbot',
      element: <Chatbot />
    },
  ]);

  return routes;
}

export {Router}
