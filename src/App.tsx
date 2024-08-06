import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import "./App.css";
import TestPage from "./pages/TestPage/TestPage";
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/SignUp/SignUp";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage"; // Import the CreateEventPage component
import DashboardPage from './pages/Dashboard/DashboardPage'; // Import the DashboardPage component

const Layout = () => {
  return (
    <>
      <Outlet />
      {/* <Navbar /> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'page',
        element: <DashboardPage />, // Add the DashboardPage component
      },
      {
        path: 'events',
        element: <CreateEventPage />,
      },
      
    ],
  },
  {
    path: '*',
    element: <div>Page not found</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
