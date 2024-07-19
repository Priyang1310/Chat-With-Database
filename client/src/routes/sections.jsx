import { lazy, Suspense, useEffect, useContext } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import DashboardLayout from 'src/layouts/dashboard';
import { curr_context } from '../contexts/Central';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Demo = lazy(() => import('src/pages/Demo'));
export const Landing = lazy(() => import('src/pages/landing'));
export const Page = lazy(()=>import("src/pages/page"))


 function Router() {
  const now_context = useContext(curr_context);
  const { user, isAuthenticated, isLoading } = useAuth0();



  useEffect(() => {
    console.log(user);
    now_context.set_google_user(user);
  }, [user, now_context]);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <Landing />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'demo', element: <Demo /> },
        {path : "/page" , element: <Page/>}
      ],
    },
    {
      path: 'landing',
      element: <Landing />
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

export {Router}