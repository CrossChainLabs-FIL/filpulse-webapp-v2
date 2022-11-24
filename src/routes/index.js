import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useState } from 'react';

// import DashboardLayout from '../layouts/dashboard';
import AppbarLoggedIn from '../layouts/dashboard/header/AppbarLoggedIn';
import AppbarLoggedOut from '../layouts/dashboard/header/AppbarLoggedOut';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<span></span>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    { path: '/login', element: (<AppbarLoggedOut />) },
    { path: '/', element: (<AppbarLoggedIn />) },
    // { path: '*', element: <Navigate to="/" replace /> },
  ]);
}

// const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));